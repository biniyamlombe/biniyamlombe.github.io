import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Is there actually a CV to link to?
//
// The sidebar "CV / Resume" row is hidden unless public/cv.pdf exists, so the
// site can never ship a link to a missing file. Drop the PDF in and the row
// comes back on the next build with no code change. This is read once at
// startup, so restart `npm run dev` after adding it.
const hasCv = existsSync(fileURLToPath(new URL('./public/cv.pdf', import.meta.url)));

// Local server: http://localhost:5173
// GitHub Pages is the user site: https://biniyamlombe.github.io/
// strictPort: fail instead of hopping to 5174 if 5173 is taken.
// usePolling: pick up file saves from the editor more reliably.
export default defineConfig({
  plugins: [react()],
  define: {
    __HAS_CV__: JSON.stringify(hasCv),
  },
  server: {
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
});
