interface Principle {
  title: string;
  description: string;
}

/**
 * Phase 5: numbered (01–04) rather than plain — a small change that
 * gives this section the same editorial/consulting-deck feel as the
 * numbered Approach steps and flow diagrams, per the explicit
 * instruction to avoid a generic icon-card treatment here.
 */
export function PrinciplesGrid({
  principles,
  arabic = false,
}: {
  principles: Principle[];
  arabic?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
      {principles.map((principle, i) => (
        <div key={principle.title} className="border-t border-gold pt-5">
          <span className="font-heading text-sm text-ink">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3
            className={`mt-2 text-lg text-ink ${arabic ? "font-heading-ar" : "font-heading"}`}
          >
            {principle.title}
          </h3>
          <p className="mt-2 text-sm text-muted sm:text-base">{principle.description}</p>
        </div>
      ))}
    </div>
  );
}
