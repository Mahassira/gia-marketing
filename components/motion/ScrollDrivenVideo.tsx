"use client";

import { useEffect, useRef } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll, type MotionValue } from "framer-motion";

interface ScrollDrivenVideoProps {
  src: string;
  poster: string;
  className?: string;
  progress?: MotionValue<number>;
  reduceMotion?: boolean | null;
}

export function ScrollDrivenVideo({
  src,
  poster,
  className = "",
  progress: externalProgress,
  reduceMotion: reduceMotionProp,
}: ScrollDrivenVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<number | null>(null);
  const pendingProgress = useRef(0);
  const durationRef = useRef(0);
  const reducedMotionHook = useReducedMotion();
  const shouldReduceMotion = reduceMotionProp ?? reducedMotionHook;

  const { scrollYProgress: internalProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const progress = externalProgress ?? internalProgress;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || shouldReduceMotion) return;

    const syncMetadata = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        durationRef.current = video.duration;
        const target = pendingProgress.current * video.duration;
        if (Math.abs(video.currentTime - target) > 0.02) video.currentTime = target;
      }
    };

    video.addEventListener("loadedmetadata", syncMetadata);
    video.addEventListener("durationchange", syncMetadata);
    syncMetadata();

    return () => {
      video.removeEventListener("loadedmetadata", syncMetadata);
      video.removeEventListener("durationchange", syncMetadata);
    };
  }, [shouldReduceMotion]);

  useMotionValueEvent(progress, "change", (latest) => {
    pendingProgress.current = Math.min(1, Math.max(0, latest));
    if (shouldReduceMotion) return;
    if (frameRef.current !== null) return;

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      const video = videoRef.current;
      const duration = durationRef.current || video?.duration || 0;
      if (!video || !duration || !Number.isFinite(duration)) return;

      const target = pendingProgress.current * duration;
      if (Math.abs(video.currentTime - target) >= 1 / 30) {
        try {
          video.currentTime = target;
        } catch {
          // Some browsers can reject a seek while media metadata is changing.
        }
      }
    });
  });

  useEffect(() => () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden="true" />
      {!shouldReduceMotion && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
