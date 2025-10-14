import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Se for usar domínio customizado (gaoliver-music.com)
  // base: '/gaoliver-music/', // Se for usar github.io/gaoliver-music
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild', // Faster and built-in
  },
})
