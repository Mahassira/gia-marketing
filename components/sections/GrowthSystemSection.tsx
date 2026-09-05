import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SectionWatermark } from "@/components/motion/SectionWatermark";
import { GrowthJourney } from "./GrowthJourney";

interface GrowthSystemSectionProps {
  headline: string;
  body: string[];
  journey: string[];
  cta: string;
  arabic: boolean;
}

export function GrowthSystemSection({
  headline,
  body,
  journey,
  cta,
  arabic,
}: GrowthSystemSectionProps) {
  return (
    <Section tone="dark" className="relative">
      <SectionWatermark tone="dark" />
      <div className="relative z-10 max-w-2xl">
        <SectionHeading id="growth-system-heading" tone="dark" arabic={arabic}>
          {headline}
        </SectionHeading>
        <div className="mt-4 flex flex-col gap-3">
          {body.map((paragraph) => (
            <p key={paragraph} className="text-base text-surface/80 sm:text-lg">
              {paragraph}
            </p>
          ))}
        </div>
        <Button href="/contact" variant="primary" className="mt-6 sm:mt-8">
          {cta}
        </Button>
      </div>

      <div className="relative z-10 mt-12 border-t border-surface/15 pt-8 sm:mt-14 sm:pt-10 lg:mt-16">
        <GrowthJourney steps={journey} arabic={arabic} />
      </div>
    </Section>
  );
}
