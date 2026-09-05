"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const MARK_SRC = "/brand/watermark/gia-mark.svg";

/**
 * Subtle, decorative GIA mark watermark for major homepage sections.
 * Purely presentational — absolutely positioned, pointer-events-none,
 * behind the section's actual content. Never announced to screen
 * readers (alt="" per the spec's own accessibility guidance).
 *
 * Motion: very restrained — a slow opacity ramp up/down and a small
 * (~15px) vertical drift as the section scrolls through view, not a
 * one-time reveal (the brief specifically wants a subtle fade-out when
 * leaving the section too). Reduced motion shows it at a fixed
 * opacity with zero movement.
 *
 * Color: the source mark is gold (#EDBC23) — used as-is on light
 * sections. For `tone="dark"` sections, a CSS filter renders it as a
 * white silhouette instead of a separate asset file — the shape is
 * identical, this is a standard non-destructive recolor for a
 * decorative/low-opacity use case, not a modification of the source
 * asset itself (which stays untouched on disk).
 */
export function SectionWatermark({
  tone = "light",
  size = "default",
  opacity,
}: {
  tone?: "light" | "dark";
  /** "default" = the brief's standard 500–750px desktop range; "compact"
   * = narrower sections (e.g. Final CTA) that shouldn't take the full range. */
  size?: "default" | "compact";
  /** Override the default opacity (0.04) — e.g. dial down slightly for
   * sections with more existing gold accents nearby. */
  opacity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const targetOpacity = opacity ?? 0.04;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const animatedOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, targetOpacity, targetOpacity, 0],
  );
  const y = useTransform(scrollYProgress, [0, 1], [15, -15]);

  const widthClass =
    size === "compact"
      ? "w-[260px] max-w-[85vw] sm:w-[320px] lg:w-[420px] lg:max-w-[45vw]"
      : "w-[260px] max-w-[85vw] sm:w-[380px] lg:w-[600px] lg:max-w-[60vw]";

  const filterClass = tone === "dark" ? "brightness-0 invert" : "";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
    >
      {shouldReduceMotion ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={MARK_SRC}
          alt=""
          className={`${widthClass} ${filterClass} select-none`}
          style={{ opacity: targetOpacity }}
        />
      ) : (
        <motion.img
          src={MARK_SRC}
          alt=""
          style={{ opacity: animatedOpacity, y }}
          className={`${widthClass} ${filterClass} select-none`}
        />
      )}
    </div>
  );
}
