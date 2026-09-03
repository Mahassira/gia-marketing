import { defineRouting } from "next-intl/routing";

/**
 * Central locale configuration.
 * Every route in the app is generated for each of these locales.
 * Adding a locale later means adding it here + a matching
 * messages/{locale}.json + content/{locale}/ folder — no routing
 * code changes required.
 */
export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  // Always show the prefix (/en/..., /ar/...) — never hide the
  // default locale. This keeps every URL, and therefore every
  // hreflang alternate, unambiguous.
  localePrefix: "always",
  localeCookie: {
    name: "NEXT_LOCALE",
    maxAge: 60 * 60 * 24 * 365, // 1 year — persists explicit language choice
  },
});

export type AppLocale = (typeof routing.locales)[number];

export const localeMeta: Record<AppLocale, { label: string; dir: "ltr" | "rtl"; ogLocale: string }> = {
  en: { label: "English", dir: "ltr", ogLocale: "en_EG" },
  ar: { label: "العربية", dir: "rtl", ogLocale: "ar_EG" },
};
