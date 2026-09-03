import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServicesPillars } from "./ServicesPillars";
import { Reveal } from "@/components/motion/Reveal";
import type { Service, ServicePillar } from "@/lib/content/types";

interface ServicesSectionProps {
  headline: string;
  intro: string;
  pillars: ServicePillar[];
  servicesByPillar: Record<string, Service[]>;
  coreLabel: string;
  arabic: boolean;
}

export function ServicesSection({
  headline,
  intro,
  pillars,
  servicesByPillar,
  coreLabel,
  arabic,
}: ServicesSectionProps) {
  return (
    <Section tone="alt">
      <Reveal className="max-w-2xl">
        <SectionHeading id="services-heading" arabic={arabic}>
          {headline}
        </SectionHeading>
        <p className="mt-4 text-base text-muted sm:text-lg">{intro}</p>
      </Reveal>
      <div className="mt-10 sm:mt-12">
        <ServicesPillars
          pillars={pillars}
          servicesByPillar={servicesByPillar}
          coreLabel={coreLabel}
          arabic={arabic}
        />
      </div>
    </Section>
  );
}
