import { useEffect, useState } from 'react';

/**
 * Visit counter.
 *
 * Shared across browsers and incognito. GitHub Pages has no server, so the
 * count lives at hitscounter.dev, keyed to https://biniyamlombe.github.io/.
 * If the site is later hosted on Vercel with Upstash, POST /api/visits is
 * tried first.
 *
 * localStorage only caches the last known global count so the footer does
 * not flash 0. It is not the source of truth.
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
        // GitHub Pages and local Vite do not serve /api/visits.
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

  const count = visitCount ?? 0;
  const visitWord = count === 1 ? 'visit' : 'visits';

  return (
    <span className={`visits${visitCount === null ? ' is-loading' : ''}`}>
      <span className="visits-count">{visitCount === null ? '0' : count.toLocaleString()}</span>
      {` ${visitWord}`}
    </span>
  );
};

export default VisitCounter;
