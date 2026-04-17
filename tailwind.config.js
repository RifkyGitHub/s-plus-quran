/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        's-plus-bg': '#05070a',
        's-plus-card': 'rgba(254, 240, 138, 0.05)',
        's-plus-yellow': '#fde047',
      },
    },
  },
  plugins: [],
}