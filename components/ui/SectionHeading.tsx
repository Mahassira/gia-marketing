import type { ReactNode } from "react";

export function SectionHeading({
  id,
  eyebrow,
  children,
  tone = "light",
  align = "start",
  arabic = false,
}: {
  id: string;
  eyebrow?: string;
  children: ReactNode;
  tone?: "light" | "dark";
  align?: "start" | "center";
  arabic?: boolean;
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-start"}>
      {eyebrow && (
        <span
          className={`mb-3 block text-xs font-medium uppercase tracking-wider sm:text-sm ${
            tone === "dark" ? "text-surface/60" : "text-muted"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        id={id}
        className={`text-2xl leading-tight sm:text-3xl md:text-4xl lg:text-5xl ${
          arabic ? "font-heading-ar leading-snug" : "font-heading"
        } ${tone === "dark" ? "text-surface" : "text-ink"}`}
      >
        {children}
      </h2>
    </div>
  );
}
