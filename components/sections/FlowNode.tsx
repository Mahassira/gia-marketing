/**
 * Shared node + chevron building blocks for both the Hero's
 * StrategyFlowDiagram and the Growth System's GrowthJourney — using
 * the same numbered-circle + label language in both places is what
 * makes the homepage read as one connected system rather than two
 * unrelated diagrams (Phase 5: visual continuity between sections).
 */
export function FlowNode({
  index,
  label,
  isLast,
  tone,
}: {
  index: number;
  label: string;
  isLast: boolean;
  tone: "light" | "dark";
}) {
  const number = String(index + 1).padStart(2, "0");
  const circleClass =
    tone === "dark"
      ? isLast
        ? "bg-gold text-ink"
        : "border border-surface/40 text-surface"
      : isLast
        ? "bg-gold text-ink"
        : "border border-ink/70 text-ink";
  const labelClass = tone === "dark" ? "text-surface" : "text-ink";

  return (
    <div className="flex flex-col items-center gap-2.5 text-center">
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-medium sm:h-10 sm:w-10 lg:h-11 lg:w-11 ${circleClass}`}
      >
        {number}
      </span>
      <span className={`max-w-[6.5rem] text-xs font-medium leading-snug sm:text-sm ${labelClass}`}>
        {label}
      </span>
    </div>
  );
}

export function FlowChevron({ tone }: { tone: "light" | "dark" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={`h-3.5 w-3.5 shrink-0 rtl:rotate-180 ${
        tone === "dark" ? "text-surface/30" : "text-ink/30"
      }`}
      fill="none"
    >
      <path
        d="M5.5 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
