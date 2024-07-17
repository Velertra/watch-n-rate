import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@styles': '/client/src/styles',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    /* setupFiles: './src/tests/setup.js', */
  },
})
