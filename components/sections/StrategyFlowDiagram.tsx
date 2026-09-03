import { StaggerFlowContainer, StaggerFlowItem } from "@/components/motion/StaggerFlow";
import { FlowNode, FlowChevron } from "./FlowNode";

/**
 * The GIA strategic system visual: numbered nodes connected by
 * directional chevrons, framed in a single thin-bordered panel — reads
 * as a framework diagram (the kind a strategy consultancy would use in
 * a deck), not a decorative illustration. The terminal "Growth" node is
 * the one place gold is used as a fill, marking it as the outcome the
 * whole system leads to.
 *
 * Phase 5: nodes and connectors now reveal in sequence (via
 * StaggerFlowContainer/Item) so the diagram reads as a system building
 * itself rather than a static illustration — restrained, plays once,
 * and fully skipped (renders static) under prefers-reduced-motion, see
 * components/motion/StaggerFlow.tsx. Uses the same FlowNode/FlowChevron
 * language as the Growth System diagram for visual continuity between
 * the two most important sections on the page.
 *
 * Accessibility: the flow this diagram shows is meaningful information,
 * not decoration, so the visual (aria-hidden) is paired with a real
 * sr-only <ol> carrying the same localized `labels` prop — never
 * hardcoded text, since labels always comes from the content layer.
 */
export function StrategyFlowDiagram({
  labels,
  arabic = false,
}: {
  labels: string[];
  arabic?: boolean;
}) {
  return (
    <>
      <ol className="sr-only">
        {labels.map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ol>

      <div
        aria-hidden="true"
        className="rounded-sm border border-border bg-surface p-5 sm:p-6 lg:p-8"
      >
        {/* Mobile / tablet: 2-column grid of nodes, no connectors — a row
            of chevrons between wrapped grid items would misalign, so this
            reads as a numbered set instead of a strict left-to-right path. */}
        <StaggerFlowContainer className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:hidden">
          {labels.map((label, i) => (
            <StaggerFlowItem key={label}>
              <FlowNode index={i} label={label} isLast={i === labels.length - 1} tone="light" />
            </StaggerFlowItem>
          ))}
        </StaggerFlowContainer>

        {/* Desktop: full horizontal connected path. */}
        <StaggerFlowContainer className="hidden items-start lg:flex">
          {labels.map((label, i) => (
            <div key={label} className="flex flex-1 items-start last:flex-none">
              <StaggerFlowItem>
                <FlowNode index={i} label={label} isLast={i === labels.length - 1} tone="light" />
              </StaggerFlowItem>
              {i < labels.length - 1 && (
                <div className="flex flex-1 items-center gap-1.5 pt-4">
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
