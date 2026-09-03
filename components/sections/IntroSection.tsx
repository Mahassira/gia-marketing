import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

interface IntroSectionProps {
  headline: string;
  body: string[];
  highlight: string;
  arabic: boolean;
}

export function IntroSection({ headline, body, highlight, arabic }: IntroSectionProps) {
  return (
    <Section tone="alt">
      <Reveal className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading id="intro-heading" arabic={arabic}>
            {headline}
          </SectionHeading>
        </div>
        <div className="flex flex-col gap-4 lg:col-span-7">
          {body.map((paragraph) => (
            <p key={paragraph} className="max-w-2xl text-base text-muted sm:text-lg">
              {paragraph}
            </p>
          ))}
          <p
            className={`mt-2 text-lg text-ink sm:text-xl ${
              arabic ? "font-heading-ar" : "font-heading"
            }`}
          >
            {highlight}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
