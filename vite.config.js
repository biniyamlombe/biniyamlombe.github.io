import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Which CV are we linking to?
//
// The file keeps its real name rather than being renamed to cv.pdf, so that a
// recruiter who saves it ends up with Biniyam_Lombe_AI.pdf in their downloads
// instead of a generic cv.pdf among fifty others. Change CV_FILE when you swap
// the PDF, and put the new file in public/.
//
// The sidebar "CV / Resume" row is hidden when the file is not there, so the
// site can never ship a link to a missing PDF. This is read once at startup,
// so restart `npm run dev` after changing it.
const CV_FILE = 'Biniyam_Lombe_AI.pdf';
const hasCv = existsSync(fileURLToPath(new URL(`./public/${CV_FILE}`, import.meta.url)));

// Local server: http://localhost:5173
// GitHub Pages is the user site: https://biniyamlombe.github.io/
// strictPort: fail instead of hopping to 5174 if 5173 is taken.
// usePolling: pick up file saves from the editor more reliably.
export default defineConfig({
  plugins: [react()],
  define: {
    __CV_FILE__: JSON.stringify(hasCv ? CV_FILE : null),
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
