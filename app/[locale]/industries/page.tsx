import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { type AppLocale } from "@/i18n/routing";
import { getIndustries, getRouteSeo } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd, siteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section } from "@/components/layout/Section";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { PageVideoBanner } from "@/components/motion/PageVideoBanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getRouteSeo(locale as AppLocale);
  return buildMetadata({
    locale: locale as AppLocale,
    path: "/industries",
    title: seo.industries.title,
    description: seo.industries.description,
  });
}

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const isAr = locale === "ar";

  const [industries, tNav, tIndustries] = await Promise.all([
    getIndustries(appLocale),
    getTranslations("nav"),
    getTranslations("industries"),
  ]);

  const breadcrumbItems = [
    { label: tNav("home"), href: "/" },
    { label: tNav("industries") },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: tNav("home"), url: `${siteUrl}/${locale}` },
          { name: tNav("industries"), url: `${siteUrl}/${locale}/industries` },
        ])}
      />

      <div className="relative h-[45vh] min-h-[320px] sm:h-[50vh] lg:h-[55vh]">
        <PageVideoBanner
          desktopVideo="/media/industries-desktop.mp4"
          desktopPoster="/media/industries-desktop-poster.jpg"
          mobileVideo="/media/industries-mobile.mp4"
          mobilePoster="/media/industries-mobile-poster.jpg"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-ink/20" />
      </div>

      <Section tone="light">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="mt-6 sm:mt-8">
          <div className="max-w-2xl">
            <h1
              className={`text-balance text-3xl text-ink sm:text-4xl md:text-5xl ${
                isAr ? "font-heading-ar leading-snug" : "font-heading leading-tight"
              }`}
            >
              {industries.headline}
            </h1>
            <p className="mt-5 text-base text-muted sm:text-lg">{industries.intro}</p>
          </div>
        </div>
      </Section>

      <Section tone="alt">
        <IndustriesGrid
          items={industries.items}
          openEnded={industries.openEnded}
          andMoreLabel={tIndustries("andMore")}
          arabic={isAr}
        />
      </Section>
    </>
  );
}
