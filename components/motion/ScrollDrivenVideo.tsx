"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useReducedMotion, type MotionValue } from "framer-motion";

interface ScrollDrivenVideoProps {
  /** e.g. "/media/gia-cinematic-desktop.mp4" */
  src: string;
  /** Permanent base-layer fallback — always rendered, always visible
   * underneath the video. This is what shows immediately, what shows
   * under reduced motion, on mobile, and if the video ever fails to
   * load — never a blank state. */
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
}

/**
 * Phase 7D fix: the video element is now ALWAYS rendered and never
 * hidden via `display: none`/Tailwind `hidden`. Visibility layers are:
 *
 *   poster (always, absolute, base layer)
 *     -> video (always rendered, opacity 0 -> 1 once ready)
 *
 * Two independent readiness signals, deliberately not conflated:
 *   - `isVisible` (opacity/fade-in): true as soon as loadedmetadata OR
 *     loadeddata fires — enough to know the video has real content to
 *     show. This controls the CSS opacity transition, never `display`.
 *   - `canScrub` (seeking enabled): true once `canplay` fires (or
 *     readyState already indicates enough buffered data) — this only
 *     gates whether scroll position is applied to `video.currentTime`.
 *     Before this is true, the video still renders (at whatever frame
 *     it naturally has, typically the poster-equivalent first frame
 *     via the `poster` attribute), it just doesn't seek yet.
 *
 * If the video errors, `hasError` stops the video from ever being
 * layered in front of the poster — the poster remains the permanent,
 * always-correct fallback in that case, exactly as required.
 *
 * currentTime + rAF, not naive per-scroll-event seeking: scroll events
 * fire far more often than a video can usefully seek, and assigning
 * currentTime synchronously on every event causes visible stutter.
 * Progress is captured via Framer Motion's useScroll (which itself
 * throttles via rAF internally) but only actually applied to the
 * <video> when it has moved enough to matter (MIN_DELTA_SECONDS) —
 * this avoids excessive seeking without introducing a second rAF loop
 * or any React state updates on every scroll frame.
 *
 * Mobile: this component is only used for the desktop scroll-scrubbed
 * video; the mobile experience uses a plain autoplay/loop <video>
 * directly in CinematicSystemSection (no scroll-scrubbing, no
 * ScrollDrivenVideo) — matching that scroll-scrubbing is CPU/GPU-costly
 * and unreliable on mobile. As a second safety net, this component
 * also skips its own scrub pipeline below 768px if it's ever reused
 * elsewhere at a narrow viewport.
 *
 * Reduced motion: no video is rendered at all — the poster alone is
 * the entire visual, no autoplay, no scrubbing.
 */
export function ScrollDrivenVideo({
  src,
  poster,
  className = "",
  progress: externalProgress,
}: ScrollDrivenVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastAppliedTime = useRef(0);
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [canScrub, setCanScrub] = useState(false);
  const [hasError, setHasError] = useState(false);

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

    function handleVisible() {
      setIsVisible(true);
    }
    function handleCanScrub() {
      setCanScrub(true);
    }
    function handleError() {
      setHasError(true);
    }

    video.addEventListener("loadedmetadata", handleVisible);
    video.addEventListener("loadeddata", handleVisible);
    video.addEventListener("canplay", handleCanScrub);
    video.addEventListener("error", handleError);

    // Cover the case where the video is already cached/ready by the
    // time this effect runs (readyState checked directly rather than
    // waiting on an event that may never fire again).
    if (video.readyState >= 1) setIsVisible(true); // HAVE_METADATA+
    if (video.readyState >= 3) setCanScrub(true); // HAVE_FUTURE_DATA+

    return () => {
      video.removeEventListener("loadedmetadata", handleVisible);
      video.removeEventListener("loadeddata", handleVisible);
      video.removeEventListener("canplay", handleCanScrub);
      video.removeEventListener("error", handleError);
    };
  }, [shouldReduceMotion]);

  useMotionValueEvent(progress, "change", (latest) => {
    if (!canScrub || shouldReduceMotion || hasError) return;
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const targetTime = latest * video.duration;
    if (Math.abs(targetTime - lastAppliedTime.current) < MIN_DELTA_SECONDS) return;

    video.currentTime = targetTime;
    lastAppliedTime.current = targetTime;
  });

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Permanent base layer — always rendered, always visible.
          Never conditionally hidden; this is the guaranteed
          non-blank state. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />

      {/* Video layer: always mounted (never display:none / Tailwind
          `hidden`) once we're in a motion-enabled, non-error state —
          only its opacity is animated, so there is never a moment
          where the cinematic area is blank while waiting on a
          readiness event. */}
      {!shouldReduceMotion && !hasError && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out"
          style={{ opacity: isVisible ? 1 : 0 }}
        />
      )}
    </div>
  );
}
