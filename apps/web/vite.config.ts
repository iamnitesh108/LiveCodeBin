import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Where the dev server forwards /api requests. Read here, on the Node side only:
// without a VITE_ prefix it never reaches the browser bundle.
const apiProxyTarget = process.env.API_PROXY_TARGET ?? 'http://localhost:3000'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Fail if the port is taken, instead of quietly moving to the next one.
    strictPort: true,
    // The browser only talks to Vite, so the API is same-origin and needs no CORS.
    proxy: {
      '/api': apiProxyTarget,
    },
  },
})
