import { site } from '../data/site';
import VisitCounter from './VisitCounter';

/**
 * Footer: visit count + name and year.
 * Name comes from site.name. Year is the current calendar year.
 * Visit count UI: VisitCounter.jsx. Production backend: api/visits.js.
 * Colors for this pill: .colophon in src/index.css
 */
const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="colophon">
        <VisitCounter />
        <span className="footer-rule" aria-hidden="true" />
        <p className="copyright">
          {site.name}
          <span className="copyright-mark"> © </span>
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
