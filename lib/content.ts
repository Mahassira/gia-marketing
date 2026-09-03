import "server-only";
import type { AppLocale } from "@/i18n/routing";
import type {
  Service,
  ServicePillar,
  IndustriesContent,
  CaseStudy,
  InsightArticle,
  HomepageContent,
  RouteSeoMap,
  AboutContent,
  LegalContent,
} from "./content/types";

/**
 * Single loading abstraction for all business/page content.
 * Every page calls one of these functions rather than reading
 * content/{locale}/*.json directly — swapping local JSON for a
 * CMS API later means changing the implementations in this file
 * only, with no changes to any page or component.
 */

async function loadJson<T>(locale: AppLocale, file: string): Promise<T> {
  const mod = await import(`../content/${locale}/${file}.json`);
  return mod.default as T;
}

export async function getHomepageContent(locale: AppLocale): Promise<HomepageContent> {
  return loadJson<HomepageContent>(locale, "homepage");
}

export async function getRouteSeo(locale: AppLocale): Promise<RouteSeoMap> {
  return loadJson<RouteSeoMap>(locale, "seo");
}

export async function getServicePillars(locale: AppLocale): Promise<ServicePillar[]> {
  return loadJson<ServicePillar[]>(locale, "pillars");
}

export async function getServices(locale: AppLocale): Promise<Service[]> {
  return loadJson<Service[]>(locale, "services");
}

export async function getServicesByPillar(
  locale: AppLocale,
): Promise<Record<string, Service[]>> {
  const services = await getServices(locale);
  return services.reduce<Record<string, Service[]>>((acc, service) => {
    (acc[service.pillar] ??= []).push(service);
    return acc;
  }, {});
}

export async function getService(locale: AppLocale, slug: string): Promise<Service | null> {
  const services = await getServices(locale);
  return services.find((service) => service.slug === slug) ?? null;
}

export async function getIndustries(locale: AppLocale): Promise<IndustriesContent> {
  return loadJson<IndustriesContent>(locale, "industries");
}

/**
 * Slugs are identical across locales (they're the URL identifier, not
 * translated content), so this is safe to derive from either locale's
 * service list — used for generateStaticParams on the service detail
 * route without needing to know which locale is being built.
 */
export async function getServiceSlugs(): Promise<string[]> {
  const services = await getServices("en");
  return services.map((service) => service.slug);
}

/**
 * Returns real, published case studies only. An empty array is the
 * correct and expected result until genuine client work is added —
 * pages must render the "coming soon" state in that case, never a
 * fabricated placeholder entry.
 */
export async function getCaseStudies(locale: AppLocale): Promise<CaseStudy[]> {
  return loadJson<CaseStudy[]>(locale, "work");
}

export async function getCaseStudy(locale: AppLocale, slug: string): Promise<CaseStudy | null> {
  const items = await getCaseStudies(locale);
  return items.find((item) => item.slug === slug) ?? null;
}

/**
 * Returns real, published insight articles only. An empty array is
 * the correct and expected result until genuine articles are written.
 */
export async function getInsightArticles(locale: AppLocale): Promise<InsightArticle[]> {
  return loadJson<InsightArticle[]>(locale, "insights");
}

export async function getInsightArticle(
  locale: AppLocale,
  slug: string,
): Promise<InsightArticle | null> {
  const items = await getInsightArticles(locale);
  return items.find((item) => item.slug === slug) ?? null;
}

/** Slugs for generateStaticParams — see getServiceSlugs for the same rationale. */
export async function getInsightSlugs(): Promise<string[]> {
  const articles = await getInsightArticles("en");
  return articles.map((article) => article.slug);
}

export async function getAboutContent(locale: AppLocale): Promise<AboutContent> {
  return loadJson<AboutContent>(locale, "about");
}

export async function getLegalContent(locale: AppLocale): Promise<LegalContent> {
  return loadJson<LegalContent>(locale, "legal");
}
