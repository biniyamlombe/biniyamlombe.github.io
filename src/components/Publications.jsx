import Reveal from './Reveal';
import { publications, scholarHref, site } from '../data/site';

/**
 * Publications list. Add papers in src/data/site.js (`publications`).
 * This file only renders them. Empty array → Scholar fallback text below.
 * Years are sorted newest first here; you do not need to sort the data file.
 */
function authorName(name) {
  const isSelf = name === site.name || name === site.shortName;
  return isSelf ? <strong key={name}>{name}</strong> : name;
}

function formatAuthors(authors) {
  return authors.map((name, index) => {
    const separator =
      index === 0 ? '' : index === authors.length - 1 ? ' and ' : ', ';
    return (
      <span key={`${name}-${index}`}>
        {separator}
        {authorName(name)}
      </span>
    );
  });
}

const Publications = () => {
  return (
    <section className="section" aria-labelledby="publications-heading">
      <Reveal>
        <h2 id="publications-heading">Publications</h2>
        {publications.length === 0 ? (
          <p className="prose">
            Papers will be listed here as they appear. You can also find me on{' '}
            <a href={scholarHref} target="_blank" rel="noopener noreferrer">
              Google Scholar
            </a>
            .
          </p>
        ) : (
          <ol className="pub-list">
            {[...publications]
              .sort((a, b) => Number(b.year) - Number(a.year))
              .map((paper) => {
                const TitleTag = paper.href ? 'a' : 'span';
                return (
                  <li key={`${paper.title}-${paper.year}`}>
                    {formatAuthors(paper.authors)}.
                    {' '}
                    <TitleTag
                      className="pub-title"
                      {...(paper.href
                        ? { href: paper.href, target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {paper.title}
                    </TitleTag>
                    .{' '}
                    <span className="pub-venue">{paper.venue}</span>
                    , {paper.year}.
                    {paper.links?.length > 0 && (
                      <span className="pub-links">
                        {paper.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith('http') ? '_blank' : undefined}
                            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          >
                            {link.label}
                          </a>
                        ))}
                      </span>
                    )}
                  </li>
                );
              })}
          </ol>
        )}
      </Reveal>
    </section>
  );
};

export default Publications;
