import { motion, useReducedMotion } from 'framer-motion';
import { interestsCopy } from '../data/site';

/**
 * Interests section. Change the paragraph in src/data/site.js (`interestsCopy`).
 * Heading stays "Interests" so it reads for both research and applied work.
 */
const Research = () => {
  const reduce = useReducedMotion();

  return (
    <section className="section" aria-labelledby="interests-heading">
      <motion.div
        initial={reduce ? false : { opacity: 0, transform: 'translateY(10px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        <h2 id="interests-heading">Interests</h2>
        <p className="prose">{interestsCopy}</p>
      </motion.div>
    </section>
  );
};

export default Research;
