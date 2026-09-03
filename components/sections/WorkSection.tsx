import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { Reveal } from "@/components/motion/Reveal";
import type { CaseStudy } from "@/lib/content/types";

interface WorkSectionProps {
  headline: string;
  caseStudies: CaseStudy[];
  comingSoonTitle: string;
  comingSoonBody: string;
  arabic: boolean;
}

export function WorkSection({
  headline,
  caseStudies,
  comingSoonTitle,
  comingSoonBody,
  arabic,
}: WorkSectionProps) {
  return (
    <Section tone="light">
      <Reveal>
        <SectionHeading id="work-heading" arabic={arabic}>
          {headline}
        </SectionHeading>
      </Reveal>
      <div className="mt-10 sm:mt-12">
        {caseStudies.length === 0 ? (
          <ComingSoon title={comingSoonTitle} body={comingSoonBody} />
        ) : (
          // Real case studies exist — render them (list wiring added when
          // the first real case study is published; intentionally left
          // minimal here since caseStudies is currently always empty).
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((cs) => (
              <li key={cs.slug} className="border-t border-border pt-4">
                <h3 className="text-lg text-ink">{cs.client}</h3>
                <p className="mt-2 text-sm text-muted">{cs.challenge}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
