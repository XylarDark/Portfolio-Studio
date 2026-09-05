import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Project-specific port so multiple Cursor apps can run side by side.
// Prefer pinning in vite.config over relying on Vite's auto-increment.
// VITE_BASE_PATH is set in CI for GitHub Pages (e.g. /Portfolio-Studio/).
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5280,
    strictPort: true,
  },
  preview: {
    host: '127.0.0.1',
    port: 5280,
    strictPort: true,
  },
})
