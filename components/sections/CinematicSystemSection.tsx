"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ScrollDrivenVideo } from "@/components/motion/ScrollDrivenVideo";

const DESKTOP_VIDEO = "/media/gia-cinematic-desktop.mp4";
const DESKTOP_POSTER = "/media/gia-cinematic-desktop-poster.jpg";
const MOBILE_VIDEO = "/media/gia-cinematic-mobile.mp4";
const MOBILE_POSTER = "/media/gia-cinematic-mobile-poster.jpg";

/**
 * GIA's cinematic brand moment.
 *
 * The important design decision here is spatial: the six stages are one
 * timeline, not six dark screens. The page stays light outside a single
 * contained cinematic panel, while the panel remains sticky long enough
 * for scroll to drive the supplied video through its 6-stage story.
 */
export function CinematicSystemSection({
  stages,
  arabic,
}: {
  stages: string[];
  arabic: boolean;
}) {
  return (
    <section className="bg-surface py-10 sm:py-14 lg:py-20" aria-labelledby="gia-cinematic-heading">
      <h2 id="gia-cinematic-heading" className="sr-only">
        {arabic ? "منهج جيا للنمو" : "The GIA growth journey"}
      </h2>
      <ol className="sr-only">
        {stages.map((stage) => (
          <li key={stage}>{stage}</li>
        ))}
      </ol>
      <DesktopCinematic stages={stages} arabic={arabic} />
      <MobileCinematic stages={stages} arabic={arabic} />
    </section>
  );
}

function DesktopCinematic({
  stages,
  arabic,
}: {
  stages: string[];
  arabic: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={sectionRef} className="relative mx-auto hidden max-w-7xl lg:block lg:h-[132vh] px-6 xl:px-8">
      <div className="sticky top-20 flex h-[min(78vh,820px)] min-h-[560px] overflow-hidden rounded-[8px] bg-ink shadow-[0_24px_80px_rgba(0,0,0,0.14)]">
        <div className="relative min-w-0 flex-1 overflow-hidden">
          <ScrollDrivenVideo
            src={DESKTOP_VIDEO}
            poster={DESKTOP_POSTER}
            progress={scrollYProgress}
            className="absolute inset-0"
            reduceMotion={reduceMotion}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/55 via-ink/10 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink/45 to-transparent" />

          <div className="pointer-events-none absolute inset-x-0 bottom-7 px-7 sm:px-10">
            <div className="flex items-end justify-between gap-6 text-surface">
              <div>
                <p className="mb-2 font-heading text-[10px] uppercase tracking-[0.28em] text-gold">
                  GIA / DIGITAL MARKETING ADVISORY
                </p>
                <p className={`text-sm text-surface/75 sm:text-base ${arabic ? "font-heading-ar" : "font-body"}`}>
                  {arabic ? "من الاستراتيجية إلى النمو — كنظام واحد." : "From strategy to growth — as one connected system."}
                </p>
              </div>
              <ProgressLine progress={scrollYProgress} rtl={arabic} />
            </div>
          </div>
        </div>

        <StageRail stages={stages} progress={scrollYProgress} arabic={arabic} />
      </div>
    </div>
  );
}

