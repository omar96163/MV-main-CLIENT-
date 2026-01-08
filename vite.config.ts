import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  root: '.', // Make sure root is correct
  build: {
    outDir: 'dist'
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },

  server: {
  proxy: {
    '/api': {
      target: 'https://mv-main-server.vercel.app',
      changeOrigin: true,
    },
    '/auth': {
      target: 'https://mv-main-server.vercel.app',
      changeOrigin: true,
    },
    '/dashboard': {
        target: 'https://mv-main-server.vercel.app',
        changeOrigin: true,
      },
  },
}

});

