import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { type AppLocale } from "@/i18n/routing";
import { getInsightArticles, getRouteSeo, getHomepageContent } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd, siteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section } from "@/components/layout/Section";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getRouteSeo(locale as AppLocale);
  return buildMetadata({
    locale: locale as AppLocale,
    path: "/insights",
    title: seo.insights.title,
    description: seo.insights.description,
  });
}

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const isAr = locale === "ar";

  const [articles, tNav, tInsights, homepage] = await Promise.all([
    getInsightArticles(appLocale),
    getTranslations("nav"),
    getTranslations("insights"),
    getHomepageContent(appLocale),
  ]);

  const breadcrumbItems = [
    { label: tNav("home"), href: "/" },
    { label: tNav("insights") },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: tNav("home"), url: `${siteUrl}/${locale}` },
          { name: tNav("insights"), url: `${siteUrl}/${locale}/insights` },
        ])}
      />

      <Section tone="light">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="mt-6 sm:mt-8">
          <h1
            className={`text-balance text-3xl text-ink sm:text-4xl md:text-5xl ${
              isAr ? "font-heading-ar leading-snug" : "font-heading leading-tight"
            }`}
          >
            {homepage.insightsSection.headline}
          </h1>
        </div>
      </Section>

      <Section tone="alt">
        {articles.length === 0 ? (
          <ComingSoon title={tInsights("comingSoonTitle")} body={tInsights("comingSoonBody")} />
        ) : (
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <li key={article.slug} className="border-t border-border pt-4">
                <Link href={`/insights/${article.slug}`} className="group block">
                  {article.coverImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={article.coverImage}
                      alt=""
                      className="mb-3 aspect-video w-full rounded-sm border border-border object-cover"
                    />
                  )}
                  <span className="text-xs font-medium uppercase tracking-wide text-muted">
                    {article.category}
                  </span>
                  <h2 className="mt-2 text-lg text-ink group-hover:underline">{article.title}</h2>
                  <p className="mt-2 text-sm text-muted">{article.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
