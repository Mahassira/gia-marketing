Real GIA logo assets, provided by the client.

- logo.svg — the ORIGINAL file exactly as provided (the "_transparent"
  export). Kept completely unchanged as the source asset. Has a large
  transparent canvas margin around the artwork (by design of the
  original export — a square social-media-style canvas).
- logo-web.svg — the WEB DERIVATIVE actually used in Header/Footer.
  This is logo.svg with ONLY the root <svg> viewBox/width/height
  changed to crop away the unused transparent margin. No path data,
  no colors, no shapes were touched — every coordinate inside the file
  is byte-identical to logo.svg; only the visible "window" (viewBox)
  onto that same coordinate space was tightened, computed precisely
  from the actual artwork bounding box (droplet + wordmark + tagline),
  plus a small (~3%) clear-space margin.
- logo-fallback.png — the client's provided PNG. Note: despite being
  called "transparent," this file is RGB with no alpha channel and has
  a plain white background baked in. Fine on white surfaces; would show
  a white box on a non-white background. Kept as-provided, unmodified.
- logo-source-raster-export.svg — the client's second provided file.
  Despite the .svg extension, this is NOT a vector graphic — it's a
  flattened raster PNG (with a white background rect) wrapped in SVG
  markup, an artifact of a PDF export. Kept for provenance only; not
  used anywhere in the app.

Nothing here has been redrawn, recolored, or recomposed. The favicon
set in public/brand/favicon/ is a simple crop-to-content + resize
derivation of logo-fallback.png (see that folder's README).
