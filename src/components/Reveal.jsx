import { useEffect, useRef, useState } from 'react';

/**
 * Fades a section in the first time it scrolls into view.
 *
 * This is the whole animation system for the site. The motion itself lives in
 * `.reveal` in src/index.css, which is wrapped in a
 * `prefers-reduced-motion: no-preference` block, so readers who ask their OS
 * for less motion simply see the content already in place.
 *
 * Use `immediate` for anything above the fold: it skips the observer so the
 * first screen is never waiting on a scroll event.
 *
 * Every section is visible if the observer never runs (old browser, JS error
 * mid-page), because `.reveal` only hides itself once .is-visible can be set.
 */
const canObserve =
  typeof window !== 'undefined' && typeof window.IntersectionObserver === 'function';

const Reveal = ({ immediate = false, className = '', children, ...rest }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(immediate || !canObserve);

  useEffect(() => {
    const node = ref.current;
    if (shown || !node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -4% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <div ref={ref} className={`reveal${shown ? ' is-visible' : ''} ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
};

export default Reveal;
