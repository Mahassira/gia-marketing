# GIA.marketing — Digital Marketing Advisory Website

**GIA — Digital Marketing Advisory.**

The current version is a professional, responsive, bilingual (English/Arabic) website built with a premium strategic visual direction, covering:

- Homepage / landing page
- About
- Services (overview + 12 individual service detail pages)
- Industries
- Work
- Insights architecture
- Contact
- Privacy Policy and Terms & Conditions
- English / Arabic with full RTL support
- SEO foundation (metadata, canonical, hreflang, Open Graph, structured data, sitemap, robots)
- Responsive, mobile-first design
- Accessibility considerations
- Motion with `prefers-reduced-motion` support

## Project status

The following phases are complete:

- **Phase 1 — Foundation:** Next.js 16 project setup, bilingual routing (`/en/`, `/ar/`), RTL/LTR architecture, fonts, and design tokens.
- **Phase 2 — Core Architecture:** Header, Footer, layout primitives, typed content model, and localized content structure.
- **Phase 3 — Homepage:** Full homepage build (Hero, Introduction, Approach, Services, Growth System, Why GIA, Industries, Work, Insights, Final CTA) on the approved design system.
- **Phase 4 — Interior Pages:** About, Services overview, service detail template (12 services), Industries, Work, Insights (list + article template), Legal pages, and Contact.
- **Phase 5 — Visual Experience:** Strengthened typography scale, restrained motion (with full reduced-motion support), and visual continuity between the Hero and Growth System diagrams.
- **Phase 6 — QA & Launch Readiness:** Full-project QA pass — accessibility contrast fixes, structured data completion, SEO/link/route verification, and security/configuration review.

## Requirements

- Node.js 20.9+ (Next.js 16 requirement)
- npm 10+

## Setup

This project was built without running `npm install` (no network access in the build environment). To run it locally:

```bash
cd gia-marketing
npm install
cp .env.example .env.local
npm run dev
```

Then visit:
- http://localhost:3000/en
- http://localhost:3000/ar

Visiting `http://localhost:3000/` (no locale) will redirect based on your browser's `Accept-Language` header, falling back to `/en`.

## What to check

- `/ar` renders right-to-left (`dir="rtl"` on `<html>`), `/en` renders left-to-right.
- Headings use Poppins (`/en`) or IBM Plex Sans Arabic (`/ar`); body text uses Inter (`/en`) or IBM Plex Sans Arabic (`/ar`).
- The gold accent and brand colors render per the design tokens.
- `view-source:` on either locale shows the correct `hreflang` alternate links and canonical tag in the rendered `<head>`.
- `/sitemap.xml` and `/robots.txt` resolve correctly.
- Every page has a single `<h1>`, a localized breadcrumb where applicable, and Organization/WebSite/BreadcrumbList (and Article, where applicable) structured data.

## Known gaps (by design, not oversight)

- Work and Insights intentionally show a "coming soon" state — no case studies or articles have been fabricated; real entries will populate these once available.
- The contact form is fully built and accessible but not yet wired to a backend (no email delivery, webhook, or CRM integration) — that is the explicit scope of a future Contact & Lead Flow phase. `zod`, `resend`, and `@upstash/*` are already declared as dependencies for that phase but are currently unused.
- No real WhatsApp number, phone number, or email address has been invented anywhere on the site.
- Rendered browser QA has not been possible in the build environment (no network access for dependency installation); all verification to date has been via source inspection, computed layout geometry, and static validation tooling.
