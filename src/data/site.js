/**
 * SITE CONTENT
 *
 * Change copy and links here first. Save the file; the local site should refresh.
 * Full walkthrough: README.md
 *
 * Do not invent papers. Add a publication only when you have a real title and venue.
 *
 * PROFILE PHOTO
 *   Save your picture as:  public/headshot.jpg
 *   Also accepted in public/: headshot.jpeg, headshot.png, headshot.webp
 *   Refresh the page. The left-rail square loads it automatically.
 *   Click-or-drag on the square is a local preview only and is not saved.
 *
 * RESUME / CV
 *   Save your PDF as:  public/cv.pdf
 *   The sidebar "CV" row already links to /cv.pdf.
 *   If you name it resume.pdf instead, put it at public/resume.pdf and
 *   change the CV href below from '/cv.pdf' to '/resume.pdf'.
 */

export const site = {
  name: 'Biniyam Lombe',
  // Used to bold your name in publication author lists. Keep this as your first name.
  shortName: 'Biniyam',
  role: 'CS MS @ Yale',
  degree: 'M.S. in Computer Science',
  school: 'Yale University',
  email: 'biniyam.lombe@yale.edu',
  location: 'New Haven, CT',
  mapsUrl: 'https://maps.app.goo.gl/WSAzsdBWbeH9uUxF9',
  availability: 'Seeking PhD, Fall 2026',
  schoolHref: 'https://www.cs.yale.edu/',
  /**
   * Left-rail links. Add a row by copying an object below.
   * icon must be one of: map, mail, scholar, github, linkedin, twitter, cv
   * (To support a new icon name, also add it to the `icons` map in Sidebar.jsx.)
   *
   * Resume/CV: public/cv.pdf  →  href: '/cv.pdf'
   */
  contacts: [
    { name: 'New Haven, CT', href: 'https://maps.app.goo.gl/WSAzsdBWbeH9uUxF9', icon: 'map' },
    { name: 'biniyam.lombe@yale.edu', href: 'mailto:biniyam.lombe@yale.edu', icon: 'mail' },
    { name: 'Google Scholar', href: 'https://scholar.google.com/scholar?q=Biniyam+Lombe', icon: 'scholar' },
    { name: 'GitHub', href: 'https://github.com/biniyamlombe', icon: 'github' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/biniyamlombe', icon: 'linkedin' },
    { name: 'Twitter', href: 'https://x.com/biniyamlombe', icon: 'twitter' },
    { name: 'CV', href: '/cv.pdf', icon: 'cv' },
  ],
};

export const scholarHref = site.contacts.find((item) => item.icon === 'scholar')?.href;

/** Interests paragraph. Replace this string to change that section. */
export const interestsCopy =
  'I am interested in natural language processing, computer vision, privacy-preserving machine learning, and ML security. That includes language models and multilingual understanding, visual representation learning, differential privacy and federated learning, and adversarial robustness.';

/**
 * PUBLICATIONS
 *
 * Add objects to this array. Newest year is shown first automatically.
 * If the array stays empty, the page shows a Google Scholar fallback instead.
 *
 * Copy this object, fill it in, and paste it into the array:
 *
 * {
 *   title: 'Paper title',
 *   authors: ['Biniyam Lombe', 'Collaborator Name'],
 *   venue: 'NeurIPS',
 *   year: 2026,
 *   href: 'https://arxiv.org/abs/0000.00000',
 *   links: [
 *     { label: 'PDF', href: '/papers/your-file.pdf' },
 *     { label: 'Code', href: 'https://github.com/biniyamlombe/your-repo' },
 *   ],
 * }
 *
 * Optional: href (title link), links (PDF / code / slides).
 * Host a PDF yourself: put it in public/papers/ and use href '/papers/your-file.pdf'.
 */
export const publications = [];

/**
 * NEWS
 *
 * Add items at the top of this array (newest first).
 *
 * date: short label shown in terracotta, e.g. 'Aug 2026'
 * parts: the main sentence, split so links can sit in the middle
 *   { text: 'plain words' }
 *   { text: 'Yale', href: 'https://www.cs.yale.edu/' }
 * notes: optional bullets under that item
 *
 * Example to copy:
 *
 * {
 *   date: 'Sep 2026',
 *   parts: [
 *     { text: 'Paper accepted at ' },
 *     { text: 'NeurIPS', href: 'https://neurips.cc/' },
 *     { text: '.' },
 *   ],
 *   notes: ['Optional extra line.'],
 * }
 */
export const news = [
  {
    date: 'Aug 2026',
    parts: [
      { text: 'Applying to CS PhD programs. Happy to talk about trustworthy ML, privacy, and security.' },
    ],
    notes: [
      'Interests: language models, vision, differential privacy, and adversarial robustness.',
    ],
  },
  {
    date: 'May 2026',
    parts: [
      { text: 'Completed my M.S. in Computer Science at ' },
      { text: 'Yale', href: 'https://www.cs.yale.edu/' },
      { text: '.' },
    ],
    notes: [
      'Coursework and research at the seam of machine learning, privacy, and security.',
    ],
  },
];
