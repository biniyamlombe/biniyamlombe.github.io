import { motion, useReducedMotion } from 'framer-motion';
import { awards } from '../data/site';

/**
 * Awards list. Add or reorder items in src/data/site.js (`awards`).
 * Keep newest first in that array.
 */
const Awards = () => {
  const reduce = useReducedMotion();

  if (awards.length === 0) return null;

  return (
    <section className="section" aria-labelledby="awards-heading">
      <motion.div
        initial={reduce ? false : { opacity: 0, transform: 'translateY(10px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        <h2 id="awards-heading">Awards</h2>
        <ul className="award-list">
          {awards.map((award) => (
            <li key={`${award.year}-${award.name}`}>
              <time>{award.year}</time>
              <span className="teach-code">{award.org}</span>
              {award.href ? (
                <a
                  className="teach-title"
                  href={award.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {award.name}
                </a>
              ) : (
                <span className="teach-title">{award.name}</span>
              )}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
};

export default Awards;
