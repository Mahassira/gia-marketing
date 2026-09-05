Real GIA logo assets, provided by the client.

CURRENTLY ACTIVE (used by components/ui/Logo.tsx):
- logo-web-v2.png — the current approved logo, with the updated
  tagline ("Marketing House" / "for Digital Marketing advisory").
  Derived from logo-v2-source.png via two purely mechanical steps,
  neither of which touched any pixel of the actual artwork:
    1. The source had an unintended fully-opaque white band behind the
       logo (verified: solid RGB 255/255/255, spanning the full canvas
       width at exactly the logo's row range — an export artifact, not
       part of the design). Those near-white pixels were made
       transparent; every other pixel's color is unchanged.
    2. Cropped to the real content bounding box (droplet + wordmark +
       tagline) with a small clear-space margin.
  Known minor artifact: a faint white edge "fringe" is visible around
  the droplet/letters when placed on a non-white background — a normal
  byproduct of a simple threshold-based background fix rather than a
  proper alpha matte. Imperceptible at the size this renders in the
  header (28–36px tall) but worth knowing about if it's ever used
  larger.
- logo-v2-source.png — the exact file uploaded by the client for this
  version, kept byte-for-byte unmodified as provenance.

PREVIOUS VERSION (kept for provenance, no longer referenced by code):
- logo-web.svg — the prior approved logo (tagline: "FOR DIGITAL
  MARKETING ADVISORY", one line), a tightly-cropped vector derivative
  of logo.svg.
- logo.svg — the original full-canvas vector file for the previous
  version, exactly as provided.
- logo-fallback.png — the previous version's PNG export (genuinely
  transparent, fixed in an earlier round).
- logo-source-raster-export.svg — not a real vector graphic despite
  the extension (a flattened raster wrapped in SVG markup); kept for
  provenance only.

Nothing here has been redrawn, recolored, or recomposed at any point —
only cropping and a mechanical transparency fix, both documented above.

The site's written positioning text ("GIA — Digital Marketing
Advisory") was deliberately NOT changed to match the new logo's
tagline — per explicit instruction, only the logo image itself was
updated; all page copy, SEO metadata, and structured data remain
"GIA — Digital Marketing Advisory" throughout.
