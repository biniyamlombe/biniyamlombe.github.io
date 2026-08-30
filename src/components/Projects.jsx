import Reveal from './Reveal';
import { githubHref, projects } from '../data/site';

/**
 * Selected work. Add projects in src/data/site.js (`projects`).
 * Empty array → GitHub fallback text below.
 */
const Projects = () => {
  return (
    <section className="section" aria-labelledby="work-heading">
      <Reveal>
        <h2 id="work-heading">Selected work</h2>
        {projects.length === 0 ? (
          <p className="prose">
            Selected systems and products will be listed here. You can also find code on{' '}
            <a href={githubHref} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            .
          </p>
        ) : (
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
        )}
      </Reveal>
    </section>
  );
};

export default Projects;
