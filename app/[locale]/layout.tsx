import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Poppins, Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import { routing, localeMeta, type AppLocale } from "@/i18n/routing";
import { buildMetadata, siteUrl, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import "../globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

// One professional Arabic family covers both heading and body roles —
// matches the spec's guidance without introducing a second Arabic font.
const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["500", "600", "700"],
  variable: "--font-heading-ar",
  display: "swap",
});

const ibmPlexSansArabicBody = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500"],
  variable: "--font-body-ar",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    ...buildMetadata({
      locale: locale as AppLocale,
      path: "",
      title:
        locale === "ar"
          ? "جيا | استشارات التسويق الرقمي في مصر"
          : "GIA | Digital Marketing Advisory in Egypt",
      description:
        locale === "ar"
          ? "جيا هي جهة استشارية متخصصة في التسويق الرقمي تساعد الشركات في مصر على بناء استراتيجيات تسويقية أقوى، وتوليد عملاء محتملين مؤهلين، وتحسين رحلة العميل، وتحقيق نمو قابل للقياس."
          : "GIA is a digital marketing advisory helping businesses in Egypt build stronger marketing strategies, generate qualified leads, improve customer journeys, and drive measurable growth.",
    }),
    metadataBase: new URL(siteUrl),
    icons: {
      icon: [
        { url: "/brand/favicon/favicon.ico" },
        { url: "/brand/favicon/favicon-16.png", sizes: "16x16", type: "image/png" },
        { url: "/brand/favicon/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/brand/favicon/favicon-48.png", sizes: "48x48", type: "image/png" },
        { url: "/brand/favicon/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/brand/favicon/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: "/brand/favicon/apple-touch-icon.png",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as AppLocale)) {
    notFound();
  }

  // Enables static rendering for this locale in this request.
  setRequestLocale(locale);

  const messages = await getMessages();
  const tA11y = await getTranslations("a11y");
  const { dir } = localeMeta[locale as AppLocale];

  // Poppins + Inter variables are always loaded, on both locales: the
  // "GIA" wordmark and any Latin-script content (e.g. the brand name,
  // slugs, numerals) need font-heading/font-body to resolve even on
  // /ar pages. The Arabic variables are added on top for /ar, where
  // font-heading-ar/font-body-ar are used for Arabic-script running text.
  const fontVariables =
    locale === "ar"
      ? `${poppins.variable} ${inter.variable} ${ibmPlexSansArabic.variable} ${ibmPlexSansArabicBody.variable}`
      : `${poppins.variable} ${inter.variable}`;

  return (
    <html lang={locale} dir={dir}>
      <body
        className={`${fontVariables} ${
          locale === "ar" ? "font-body-ar" : "font-body"
        } bg-surface text-ink antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <JsonLd data={organizationJsonLd()} />
          <JsonLd data={websiteJsonLd(locale as AppLocale)} />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-surface"
          >
            {tA11y("skipToContent")}
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
