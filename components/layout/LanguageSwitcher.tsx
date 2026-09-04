"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, localeMeta, type AppLocale } from "@/i18n/routing";

/**
 * Renders "EN | العربية" (order flips visually per direction via the
 * flex row + dir inheritance). Uses next-intl's Link with an explicit
 * `locale` override so the same page/path is preserved across the
 * switch — e.g. /en/services/branding -> /ar/services/branding, not
 * back to the homepage. Params are passed through for pages with
 * dynamic segments (service/case-study/insight slugs).
 *
 * The `NEXT_LOCALE` cookie is set automatically by next-intl's request
 * handling in proxy.ts whenever a locale-prefixed route is visited, so
 * navigating via this switcher persists the choice for future visits
 * without any extra code here.
 */
export function LanguageSwitcher() {
  const activeLocale = useLocale() as AppLocale;
  const pathname = usePathname();
  const params = useParams();

  return (
    <div className="flex items-center gap-2 text-sm font-medium" aria-label={localeMeta[activeLocale].label}>
      {routing.locales.map((loc, index) => {
        const isActive = loc === activeLocale;
        return (
          <span key={loc} className="flex items-center gap-2">
            {index > 0 && (
              <span className="text-border" aria-hidden="true">
                |
              </span>
            )}
            <Link
              href={{ pathname, params }}
              locale={loc}
              aria-current={isActive ? "true" : undefined}
              className={`inline-flex min-h-11 items-center px-0.5 ${
                isActive
                  ? "text-ink"
                  : "text-muted transition-colors hover:text-ink"
              }`}
            >
              {loc === "en" ? "EN" : "العربية"}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
