"use client";

import { StaggerFlowContainer, StaggerFlowItem } from "@/components/motion/StaggerFlow";
import { ScrollStageTracker } from "@/components/motion/ScrollStageTracker";
import { FlowNode, FlowChevron } from "./FlowNode";

/**
 * The Reach → Capture → Qualify → Manage → Follow Up → Convert → Grow
 * journey. Phase 5: rebuilt to use the same numbered FlowNode/FlowChevron
 * language as the Hero's StrategyFlowDiagram (tone="dark" here), so the
 * two most important diagrams on the page read as one continuous system
 * rather than two different visual treatments. Same staggered reveal on
 * scroll, same reduced-motion handling (see components/motion/StaggerFlow.tsx).
 *
 * Mobile: numbered nodes stack vertically with a connecting line on the
 * start edge — RTL-safe via logical properties (border-s/ps- rather than
 * border-l/pl-), and via -start-[] for the precisely-centered dot.
 *
 * Accessibility: this journey is meaningful information, not decoration,
 * so the visual (aria-hidden) is paired with a real sr-only <ol> carrying
 * the same localized `steps` prop — never hardcoded text, since steps
 * always comes from the content layer.
 */
export function GrowthJourney({
  steps,
  arabic = false,
}: {
  steps: string[];
  arabic?: boolean;
}) {
  return (
    <>
      <ol className="sr-only">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <div aria-hidden="true" className="w-full">
        {/* Mobile / tablet: vertical stacked flow, numbered nodes on a
            connecting line at the start edge. */}
        <StaggerFlowContainer className="flex flex-col gap-6 border-s border-surface/20 ps-6 lg:hidden">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;
            const number = String(i + 1).padStart(2, "0");
            return (
              <StaggerFlowItem key={step} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute top-0.5 -start-[36px] flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-medium ${
                    isLast ? "bg-gold text-ink" : "border border-surface/40 text-surface"
                  }`}
                >
                  {number}
                </span>
                <span className="text-sm font-medium text-surface sm:text-base">{step}</span>
              </StaggerFlowItem>
            );
          })}
        </StaggerFlowContainer>

        {/* Desktop: horizontal connected path, same node language as the
            Hero diagram. The active stage (as the section scrolls past
            the viewport center) is emphasized; others dim slightly —
            reinforcing that this is a live system, not a static chart.
            Under reduced motion, activeIndex is always null, so every
            stage stays fully emphasized (a static, equal-weight state). */}
        <ScrollStageTracker count={steps.length}>
          {(activeIndex) => (
            <StaggerFlowContainer className="hidden items-start lg:flex">
              {steps.map((step, i) => (
                <div key={step} className="flex flex-1 items-start last:flex-none">
                  <StaggerFlowItem>
                    <FlowNode
                      index={i}
                      label={step}
                      isLast={i === steps.length - 1}
                      tone="dark"
                      emphasized={activeIndex === null || activeIndex === i}
                    />
                  </StaggerFlowItem>
                  {i < steps.length - 1 && (
                    <div className="flex flex-1 items-center gap-1.5 pt-4">
                      <StaggerFlowItem
                        as="connector"
                        rtl={arabic}
                        className="h-px flex-1 bg-surface/20"
                      />
                      <StaggerFlowItem>
                        <FlowChevron tone="dark" />
                      </StaggerFlowItem>
                    </div>
                  )}
                </div>
              ))}
            </StaggerFlowContainer>
          )}
        </ScrollStageTracker>
      </div>
    </>
  );
}
