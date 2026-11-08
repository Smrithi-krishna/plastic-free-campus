import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/plastic-free-campus/',
  server: {
    port: 5173,
    open: true
  }
})