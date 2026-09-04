"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { ScrollDrivenVideo } from "@/components/motion/ScrollDrivenVideo";

const DESKTOP_VIDEO = "/media/gia-cinematic-desktop.mp4";
const DESKTOP_POSTER = "/media/gia-cinematic-desktop-poster.jpg";
const MOBILE_VIDEO = "/media/gia-cinematic-mobile.mp4";
const MOBILE_POSTER = "/media/gia-cinematic-mobile-poster.jpg";

/**
 * The homepage's "first major visual moment" (Phase 7 priority #1).
 * Phase 7C: now backed by the real, approved cinematic video asset
 * (a day-to-night waterfront skyline with the GIA mark resolving in) —
 * scroll-scrubbed on desktop via ScrollDrivenVideo, synced to the same
 * scrollYProgress already driving the stage labels/ring/rail so the
 * video timeline and the text progression move together.
 *
 * Desktop: a compact (2.2x viewport) scroll-through with a pinned
 * inner panel — enough scroll room for six stages to read as a
 * deliberate progression without inflating total homepage length the
 * way a 4–5x-viewport version would. This does not hijack scroll: the
 * user's own scrolling is the only input, and normal page scroll
 * continues immediately once the pinned panel's range is exhausted.
 *
 * Mobile: NOT pinned, NOT scroll-scrubbed (per ScrollDrivenVideo's own
 * mobile fallback and the approved architecture — scroll-scrubbing
 * video is CPU-costly and unreliable on mobile). The full six-stage
 * narrative is retained (Strategy → Marketing → Leads → CRM →
 * Conversion → Growth), presented as a lightweight sequential vertical
 * reveal. The real mobile-optimized video plays as a simple, contained
 * muted+playsInline autoplay loop behind the first stage only (a
 * well-supported mobile pattern, distinct from scroll-scrubbing) —
 * bounded to one ~40vh block rather than stretched across all six
 * stacked blocks, which would visibly distort a single image/video at
 * that aspect ratio. Reduced motion replaces the loop with the poster
 * frame only — no autoplay, no motion, everywhere else unchanged.
 */
export function CinematicSystemSection({
  stages,
  arabic,
}: {
  stages: string[];
  arabic: boolean;
}) {
  return (
    <section className="bg-ink">
      <ol className="sr-only">
        {stages.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      <DesktopCinematic stages={stages} arabic={arabic} />
      <MobileCinematic stages={stages} arabic={arabic} />
    </section>
  );
}

function DesktopCinematic({ stages, arabic }: { stages: string[]; arabic: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  if (shouldReduceMotion) {
    // Static resting state: the video's own poster frame (the resolved
    // GIA mark over the skyline) plus the final stage of the journey
    // (Growth) as the settled outcome — no scroll-linked motion, no
    // video playback at all.
    return (
      <div className="relative hidden overflow-hidden lg:flex lg:h-[70vh] lg:items-center lg:justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={DESKTOP_POSTER}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/60" />
        <span
          className={`relative text-5xl text-surface xl:text-7xl ${
            arabic ? "font-heading-ar" : "font-heading"
          }`}
        >
          {stages[stages.length - 1]}
        </span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative hidden lg:block lg:h-[220vh]">
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] items-center justify-center overflow-hidden lg:top-20 lg:h-[calc(100vh-5rem)]">
        <ScrollDrivenVideo
          src={DESKTOP_VIDEO}
          poster={DESKTOP_POSTER}
          progress={scrollYProgress}
          className="absolute inset-0"
        />
        {/* Scrim: the video runs bright (city lights, sky) in places,
            so the white stage-label text needs consistent legibility
            across the whole scrub range, not just the darker frames. */}
        <div className="absolute inset-0 bg-ink/55" />
        <RotatingRing progress={scrollYProgress} />
        <ProgressRail count={stages.length} progress={scrollYProgress} />
        {stages.map((stage, i) => (
          <StageLabel
            key={stage}
            label={stage}
            index={i}
            count={stages.length}
            progress={scrollYProgress}
            arabic={arabic}
          />
        ))}
      </div>
    </div>
  );
}

function StageLabel({
  label,
  index,
  count,
  progress,
  arabic,
}: {
  label: string;
  index: number;
  count: number;
  progress: MotionValue<number>;
  arabic: boolean;
}) {
  const segment = 1 / count;
  const start = index * segment;
  const end = start + segment;
  const blend = segment * 0.35;

  const opacity = useTransform(
    progress,
    [
      Math.max(0, start - blend),
      start,
      end - blend,
      Math.min(1, end),
    ],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [start, end], [16, -16]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center"
    >
      <span className="font-heading text-sm text-gold">{String(index + 1).padStart(2, "0")}</span>
      <span
        className={`text-4xl text-surface sm:text-5xl xl:text-7xl ${
          arabic ? "font-heading-ar leading-snug" : "font-heading leading-tight"
        }`}
      >
        {label}
      </span>
    </motion.div>
  );
}

function RotatingRing({ progress }: { progress: MotionValue<number> }) {
  const rotate = useTransform(progress, [0, 1], [0, 60]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.9, 1.05, 0.9]);
  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 400 400"
      style={{ rotate, scale }}
      className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 text-surface/10"
    >
      <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx="200" cy="200" r="140" stroke="currentColor" strokeWidth="1" fill="none" className="text-gold/20" />
    </motion.svg>
  );
}

function ProgressRail({
  count,
  progress,
}: {
  count: number;
  progress: MotionValue<number>;
}) {
  return (
    <div className="absolute start-8 top-1/2 flex -translate-y-1/2 flex-col gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <RailTick key={i} index={i} count={count} progress={progress} />
      ))}
    </div>
  );
}

function RailTick({
  index,
  count,
  progress,
}: {
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const segment = 1 / count;
  const start = index * segment;
  const end = start + segment;
  const opacity = useTransform(progress, [start, start + segment * 0.3], [0.25, 1]);
  const scaleY = useTransform(progress, [start, end], [1, 1.6]);

  return (
    <motion.span
      aria-hidden="true"
      style={{ opacity, scaleY }}
      className="h-4 w-px bg-surface"
    />
  );
}

function MobileCinematic({ stages, arabic }: { stages: string[]; arabic: boolean }) {
  return (
    <div className="flex flex-col lg:hidden">
      {stages.map((stage, i) => (
        <MobileStage key={stage} label={stage} index={i} arabic={arabic} />
      ))}
    </div>
  );
}

function MobileStage({ label, index, arabic }: { label: string; index: number; arabic: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const isLast = index === 5;
  const isFirst = index === 0;

  const content = (
    <div className="relative flex min-h-[40vh] flex-col items-center justify-center gap-4 overflow-hidden border-t border-surface/10 px-6 py-10 text-center first:border-t-0">
      {isFirst && (
        <>
          {shouldReduceMotion ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={MOBILE_POSTER}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <video
              src={MOBILE_VIDEO}
              poster={MOBILE_POSTER}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-ink/55" />
        </>
      )}
      <span className="relative font-heading text-sm text-gold">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span
        className={`relative text-3xl text-surface sm:text-4xl ${
          arabic ? "font-heading-ar leading-snug" : "font-heading leading-tight"
        } ${isLast ? "text-gold" : ""}`}
      >
        {label}
      </span>
    </div>
  );

  if (shouldReduceMotion) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {content}
    </motion.div>
  );
}
