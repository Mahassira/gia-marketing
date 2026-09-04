import { StaggerFlowContainer, StaggerFlowItem } from "@/components/motion/StaggerFlow";
import { FlowNode, FlowChevron } from "./FlowNode";

/**
 * Google/Meta → Audience → Campaign → Landing Page → Lead → CRM →
 * Follow-up → Conversion → Growth. Built the SAME way as
 * StrategyFlowDiagram/GrowthJourney (reusing FlowNode/FlowChevron) —
 * per the visual-differentiation instruction, this section's PURPOSE
 * differs (a practical acquisition journey, not an artistic moment or
 * a business operating system), and to make that legible at a glance
 * it uses the LIGHT bordered-panel treatment (like the Hero's diagram)
 * rather than Growth System's dark full-bleed — so scrolling past
 * Acquisition → Growth reads as two distinct moods, not a repeat of
 * the same dark panel twice in a row.
 *
 * 9 stages is too many for the 2-column mobile grid used by the
 * 6-stage StrategyFlowDiagram (would look cramped) and too many for a
 * single horizontal row below desktop — so this gets its own
 * responsive treatment: vertical stack on mobile, 3x3 grid on tablet,
 * full horizontal row only at xl (1280px+) where 9 nodes have room to
 * breathe.
 */
export function AcquisitionSystemDiagram({
  stages,
  arabic = false,
}: {
  stages: string[];
  arabic?: boolean;
}) {
  return (
    <>
      <ol className="sr-only">
        {stages.map((stage) => (
          <li key={stage}>{stage}</li>
        ))}
      </ol>

      <div
        aria-hidden="true"
        className="rounded-sm border border-border bg-surface p-5 sm:p-6 lg:p-8"
      >
        {/* Mobile: vertical stacked flow. */}
        <StaggerFlowContainer className="flex flex-col gap-6 border-s border-border ps-6 md:hidden">
          {stages.map((stage, i) => {
            const isLast = i === stages.length - 1;
            const number = String(i + 1).padStart(2, "0");
            return (
              <StaggerFlowItem key={stage} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute top-0.5 -start-[36px] flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-medium ${
                    isLast ? "bg-gold text-ink" : "border border-ink/70 text-ink"
                  }`}
                >
                  {number}
                </span>
                <span className="text-sm font-medium text-ink sm:text-base">{stage}</span>
              </StaggerFlowItem>
            );
          })}
        </StaggerFlowContainer>

        {/* Tablet: 3x3 grid, no connectors. */}
        <StaggerFlowContainer className="hidden grid-cols-3 gap-x-4 gap-y-8 md:grid xl:hidden">
          {stages.map((stage, i) => (
            <StaggerFlowItem key={stage}>
              <FlowNode index={i} label={stage} isLast={i === stages.length - 1} tone="light" />
            </StaggerFlowItem>
          ))}
        </StaggerFlowContainer>

        {/* Large desktop: full horizontal connected path. */}
        <StaggerFlowContainer className="hidden items-start xl:flex">
          {stages.map((stage, i) => (
            <div key={stage} className="flex flex-1 items-start last:flex-none">
              <StaggerFlowItem>
                <FlowNode index={i} label={stage} isLast={i === stages.length - 1} tone="light" />
              </StaggerFlowItem>
              {i < stages.length - 1 && (
                <div className="flex flex-1 items-center gap-1 pt-4">
                  <StaggerFlowItem
                    as="connector"
                    rtl={arabic}
                    className="h-px flex-1 bg-ink/15"
                  />
                  <StaggerFlowItem>
                    <FlowChevron tone="light" />
                  </StaggerFlowItem>
                </div>
              )}
            </div>
          ))}
        </StaggerFlowContainer>
      </div>
    </>
  );
}