function StageRail({
  stages,
  progress,
  arabic,
}: {
  stages: string[];
  progress: MotionValue<number>;
  arabic: boolean;
}) {
  return (
    <aside
      dir={arabic ? "rtl" : "ltr"}
      className="relative flex w-[250px] shrink-0 flex-col justify-center border-s border-surface/10 bg-ink px-7 xl:w-[290px] xl:px-9"
      aria-label={arabic ? "مراحل رحلة النمو" : "Growth journey stages"}
    >
      <div className="mb-10">
        <p className="font-heading text-[10px] uppercase tracking-[0.28em] text-gold">
          {arabic ? "رحلة النمو" : "Growth journey"}
        </p>
        <p className={`mt-3 text-sm leading-6 text-surface/55 ${arabic ? "font-heading-ar" : "font-body"}`}>
          {arabic ? "كل مرحلة تبني ما بعدها." : "Each stage builds on the next."}
        </p>
      </div>

      <div className="relative">
        <div className="absolute start-[5px] top-2 bottom-2 w-px bg-surface/10" />
        <div className="space-y-5">
          {stages.map((stage, index) => (
            <StageRailItem
              key={stage}
              label={stage}
              index={index}
              count={stages.length}
              progress={progress}
              arabic={arabic}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

function StageRailItem({
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
  const end = index === count - 1 ? 1 : (index + 1) * segment;
  const center = start + segment / 2;
  const distance = segment * 0.42;

  const opacity = useTransform(
    progress,
    [Math.max(0, center - distance), center, Math.min(1, center + distance)],
    [0.38, 1, 0.38],
  );
  const scale = useTransform(
    progress,
    [Math.max(0, center - distance), center, Math.min(1, center + distance)],
    [1, 1.035, 1],
  );
  const dot = useTransform(
    progress,
    [start, center, end],
    [0.25, 1, 0.25],
  );

  return (
    <motion.div style={{ opacity, scale }} className="relative flex items-center gap-4 ps-0">
      <motion.span
        aria-hidden="true"
        style={{ opacity: dot }}
        className="relative z-10 h-2.5 w-2.5 shrink-0 rounded-full border border-gold bg-ink"
      />
      <div className="min-w-0">
        <span className="block font-heading text-[10px] tracking-[0.2em] text-gold">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`mt-1 block text-lg text-surface sm:text-xl ${
            arabic ? "font-heading-ar leading-snug" : "font-heading leading-tight"
          }`}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
}

function ProgressLine({ progress, rtl }: { progress: MotionValue<number>; rtl: boolean }) {
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  return (
    <div className="hidden w-28 shrink-0 sm:block" aria-hidden="true">
      <div className="h-px bg-surface/20">
        <motion.div style={{ scaleX, transformOrigin: rtl ? "right" : "left" }} className="h-px bg-gold" />
      </div>
    </div>
  );
}

function MobileCinematic({
  stages,
  arabic,
}: {
  stages: string[];
  arabic: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mx-auto block max-w-2xl px-5 lg:hidden">
      <div className="overflow-hidden rounded-[8px] bg-ink shadow-[0_18px_55px_rgba(0,0,0,0.12)]">
        <div className="relative aspect-[9/16] max-h-[76svh] min-h-[430px] overflow-hidden">
          {/* Poster is the guaranteed base layer; the video is progressive enhancement. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={MOBILE_POSTER}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          {!reduceMotion && (
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
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-ink/20" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <p className="font-heading text-[10px] uppercase tracking-[0.28em] text-gold">
              GIA / DIGITAL MARKETING ADVISORY
            </p>
            <p className={`mt-3 text-sm leading-6 text-surface/80 ${arabic ? "font-heading-ar" : "font-body"}`}>
              {arabic ? "من الاستراتيجية إلى النمو — كنظام واحد." : "From strategy to growth — as one connected system."}
            </p>
          </div>
        </div>

        <div className="px-6 py-7 sm:px-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="font-heading text-[10px] uppercase tracking-[0.28em] text-gold">
              {arabic ? "رحلة النمو" : "Growth journey"}
            </p>
            <span className="text-xs text-surface/40">01—06</span>
          </div>
          <ol dir={arabic ? "rtl" : "ltr"} className="space-y-0">
            {stages.map((stage, index) => (
              <li
                key={stage}
                className="flex items-center gap-4 border-t border-surface/10 py-4 first:border-t-0 first:pt-0 last:pb-0"
              >
                <span className="font-heading text-[10px] tracking-[0.2em] text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={`text-base text-surface ${arabic ? "font-heading-ar" : "font-heading"}`}>
                  {stage}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
