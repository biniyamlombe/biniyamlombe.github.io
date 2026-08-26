import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Local server: http://localhost:5173
// strictPort: fail instead of hopping to 5174 if 5173 is taken.
// usePolling: pick up file saves from the editor more reliably.
export default defineConfig({
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
