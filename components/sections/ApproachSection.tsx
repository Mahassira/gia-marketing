import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ApproachSteps } from "./ApproachSteps";
import { Reveal } from "@/components/motion/Reveal";

interface Step {
  number: string;
  title: string;
  description: string;
}

interface ApproachSectionProps {
  headline: string;
  intro: string;
  steps: Step[];
  arabic: boolean;
}

export function ApproachSection({ headline, intro, steps, arabic }: ApproachSectionProps) {
  return (
    <Section tone="light">
      <Reveal className="max-w-2xl">
        <SectionHeading id="approach-heading" arabic={arabic}>
          {headline}
        </SectionHeading>
        <p className="mt-4 text-base text-muted sm:text-lg">{intro}</p>
      </Reveal>
      <div className="mt-10 sm:mt-12">
        <ApproachSteps steps={steps} arabic={arabic} />
      </div>
    </Section>
  );
}
