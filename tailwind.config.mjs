/** @type {import('tailwindcss').Config} */
import typographyPlugin from "@tailwindcss/typography";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        wave: {
          slower: "#200052",
          default: "#0a0833",
          fast: "#00010e",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        default: "var(--aw-color-text-default)",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        sans: [
          "IBM Plex Sans", // ← your Fontsource font
          "var(--aw-font-sans, ui-sans-serif)",
          ...defaultTheme.fontFamily.sans,
        ],
        serif: [
          "var(--aw-font-serif, ui-serif)",
          ...defaultTheme.fontFamily.serif,
        ],
        heading: [
          "IBM Plex Sans",
          "var(--aw-font-heading, ui-sans-serif)",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      animation: {
        fade: "fadeInUp 1s both",
        wave: "wave 7s forwards",
        waveFast: "wave 5s forwards",
        waveSlower: "wave 10s forwards",
        neonHex: "neonHex 2s linear infinite",
        waveVeryFast: "wave 3s forwards",
        shimmer: "shimmer 2s linear infinite",
        flowRight: "flowRight 1.8s linear infinite",
        nodeBlink: "nodeBlink 2.4s ease-in-out infinite",
        logLineOut: "logLineOut 0.22s ease-out",
        logLineIn: "logLineIn 0.22s ease-out",
        glitch: "glitch 0.9s infinite steps(2, jump-none)",
      },
      keyframes: {
        glitch: {
          "0%": { transform: "translate(0,0)", opacity: "1" },
          "20%": { transform: "translate(-1px,1px)" },
          "40%": { transform: "translate(-2px,-1px)", opacity: "0.9" },
          "60%": { transform: "translate(1px,1px)" },
          "80%": { transform: "translate(1px,-1px)" },
          "100%": { transform: "translate(0,0)", opacity: "1" },
        },
        logLineOut: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-0.25rem)" },
        },
        logLineIn: {
          "0%": { opacity: "0", transform: "translateY(0.25rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        nodeBlink: {
          "0%, 20%": { opacity: "0.1", transform: "scale(0.9)" },
          "30%, 55%": { opacity: "1", transform: "scale(1.1)" },
          "65%, 100%": { opacity: "0.2", transform: "scale(0.95)" },
        },
        flowRight: {
          "0%": { transform: "translateX(0)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { transform: "translateX(5rem)", opacity: "0" },
        },
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
        dashAnimation: {
          "0%": {
            strokeDashoffset: 0,
          },
          "100%": {
            strokeDashoffset: 12,
          },
        },
        fadeInUp: {
          "0%": {
            opacity: 0,
            transform: "translateY(2rem)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        wave: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    addVariablesForColors,
    typographyPlugin,
    plugin(({ addVariant }) => {
      addVariant("intersect", "&:not([no-intersect])");
    }),
    require("tailwindcss-animate"),
  ],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
