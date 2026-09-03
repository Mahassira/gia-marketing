"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Restrained fade-up-on-scroll wrapper, used for section-level "scroll
 * story" continuity across the homepage. A single, small client
 * component — the sections themselves (data fetching, layout) remain
 * Server Components; only this thin visual wrapper needs the client.
 *
 * Explicitly respects prefers-reduced-motion: framer-motion animations
 * run via JS transforms, not CSS transition/animation properties, so
 * the global CSS reduced-motion rule (globals.css) does not catch them
 * on its own — this component checks useReducedMotion() itself and
 * renders a plain, unanimated div in that case.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
