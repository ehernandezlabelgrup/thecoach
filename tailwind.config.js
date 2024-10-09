/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        hongkong: ["hongkong", "sans-serif"],
        proximanova: ["proxima-nova", "sans-serif"],
      },
    },
  },
  plugins: [],
}