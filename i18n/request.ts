import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    // UI strings only. Page/business content is loaded separately
    // through lib/content.ts, deliberately kept out of this file.
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
