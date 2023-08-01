/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: { xs: "480px" },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      colors: {
        "oa-yellow": "#f0c237",
        "oa-yellow-pastel": "#f2d16b",
        "oa-green": "#397367",
        "oa-green-pastel": "#a7cdbd",
        "oa-blue": "#002642",
        "oa-extra-dark": "#000000",
        "oa-dark": "#1e2019",
        "oasis-gray": "#6e7e85",
        "oa-light": "#ecf0f1",
        "oa-extra-light": "#FFFFFF",
        "ex-dark": "#195BA8",
        "ex-blue-dark": "#0B78B6",
        "ex-blue": "#4DaDe2",
        "ex-blue-pastel": "#C1Ebf4",
        "ex-orange": "#f5d88c",
        "ex-orange-pastel": "#ffbc6d",

      },
      fontFamily: {
        sans: "brandon grotesque",
      },
    },
  },
  variants: {
    fill: ["hover", "focus"],
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
    plugin(function ({ addBase, theme }) {
      // addBase({
      //   h1: { fontSize: theme("fontSize.6xl"), marginBottom: "0.25rem" },
      // });
    }),
  ],
};
