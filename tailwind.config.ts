import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1c2430",
        graphite: "#2e3338",
        ember: "#b86b2b",
        saffron: "#d99b2b",
        sage: "#4d7c59",
        lagoon: "#287d86",
        porcelain: "#f7f4ee",
        linen: "#fbf7ef"
      },
      boxShadow: {
        soft: "0 16px 50px rgba(28, 36, 48, 0.12)",
        lift: "0 20px 70px rgba(28, 36, 48, 0.18)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
