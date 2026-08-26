# Biniyam Lombe

Personal academic homepage: left identity rail, then About, Interests, News, and Publications.

## Tech stack

| Layer | Choice |
| --- | --- |
| UI | React 19 |
| Bundler and dev server | Vite 7 (`@vitejs/plugin-react`) |
| Styling | Vanilla CSS in `src/index.css` (no Tailwind) |
| Type | [Newsreader](https://fontsource.org/fonts/newsreader) (serif) and [Outfit](https://fontsource.org/fonts/outfit) (sans), via Fontsource variable fonts |
| Motion | Framer Motion |
| Icons | Lucide React |
| Lint | ESLint 9 with React Hooks and React Refresh plugins |
| Visit count (production) | Vercel-style serverless function in `api/visits.js` plus [Upstash Redis](https://upstash.com/) |

There is no backend framework, database, or CSS library beyond that. Content is plain JavaScript in `src/data/site.js`. Each source file also has comments that say what to edit and how to add a paper, news item, link, photo, or section.

## Requirements

- Node.js 20 or newer (LTS is fine)
- npm (ships with Node)

Check with:

```bash
node -v
npm -v
```

## Run locally

From the project root:

```bash
npm install
npm run dev
```

Vite serves the site at **http://localhost:5173/**. That port is fixed in `vite.config.js`. If something else is already using 5173, stop it or the dev server will not start.

The page hot-reloads when you save files under `src/`.

### Other commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local site |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

Do not commit `node_modules/` or `dist/`. Both are gitignored.

## How the page is put together

```
src/App.jsx
  Sidebar          photo, name, role, status, contact list
  Hero             About
  Research         Interests
  News             dated updates (newest first)
  Publications     papers (or a Scholar fallback)
  Footer           visit count and copyright
```

Copy and links come from `src/data/site.js`. Layout and colors live in `src/index.css`.

## Edit content

Almost all text you would change is in **`src/data/site.js`**. Save the file and the browser should refresh.

### Name, role, and contact

The `site` object drives the left rail and the About copy:

- `name`, `shortName`, `role`, `availability`
- `degree`, `school`, `schoolHref` (used in About)
- `email` (mailto links)
- `contacts`: each item needs `name`, `href`, and `icon`

Supported `icon` values: `map`, `mail`, `scholar`, `github`, `linkedin`, `twitter`, `cv`.

Example contact row:

```js
{ name: 'GitHub', href: 'https://github.com/biniyamlombe', icon: 'github' }
```

### About

The About paragraphs are in `src/components/Hero.jsx`. They pull school, degree, and email from `site`. Change wording there if you want different bio text.

### Interests

Edit `interestsCopy` in `src/data/site.js`. It is one paragraph rendered under the Interests heading.

### Publications

Edit the `publications` array in `src/data/site.js`. If the array is empty, the page shows a short note plus a Google Scholar link. Papers are shown newest year first.

Add a paper like this:

```js
export const publications = [
  {
    title: 'Paper title',
    authors: ['Biniyam Lombe', 'Collaborator Name'],
    venue: 'Conference or journal',
    year: 2026,
    href: 'https://arxiv.org/abs/0000.00000',
    links: [
      { label: 'PDF', href: publicFile('papers/example.pdf') },
      { label: 'Code', href: 'https://github.com/biniyamlombe/example' },
    ],
  },
];
```

- `href` is optional. If set, the title becomes a link (usually arXiv or the PDF).
- `links` is optional. Use it for PDF, code, slides, and so on.
- Your name is bolded when it matches `site.name` or `site.shortName`.
- Put PDFs you want to host in `public/papers/` and link them with `publicFile('papers/your-file.pdf')`.

### News

Edit the `news` array. Keep newest items first.

```js
{
  date: 'Aug 2026',
  parts: [
    { text: 'Completed my M.S. in Computer Science at ' },
    { text: 'Yale', href: 'https://www.cs.yale.edu/' },
    { text: '.' },
  ],
  notes: [
    'Optional bullet under the main line.',
  ],
}
```

- `parts` is the main sentence. A part with `href` becomes a link.
- `notes` is optional. Each string is a bullet under that item.

### Title and meta description

The browser tab title and search description are in `index.html`.

## Photo

Put your file here (no code change):

```
public/headshot.jpg
```

`.jpeg`, `.png`, and `.webp` work too if the name is still `headshot`. Refresh the page. The left rail loads it on its own.

Click or drag onto the square is only a **local preview**. It is not saved and clears on refresh.

## Resume / CV

Put your file here (no code change):

```
public/cv.pdf
```

The sidebar **CV** link uses `publicFile('cv.pdf')`. Until the file is there, that link 404s.

If you prefer `resume.pdf`, save it as `public/resume.pdf` and change that call to `publicFile('resume.pdf')`.

## Look and feel

`src/index.css` is the full design system: white background, terracotta links, two-column layout, type scale. There is no separate theme file.

Useful tokens at the top of that file:

- `--surface` background (white)
- `--text` body color
- `--accent` links and dates
- `--display` serif (Newsreader)
- `--sans` sans (Outfit)

## Visit counter

The footer posts to `/api/visits`.

- **Local:** that route does not exist, so the counter stores a count in `localStorage` for this browser only.
- **Production (Vercel):** `api/visits.js` increments a Redis key. Set these environment variables on the host:

  - `UPSTASH_REDIS_REST_URL`
  - `UPSTASH_REDIS_REST_TOKEN`

Without those variables, production also falls back to the browser count.

## Deploy

### GitHub Pages

Pushes to `main` build and publish the site at:

https://biniyamlombe.github.io/portfolio/

GitHub Pages is static only. It will not run `api/visits.js`, so the footer uses the browser `localStorage` count.

### Vercel

1. `npm run build` produces `dist/`.
2. Import the repo as a Vite project. `api/visits.js` is picked up as an API route.
3. Add `public/cv.pdf` before you care about the CV link.
4. Set the Upstash variables if you want a global visit count.

## Project layout

```
├── .github/workflows/     GitHub Pages deploy
├── api/visits.js          Visit counter (production)
├── public/                Static files (favicon, cv.pdf)
├── src/
│   ├── App.jsx            Page shell
│   ├── main.jsx           React entry
│   ├── index.css          All styles
│   ├── data/site.js       All copy and links
│   └── components/        Sidebar, sections, footer
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

Start with `src/data/site.js` for copy, `src/index.css` for appearance, and `src/components/` only if you are changing structure.
