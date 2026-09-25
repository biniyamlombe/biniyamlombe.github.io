/**
 * SITE CONTENT
 *
 * Change copy and links here first. Save the file; the local site should refresh.
 * Full walkthrough: README.md
 *
 * Do not invent papers or projects. Add an item only when you have a real title and link.
 *
 * PROFILE PHOTO
 *   Put the full-resolution photo at:  originals/headshot-full.jpg
 *   Then run:  npm run headshot
 *   That writes the two files the page actually serves, public/headshot.webp
 *   and public/headshot.jpg, cropped square and sized for the rail. Do not put
 *   a camera-sized JPEG in public/ directly; it is the whole page weight.
 *
 * RESUME / CV
 *   The filename is CV_FILE in vite.config.js, currently
 *   public/Biniyam_Lombe_AI.pdf. Drop the new PDF in public/, update
 *   CV_FILE, and restart the dev server. The sidebar row is hidden if
 *   that file is missing.
 */

/** Files in public/. Uses Vite BASE_URL so local and GitHub Pages stay in sync. */
export function publicFile(name) {
  return `${import.meta.env.BASE_URL}${String(name).replace(/^\//, '')}`;
}

export const site = {
  name: 'Biniyam Lombe',
  // Used to bold your name in publication author lists. Keep this as your first name.
  shortName: 'Biniyam',
  role: 'M.S. CS, Yale',
  degree: 'M.S. in Computer Science',
  school: 'Yale University',
  email: 'biniyam.lombe@yale.edu',
  location: 'New Haven, CT',
  mapsUrl: 'https://maps.app.goo.gl/WSAzsdBWbeH9uUxF9',
  availability: 'Open to PhD and SWE / ML roles',
  schoolHref: 'https://www.cs.yale.edu/',
  // Public site origin. Also update public/robots.txt and public/sitemap.xml if this changes.
  url: 'https://biniyamlombe.github.io/',
  // Search snippet. The link-preview blurb is `summary`.
  description:
    'Biniyam Lombe, M.S. in Computer Science from Yale. Trustworthy machine learning, privacy, and security. Open to PhD programs for Fall 2027 and SWE / ML roles.',
  summary:
    'Trustworthy machine learning, privacy, and security. Open to PhD programs for Fall 2027 and SWE / ML roles.',
  alumniOf: [
    { name: 'Yale University', url: 'https://www.cs.yale.edu/' },
    { name: 'University of Bristol', url: 'https://www.bristol.ac.uk/' },
  ],
  knowsAbout: [
    'Machine Learning',
    'Natural Language Processing',
    'Computer Vision',
    'Differential Privacy',
    'Federated Learning',
    'Adversarial Robustness',
    'Machine Learning Security',
  ],
  /**
   * Left-rail links. Add a row by copying an object below.
   * icon must be one of: map, mail, scholar, github, linkedin, twitter, cv
   * (To support a new icon name, also add it to the `icons` map in Sidebar.jsx.)
   *
   * Resume/CV: set CV_FILE in vite.config.js. The row below is added only
   * when that file exists in public/.
   */
  contacts: [
    { name: 'New Haven, CT', href: 'https://maps.app.goo.gl/WSAzsdBWbeH9uUxF9', icon: 'map' },
    { name: 'biniyam.lombe@yale.edu', href: 'mailto:biniyam.lombe@yale.edu', icon: 'mail' },
    // Name search, not a citations?user= profile. Replace this href if you create a profile.
    { name: 'Google Scholar', href: 'https://scholar.google.com/scholar?q=Biniyam+Lombe', icon: 'scholar' },
    { name: 'GitHub', href: 'https://github.com/biniyamlombe', icon: 'github' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/biniyamlombe', icon: 'linkedin' },
    { name: 'Twitter', href: 'https://x.com/biniyamlombe', icon: 'twitter' },
    // The CV row appears only when the PDF is really in public/, so a missing
    // file shows nothing instead of a link that 404s. The filename lives in
    // CV_FILE in vite.config.js, which sets __CV_FILE__ at build time.
    // __CV_FILE__ is injected by Vite. The typeof check lets vite.config.js
    // import this module in Node, where that binding does not exist.
    ...(typeof __CV_FILE__ === 'undefined' || !__CV_FILE__
      ? []
      : [{ name: 'CV / Resume', href: publicFile(__CV_FILE__), icon: 'cv' }]),
  ],
};

/** Interests paragraph. Replace this string to change that section. */
export const interestsCopy =
  'I work across natural language processing, computer vision, privacy-preserving machine learning, and ML security. That includes language models, multilingual understanding, visual representation learning, differential privacy, federated learning, and adversarial robustness. I also care about turning that research into software that holds up: training pipelines, evaluation, and systems people can actually run.';

/**
 * EDUCATION
 *
 * Newest first. An empty array omits the section.
 *
 * {
 *   school: 'Yale University',
 *   degree: 'M.S. in Computer Science',
 *   date: 'May 2026',
 *   dateTime: '2026-05',
 *   href: 'https://www.cs.yale.edu/',
 *   detail: 'Optional honor or note.',
 * }
 *
 * RESEARCH
 * Add a section only when you have a real lab, advisor, and what you did.
 * // TODO(Biniyam): fill in
 * // {
 * //   group: 'Lab or group',
 * //   advisor: 'Advisor Name',
 * //   dates: 'Sep 2024 - May 2025',
 * //   dateTime: '2024-09',
 * //   href: 'https://lab.example.edu/',
 * //   summary: 'One sentence on what you did.',
 * // }
 */
export const education = [
  {
    school: 'Yale University',
    degree: 'M.S. in Computer Science',
    date: 'May 2026',
    dateTime: '2026-05',
    href: 'https://www.cs.yale.edu/',
  },
  {
    school: 'University of Bristol',
    degree: 'B.Eng. in Electrical and Electronic Engineering',
    date: 'Jun 2022',
    dateTime: '2022-06',
    href: 'https://www.bristol.ac.uk/',
    detail: 'First Class Honours.',
  },
];

/**
 * SELECTED WORK
 *
 * Add objects to this array for SWE / ML hiring. Do not invent projects.
 * If the array stays empty, the Selected work section is omitted. GitHub stays in the sidebar.
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
 *
 * Optional titles: several course names on one row, one per line.
 * Use that instead of title.
 * Optional until: end month on the same line, e.g. term: 'Jan 2023', until: 'Aug 2024'.
 * dateTime: machine-readable start month, 'YYYY-MM'. For a range, also set
 * untilDateTime to the end month, e.g. untilDateTime: '2024-08'.
 */
export const teaching = [
  {
    code: 'CPSC 5580',
    title: 'Automated Decision Systems',
    term: 'Spring 2026',
    dateTime: '2026-01',
    role: 'TA',
    href: 'https://zoo.cs.yale.edu/classes/cs458/index.html',
  },
  {
    code: 'CPSC 5370',
    title: 'Database Systems',
    term: 'Fall 2025',
    dateTime: '2025-09',
    role: 'TA',
    href: 'https://zoo.cs.yale.edu/classes/cs437/fall/',
  },
  {
    code: 'AddisCoder',
    title: 'Programming and Algorithms',
    term: 'Summer 2025',
    dateTime: '2025-06',
    role: 'Head TA',
    href: 'https://www.addiscoder.com/',
  },
  {
    code: 'CPSC 1700',
    title: 'AI for Future Presidents',
    term: 'Spring 2025',
    dateTime: '2025-01',
    role: 'TA',
    href: 'https://catalog.yale.edu/ycps/courses/cpsc/',
  },
  {
    code: 'CPSC 2230',
    title: 'Data Structures & Programming Techniques',
    term: 'Fall 2024',
    dateTime: '2024-09',
    role: 'TA',
    // TODO(Biniyam): fill in the Fall 2024 course page. The old link was the Fall 2022 site.
  },
  {
    code: 'AddisCoder',
    title: 'Programming and Algorithms',
    term: 'Summer 2024',
    dateTime: '2024-06',
    role: 'TA',
    href: 'https://www.addiscoder.com/',
  },
  {
    code: 'UWE Bristol',
    titles: [
      'Principles of Electrical Engineering',
      'Fluid Mechanics',
      'Foundation Physics',
      'Foundation Mathematics',
      'Introduction to Computer Programming in Python',
    ],
    term: 'Jan 2023',
    until: 'Aug 2024',
    dateTime: '2023-01',
    untilDateTime: '2024-08',
    role: 'Lecturer',
    href: 'https://www.uwe.ac.uk/courses/international-study/international-college',
  },
  {
    code: 'AddisCoder',
    title: 'Programming and Algorithms',
    term: 'Summer 2023',
    dateTime: '2023-06',
    role: 'TA',
    href: 'https://www.addiscoder.com/',
  },
];

/**
 * PUBLICATIONS
 *
 * Add objects to this array. Newest year is shown first automatically.
 * If the array stays empty, the Publications section is omitted. Scholar stays in the sidebar.
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
 * dateTime: machine-readable month, 'YYYY-MM'
 * parts: the main sentence, split so links can sit in the middle
 *   { text: 'plain words' }
 *   { text: 'Yale', href: 'https://www.cs.yale.edu/' }
 * notes: optional bullets under that item
 *
 * Example to copy:
 *
 * {
 *   date: 'Sep 2026',
 *   dateTime: '2026-09',
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
    dateTime: '2026-08',
    parts: [
      { text: 'Applying to CS PhD programs for Fall 2027 and to SWE / ML roles. Happy to talk about trustworthy ML, privacy, and security.' },
    ],
    notes: [
      'Interests: language models, vision, differential privacy, and adversarial robustness.',
    ],
  },
  {
    date: 'May 2026',
    dateTime: '2026-05',
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
    date: 'Feb 2026',
    dateTime: '2026-02',
    parts: [
      { text: 'Interviewed by ' },
      { text: 'Deutsche Welle', href: 'https://www.dw.com/am/%E1%89%A2%E1%8A%92%E1%8B%AB%E1%88%9D-%E1%88%8E%E1%88%8A%E1%88%B6/a-75826516' },
      { text: ' about ' },
      { text: 'AddisCoder', href: 'https://www.addiscoder.com/' },
      { text: ', mentorship, and education access in Ethiopia.' },
    ],
  },
  {
    date: 'Jun 2022',
    dateTime: '2022-06',
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
