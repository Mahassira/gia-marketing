import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { type AppLocale } from "@/i18n/routing";
import { getCaseStudies, getRouteSeo, getHomepageContent } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd, siteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section } from "@/components/layout/Section";
import { ComingSoon } from "@/components/ui/ComingSoon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getRouteSeo(locale as AppLocale);
  return buildMetadata({
    locale: locale as AppLocale,
    path: "/work",
    title: seo.work.title,
    description: seo.work.description,
  });
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const isAr = locale === "ar";

  const [caseStudies, tNav, tWork, homepage] = await Promise.all([
    getCaseStudies(appLocale),
    getTranslations("nav"),
    getTranslations("work"),
    getHomepageContent(appLocale),
  ]);

  const breadcrumbItems = [
    { label: tNav("home"), href: "/" },
    { label: tNav("work") },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: tNav("home"), url: `${siteUrl}/${locale}` },
          { name: tNav("work"), url: `${siteUrl}/${locale}/work` },
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
            {homepage.workSection.headline}
          </h1>
        </div>
      </Section>

      <Section tone="alt">
        {caseStudies.length === 0 ? (
          <ComingSoon title={tWork("comingSoonTitle")} body={tWork("comingSoonBody")} />
        ) : (
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((cs) => (
              <li key={cs.slug} className="border-t border-border pt-4">
                <h2 className="text-lg text-ink">{cs.client}</h2>
                <p className="mt-2 text-sm text-muted">{cs.challenge}</p>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
