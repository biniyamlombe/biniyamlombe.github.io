# Biniyam Lombe

Academic homepage for [Biniyam Lombe](https://github.com/biniyamlombe): CS MS at Yale, seeking a PhD for Fall 2026. Built with React and Vite.

## Local development

```bash
npm install
npm run dev
```

The site runs at [http://localhost:5173](http://localhost:5173).

```bash
npm run build
npm run preview
```

## Content

Copy, links, news, and publications live in `src/data/site.js`. Drop a CV at `public/cv.pdf`. The headshot on the site is a local upload for preview only and is not saved.

Visit counts use `api/visits.js` when Upstash Redis is configured (`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`). Locally the counter falls back to this browser.
