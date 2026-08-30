import { useEffect, useState } from 'react';

/**
 * Visit counter.
 *
 * Shared across browsers and incognito. GitHub Pages has no server, so the
 * count lives at hitscounter.dev, keyed to https://biniyamlombe.github.io/.
 * Build with VITE_VISITS_API=1 to try POST /api/visits first instead, which
 * only works on a host that runs api/visits.js (Vercel plus Upstash).
 *
 * The whole component renders nothing until a real count above zero arrives,
 * so a slow or failed request shows a plain footer rather than "0 visits".
 *
 * localStorage caches the last known global count so a repeat visitor sees a
 * number immediately. It is not the source of truth.
 *
 * Hot reload and React StrictMode remounts reuse one in-flight request.
 */
const COUNT_CACHE_KEY = 'portfolio-visit-count';
const SHARED_COUNTER_HREF =
  'https://hitscounter.dev/api/hit?url=' +
  encodeURIComponent('https://biniyamlombe.github.io/') +
  '&output=json';

/**
 * localStorage throws, rather than returning null, when a browser has site
 * storage switched off. Both helpers swallow that: a missing cache costs
 * nothing, and it must never be able to take the page down.
 */
function readCachedCount() {
  try {
    const storedValue = window.localStorage.getItem(COUNT_CACHE_KEY);
    const currentCount = Number.parseInt(storedValue ?? '0', 10);
    return Number.isNaN(currentCount) ? 0 : currentCount;
  } catch {
    return 0;
  }
}

function cacheCount(count) {
  try {
    window.localStorage.setItem(COUNT_CACHE_KEY, String(count));
  } catch {
    // Storage disabled. The count still shows for this page view.
  }
}

function fetchVisitCount() {
  if (!window.__portfolioVisitPromise) {
    window.__portfolioVisitPromise = (async () => {
      // Only try our own backend where one actually exists. On GitHub Pages
      // api/visits.js is never deployed, so this request would 404 on every
      // single page load and log a red error in the console -- which anyone
      // technical who opens devtools would see. Set VITE_VISITS_API=1 at build
      // time if you move to Vercel and configure Upstash.
      if (import.meta.env.VITE_VISITS_API) {
        try {
          const response = await fetch('/api/visits', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
            const data = await response.json();
            const count = Number(data.count);
            if (!Number.isNaN(count)) {
              cacheCount(count);
              return count;
            }
          }
        } catch {
          // Backend unreachable. Fall through to the shared counter below.
        }
      }

      const response = await fetch(SHARED_COUNTER_HREF);
      if (!response.ok) {
        throw new Error(`Shared visit counter failed: ${response.status}`);
      }

      const data = await response.json();
      const count = Number(data.total_hits);
      if (Number.isNaN(count)) {
        throw new Error('Shared visit counter returned an invalid count.');
      }

      cacheCount(count);
      return count;
    })();
  }

  return window.__portfolioVisitPromise;
}

const VisitCounter = () => {
  const [visitCount, setVisitCount] = useState(() => {
    const stored = readCachedCount();
    return stored > 0 ? stored : null;
  });

  useEffect(() => {
    let isMounted = true;

    fetchVisitCount()
      .then((count) => {
        if (isMounted) setVisitCount(count);
      })
      .catch(() => {
        if (isMounted) setVisitCount(readCachedCount() || null);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Render nothing until a real count arrives. Never show "0 visits": the only
  // people who would see it are first-time visitors with nothing cached and
  // anyone whose request failed, which is the worst possible audience for it.
  // The footer reads fine as just the name and year in the meantime.
  if (visitCount === null || visitCount < 1) return null;

  return (
    <>
      <span className="visits">
        <span className="visits-count">{visitCount.toLocaleString()}</span>
        {visitCount === 1 ? ' visit' : ' visits'}
      </span>
      <span className="footer-rule" aria-hidden="true" />
    </>
  );
};

export default VisitCounter;
