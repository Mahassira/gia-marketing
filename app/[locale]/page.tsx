import { setRequestLocale, getTranslations } from "next-intl/server";
import { type AppLocale } from "@/i18n/routing";
import {
  getHomepageContent,
  getServicePillars,
  getServicesByPillar,
  getIndustries,
  getCaseStudies,
  getInsightArticles,
} from "@/lib/content";
import { Hero } from "@/components/sections/Hero";
import { IntroSection } from "@/components/sections/IntroSection";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { GrowthSystemSection } from "@/components/sections/GrowthSystemSection";
import { WhyGiaSection } from "@/components/sections/WhyGiaSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { InsightsSection } from "@/components/sections/InsightsSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

/**
 * The full GIA.marketing homepage (Phase 3). Every section here is a
 * Server Component — no client JS is shipped for the homepage itself,
 * since nothing on it needs interactivity beyond CSS :hover states and
 * plain navigation links.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const isAr = locale === "ar";

  const [
    homepage,
    pillars,
    servicesByPillar,
    industries,
    caseStudies,
    insightArticles,
    tWork,
    tInsights,
    tCommon,
    tIndustries,
  ] = await Promise.all([
    getHomepageContent(appLocale),
    getServicePillars(appLocale),
    getServicesByPillar(appLocale),
    getIndustries(appLocale),
    getCaseStudies(appLocale),
    getInsightArticles(appLocale),
    getTranslations("work"),
    getTranslations("insights"),
    getTranslations("common"),
    getTranslations("industries"),
  ]);

  return (
    <>
      <Hero
        label={homepage.hero.label}
        headline={homepage.hero.headline}
        supportingText={homepage.hero.supportingText}
        primaryCta={homepage.hero.primaryCta}
        secondaryCta={homepage.hero.secondaryCta}
        flowLabels={homepage.hero.flow}
        arabic={isAr}
      />

      <IntroSection
        headline={homepage.intro.headline}
        body={homepage.intro.body}
        highlight={homepage.intro.highlight}
        arabic={isAr}
      />

      <ApproachSection
        headline={homepage.approach.headline}
        intro={homepage.approach.intro}
        steps={homepage.approach.steps}
        arabic={isAr}
      />

      <ServicesSection
        headline={homepage.servicesSection.headline}
        intro={homepage.servicesSection.intro}
        pillars={pillars}
        servicesByPillar={servicesByPillar}
        coreLabel={tCommon("core")}
        arabic={isAr}
      />

      <GrowthSystemSection
        headline={homepage.growthSystem.headline}
        body={homepage.growthSystem.body}
        journey={homepage.growthSystem.journey}
        cta={homepage.growthSystem.cta}
        arabic={isAr}
      />

      <WhyGiaSection
        headline={homepage.whyGia.headline}
        principles={homepage.whyGia.principles}
        arabic={isAr}
      />

      <IndustriesSection
        headline={homepage.industriesSection.headline}
        intro={homepage.industriesSection.intro}
        items={industries.items}
        openEnded={industries.openEnded}
        andMoreLabel={tIndustries("andMore")}
        arabic={isAr}
      />

      <WorkSection
        headline={homepage.workSection.headline}
        caseStudies={caseStudies}
        comingSoonTitle={tWork("comingSoonTitle")}
        comingSoonBody={tWork("comingSoonBody")}
        arabic={isAr}
      />

      <InsightsSection
        headline={homepage.insightsSection.headline}
        articles={insightArticles}
        comingSoonTitle={tInsights("comingSoonTitle")}
        comingSoonBody={tInsights("comingSoonBody")}
        arabic={isAr}
      />

      <FinalCtaSection
        headline={homepage.finalCta.headline}
        body={homepage.finalCta.body}
        primaryCta={homepage.finalCta.primaryCta}
        secondaryCta={homepage.finalCta.secondaryCta}
        arabic={isAr}
      />
    </>
  );
}
