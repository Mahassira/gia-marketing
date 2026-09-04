import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { PlatformMark } from "@/components/ui/PlatformMark";
import { FlowChevron } from "./FlowNode";

interface Platform {
  slug: string;
  name: string;
  /** Optional sub-products line, e.g. Microsoft Power Platform's
   * "Power Apps · Power Automate · Power BI · Power Pages". */
  detail?: string;
}

interface Category {
  name: string;
  platforms: Platform[];
}

/**
 * "Integration Ecosystem" — deliberately the calmest of the homepage's
 * four system-style sections (Cinematic / Acquisition / Growth are the
 * other three). No scroll-linked motion, no numbered node-chain — just
 * a single entrance Reveal, a slim typographic flow caption, and three
 * plain editorial lists. This is intentional: the page already has
 * three high-motion system visuals, and a fourth in the same register
 * would be repetitive rather than reinforcing ("the page must
 * breathe"). This section's job is informational, not spectacular.
 *
 * No third-party logo is fabricated — see PlatformMark.tsx. Every
 * platform renders as its plain name today; the disclaimer is
 * rendered as real, visible text (not a footnote/tooltip) since it's
 * a substantive claim, not a formality.
 */
export function IntegrationEcosystemSection({
  headline,
  intro,
  flow,
  disclaimer,
  categories,
  arabic,
}: {
  headline: string;
  intro: string;
  flow: string[];
  disclaimer: string;
  categories: Category[];
  arabic: boolean;
}) {
  return (
    <Section tone="alt">
      <Reveal className="max-w-2xl">
        <SectionHeading id="integration-ecosystem-heading" arabic={arabic}>
          {headline}
        </SectionHeading>
        <p className="mt-4 text-base text-muted sm:text-lg">{intro}</p>
      </Reveal>

      <ol className="sr-only">
        {flow.map((word) => (
          <li key={word}>{word}</li>
        ))}
      </ol>
      <div
        aria-hidden="true"
        className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2 sm:mt-10"
      >
        {flow.map((word, i) => (
          <span key={word} className="flex items-center gap-2">
            {i > 0 && <FlowChevron tone="light" />}
            <span className="text-xs font-medium uppercase tracking-wide text-muted sm:text-sm">
              {word}
            </span>
          </span>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 sm:mt-12 sm:grid-cols-3 sm:gap-8">
        {categories.map((category) => (
          <div key={category.name} className="border-t border-border pt-5">
            <h3
              className={`text-base text-ink ${arabic ? "font-heading-ar" : "font-heading"}`}
            >
              {category.name}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {category.platforms.map((platform) => (
                <li key={platform.slug} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                  />
                  <div>
                    <PlatformMark slug={platform.slug} name={platform.name} />
                    {platform.detail && (
                      <p className="mt-0.5 text-xs text-muted">{platform.detail}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-2xl text-xs text-muted sm:mt-12">{disclaimer}</p>
    </Section>
  );
}
