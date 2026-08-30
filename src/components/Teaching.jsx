import Reveal from './Reveal';
import { teaching } from '../data/site';

/**
 * Teaching list. Add or reorder courses in src/data/site.js (`teaching`).
 * Keep newest terms first in that array.
 */
function courseNames(course) {
  if (Array.isArray(course.titles) && course.titles.length > 0) return course.titles;
  return course.title ? [course.title] : [];
}

const Teaching = () => {
  if (teaching.length === 0) return null;

  return (
    <section className="section" aria-labelledby="teaching-heading">
      <Reveal>
        <h2 id="teaching-heading">Teaching</h2>
        <ul className="teach-list">
          {teaching.map((course) => {
            const names = courseNames(course);
            return (
              <li
                key={`${course.code}-${course.term}`}
                className={names.length > 1 ? 'has-stack' : undefined}
              >
                <time dateTime={course.dateTime}>
                  {course.until ? `${course.term} - ${course.until}` : course.term}
                </time>
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
                {names.length > 1 ? (
                  <ul className="teach-title teach-titles">
                    {names.map((name) => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="teach-title">{names[0]}</span>
                )}
                {course.role && <span className="teach-role">{course.role}</span>}
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
};

export default Teaching;
