import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Points next-intl at the request-config file that resolves
// the active locale and loads its message bundle.
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Kept intentionally lean: no experimental flags enabled until
  // there's a concrete need for them at this stage of the build.
};

export default withNextIntl(nextConfig);
