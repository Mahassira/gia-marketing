import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { type AppLocale } from "@/i18n/routing";
import {
  getRouteSeo,
  getHomepageContent,
  getServicePillars,
  getServicesByPillar,
} from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd, siteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section } from "@/components/layout/Section";
import { ServicesPillars } from "@/components/sections/ServicesPillars";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getRouteSeo(locale as AppLocale);
  return buildMetadata({
    locale: locale as AppLocale,
    path: "/services",
    title: seo.services.title,
    description: seo.services.description,
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const isAr = locale === "ar";

  const [pillars, servicesByPillar, tNav, tCommon, homepage] = await Promise.all([
    getServicePillars(appLocale),
    getServicesByPillar(appLocale),
    getTranslations("nav"),
    getTranslations("common"),
    getHomepageContent(appLocale),
  ]);

  const breadcrumbItems = [
    { label: tNav("home"), href: "/" },
    { label: tNav("services") },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: tNav("home"), url: `${siteUrl}/${locale}` },
          { name: tNav("services"), url: `${siteUrl}/${locale}/services` },
        ])}
      />

      <Section tone="light">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="mt-6 sm:mt-8">
          <div className="max-w-2xl">
            <h1
              className={`text-balance text-3xl text-ink sm:text-4xl md:text-5xl ${
                isAr ? "font-heading-ar leading-snug" : "font-heading leading-tight"
              }`}
            >
              {homepage.servicesSection.headline}
            </h1>
            <p className="mt-5 text-base text-muted sm:text-lg">{homepage.servicesSection.intro}</p>
          </div>
        </div>
      </Section>

      <Section tone="alt">
        <ServicesPillars
          pillars={pillars}
          servicesByPillar={servicesByPillar}
          coreLabel={tCommon("core")}
          arabic={isAr}
          linkToService
        />
      </Section>
    </>
  );
}
