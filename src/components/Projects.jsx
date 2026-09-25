import Reveal from './Reveal';
import { projects } from '../data/site';

/**
 * Selected work. Add projects in src/data/site.js (`projects`).
 * An empty array renders nothing, same as Teaching.
 */
const Projects = () => {
  if (projects.length === 0) return null;

  return (
    <section className="section" aria-labelledby="work-heading">
      <Reveal>
        <h2 id="work-heading">Selected work</h2>
        <ul className="work-list">
            {projects.map((project) => {
              const TitleTag = project.href ? 'a' : 'span';
              return (
                <li key={project.title}>
                  <h3>
                    <TitleTag
                      className="work-title"
                      {...(project.href
                        ? { href: project.href, target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {project.title}
                    </TitleTag>
                  </h3>
                  <p className="work-blurb">{project.blurb}</p>
                  <p className="work-meta">
                    {project.stack?.length > 0 && (
                      <span>{project.stack.join(' · ')}</span>
                    )}
                    {project.links?.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        aria-label={`${link.label}, ${project.title}`}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {link.label}
                      </a>
                    ))}
                  </p>
                </li>
              );
            })}
        </ul>
      </Reveal>
    </section>
  );
};

export default Projects;
