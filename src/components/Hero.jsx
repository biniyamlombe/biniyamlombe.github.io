import Reveal from './Reveal';
import { site } from '../data/site';

/**
 * About section. Edit the two paragraphs below.
 * School name, degree, and email are pulled from src/data/site.js
 * (site.school, site.schoolHref, site.degree, site.email).
 */
const Hero = () => {
  return (
    <section className="about" aria-labelledby="about-heading">
      <Reveal immediate>
        <h2 id="about-heading">About</h2>
        <div className="prose">
          <p>
            I am a computer scientist at <a href={site.schoolHref} target="_blank" rel="noopener noreferrer">{site.school}</a>, where I recently completed an {site.degree}. I work on machine learning that is capable and <em>trustworthy</em>: models that understand language and vision while protecting the people whose data trains them.
          </p>
          <p>
            I am applying to CS PhD programs for Fall 2026, and I am looking at software engineering and machine learning roles. The fastest way to reach me is by <a href={`mailto:${site.email}`}>email</a>.
          </p>
        </div>
      </Reveal>
    </section>
  );
};

export default Hero;
