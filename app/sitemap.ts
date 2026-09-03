import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/seo";
import { getServiceSlugs, getInsightSlugs } from "@/lib/content";

// Static routes that exist for every locale, independent of content data.
const STATIC_PATHS = [
  "",
  "/about",
  "/services",
  "/industries",
  "/work",
  "/insights",
  "/contact",
  "/legal/privacy",
  "/legal/terms",
];

/**
 * Builds the full sitemap from the same content-layer functions the
 * pages themselves use (getServiceSlugs, getInsightSlugs) — so a new
 * service or a newly-published insight article is picked up here
 * automatically, with nothing to remember to update by hand.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [serviceSlugs, insightSlugs] = await Promise.all([
    getServiceSlugs(),
    getInsightSlugs(),
  ]);

  const dynamicPaths = [
    ...serviceSlugs.map((slug) => `/services/${slug}`),
    ...insightSlugs.map((slug) => `/insights/${slug}`),
  ];

  const allPaths = [...STATIC_PATHS, ...dynamicPaths];

  const entries: MetadataRoute.Sitemap = [];
  for (const path of allPaths) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : locale === routing.defaultLocale ? 0.8 : 0.7,
      });
    }
  }

  return entries;
}
