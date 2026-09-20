import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        offwhite: {
          50: "#ffffff",
          100: "#fafbfc",
          200: "#f6f7f9",
          300: "#eef0f4",
          400: "#e2e6ed",
        },
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
      },
      fontFamily: {
        sans: ['"MiSans Latin"', "MiSans", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
        card: "0 10px 30px -4px rgba(0, 0, 0, 0.06)",
        glow: "0 0 25px -5px rgba(99, 102, 241, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
