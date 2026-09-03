import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { type AppLocale, routing } from "@/i18n/routing";
import { getService, getServiceSlugs, getHomepageContent } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd, siteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await getService(locale as AppLocale, slug);
  if (!service) return {};

  return buildMetadata({
    locale: locale as AppLocale,
    path: `/services/${slug}`,
    title: service.seo.title,
    description: service.seo.description,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const isAr = locale === "ar";

  if (!routing.locales.includes(appLocale)) notFound();

  const service = await getService(appLocale, slug);
  if (!service) notFound();

  const [tNav, tService, tCta, homepage] = await Promise.all([
    getTranslations("nav"),
    getTranslations("servicePage"),
    getTranslations("cta"),
    getHomepageContent(appLocale),
  ]);

  const breadcrumbItems = [
    { label: tNav("home"), href: "/" },
    { label: tNav("services"), href: "/services" },
    { label: service.title },
  ];

  const headingFont = isAr ? "font-heading-ar leading-snug" : "font-heading leading-tight";

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: tNav("home"), url: `${siteUrl}/${locale}` },
          { name: tNav("services"), url: `${siteUrl}/${locale}/services` },
          { name: service.title, url: `${siteUrl}/${locale}/services/${slug}` },
        ])}
      />

      <Section tone="light">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="mt-6 max-w-3xl sm:mt-8">
          <span className="text-xs font-medium uppercase tracking-wider text-muted sm:text-sm">
            {tNav("services")}
          </span>
          <h1 className={`mt-3 text-balance text-3xl text-ink sm:text-4xl md:text-5xl ${headingFont}`}>
            {service.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted sm:text-lg">{service.intro}</p>
        </div>
      </Section>

      {/* Context */}
      <Section tone="alt">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h2 className={`text-xl text-ink sm:text-2xl ${isAr ? "font-heading-ar" : "font-heading"}`}>
              {tService("contextHeading")}
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="max-w-2xl text-base text-muted sm:text-lg">{service.context}</p>
          </div>
        </div>
      </Section>

      {/* Approach */}
      <Section tone="light">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h2 className={`text-xl text-ink sm:text-2xl ${isAr ? "font-heading-ar" : "font-heading"}`}>
              {tService("approachHeading")}
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="max-w-2xl text-base text-muted sm:text-lg">{service.approach}</p>
          </div>
        </div>
      </Section>

      {/* Capabilities + Outcomes */}
      <Section tone="alt">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div>
            <h2 className={`text-xl text-ink sm:text-2xl ${isAr ? "font-heading-ar" : "font-heading"}`}>
              {tService("capabilitiesHeading")}
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {service.capabilities.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span className="text-sm text-ink sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={`text-xl text-ink sm:text-2xl ${isAr ? "font-heading-ar" : "font-heading"}`}>
              {tService("outcomesHeading")}
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {service.outcomes.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span className="text-sm text-ink sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section tone="light">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center sm:gap-6">
          <h2 className={`text-2xl text-ink sm:text-3xl ${isAr ? "font-heading-ar" : "font-heading"}`}>
            {homepage.finalCta.headline}
          </h2>
          <p className="text-base text-muted sm:text-lg">{tService("ctaBody")}</p>
          <Button href="/contact" variant="primary">
            {tCta("startConversation")}
          </Button>
        </div>
      </Section>
    </>
  );
}
