import { useEffect, useState } from 'react';

/**
 * Visit counter.
 *
 * Tries POST /api/visits (see api/visits.js + Upstash in production).
 * If that fails (local dev and GitHub Pages), counts in this browser
 * via localStorage. That value survives deploys and code edits.
 *
 * A visit is counted once per full page load. Hot reload and React
 * StrictMode remounts do not add extra visits or reset the number.
 */
const LOCAL_STORAGE_KEY = 'portfolio-visit-count';

function readStoredCount() {
  const storedValue = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  const currentCount = Number.parseInt(storedValue ?? '0', 10);
  return Number.isNaN(currentCount) ? 0 : currentCount;
}

function incrementLocalVisitCount() {
  if (window.__portfolioVisitCounted) {
    return readStoredCount();
  }

  window.__portfolioVisitCounted = true;
  const nextCount = readStoredCount() + 1;
  window.localStorage.setItem(LOCAL_STORAGE_KEY, String(nextCount));
  return nextCount;
}

const VisitCounter = () => {
  const [visitCount, setVisitCount] = useState(() => {
    const stored = readStoredCount();
    return stored > 0 ? stored : null;
  });
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadVisitCount() {
      try {
        const response = await fetch('/api/visits', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Visit counter request failed: ${response.status}`);
        }

        const data = await response.json();

        if (isMounted) {
          setVisitCount(data.count);
        }
      } catch {
        if (!isMounted) return;
        setUsingFallback(true);
        setVisitCount(incrementLocalVisitCount());
      }
    }

    loadVisitCount();

    return () => {
      isMounted = false;
    };
  }, []);

  const count = visitCount ?? 0;
  const visitWord = count === 1 ? 'visit' : 'visits';

  return (
    <span
      className={`visits${visitCount === null ? ' is-loading' : ''}`}
      title={usingFallback ? 'Count for this browser' : undefined}
    >
      <span className="visits-count">{visitCount === null ? '0' : count.toLocaleString()}</span>
      {` ${visitWord}`}
    </span>
  );
};

export default VisitCounter;
