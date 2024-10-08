/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Inter",
      },
      boxShadow: {
        shape:
          "0px 8px 8px rgba(15, 23, 42, 0.1), /* Slate 900 */ \
           0px 4px 4px rgba(51, 65, 85, 0.1), /* Slate 700 */ \
           0px 2px 2px rgba(71, 85, 105, 0.1), /* Slate 600 */ \
           0px 0px 0px 1px rgba(100, 116, 139, 0.1), /* Slate 500 */ \
           inset 0px 0px 0px 1px rgba(255, 255, 255, 0.03), \
           inset 0px 1px 0px rgba(255, 255, 255, 0.03)",
      },
      backgroundImage: {
        pattern: "url(/bg.png)",
      },
    },
  },
  plugins: [],
};
