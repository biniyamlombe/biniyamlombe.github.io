import Reveal from './Reveal';
import { education } from '../data/site';

/**
 * Education list. Add or reorder degrees in src/data/site.js (`education`).
 * Keep newest first. An empty array renders nothing.
 */
const Education = () => {
  if (education.length === 0) return null;

  return (
    <section className="section" aria-labelledby="education-heading">
      <Reveal>
        <h2 id="education-heading">Education</h2>
        <ul className="ed-list">
          {education.map((item) => (
            <li key={`${item.school}-${item.dateTime}`}>
              <time dateTime={item.dateTime}>{item.date}</time>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.school}
                </a>
              ) : (
                <span>{item.school}</span>
              )}
              <span className="ed-degree">
                {item.degree}
                {item.detail && <span className="ed-detail">{item.detail}</span>}
              </span>
              {item.thesis && (
                <p className="ed-thesis">
                  Thesis: {item.thesis.title}
                  {item.thesis.advisor && (
                    <>
                      {', supervised by '}
                      {item.thesis.href ? (
                        <a href={item.thesis.href} target="_blank" rel="noopener noreferrer">
                          {item.thesis.advisor}
                        </a>
                      ) : (
                        item.thesis.advisor
                      )}
                    </>
                  )}
                  .
                </p>
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
};

export default Education;
