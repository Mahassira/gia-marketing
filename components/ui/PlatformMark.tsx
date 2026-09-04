import fs from "node:fs";
import path from "node:path";

/**
 * Renders a platform name within the Integration Ecosystem section.
 * No logo is fabricated or redrawn — this checks for a real, properly
 * licensed logo file at public/brand/integrations/{slug}.svg and falls
 * back to plain text if it doesn't exist (which is the case for every
 * platform today; none of these files have been created).
 *
 * This mirrors the exact pattern already established for the real GIA
 * logo (components/ui/Logo.tsx): never invent a third-party mark,
 * always be ready to display the real one once legitimately provided.
 * Third-party trademarks carry additional care beyond GIA's own brand —
 * see public/brand/integrations/README.md for the usage requirements
 * that apply once real assets are added.
 */
export function PlatformMark({ slug, name }: { slug: string; name: string }) {
  const hasLogo = (() => {
    try {
      return fs.existsSync(
        path.join(process.cwd(), "public", "brand", "integrations", `${slug}.svg`),
      );
    } catch {
      return false;
    }
  })();

  if (hasLogo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`/brand/integrations/${slug}.svg`}
        alt={name}
        className="h-5 w-auto max-w-[6rem] object-contain grayscale"
      />
    );
  }

  return <span className="text-sm text-ink">{name}</span>;
}
