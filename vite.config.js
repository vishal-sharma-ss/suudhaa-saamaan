import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for React app
// This tells Vite how to build and serve your React application
export default defineConfig({
  plugins: [react()],
  
  // Server configuration for development
  server: {
    port: 3000,
    open: true
  },
  
  // Build configuration for production
  build: {
    outDir: 'dist',
    sourcemap: false
  }
}) 