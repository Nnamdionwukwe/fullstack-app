// vite.config.js
import { defineConfig } = require('vite');
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy requests starting with '/api' to the target URL
      '/api': {
        target: 'https://mall-ecommerce-api-production.up.railway.app',
        changeOrigin: true, // Needed for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove the /api prefix when sending to the target
      },
    },
  },
});
