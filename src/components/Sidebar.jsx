import { useEffect, useState } from 'react';
import { FileText, Github, GraduationCap, Linkedin, Mail, MapPin, Twitter } from 'lucide-react';
import { publicFile, site } from '../data/site';

/**
 * Left identity rail: photo, name, role, status, contact list.
 *
 * Profile photo: put the file in public/ as headshot.webp or headshot.jpg.
 *   Run `npm run headshot` to generate them. No code change.
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

const HEADSHOT_PATHS = [
  publicFile('headshot.jpg'),
  publicFile('headshot.jpeg'),
  publicFile('headshot.png'),
  publicFile('headshot.webp'),
];

function imageExists(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = src;
  });
}

const Sidebar = () => {
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadHeadshot() {
      for (const src of HEADSHOT_PATHS) {
        if (await imageExists(src)) {
          if (!cancelled) setPhoto(src);
          return;
        }
      }
    }

    loadHeadshot();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <aside className="rail" aria-label="Profile">
      <div className={`headshot${photo ? ' has-photo' : ''}`}>
        {photo && <img src={photo} alt={`${site.name} headshot`} />}
      </div>

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
