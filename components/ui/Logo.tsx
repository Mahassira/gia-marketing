import fs from "node:fs";
import path from "node:path";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

// logo-web.svg is a tightly-cropped derivative of the real logo.svg —
// same paths, same raster, only the viewBox/width/height were changed to
// remove the large unused transparent canvas margin. logo.svg (the
// original, full-canvas file exactly as provided by the client) is kept
// untouched as the source asset.
const LOGO_PATH = "/brand/logo/logo-web.svg";

function realLogoExists(): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", "brand", "logo", "logo-web.svg"));
  } catch {
    return false;
  }
}

/**
 * Renders the real GIA logo. Falls back to a plain text wordmark only if
 * the file is ever removed — a functional placeholder for navigation,
 * not a designed or invented logo.
 *
 * Sizing is responsive across breakpoints (mobile-first): a compact
 * height on small screens that grows slightly at larger ones, matching
 * the header's own responsive height. Because the artwork is now
 * tightly cropped (no wasted canvas), these are true rendered-mark
 * sizes, not sizes diluted by margin.
 *
 * Accessibility: this component is shared between the English and
 * Arabic sites, so its accessible name is never hardcoded — it comes
 * from messages.logo.homeLabel via next-intl, resolved server-side for
 * whichever locale is currently rendering. The image itself gets
 * alt="" since the parent <Link>'s aria-label already provides the
 * link's accessible name; giving the <img> its own alt text as well
 * would just double-announce the same thing to screen readers.
 */
export async function Logo({ className = "" }: { className?: string }) {
  const t = await getTranslations("logo");
  const hasRealLogo = realLogoExists();
  const homeLabel = t("homeLabel");

  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center gap-2 ${className}`}
      aria-label={homeLabel}
    >
      {hasRealLogo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={LOGO_PATH} alt="" className="h-7 w-auto sm:h-8 lg:h-9" />
      ) : (
        <span className="font-heading text-lg font-semibold tracking-tight text-ink sm:text-xl">
          GIA
        </span>
      )}
    </Link>
  );
}
