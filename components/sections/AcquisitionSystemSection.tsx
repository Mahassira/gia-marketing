import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { AcquisitionSystemDiagram } from "./AcquisitionSystemDiagram";

/**
 * "One of the strongest conversion-oriented sections on the homepage"
 * per Phase 7 instructions — but explicitly kept compact (shorter
 * vertical padding than the standard Section rhythm, single-line
 * intro, no long body copy) so it doesn't add unnecessary homepage
 * length on top of the new Cinematic section.
 */
export function AcquisitionSystemSection({
  headline,
  intro,
  stages,
  cta,
  arabic,
}: {
  headline: string;
  intro: string;
  stages: string[];
  cta: string;
  arabic: boolean;
}) {
  return (
    <Section tone="light" className="py-10 sm:py-14 lg:py-16">
      <Reveal className="max-w-2xl">
        <SectionHeading id="acquisition-system-heading" arabic={arabic}>
          {headline}
        </SectionHeading>
        <p className="mt-4 text-base text-muted sm:text-lg">{intro}</p>
      </Reveal>

      <div className="mt-8 sm:mt-10">
        <AcquisitionSystemDiagram stages={stages} arabic={arabic} />
      </div>

      <div className="mt-8 flex justify-center sm:mt-10">
        <Button href="/contact" variant="primary">
          {cta}
        </Button>
      </div>
    </Section>
  );
}
