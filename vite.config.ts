import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Project-specific port so multiple Cursor apps can run side by side.
// Prefer pinning in vite.config over relying on Vite's auto-increment.
export default defineConfig({
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
