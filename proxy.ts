import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Next.js 16 request boundary (replaces the deprecated middleware.ts
 * convention — same next-intl API, this file is just named and
 * loaded differently). Runs on the Node.js runtime.
 *
 * Locale resolution priority, per the approved architecture:
 *   1. Persisted user choice — the `NEXT_LOCALE` cookie (see
 *      localeCookie in i18n/routing.ts), set when someone explicitly
 *      picks a language via the LanguageSwitcher.
 *   2. Browser preference — the `Accept-Language` header.
 *   3. Fallback — `en` (routing.defaultLocale).
 *
 * next-intl's createMiddleware handles this priority chain, plus
 * the alternate-link data hreflang generation relies on.
 */
export default createMiddleware(routing);

export const config = {
  // Run on every path except API routes, framework internals,
  // brand assets, and any path containing a file extension.
  matcher: ["/((?!api|_next|_vercel|brand|.*\\..*).*)"],
};
