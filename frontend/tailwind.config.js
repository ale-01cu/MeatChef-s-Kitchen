/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'lg': '1090px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      'xl2': '1460px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
}