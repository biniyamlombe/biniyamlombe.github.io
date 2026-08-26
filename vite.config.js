import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Local server: http://localhost:5173
// GitHub Pages build sets GITHUB_PAGES=true so assets load under /portfolio/.
// strictPort: fail instead of hopping to 5174 if 5173 is taken.
// usePolling: pick up file saves from the editor more reliably.
export default defineConfig({
  // GitHub Pages is at /portfolio/. Local `npm run dev` stays at /.
  base: process.env.GITHUB_PAGES === 'true' ? '/portfolio/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
});
