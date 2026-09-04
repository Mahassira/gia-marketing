/**
 * Content model — business/page content only.
 * UI strings (nav labels, buttons, form labels) live in messages/*.json instead.
 *
 * English and Arabic content files must satisfy these same shapes so
 * either locale can be edited independently without breaking the other.
 */

export type ServicePillarKey = "strategy" | "marketing" | "growth" | "creative";

export interface SeoMeta {
  title: string;
  description: string;
}

export interface RouteSeoMap {
  home: SeoMeta;
  about: SeoMeta;
  services: SeoMeta;
  industries: SeoMeta;
  work: SeoMeta;
  insights: SeoMeta;
  contact: SeoMeta;
  privacy: SeoMeta;
  terms: SeoMeta;
}

/** A single service within one of the four pillars (e.g. "Marketing Strategy"). */
export interface Service {
  slug: string;
  pillar: ServicePillarKey;
  title: string;
  /** One or two sentence summary used on pillar/overview listings. */
  summary: string;
  /** Opening paragraph for the individual service detail page. */
  intro: string;
  /** The business problem/context this service addresses. */
  context: string;
  /** How GIA specifically approaches this service. */
  approach: string;
  /** Concrete, specific activities/capabilities covered — not generic fluff. */
  capabilities: string[];
  /** Practical, non-guaranteed outcomes this helps a business work toward. */
  outcomes: string[];
  seo: SeoMeta;
}

export interface ServicePillar {
  key: ServicePillarKey;
  title: string;
  description: string;
}

export interface Industry {
  slug: string;
  title: string;
  blurb: string;
}

export interface IndustriesContent {
  headline: string;
  intro: string;
  openEnded: boolean;
  items: Industry[];
}

/** About page content. */
export interface AboutContent {
  hero: {
    label: string;
    headline: string;
    intro: string;
  };
  pillars: { title: string; description: string }[];
  closing: {
    headline: string;
    body: string;
    cta: string;
  };
}

/** A single legal document (Privacy Policy or Terms & Conditions). */
export interface LegalDocument {
  title: string;
  lastUpdated: string; // ISO 8601 date
  intro: string;
  sections: { heading: string; body: string }[];
}

export interface LegalContent {
  privacy: LegalDocument;
  terms: LegalDocument;
}

/**
 * Case studies are real work only. `status: "coming-soon"` renders the
 * designed empty state; a real entry only gets `status: "published"`
 * once genuine client work exists. No fields are ever fabricated to
 * fill this shape — an empty `items` array is the correct state until
 * real work is provided.
 */
export interface CaseStudy {
  slug: string;
  status: "published";
  client: string;
  industry: string;
  services: string[];
  challenge: string;
  approach: string;
  solution: string;
  results: string;
  seo: SeoMeta;
}

/**
 * Insight articles. Like case studies, this stays an empty list until
 * a real article — with a real author and a real publish date — is
 * written. The topics listed in the approved spec are planning
 * material for future writing, not content to pre-fill here.
 */
export interface InsightArticle {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO 8601
  updatedAt?: string; // ISO 8601
  author: string;
  category: string;
  coverImage?: string;
  body: string;
  seo: SeoMeta;
}

/** Homepage content baseline — data only; section components are built in Phase 3. */
export interface HomepageContent {
  hero: {
    label: string;
    headline: string;
    supportingText: string;
    primaryCta: string;
    secondaryCta: string;
    /** Labels for the abstract Strategy→Growth flow visual in the Hero. */
    flow: string[];
  };
  intro: {
    headline: string;
    body: string[];
    highlight: string;
  };
  approach: {
    headline: string;
    intro: string;
    steps: { number: string; title: string; description: string }[];
  };
  servicesSection: {
    headline: string;
    intro: string;
  };
  growthSystem: {
    headline: string;
    body: string[];
    journey: string[];
    cta: string;
  };
  acquisitionSystem: {
    headline: string;
    intro: string;
    journey: string[];
    cta: string;
  };
  whyGia: {
    headline: string;
    principles: { title: string; description: string }[];
  };
  industriesSection: {
    headline: string;
    intro: string;
  };
  workSection: {
    headline: string;
  };
  insightsSection: {
    headline: string;
  };
  finalCta: {
    headline: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
}
