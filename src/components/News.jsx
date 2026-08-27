import { motion, useReducedMotion } from 'framer-motion';
import { news } from '../data/site';

/**
 * News list. Add or reorder items in src/data/site.js (`news`).
 * Keep newest entries first in that array.
 */
const News = () => {
  const reduce = useReducedMotion();

  return (
    <section className="section news" aria-labelledby="news-heading">
      <motion.div
        initial={reduce ? false : { opacity: 0, transform: 'translateY(12px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      >
        <h2 id="news-heading">News</h2>
        <ul className="news-feed">
          {news.map((item) => (
            <li key={item.date + item.parts[0].text}>
              <p>
                <time>{item.date}</time>
                {item.parts.map((part) => (
                  part.href ? (
                    <a key={part.text} href={part.href} target="_blank" rel="noopener noreferrer">
                      {part.text}
                    </a>
                  ) : (
                    <span key={part.text}>{part.text}</span>
                  )
                ))}
              </p>
              {item.notes?.length > 0 && (
                <ul>
                  {item.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
};

export default News;
