"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Shared "which stage is active as the user scrolls past this section"
 * primitive — powers the Approach steps and Growth System stages
 * (Section 6/priority items 3 and 5). Built once, reused twice, rather
 * than as two bespoke implementations.
 *
 * Does NOT pin/stick anything and does NOT hijack scroll — it only
 * *reads* scroll position via Framer Motion's useScroll (which itself
 * uses a single shared listener + rAF internally, not a naive
 * per-component scroll listener) and derives which of `count` stages
 * is "active" as the tracked element crosses the viewport center.
 *
 * Reduced motion: returns `null` for activeIndex, and the render-prop
 * consumer is expected to treat `null` as "show every stage at full,
 * equal emphasis" — a static resting state, not an arbitrarily-picked
 * "final" stage.
 */
export function ScrollStageTracker({
  count,
  children,
}: {
  count: number;
  children: (activeIndex: number | null) => ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(count - 1, Math.max(0, Math.floor(latest * count)));
    setActiveIndex(idx);
  });

  return <div ref={ref}>{children(shouldReduceMotion ? null : activeIndex)}</div>;
}
