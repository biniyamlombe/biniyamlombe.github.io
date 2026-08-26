import { useEffect, useState } from 'react';

/**
 * Visit counter.
 *
 * Tries POST /api/visits (see api/visits.js + Upstash in production).
 * If that fails (local dev), counts in this browser via localStorage.
 *
 * You usually do not need to edit this file. To change the label, edit
 * the JSX at the bottom. To change the look, edit .visits in src/index.css.
 */
const LOCAL_STORAGE_KEY = 'portfolio-visit-count';

function getLocalVisitCount() {
  const storedValue = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  const currentCount = Number.parseInt(storedValue ?? '0', 10);
  const nextCount = Number.isNaN(currentCount) ? 1 : currentCount + 1;

  window.localStorage.setItem(LOCAL_STORAGE_KEY, String(nextCount));
  return nextCount;
}

const VisitCounter = () => {
  const [visitCount, setVisitCount] = useState(null);
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
        setVisitCount(getLocalVisitCount());
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
