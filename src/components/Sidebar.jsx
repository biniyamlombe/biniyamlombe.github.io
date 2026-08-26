import { useEffect, useRef, useState } from 'react';
import { FileText, Github, GraduationCap, ImagePlus, Linkedin, Mail, MapPin, Twitter } from 'lucide-react';
import { publicFile, site } from '../data/site';

/**
 * Left identity rail: photo, name, role, status, contact list.
 *
 * Profile photo: put the file in public/ as headshot.jpg
 *   (or headshot.jpeg / headshot.png / headshot.webp). No code change.
 *   Drag-and-drop on the square is a temporary preview only.
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
  const objectUrl = useRef(null);
  const userPicked = useRef(false);
  const [photo, setPhoto] = useState(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadHeadshot() {
      for (const src of HEADSHOT_PATHS) {
        if (await imageExists(src)) {
          if (!cancelled && !userPicked.current) setPhoto(src);
          return;
        }
      }
    }

    loadHeadshot();

    return () => {
      cancelled = true;
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    };
  }, []);

  function setFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    userPicked.current = true;
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    objectUrl.current = URL.createObjectURL(file);
    setPhoto(objectUrl.current);
  }

  function onDrop(event) {
    event.preventDefault();
    setDragging(false);
    setFile(event.dataTransfer.files?.[0]);
  }

  return (
    <aside className="rail" aria-label="Profile">
      <label
        className={`headshot${photo ? ' has-photo' : ''}${dragging ? ' is-dragging' : ''}`}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        <input
          className="sr-only"
          type="file"
          accept="image/*"
          aria-label="Upload a headshot"
          onChange={(event) => setFile(event.target.files?.[0])}
        />
        {photo ? (
          <img src={photo} alt={`${site.name} headshot`} />
        ) : (
          <span className="headshot-empty">
            <ImagePlus size={20} strokeWidth={1.5} aria-hidden="true" />
            Add a photo
          </span>
        )}
      </label>

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
