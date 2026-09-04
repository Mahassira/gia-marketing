import { Link } from "@/i18n/navigation";
import type { Service, ServicePillar } from "@/lib/content/types";

const CORE_SERVICE_SLUGS = new Set([
  "lead-generation",
  "crm-marketing-automation",
  "conversion-optimization",
]);

export function ServicesPillars({
  pillars,
  servicesByPillar,
  coreLabel,
  arabic = false,
  linkToService = false,
}: {
  pillars: ServicePillar[];
  servicesByPillar: Record<string, Service[]>;
  coreLabel: string;
  arabic?: boolean;
  /** When true, each service title links to /services/{slug}. Only the
   * Services overview page sets this — the homepage listing stays
   * exactly as it was (plain text, no links), unchanged from Phase 3. */
  linkToService?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      {pillars.map((pillar) => (
        <div key={pillar.key} className="group border-t border-border pt-5">
          <h3
            className={`relative inline-block text-lg text-ink transition-colors ${
              arabic ? "font-heading-ar" : "font-heading"
            }`}
          >
            {pillar.title}
            <span
              aria-hidden="true"
              className="absolute -bottom-1 start-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full"
            />
          </h3>
          <p className="mt-2 text-sm text-muted">{pillar.description}</p>
          <ul className="mt-5 flex flex-col gap-3">
            {(servicesByPillar[pillar.key] ?? []).map((service) => (
              <li key={service.slug} className="flex items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                />
                <span className="text-sm text-ink">
                  {linkToService ? (
                    <Link href={`/services/${service.slug}`} className="hover:underline">
                      {service.title}
                    </Link>
                  ) : (
                    service.title
                  )}
                  {CORE_SERVICE_SLUGS.has(service.slug) && (
                    <span className="ms-2 inline-flex min-h-0 items-center rounded-sm border border-gold px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink">
                      {coreLabel}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
