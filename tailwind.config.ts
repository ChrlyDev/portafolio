import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        black: "#000000",
        white: "#ffffff",
        gray: {
          950: "#080808",
          900: "#0c0c0c",
          800: "#111111",
          700: "#1a1a1a",
          600: "#222222",
          500: "#333333",
          400: "#444444",
          300: "#666666",
          200: "#888888",
          100: "#aaaaaa",
        },
      },
      letterSpacing: {
        tightest: "-0.05em",
        tighter: "-0.03em",
      },
    },
  },
  plugins: [],
};

export default config;
