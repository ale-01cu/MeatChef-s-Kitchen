/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/theme");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/modal.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui()],
}