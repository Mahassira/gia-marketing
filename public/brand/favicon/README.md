Favicon / app icon set, derived from the real logo (logo-fallback.png)
via a purely mechanical process: crop away the source file's excess
canvas margin (no redesign — just removing built-in whitespace),
center the result on a white square, then resize. No color, shape, or
composition changes were made.

Files:
- favicon.ico          (multi-size: 16/32/48px)
- favicon-16.png, favicon-32.png, favicon-48.png
- icon-192.png, icon-512.png   (PWA / Android)
- apple-touch-icon.png (180px, iOS)

Known limitation: the source lockup includes the full wordmark and
tagline. At 16px this is only abstractly legible (a gold mark + faint
"GIA"), which is normal for a wide lockup at favicon scale. If the
client provides an icon-only mark (just the droplet symbol) later,
these should be regenerated from that instead for better legibility
at the smallest sizes.
