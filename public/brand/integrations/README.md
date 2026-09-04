Reserved for real, properly licensed third-party platform logo files
used in the "Integration Ecosystem" homepage section.

No logo files exist here yet. Every platform currently renders as
plain text (see components/ui/PlatformMark.tsx) — nothing has been
redrawn, recreated, or fabricated from memory. This is intentional:
these are other companies' registered trademarks, and reproducing a
company's logo without a real, licensed source file (and without
following that company's own brand usage guidelines) is not something
to do speculatively.

If real logo files are added later, each one:
- must come from that company's own official brand/press-kit source
  (not redrawn or approximated)
- must comply with that company's brand usage guidelines (minimum
  clear space, permitted color/monochrome variants, prohibited
  modifications, etc. — check each company's own brand page; these
  differ per company and this project has no network access to check
  them on your behalf)
- should be named {slug}.svg matching the slugs already defined in
  content/en/homepage.json's integrationEcosystem.categories (e.g.
  google-ads.svg, meta-ads.svg, hubspot.svg) — PlatformMark.tsx picks up a
  matching file automatically, no code change needed

Using these logos here does not imply, and must never be presented as,
an official partnership, certification, or technology-partner status
with any of these companies unless such a relationship is separately
confirmed and documented. See the "disclaimer" field in
content/{en,ar}/homepage.json's integrationEcosystem for the exact
wording currently shown to visitors.
