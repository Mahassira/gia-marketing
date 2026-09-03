import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { type AppLocale } from "@/i18n/routing";
import { getRouteSeo, getHomepageContent } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd, siteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/forms/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getRouteSeo(locale as AppLocale);
  return buildMetadata({
    locale: locale as AppLocale,
    path: "/contact",
    title: seo.contact.title,
    description: seo.contact.description,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const isAr = locale === "ar";

  const [tNav, homepage] = await Promise.all([
    getTranslations("nav"),
    getHomepageContent(appLocale),
  ]);

  const breadcrumbItems = [
    { label: tNav("home"), href: "/" },
    { label: tNav("contact") },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: tNav("home"), url: `${siteUrl}/${locale}` },
          { name: tNav("contact"), url: `${siteUrl}/${locale}/contact` },
        ])}
      />

      <Section tone="light">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-6 grid grid-cols-1 gap-10 sm:mt-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h1
              className={`text-balance text-3xl text-ink sm:text-4xl md:text-5xl ${
                isAr ? "font-heading-ar leading-snug" : "font-heading leading-tight"
              }`}
            >
              {homepage.finalCta.headline}
            </h1>
            <p className="mt-5 max-w-md text-base text-muted sm:text-lg">
              {homepage.finalCta.body}
            </p>
          </div>

          <div className="lg:col-span-7">
            <ContactForm locale={appLocale} />
          </div>
        </div>
      </Section>
    </>
  );
}
