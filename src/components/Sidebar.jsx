import { FileText, Github, GraduationCap, Linkedin, Mail, MapPin, Twitter } from 'lucide-react';
import { publicFile, site } from '../data/site';

/**
 * Left identity rail: photo, name, role, status, contact list.
 *
 * Profile photo: public/headshot.webp (preferred) and public/headshot.jpg
 *   (fallback for old browsers). Both are square and 640x640, which is 2x the
 *   264px the rail draws. Keep the full-resolution original in originals/ and
 *   regenerate the two served files when you swap the photo — see README.
 *
 * Resume: put the file in public/ as cv.pdf. The CV row in site.contacts
 *   already uses publicFile('cv.pdf').
 *
 * Name, role, and links: src/data/site.js
 *
 * New contact icon: import the Lucide icon, add it to `icons` below,
 * then use that key as icon: 'yourkey' in site.contacts.
 */
const icons = {
  map: MapPin,
  mail: Mail,
  scholar: GraduationCap,
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  cv: FileText,
};

const Sidebar = () => {
  return (
    <aside className="rail" aria-label="Profile">
      <picture className="headshot">
        <source srcSet={publicFile('headshot.webp')} type="image/webp" />
        <img
          src={publicFile('headshot.jpg')}
          alt={`${site.name}, ${site.role}`}
          width="640"
          height="640"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      <h1 className="rail-name">{site.name}</h1>
      <p className="rail-role">{site.role}</p>

      <p className="status-pill">
        <span className="status-dot" aria-hidden="true" />
        {site.availability}
      </p>

      <nav className="rail-list" aria-label="Contact and profiles">
        {site.contacts.map((item) => {
          const Icon = icons[item.icon];
          const external = item.href.startsWith('http');
          return (
            <a
              key={item.name}
              href={item.href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
            >
              <Icon size={15} strokeWidth={1.6} aria-hidden="true" />
              {item.name}
            </a>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
