import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#EDBC23",
        ink: "#000000",
        surface: "#FFFFFF",
        "surface-alt": "#F7F7F5",
        muted: "#555555",
        border: "#E6E6E3",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        "heading-ar": ["var(--font-heading-ar)", "sans-serif"],
        "body-ar": ["var(--font-body-ar)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
