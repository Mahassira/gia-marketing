"use client";

import { ScrollStageTracker } from "@/components/motion/ScrollStageTracker";

interface Step {
  number: string;
  title: string;
  description: string;
}

/**
 * Per Phase 7 priority #5: "as the user scrolls, stages activate
 * progressively — active stage becomes visually prominent, inactive
 * stages remain restrained." The active step keeps its gold top-rule
 * at full strength and full opacity; others dim slightly and their
 * rule fades toward the neutral border color — drawing the eye to
 * "where we are" in the process without any layout shift (only
 * opacity/color transition, both GPU-cheap).
 *
 * Reduced motion: ScrollStageTracker returns activeIndex=null, and
 * every step renders fully emphasized — a static, equal-weight state,
 * not an arbitrarily-picked "current" step.
 *
 * This became a client component in Phase 7 (it was a Server Component
 * through Phase 6) specifically because this interaction requires it —
 * the surrounding ApproachSection remains a Server Component; only
 * this leaf needs the client boundary.
 */
export function ApproachSteps({
  steps,
  arabic = false,
}: {
  steps: Step[];
  arabic?: boolean;
}) {
  return (
    <ScrollStageTracker count={steps.length}>
      {(activeIndex) => (
        <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {steps.map((step, i) => {
            const isActive = activeIndex === null || activeIndex === i;
            return (
              <li
                key={step.number}
                className={`border-t pt-5 transition-all duration-300 ${
                  isActive ? "border-gold opacity-100" : "border-border opacity-50"
                }`}
              >
                <span className="font-heading text-sm text-ink">{step.number}</span>
                <h3
                  className={`mt-2 text-lg font-medium text-ink ${
                    arabic ? "font-heading-ar" : "font-heading"
                  }`}
                >
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{step.description}</p>
              </li>
            );
          })}
        </ol>
      )}
    </ScrollStageTracker>
  );
}
