"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";

interface ScrollDrivenVideoProps {
  /** e.g. "/media/gia-growth-system.mp4" — does not exist yet (Phase 7C). */
  src: string;
  /** Static fallback shown until the video can scrub, under reduced
   * motion, and as the base image on mobile (see below). Required —
   * this component must never render nothing while a real asset is
   * pending or unavailable. */
  poster: string;
  className?: string;
}

/**
 * Phase 7B: this component is built and ready, but not used by any
 * homepage section yet — no real video file exists (Phase 7C, once the
 * asset and visual direction are finalized). Dropping a real file at
 * the `src` path and wiring this into a section is the only change
 * needed later; nothing about this architecture should need to change.
 *
 * Design decisions (per the approved Phase 7A plan):
 * - currentTime + rAF, not naive per-scroll-event seeking: scroll
 *   events fire far more often than a video can usefully seek, and
 *   assigning currentTime synchronously on every event causes visible
 *   stutter on most browsers. Progress is captured on every scroll
 *   (via Framer Motion's useScroll, which already throttles via rAF
 *   internally) but only actually applied to the <video> when it has
 *   moved enough to matter (see MIN_DELTA below) — this is the
 *   "prevent excessive seeking" requirement.
 * - Mobile: scroll-scrubbing video is CPU/GPU-costly on mobile devices
 *   and unreliable on several mobile browsers' seek implementations.
 *   Rather than force desktop behavior onto mobile, this component
 *   detects a narrow viewport (matchMedia) and falls back to the
 *   static poster image outright on mobile — no scrubbing pipeline
 *   runs at all there.
 * - Reduced motion: same fallback — poster image only, no scrubbing,
 *   no autoplay.
 * - Browsers that can't scrub efficiently / slow network: the poster
 *   renders first and remains until `readyState` indicates enough
 *   buffered data to scrub; if that never resolves, the poster simply
 *   stays — there is no broken/blank state.
 */
export function ScrollDrivenVideo({ src, poster, className = "" }: ScrollDrivenVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastAppliedTime = useRef(0);
  const shouldReduceMotion = useReducedMotion();
  const [canScrub, setCanScrub] = useState(false);

  const MIN_DELTA_SECONDS = 1 / 30; // don't re-seek for sub-frame-scale changes

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (shouldReduceMotion) return;
    const isNarrowViewport = window.matchMedia("(max-width: 767px)").matches;
    if (isNarrowViewport) return; // mobile: poster only, no scrub pipeline

    const video = videoRef.current;
    if (!video) return;

    function handleCanScrub() {
      // readyState 2+ (HAVE_CURRENT_DATA or better) is enough to seek
      // without stalling on most connections.
      if (video && video.readyState >= 2) setCanScrub(true);
    }
    video.addEventListener("loadeddata", handleCanScrub);
    handleCanScrub();
    return () => video.removeEventListener("loadeddata", handleCanScrub);
  }, [shouldReduceMotion]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!canScrub || shouldReduceMotion) return;
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const targetTime = progress * video.duration;
    if (Math.abs(targetTime - lastAppliedTime.current) < MIN_DELTA_SECONDS) return;

    video.currentTime = targetTime;
    lastAppliedTime.current = targetTime;
  });

  return (
    <div ref={containerRef} className={className}>
      {/* Poster is always in the DOM as the base layer — it's what
          reduced-motion and mobile users see, and what everyone sees
          before the video is scrub-ready. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt="" className="h-full w-full object-cover" />
      {!shouldReduceMotion && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          className={`h-full w-full object-cover ${canScrub ? "" : "hidden"}`}
        />
      )}
    </div>
  );
}
