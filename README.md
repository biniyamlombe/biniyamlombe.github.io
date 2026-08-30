# Biniyam Lombe

Academic homepage for PhD and SWE / ML applications. CS MS at Yale.

**[Live site](https://biniyamlombe.github.io/)**

## Local

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). That port is fixed; stop anything else using it first.

## Edit

Most copy lives in [`src/data/site.js`](src/data/site.js). Save the file and the page reloads.

- **Name, links, interests, news, papers, selected work, teaching:** [`src/data/site.js`](src/data/site.js)
- **About:** [`src/components/Hero.jsx`](src/components/Hero.jsx)
- **Colors and layout:** [`src/index.css`](src/index.css)
- **Tab title, search description, link previews:** [`index.html`](index.html)
- **Photo:** see below
- **Resume:** `public/cv.pdf`

Comments in `site.js` show how to add a paper, a project, a course, or a news item. Hosted PDFs go in `public/papers/`.

### Photo

Keep the full-resolution original at `originals/headshot-full.jpg` — it is not served — then run:

```bash
npm run headshot                    # rebuilds from originals/headshot-full.jpg
npm run headshot -- ~/some/pic.jpg  # or from anywhere else
```

That writes `public/headshot.webp` and `public/headshot.jpg`, both 640×640. Never drop a camera-sized JPEG straight into `public/`: at 2–3 MB it outweighs the entire rest of the page. Needs `brew install webp` for the WebP half; without it the JPEG still works everywhere.

### Metadata

`index.html` carries the search description, the link preview (Open Graph / Twitter card), and a JSON-LD `Person` block that ties this page to your Scholar, GitHub, and LinkedIn profiles. If you change your bio, affiliation, or links in `site.js`, update `index.html` to match — it is plain HTML and cannot read from `site.js`.

The site URL is hardcoded in `index.html`, `public/robots.txt`, and `public/sitemap.xml`. Change all three together if you move off `biniyamlombe.github.io`.

## Deploy

Pushes to `main` go live on GitHub Pages. The visit count is shared across browsers.

## Stack

React, Vite, and CSS. [Newsreader](https://fontsource.org/fonts/newsreader) and [Outfit](https://fontsource.org/fonts/outfit) via Fontsource, and Lucide for icons. Scroll-in fades are ~40 lines of `IntersectionObserver` in [`src/components/Reveal.jsx`](src/components/Reveal.jsx) plus a `.reveal` rule in the CSS — no animation library.
