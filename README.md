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
- **Tab title:** [`index.html`](index.html)
- **Photo:** `public/headshot.jpg`
- **Resume:** `public/cv.pdf`

Comments in `site.js` show how to add a paper, a project, a course, or a news item. Hosted PDFs go in `public/papers/`.

Drag-and-drop on the photo square is a local preview only. It is not saved.

## Deploy

Pushes to `main` go live on GitHub Pages. The visit count is shared across browsers.

## Stack

React, Vite, and CSS. [Newsreader](https://fontsource.org/fonts/newsreader) and [Outfit](https://fontsource.org/fonts/outfit) via Fontsource. Framer Motion and Lucide.
