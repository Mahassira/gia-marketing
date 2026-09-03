import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { Reveal } from "@/components/motion/Reveal";
import type { InsightArticle } from "@/lib/content/types";

interface InsightsSectionProps {
  headline: string;
  articles: InsightArticle[];
  comingSoonTitle: string;
  comingSoonBody: string;
  arabic: boolean;
}

export function InsightsSection({
  headline,
  articles,
  comingSoonTitle,
  comingSoonBody,
  arabic,
}: InsightsSectionProps) {
  return (
    <Section tone="alt">
      <Reveal>
        <SectionHeading id="insights-heading" arabic={arabic}>
          {headline}
        </SectionHeading>
      </Reveal>
      <div className="mt-10 sm:mt-12">
        {articles.length === 0 ? (
          <ComingSoon title={comingSoonTitle} body={comingSoonBody} />
        ) : (
          // Real articles exist — render them (wiring added when the
          // first real article is published; articles is currently
          // always empty).
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <li key={a.slug} className="border-t border-border pt-4">
                <h3 className="text-lg text-ink">{a.title}</h3>
                <p className="mt-2 text-sm text-muted">{a.excerpt}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
