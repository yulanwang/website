/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'oasis-yellow': '#f0c237',
        'oasis-yellow-pastel': '#f2d16b',
        'oasis-green': '#397367',
        'oasis-green-pastel': '#a7cdbd',
        'oasis-blue': '#002642',
        'oasis-extra-dark': '#000000',
        'oasis-dark': '#1e2019',
        'oasis-gray': '#6e7e85',
        'oasis-light': '#ecf0f1',
        'oasis-extra-light': '#FFFFFF'
      },
    },
  },
  variants: {
    fill: ['hover', 'focus'],
  },
  plugins: [],
}
