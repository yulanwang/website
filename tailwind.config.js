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
        "oasis-yellow": "#f0c237",
        "oasis-yellow-pastel": "#f2d16b",
        "oasis-green": "#397367",
        "oasis-green-pastel": "#a7cdbd",
        "oasis-blue": "#002642",
        "oasis-extra-dark": "#000000",
        "oasis-dark": "#1e2019",
        "oasis-gray": "#6e7e85",
        "oasis-light": "#ecf0f1",
        "oasis-extra-light": "#FFFFFF",
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
      addBase({
        h1: { fontSize: theme("fontSize.6xl"), marginBottom: "0.25rem" },
      });
    }),
  ],
};
