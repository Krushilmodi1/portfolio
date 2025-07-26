/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class", // ✅ THIS ENABLES CLASS-BASED DARK MODE
  theme: {
    extend: {},
  },
  plugins: [],
};
