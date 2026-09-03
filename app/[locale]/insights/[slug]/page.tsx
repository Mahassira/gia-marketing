import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { type AppLocale, routing } from "@/i18n/routing";
import { getInsightArticle, getInsightSlugs } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd, articleJsonLd, siteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section } from "@/components/layout/Section";
import { Link } from "@/i18n/navigation";

export async function generateStaticParams() {
  const slugs = await getInsightSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getInsightArticle(locale as AppLocale, slug);
  if (!article) return {};

  return buildMetadata({
    locale: locale as AppLocale,
    path: `/insights/${slug}`,
    title: article.seo.title,
    description: article.seo.description,
  });
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const isAr = locale === "ar";

  if (!routing.locales.includes(appLocale)) notFound();

  const article = await getInsightArticle(appLocale, slug);
  if (!article) notFound();

  const [tNav, tInsightsPage] = await Promise.all([
    getTranslations("nav"),
    getTranslations("insightsPage"),
  ]);

  const breadcrumbItems = [
    { label: tNav("home"), href: "/" },
    { label: tNav("insights"), href: "/insights" },
    { label: article.title },
  ];

  const dateFormatter = new Intl.DateTimeFormat(isAr ? "ar-EG" : "en-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: tNav("home"), url: `${siteUrl}/${locale}` },
          { name: tNav("insights"), url: `${siteUrl}/${locale}/insights` },
          { name: article.title, url: `${siteUrl}/${locale}/insights/${slug}` },
        ])}
      />
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.excerpt,
          url: `${siteUrl}/${locale}/insights/${slug}`,
          datePublished: article.date,
          dateModified: article.updatedAt,
          author: article.author,
          image: article.coverImage,
        })}
      />

      <Section tone="light">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="mt-6 sm:mt-8">
          <article className="mx-auto max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-wide text-muted">
              {article.category}
            </span>
            <h1
              className={`mt-3 text-balance text-3xl text-ink sm:text-4xl md:text-5xl ${
                isAr ? "font-heading-ar leading-snug" : "font-heading leading-tight"
              }`}
            >
              {article.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
              <span>
                {tInsightsPage("byLabel")} {article.author}
              </span>
              <span aria-hidden="true">•</span>
              <time dateTime={article.date}>{dateFormatter.format(new Date(article.date))}</time>
              {article.updatedAt && (
                <>
                  <span aria-hidden="true">•</span>
                  <span>
                    {tInsightsPage("updatedLabel")}{" "}
                    <time dateTime={article.updatedAt}>
                      {dateFormatter.format(new Date(article.updatedAt))}
                    </time>
                  </span>
                </>
              )}
            </div>

            {article.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={article.coverImage}
                alt=""
                className="mt-8 aspect-video w-full rounded-sm border border-border object-cover"
              />
            )}

            <div className="mt-8 flex flex-col gap-5 text-base text-ink sm:text-lg">
              {article.body.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 border-t border-border pt-6">
              <Link href="/insights" className="text-sm font-medium text-ink hover:underline">
                {tInsightsPage("backToInsights")}
              </Link>
            </div>
          </article>
        </div>
      </Section>
    </>
  );
}
