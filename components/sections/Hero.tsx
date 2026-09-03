import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { StrategyFlowDiagram } from "./StrategyFlowDiagram";

interface HeroProps {
  label: string;
  headline: string;
  supportingText: string;
  primaryCta: string;
  secondaryCta: string;
  flowLabels: string[];
  arabic: boolean;
}

export function Hero({
  label,
  headline,
  supportingText,
  primaryCta,
  secondaryCta,
  flowLabels,
  arabic,
}: HeroProps) {
  return (
    <Section tone="light" className="pb-10 pt-10 sm:pb-14 sm:pt-14 lg:pb-20 lg:pt-16">
      <div className="flex flex-col gap-10 lg:gap-16">
        <Reveal className="flex max-w-3xl flex-col items-start gap-5 sm:gap-6">
          <span className="text-xs font-medium tracking-wide text-muted sm:text-sm">
            {label}
          </span>
          <h1
            className={`text-balance text-3xl text-ink sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl ${
              arabic ? "font-heading-ar leading-snug" : "font-heading leading-tight"
            }`}
          >
            {headline}
          </h1>
          <p className="max-w-xl text-base text-muted sm:text-lg">{supportingText}</p>

          <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Button href="/contact" variant="primary" className="w-full sm:w-auto">
              {primaryCta}
            </Button>
            <Button href="/services" variant="secondary" className="w-full sm:w-auto">
              {secondaryCta}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-2 lg:mt-4">
          <StrategyFlowDiagram labels={flowLabels} arabic={arabic} />
        </Reveal>
      </div>
    </Section>
  );
}
