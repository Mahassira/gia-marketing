import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { type AppLocale } from "@/i18n/routing";
import { getLegalContent, getRouteSeo } from "@/lib/content";
import { buildMetadata, breadcrumbJsonLd, siteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Section } from "@/components/layout/Section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getRouteSeo(locale as AppLocale);
  return buildMetadata({
    locale: locale as AppLocale,
    path: "/legal/privacy",
    title: seo.privacy.title,
    description: seo.privacy.description,
  });
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const isAr = locale === "ar";

  const [legal, tNav, tFooter, tLegal] = await Promise.all([
    getLegalContent(appLocale),
    getTranslations("nav"),
    getTranslations("footer"),
    getTranslations("legalPage"),
  ]);
  const doc = legal.privacy;

  const breadcrumbItems = [
    { label: tNav("home"), href: "/" },
    { label: tFooter("privacy") },
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
          { name: tFooter("privacy"), url: `${siteUrl}/${locale}/legal/privacy` },
        ])}
      />

      <Section tone="light">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="mt-6 sm:mt-8">
          <div className="mx-auto max-w-2xl">
            <h1
              className={`text-balance text-3xl text-ink sm:text-4xl ${
                isAr ? "font-heading-ar leading-snug" : "font-heading leading-tight"
              }`}
            >
              {doc.title}
            </h1>
            <p className="mt-3 text-sm text-muted">
              {tLegal("lastUpdatedLabel")}:{" "}
              <time dateTime={doc.lastUpdated}>{dateFormatter.format(new Date(doc.lastUpdated))}</time>
            </p>
            <p className="mt-6 text-base text-muted sm:text-lg">{doc.intro}</p>

            <div className="mt-10 flex flex-col gap-8">
              {doc.sections.map((section) => (
                <div key={section.heading} className="border-t border-border pt-5">
                  <h2 className={`text-lg text-ink sm:text-xl ${isAr ? "font-heading-ar" : "font-heading"}`}>
                    {section.heading}
                  </h2>
                  <p className="mt-2 text-sm text-muted sm:text-base">{section.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
