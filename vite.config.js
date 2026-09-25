import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { Resvg } from '@resvg/resvg-js';
import { site } from './src/data/site.js';

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
function wrapLines(text, maxChars) {
  const lines = [];
  let current = '';
  for (const word of String(text).split(/\s+/)) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 3);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;');
}

// Writes the document head from src/data/site.js so index.html cannot drift.
function siteMeta() {
  const origin = site.url.replace(/\/$/, '');
  const pageUrl = `${origin}/`;
  const image = `${origin}/og.png`;
  const portrait = `${origin}/headshot.jpg`;
  const title = `${site.name} — ${site.role}`;
  const familyName = site.name.startsWith(`${site.shortName} `)
    ? site.name.slice(site.shortName.length).trim()
    : site.name;
  const sameAs = site.contacts
    .filter((item) => item.href.startsWith('http') && item.icon !== 'map')
    .map((item) => item.href);
  const twitter = site.contacts.find((item) => item.icon === 'twitter');
  const twitterHandle = twitter
    ? `@${new URL(twitter.href).pathname.split('/').filter(Boolean)[0]}`
    : '';
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    givenName: site.shortName,
    familyName,
    url: pageUrl,
    image: portrait,
    email: `mailto:${site.email}`,
    alumniOf: site.alumniOf.map((school) => ({
      '@type': 'CollegeOrUniversity',
      name: school.name,
      url: school.url,
    })),
    knowsAbout: site.knowsAbout,
    sameAs,
  };
  const json = JSON.stringify(person, null, 2).replaceAll('<', '\\u003c');
  const tags = [
    `<title>${escapeHtml(site.name)}</title>`,
    `<meta name="description" content="${escapeHtml(site.description)}" />`,
    `<meta name="author" content="${escapeHtml(site.name)}" />`,
    `<link rel="canonical" href="${escapeHtml(pageUrl)}" />`,
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:site_name" content="${escapeHtml(site.name)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(site.summary)}" />`,
    `<meta property="og:url" content="${escapeHtml(pageUrl)}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(title)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="profile:first_name" content="${escapeHtml(site.shortName)}" />`,
    `<meta property="profile:last_name" content="${escapeHtml(familyName)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
    twitterHandle ? `<meta name="twitter:creator" content="${escapeHtml(twitterHandle)}" />` : '',
    `<script type="application/ld+json">\n${json}\n    </script>`,
  ].filter(Boolean);

  const cardPng = () => {
    const headshot = fileURLToPath(new URL('./public/headshot.jpg', import.meta.url));
    const newsreader = fileURLToPath(new URL('./assets/fonts/Newsreader.ttf', import.meta.url));
    const outfit = fileURLToPath(new URL('./assets/fonts/Outfit.ttf', import.meta.url));
    const lines = wrapLines(site.summary, 42);
    const summary = lines.map((line, index) => (
      `<text x="688" y="${400 + index * 40}" fill="#171615" font-family="Outfit" font-size="26">${escapeHtml(line)}</text>`
    )).join('\n');
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f7f4f0"/>
  <image href="${escapeHtml(headshot)}" x="0" y="0" width="630" height="630" preserveAspectRatio="xMidYMid slice"/>
  <rect x="630" width="8" height="630" fill="#9b3d32"/>
  <text x="688" y="250" fill="#171615" font-family="Newsreader" font-size="64" font-weight="600">${escapeHtml(site.name)}</text>
  <text x="688" y="312" fill="#5c5853" font-family="Outfit" font-size="28">${escapeHtml(site.role)}</text>
  ${summary}
</svg>`;
    return new Resvg(svg, {
      fitTo: { mode: 'width', value: 1200 },
      font: {
        fontFiles: [newsreader, outfit],
        loadSystemFonts: false,
      },
    }).render().asPng();
  };

  const sitemapXml = () => {
    const lastmod = new Date().toISOString().slice(0, 10);
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${pageUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
  };

  return {
    name: 'site-meta',
    transformIndexHtml(html) {
      const block = tags.map((tag) => `    ${tag}`).join('\n');
      return html.replace(/\n[ \t]*<!-- site-meta -->/, `\n${block}`);
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split('?')[0];
        if (path === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml');
          res.end(sitemapXml());
          return;
        }
        if (path === '/og.png') {
          res.setHeader('Content-Type', 'image/png');
          res.end(cardPng());
          return;
        }
        next();
      });
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml() });
      this.emitFile({ type: 'asset', fileName: 'og.png', source: cardPng() });
    },
  };
}

export default defineConfig({
  plugins: [react(), siteMeta()],
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
