"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useReducedMotion, type MotionValue } from "framer-motion";

interface ScrollDrivenVideoProps {
  /** e.g. "/media/gia-cinematic-desktop.mp4" */
  src: string;
  /** Static fallback shown until the video can scrub, under reduced
   * motion, and as the base image on mobile (see below). Required —
   * this component must never render nothing while a real asset is
   * pending or unavailable. */
  poster: string;
  className?: string;
  /**
   * Optional externally-computed scroll progress (0→1), for when this
   * video needs to stay in sync with other scroll-linked elements
   * already tracking the same container (e.g. CinematicSystemSection's
   * stage labels/ring, which compute their own scrollYProgress against
   * the outer pinned-panel container). When omitted, the component
   * manages its own scroll tracking against its own wrapping element —
   * the original, standalone behavior.
   */
  progress?: MotionValue<number>;
  reduceMotion?: boolean | null;
}

/**
 * Phase 7C: wired to real video assets (see CinematicSystemSection).
 *
 * Design decisions (per the approved Phase 7A/7B plan):
 * - currentTime + rAF, not naive per-scroll-event seeking: scroll
 *   events fire far more often than a video can usefully seek, and
 *   assigning currentTime synchronously on every event causes visible
 *   stutter on most browsers. Progress is captured on every scroll
 *   (via Framer Motion's useScroll, which already throttles via rAF
 *   internally) but only actually applied to the <video> when it has
 *   moved enough to matter (see MIN_DELTA_SECONDS below) — this is the
 *   "prevent excessive seeking" requirement.
 * - The component itself is viewport-agnostic. The homepage chooses
 *   the appropriate desktop/mobile experience, so this component can
 *   be safely reused wherever scroll scrubbing is desired.
 * - Reduced motion: same fallback — poster image only, no scrubbing,
 *   no autoplay.
 * - Browsers that can't scrub efficiently / slow network: the poster
 *   renders first and remains until `readyState` indicates enough
 *   buffered data to scrub; if that never resolves, the poster simply
 *   stays — there is no broken/blank state.
 */
export function ScrollDrivenVideo({
  src,
  poster,
  className = "",
  progress: externalProgress,
  reduceMotion: reduceMotionProp,
}: ScrollDrivenVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastAppliedTime = useRef(0);
  const reducedMotionHook = useReducedMotion();
  const shouldReduceMotion = reduceMotionProp ?? reducedMotionHook;
  const [canScrub, setCanScrub] = useState(false);

  const MIN_DELTA_SECONDS = 1 / 30; // don't re-seek for sub-frame-scale changes

  // Always called (rules of hooks) — only actually used as the driving
  // progress value when no external one is supplied.
  const { scrollYProgress: internalProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const progress = externalProgress ?? internalProgress;

  useEffect(() => {
    if (shouldReduceMotion) return;
    const video = videoRef.current;
    if (!video) return;

    function handleCanScrub() {
      // readyState 2+ (HAVE_CURRENT_DATA or better) is enough to seek
      // without stalling on most connections.
      if (video && video.readyState >= 2) setCanScrub(true);
    }
    video.addEventListener("loadedmetadata", handleCanScrub);
    video.addEventListener("loadeddata", handleCanScrub);
    video.addEventListener("canplay", handleCanScrub);
    handleCanScrub();
    return () => {
      video.removeEventListener("loadedmetadata", handleCanScrub);
      video.removeEventListener("loadeddata", handleCanScrub);
      video.removeEventListener("canplay", handleCanScrub);
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!canScrub || shouldReduceMotion) return;
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const latest = progress.get();
    const targetTime = latest * video.duration;
    video.currentTime = targetTime;
    lastAppliedTime.current = targetTime;
  }, [canScrub, progress, shouldReduceMotion]);

  useMotionValueEvent(progress, "change", (latest) => {
    if (!canScrub || shouldReduceMotion) return;
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const targetTime = latest * video.duration;
    if (Math.abs(targetTime - lastAppliedTime.current) < MIN_DELTA_SECONDS) return;

    video.currentTime = targetTime;
    lastAppliedTime.current = targetTime;
  });

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Poster is always in the DOM as the base layer — it's what
          reduced-motion and mobile users see, and what everyone sees
          before the video is scrub-ready. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
      {!shouldReduceMotion && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${canScrub ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
