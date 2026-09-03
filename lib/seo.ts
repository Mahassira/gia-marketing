import type { Metadata } from "next";
import { routing, type AppLocale } from "@/i18n/routing";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gia.marketing";

const hreflangTag: Record<AppLocale, string> = {
  en: "en-EG",
  ar: "ar-EG",
};

/**
 * Builds canonical + hreflang alternates for a given locale/path.
 * `path` is the locale-agnostic path (e.g. "/services/marketing-strategy",
 * or "" for the homepage) — this function adds the locale prefix.
 *
 * Every page's generateMetadata() should call this so canonical and
 * hreflang can never drift out of sync between pages.
 */
export function buildAlternates(path: string, locale: AppLocale) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const cleanPath = normalizedPath === "/" ? "" : normalizedPath;

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[hreflangTag[loc]] = `${siteUrl}/${loc}${cleanPath}`;
  }
  // x-default points at the default-locale (English) version.
  languages["x-default"] = `${siteUrl}/${routing.defaultLocale}${cleanPath}`;

  return {
    canonical: `${siteUrl}/${locale}${cleanPath}`,
    languages,
  };
}

/**
 * Convenience wrapper for page-level generateMetadata calls.
 * Pages still provide their own title/description from the
 * content layer (content/{locale}/seo.json) — this only attaches
 * the canonical/hreflang/OG-locale scaffolding consistently.
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: AppLocale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const alternates = buildAlternates(path, locale);

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName: "GIA — Digital Marketing Advisory",
      locale: locale === "ar" ? "ar_EG" : "en_EG",
      alternateLocale: locale === "ar" ? "en_EG" : "ar_EG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/**
 * Sitewide WebSite structured data — separate from Organization per
 * schema.org convention (WebSite describes the site itself, Organization
 * describes the entity that owns it). Deliberately omits `potentialAction`
 * (site search) since no search feature exists — adding one would be
 * fabricating a capability the site doesn't have.
 */
export function websiteJsonLd(locale: AppLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GIA — Digital Marketing Advisory",
    url: `${siteUrl}/${locale}`,
    inLanguage: locale === "ar" ? "ar-EG" : "en-EG",
  };
}

/**
 * Sitewide Organization structured data — rendered once, in the root
 * layout. Contains only confirmed facts (name, URL, logo); no invented
 * founding dates, addresses, or social profiles.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GIA — Digital Marketing Advisory",
    url: siteUrl,
    logo: `${siteUrl}/brand/logo/logo-web.svg`,
  };
}

/**
 * BreadcrumbList structured data, built from the same items array the
 * visible <Breadcrumbs> component renders — the two can never drift
 * apart because pages pass one items array to both.
 */
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Article structured data for Insight pages. Only ever called with
 * real article data — the insights list is empty until real articles
 * exist, so this has nothing to render against until then.
 */
export function articleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author,
  image,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    ...(image ? { image: image.startsWith("http") ? image : `${siteUrl}${image}` } : {}),
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "GIA — Digital Marketing Advisory",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/brand/logo/logo-web.svg`,
      },
    },
  };
}
