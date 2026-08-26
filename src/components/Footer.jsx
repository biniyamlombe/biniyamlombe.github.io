import { site } from '../data/site';
import VisitCounter from './VisitCounter';

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
