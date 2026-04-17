/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        's-plus-bg': '#020617',
        's-plus-card': '#0f172a',
        's-plus-accent': '#10b981',
      },
      fontFamily: {
        arabic: ['Amiri', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      }
    },
  },
  plugins: [react()],
  base: "/s-plus-quran/"
  
}