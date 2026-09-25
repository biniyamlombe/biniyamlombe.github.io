import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
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
  const image = `${origin}/headshot.jpg`;
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
    image,
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
    `<meta property="og:image:width" content="640" />`,
    `<meta property="og:image:height" content="640" />`,
    `<meta property="og:image:alt" content="${escapeHtml(site.name)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="profile:first_name" content="${escapeHtml(site.shortName)}" />`,
    `<meta property="profile:last_name" content="${escapeHtml(familyName)}" />`,
    `<meta name="twitter:card" content="summary" />`,
    twitterHandle ? `<meta name="twitter:creator" content="${escapeHtml(twitterHandle)}" />` : '',
    `<script type="application/ld+json">\n${json}\n    </script>`,
  ].filter(Boolean);

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
        if (req.url?.split('?')[0] !== '/sitemap.xml') return next();
        res.setHeader('Content-Type', 'application/xml');
        res.end(sitemapXml());
      });
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml() });
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
