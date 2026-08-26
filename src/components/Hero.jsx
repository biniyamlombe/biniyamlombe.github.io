import { motion, useReducedMotion } from 'framer-motion';
import { site } from '../data/site';

/**
 * About section. Edit the two paragraphs below.
 * School name, degree, and email are pulled from src/data/site.js
 * (site.school, site.schoolHref, site.degree, site.email).
 */
const Hero = () => {
  const reduce = useReducedMotion();

  return (
    <section className="about" aria-labelledby="about-heading">
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
      >
        <h2 id="about-heading">About</h2>
        <div className="prose">
          <p>
            I am a computer scientist at <a href={site.schoolHref} target="_blank" rel="noopener noreferrer">{site.school}</a>, where I recently completed an {site.degree}. I work on machine learning that is capable and <em>trustworthy</em>: models that understand language and vision while protecting the people whose data trains them.
          </p>
          <p>
            I am applying to PhD programs, with a focus on natural language processing, computer vision, privacy-preserving ML, and ML security. The fastest way to reach me is by <a href={`mailto:${site.email}`}>email</a>.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
