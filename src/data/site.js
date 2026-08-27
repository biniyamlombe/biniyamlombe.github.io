/**
 * SITE CONTENT
 *
 * Change copy and links here first. Save the file; the local site should refresh.
 * Full walkthrough: README.md
 *
 * Do not invent papers or projects. Add an item only when you have a real title and link.
 *
 * PROFILE PHOTO
 *   Save your picture as:  public/headshot.jpg
 *   Also accepted in public/: headshot.jpeg, headshot.png, headshot.webp
 *   Refresh the page. The left-rail square loads it automatically.
 *   Click-or-drag on the square is a local preview only and is not saved.
 *
 * RESUME / CV
 *   Save your PDF as:  public/cv.pdf
 *   The sidebar "CV" row already uses publicFile('cv.pdf').
 *   If you name it resume.pdf instead, put it at public/resume.pdf and
 *   change that call to publicFile('resume.pdf').
 */

/** Files in public/. Uses Vite BASE_URL so local and GitHub Pages stay in sync. */
export function publicFile(name) {
  return `${import.meta.env.BASE_URL}${String(name).replace(/^\//, '')}`;
}

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
  availability: 'Open to PhD and SWE / ML roles',
  schoolHref: 'https://www.cs.yale.edu/',
  /**
   * Left-rail links. Add a row by copying an object below.
   * icon must be one of: map, mail, scholar, github, linkedin, twitter, cv
   * (To support a new icon name, also add it to the `icons` map in Sidebar.jsx.)
   *
   * Resume/CV: public/cv.pdf  →  href: publicFile('cv.pdf')
   */
  contacts: [
    { name: 'New Haven, CT', href: 'https://maps.app.goo.gl/WSAzsdBWbeH9uUxF9', icon: 'map' },
    { name: 'biniyam.lombe@yale.edu', href: 'mailto:biniyam.lombe@yale.edu', icon: 'mail' },
    { name: 'Google Scholar', href: 'https://scholar.google.com/scholar?q=Biniyam+Lombe', icon: 'scholar' },
    { name: 'GitHub', href: 'https://github.com/biniyamlombe', icon: 'github' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/biniyamlombe', icon: 'linkedin' },
    { name: 'Twitter', href: 'https://x.com/biniyamlombe', icon: 'twitter' },
    { name: 'CV / Resume', href: publicFile('cv.pdf'), icon: 'cv' },
  ],
};

export const scholarHref = site.contacts.find((item) => item.icon === 'scholar')?.href;
export const githubHref = site.contacts.find((item) => item.icon === 'github')?.href;

/** Interests paragraph. Replace this string to change that section. */
export const interestsCopy =
  'I work across natural language processing, computer vision, privacy-preserving machine learning, and ML security. That includes language models, multilingual understanding, visual representation learning, differential privacy, federated learning, and adversarial robustness. I also care about turning that research into software that holds up: training pipelines, evaluation, and systems people can actually run.';

/**
 * SELECTED WORK
 *
 * Add objects to this array for SWE / ML hiring. Do not invent projects.
 * If the array stays empty, the page shows a GitHub fallback instead.
 *
 * {
 *   title: 'Project name',
 *   blurb: 'One or two sentences on what it does and your role.',
 *   stack: ['PyTorch', 'React'],
 *   href: 'https://github.com/biniyamlombe/your-repo',
 *   links: [
 *     { label: 'Code', href: 'https://github.com/biniyamlombe/your-repo' },
 *     { label: 'Live', href: 'https://your-demo.example' },
 *   ],
 * }
 */
export const projects = [];

/**
 * TEACHING
 *
 * Add courses newest first. Copy an object below.
 *
 * {
 *   code: 'CPSC 2230',
 *   title: 'Data Structures & Programming Techniques',
 *   term: 'Fall 2024',
 *   role: 'TA',
 *   href: 'https://zoo.cs.yale.edu/classes/cs437/fall/',
 * }
 */
export const teaching = [
  {
    code: 'CPSC 5580',
    title: 'Automated Decision Systems',
    term: 'Spring 2026',
    role: 'TA',
    href: 'https://zoo.cs.yale.edu/classes/cs458/syllabus.html',
  },
  {
    code: 'CPSC 5370',
    title: 'Database Systems',
    term: 'Fall 2025',
    role: 'TA',
    href: 'https://zoo.cs.yale.edu/classes/cs437/fall/',
  },
  {
    code: 'CPSC 1700',
    title: 'AI for Future Presidents',
    term: 'Spring 2025',
    role: 'TA',
    href: 'https://zoo.cs.yale.edu/dsac/blog/2023/12/19/cpsc-170/',
  },
  {
    code: 'CPSC 2230',
    title: 'Data Structures & Programming Techniques',
    term: 'Fall 2024',
    role: 'TA',
    href: 'https://zoo.cs.yale.edu/classes/cs223/f2022/index.html',
  },
];

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
 *     { label: 'PDF', href: publicFile('papers/your-file.pdf') },
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
      { text: 'Applying to CS PhD programs and SWE / ML roles. Happy to talk about trustworthy ML, privacy, and security.' },
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
  {
    date: 'Jun 2022',
    parts: [
      { text: 'Completed my B.Eng. in Electrical and Electronic Engineering at the ' },
      { text: 'University of Bristol', href: 'https://www.bristol.ac.uk/' },
      { text: '.' },
    ],
    notes: [
      'First Class Honours.',
    ],
  },
];
