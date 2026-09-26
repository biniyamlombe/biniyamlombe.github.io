import Reveal from './Reveal';
import { service } from '../data/site';

/**
 * Service list. Add reviewing and other service in src/data/site.js (`service`).
 * Keep newest first. An empty array renders nothing.
 */
const Service = () => {
  if (service.length === 0) return null;

  return (
    <section className="section" aria-labelledby="service-heading">
      <Reveal>
        <h2 id="service-heading">Service</h2>
        <ul className="service-list">
          {service.map((item) => (
            <li key={`${item.venue}-${item.dateTime}-${item.role}`}>
              <time dateTime={item.dateTime}>{item.date}</time>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.venue}
                </a>
              ) : (
                <span>{item.venue}</span>
              )}
              <span className="service-role">{item.role}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
};

export default Service;
