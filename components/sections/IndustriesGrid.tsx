import type { Industry } from "@/lib/content/types";

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
        <div key={industry.slug} className="border-t border-border pt-4">
          <h3
            className={`text-base text-ink ${arabic ? "font-heading-ar" : "font-heading"}`}
          >
            {industry.title}
          </h3>
          <p className="mt-1.5 text-sm text-muted">{industry.blurb}</p>
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
