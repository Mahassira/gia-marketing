"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const connector = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.35, ease: "easeOut" as const } },
};

/**
 * Staggered progressive reveal for the Hero and Growth System flow
 * diagrams — each node (and the connector before it) appears in
 * sequence rather than all at once, so the diagram reads as a
 * "strategic operating flow" building itself rather than a static
 * illustration. Purely a presentation wrapper: the diagrams' own
 * structure, labels, and sr-only accessible list (see
 * StrategyFlowDiagram/GrowthJourney) are completely unchanged —
 * this only adds motion around what was already there.
 *
 * `once: true` in the parent's viewport means this plays a single
 * time per page view, not a repeating/looping effect.
 */
export function StaggerFlowContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerFlowItem({
  children,
  className = "",
  as = "node",
  rtl = false,
}: {
  children?: ReactNode;
  className?: string;
  /** "node" fades/slides up; "connector" scales in from the edge nearest
   * the previous node, so the line appears to "draw" in the reading
   * direction rather than always growing left-to-right. */
  as?: "node" | "connector";
  /**
   * transform-origin has no logical ("start"/"end") CSS values — only
   * physical percentages — so the origin has to be flipped explicitly
   * for RTL. The grid itself already mirrors correctly via logical
   * properties (see StrategyFlowDiagram/GrowthJourney); this is the one
   * place direction has to be handled in JS rather than CSS.
   */
  rtl?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={as === "connector" ? connector : item}
      style={
        as === "connector"
          ? { transformOrigin: rtl ? "100% 50%" : "0% 50%" }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}
