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
// CinematicSystemSection is no longer rendered here — the cinematic
// video is now the background of Hero itself (merged per explicit
// request). The component file is intentionally kept, unused, rather
// than deleted, in case the standalone section is wanted again.
import { Hero } from "@/components/sections/Hero";
import { IntroSection } from "@/components/sections/IntroSection";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AcquisitionSystemSection } from "@/components/sections/AcquisitionSystemSection";
import { GrowthSystemSection } from "@/components/sections/GrowthSystemSection";
import { IntegrationEcosystemSection } from "@/components/sections/IntegrationEcosystemSection";
import { WhyGiaSection } from "@/components/sections/WhyGiaSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { InsightsSection } from "@/components/sections/InsightsSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

/**
 * The full GIA.marketing homepage. This page component itself is a
 * Server Component and every section is composed here server-side —
 * but by Phase 7 the page also includes several small, isolated
 * client components for scroll-driven motion (Reveal, StaggerFlow,
 * ScrollStageTracker), plus Hero itself (which needs useReducedMotion()
 * to decide whether to autoplay its background video). Data fetching
 * and layout stay server-rendered throughout; only the specific
 * pieces that need motion/video interactivity are client boundaries.
 *
 * Note: the standalone CinematicSystemSection is no longer rendered
 * here — its content was merged into Hero (the cinematic video is now
 * Hero's own background) per explicit request. The component file
 * still exists, unused, in case the separate section is wanted again.
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

      <AcquisitionSystemSection
        headline={homepage.acquisitionSystem.headline}
        intro={homepage.acquisitionSystem.intro}
        stages={homepage.acquisitionSystem.journey}
        cta={homepage.acquisitionSystem.cta}
        arabic={isAr}
      />

      <GrowthSystemSection
        headline={homepage.growthSystem.headline}
        body={homepage.growthSystem.body}
        journey={homepage.growthSystem.journey}
        cta={homepage.growthSystem.cta}
        arabic={isAr}
      />

      <IntegrationEcosystemSection
        headline={homepage.integrationEcosystem.headline}
        intro={homepage.integrationEcosystem.intro}
        flow={homepage.integrationEcosystem.flow}
        disclaimer={homepage.integrationEcosystem.disclaimer}
        categories={homepage.integrationEcosystem.categories}
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
