import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PrinciplesGrid } from "./PrinciplesGrid";
import { Reveal } from "@/components/motion/Reveal";
import { SectionWatermark } from "@/components/motion/SectionWatermark";

interface Principle {
  title: string;
  description: string;
}

interface WhyGiaSectionProps {
  headline: string;
  principles: Principle[];
  arabic: boolean;
}

export function WhyGiaSection({ headline, principles, arabic }: WhyGiaSectionProps) {
  return (
    <Section tone="light" className="relative">
      <SectionWatermark />
      <div className="relative z-10">
        <Reveal className="max-w-2xl">
          <SectionHeading id="why-gia-heading" arabic={arabic}>
            {headline}
          </SectionHeading>
        </Reveal>
        <div className="mt-10 sm:mt-12">
          <PrinciplesGrid principles={principles} arabic={arabic} />
        </div>
      </div>
    </Section>
  );
}
