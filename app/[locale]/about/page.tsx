import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { type AppLocale } from "@/i18n/routing";
import { getAboutContent, getRouteSeo } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd, siteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PrinciplesGrid } from "@/components/sections/PrinciplesGrid";
import { Button } from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getRouteSeo(locale as AppLocale);
  return buildMetadata({
    locale: locale as AppLocale,
    path: "/about",
    title: seo.about.title,
    description: seo.about.description,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const isAr = locale === "ar";

  const [about, tNav] = await Promise.all([
    getAboutContent(appLocale),
    getTranslations("nav"),
  ]);

  const breadcrumbItems = [
    { label: tNav("home"), href: "/" },
    { label: tNav("about") },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: tNav("home"), url: `${siteUrl}/${locale}` },
          { name: tNav("about"), url: `${siteUrl}/${locale}/about` },
        ])}
      />

      <Section tone="light">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="mt-6 sm:mt-8">
          <div className="max-w-3xl">
            <span className="text-xs font-medium tracking-wide text-muted sm:text-sm">
              {about.hero.label}
            </span>
            <h1
              className={`mt-4 text-balance text-3xl text-ink sm:text-4xl md:text-5xl ${
                isAr ? "font-heading-ar leading-snug" : "font-heading leading-tight"
              }`}
            >
              {about.hero.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-base text-muted sm:text-lg">{about.hero.intro}</p>
          </div>
        </div>
      </Section>

      <Section tone="alt">
        <PrinciplesGrid principles={about.pillars} arabic={isAr} />
      </Section>

      <Section tone="light">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center sm:gap-6">
          <SectionHeading id="about-closing-heading" align="center" arabic={isAr}>
            {about.closing.headline}
          </SectionHeading>
          <p className="text-base text-muted sm:text-lg">{about.closing.body}</p>
          <Button href="/contact" variant="primary">
            {about.closing.cta}
          </Button>
        </div>
      </Section>
    </>
  );
}
