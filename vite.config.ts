import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/Dashboard': {
        //target: 'http://192.168.1.14:5000/api',  // backend portunu buraya yaz
        target: process.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  
   build: {
    outDir: 'dist',
    sourcemap: false, // Production'da sourcemap kapalı (güvenlik)
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
        if (id.includes('node_modules')) {
          if (id.includes('@mui')) {
            return 'mui'
          }

          if (
            id.includes('react') ||
            id.includes('react-dom') ||
            id.includes('react-router-dom')
          ) {
            return 'vendor'
          }
        }
      },
    },
  },
    chunkSizeWarningLimit: 1000,
  },
  
})
