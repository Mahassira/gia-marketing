import type { Industry } from "@/lib/content/types";

/**
 * Phase 7 editorial treatment: a large, faint background letter (the
 * industry name's first character) behind each entry — a consistent
 * typographic art direction across every card, CSS-only, no stock
 * photography and no generic icon set. Deliberately restrained (very
 * low opacity, ink-toned) so it reads as a design motif, not a logo or
 * illustration standing in for real photography later.
 */
export function IndustriesGrid({
  items,
  openEnded,
  andMoreLabel,
  arabic = false,
}: {
  items: Industry[];
  openEnded: boolean;
  andMoreLabel: string;
  arabic?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((industry) => (
        <div
          key={industry.slug}
          className="relative overflow-hidden border-t border-border pt-4"
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute -top-3 text-7xl text-ink/[0.04] sm:text-8xl ${
              arabic ? "font-heading-ar" : "font-heading"
            } end-0`}
          >
            {industry.title.charAt(0)}
          </span>
          <h3
            className={`relative text-base text-ink ${
              arabic ? "font-heading-ar" : "font-heading"
            }`}
          >
            {industry.title}
          </h3>
          <p className="relative mt-1.5 text-sm text-muted">{industry.blurb}</p>
        </div>
      ))}

      {openEnded && (
        <div className="flex items-center border-t border-dashed border-border pt-4">
          <span className="text-base font-medium text-muted">
            + {andMoreLabel}
          </span>
        </div>
      )}
    </div>
  );
}
