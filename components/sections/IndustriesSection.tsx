import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IndustriesGrid } from "./IndustriesGrid";
import { Reveal } from "@/components/motion/Reveal";
import { SectionWatermark } from "@/components/motion/SectionWatermark";
import type { Industry } from "@/lib/content/types";

interface IndustriesSectionProps {
  headline: string;
  intro: string;
  items: Industry[];
  openEnded: boolean;
  andMoreLabel: string;
  arabic: boolean;
}

export function IndustriesSection({
  headline,
  intro,
  items,
  openEnded,
  andMoreLabel,
  arabic,
}: IndustriesSectionProps) {
  return (
    <Section tone="alt" className="relative">
      <SectionWatermark />
      <div className="relative z-10">
        <Reveal className="max-w-2xl">
          <SectionHeading id="industries-heading" arabic={arabic}>
            {headline}
          </SectionHeading>
          <p className="mt-4 text-base text-muted sm:text-lg">{intro}</p>
        </Reveal>
        <div className="mt-10 sm:mt-12">
          <IndustriesGrid
            items={items}
            openEnded={openEnded}
            andMoreLabel={andMoreLabel}
            arabic={arabic}
          />
        </div>
      </div>
    </Section>
  );
}
