"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, localeMeta, type AppLocale } from "@/i18n/routing";

/**
 * Renders "EN | العربية".
 * The locale switcher preserves the current page/path when switching
 * between English and Arabic.
 */
export function LanguageSwitcher() {
  const activeLocale = useLocale() as AppLocale;
  const pathname = usePathname();

  return (
    <div
      className="flex items-center gap-2 text-sm font-medium"
      aria-label={localeMeta[activeLocale].label}
    >
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
              href={pathname}
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
