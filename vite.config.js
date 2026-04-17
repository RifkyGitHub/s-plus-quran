import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/s-plus-quran/", // Pastikan ini sesuai dengan nama repo GitHub kamu
})