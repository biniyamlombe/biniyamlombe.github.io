import { motion, useReducedMotion } from 'framer-motion';
import { teaching } from '../data/site';

/**
 * Teaching list. Add or reorder courses in src/data/site.js (`teaching`).
 * Keep newest terms first in that array.
 */
const Teaching = () => {
  const reduce = useReducedMotion();

  if (teaching.length === 0) return null;

  return (
    <section className="section" aria-labelledby="teaching-heading">
      <motion.div
        initial={reduce ? false : { opacity: 0, transform: 'translateY(10px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        <h2 id="teaching-heading">Teaching</h2>
        <ul className="teach-list">
          {teaching.map((course) => (
            <li key={`${course.code}-${course.term}`}>
              <time>{course.term}</time>
              {course.href ? (
                <a
                  className="teach-code"
                  href={course.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {course.code}
                </a>
              ) : (
                <span className="teach-code">{course.code}</span>
              )}
              <span className="teach-title">{course.title}</span>
              {course.role && <span className="teach-role">{course.role}</span>}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
};

export default Teaching;
