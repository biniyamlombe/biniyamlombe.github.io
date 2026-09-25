# Biniyam Lombe

Academic homepage for PhD and SWE / ML applications. M.S. CS, Yale.

**[Live site](https://biniyamlombe.github.io/)**

## Local

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). That port is fixed; stop anything else using it first.

## Edit

Most copy lives in [`src/data/site.js`](src/data/site.js). Save the file and the page reloads.

- **Name, links, interests, news, education, papers, selected work, teaching:** [`src/data/site.js`](src/data/site.js)
- **About:** [`src/components/Hero.jsx`](src/components/Hero.jsx)
- **Colors and layout:** [`src/index.css`](src/index.css). Dark colors follow the operating system. There is no toggle.
- **Tab title, search description, link previews:** [`src/data/site.js`](src/data/site.js) (`description`, `summary`, `url`, `alumniOf`, `knowsAbout`, and the profile links). [`index.html`](index.html) only marks where Vite injects them.
- **Photo:** see below
- **Resume:** see below

Comments in `site.js` show how to add a paper, a project, a course, a degree, or a news item. Hosted PDFs go in `public/papers/`. Selected work, Publications, Education, and Teaching are omitted while their arrays are empty, so the page never shows a “will be listed here” stub. GitHub and Google Scholar stay in the sidebar either way.

### Photo

Keep the full-resolution original at `originals/headshot-full.jpg` — it is not served — then run:

```bash
npm run headshot                    # rebuilds from originals/headshot-full.jpg
npm run headshot -- ~/some/pic.jpg  # or from anywhere else
```

That writes `public/headshot.webp` and `public/headshot.jpg`, both 640×640. Never drop a camera-sized JPEG straight into `public/`: at 2–3 MB it outweighs the entire rest of the page. Needs `brew install webp` for the WebP half; without it the JPEG still works everywhere.

### Resume

The PDF lives in `public/` under its real name, currently
`public/Biniyam_Lombe_AI.pdf`, so anyone who saves it gets a file named after
you rather than a generic `cv.pdf`. The name is set once, as `CV_FILE` in
[`vite.config.js`](vite.config.js).

To swap it: drop the new PDF in `public/`, update `CV_FILE`, and restart the dev
server. If the file named there is missing, the sidebar row is hidden rather
than shipping a link that 404s — so the site can never advertise a CV that is
not there.

### Metadata

The search description, the link preview (Open Graph / Twitter card), the 1200×630 preview image, and the JSON-LD `Person` block are generated from [`src/data/site.js`](src/data/site.js) when the dev server or the production build runs. Edit that file, then restart `npm run dev` if the head tags do not refresh. The preview image is a PNG because link unfurls ignore SVG. `@resvg/resvg-js` is the rasterizer; Node cannot draw that card on its own.

The site URL lives in `site.url` and `public/robots.txt`. The sitemap is written at build time from `site.url`, with `lastmod` set to that day’s date. Change `site.url` and `robots.txt` together if you move off `biniyamlombe.github.io`.

Unknown addresses on GitHub Pages use [`public/404.html`](public/404.html). It is a static page, separate from the React app, so a missing PDF or path still looks like this site.

## Deploy

Pushes to `main` go live on GitHub Pages. The visit count is shared across browsers.

## Stack

React, Vite, and CSS. [Newsreader](https://fontsource.org/fonts/newsreader) and [Outfit](https://fontsource.org/fonts/outfit) via Fontsource, and Lucide for icons. The production build preloads the three latin files an English page actually uses. Scroll-in fades are ~40 lines of `IntersectionObserver` in [`src/components/Reveal.jsx`](src/components/Reveal.jsx) plus a `.reveal` rule in the CSS — no animation library. The grain overlay is omitted when the reader asks for reduced motion, and in dark mode.
