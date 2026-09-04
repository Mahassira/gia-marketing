import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

interface FinalCtaSectionProps {
  headline: string;
  body: string;
  primaryCta: string;
  secondaryCta: string;
  arabic: boolean;
}

export function FinalCtaSection({
  headline,
  body,
  primaryCta,
  secondaryCta,
  arabic,
}: FinalCtaSectionProps) {
  return (
    <Section tone="light">
      <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center sm:gap-6">
        <div aria-hidden="true" className="flex flex-col items-center gap-2">
          <span className="h-10 w-px bg-ink/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        </div>
        <SectionHeading id="final-cta-heading" align="center" arabic={arabic}>
          {headline}
        </SectionHeading>
        <p className="text-base text-muted sm:text-lg">{body}</p>
        <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <Button href="/contact" variant="primary" className="w-full sm:w-auto">
            {primaryCta}
          </Button>
          {/*
            "WhatsApp Us" needs a real business WhatsApp number
            (wa.me/<number>) to link correctly. No number has been
            provided anywhere in the spec, so this points to /contact
            for now rather than inventing a phone number. Swap the
            href for `https://wa.me/<real number>` once provided.
          */}
          <Button href="/contact" variant="secondary" className="w-full sm:w-auto">
            {secondaryCta}
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
