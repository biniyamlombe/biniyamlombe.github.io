import Reveal from './Reveal';
import { interestsCopy } from '../data/site';

/**
 * Interests section. Change the paragraph in src/data/site.js (`interestsCopy`).
 * Heading stays "Interests" so it reads for both research and applied work.
 */
const Research = () => {
  return (
    <section className="section" aria-labelledby="interests-heading">
      <Reveal>
        <h2 id="interests-heading">Interests</h2>
        <p className="prose">{interestsCopy}</p>
      </Reveal>
    </section>
  );
};

export default Research;
