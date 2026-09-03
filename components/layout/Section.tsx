import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionTone = "light" | "alt" | "dark";

const toneStyles: Record<SectionTone, string> = {
  light: "bg-surface text-ink",
  alt: "bg-surface-alt text-ink",
  dark: "bg-ink text-surface",
};

export function Section({
  children,
  tone = "light",
  className = "",
  id,
  "aria-labelledby": ariaLabelledBy,
}: {
  children: ReactNode;
  tone?: SectionTone;
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`py-12 sm:py-16 lg:py-24 ${toneStyles[tone]} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}
