import { useEffect, useRef, useState } from 'react';
import { FileText, Github, GraduationCap, ImagePlus, Linkedin, Mail, MapPin, Twitter } from 'lucide-react';
import { site } from '../data/site';

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
  const objectUrl = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    return () => {
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    };
  }, []);

  function setFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
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
