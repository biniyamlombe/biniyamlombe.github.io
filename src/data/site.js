export const site = {
  name: 'Biniyam Lombe',
  shortName: 'Biniyam',
  role: 'CS MS @ Yale',
  degree: 'M.S. in Computer Science',
  school: 'Yale University',
  email: 'biniyam.lombe@yale.edu',
  location: 'New Haven, CT',
  mapsUrl: 'https://maps.app.goo.gl/WSAzsdBWbeH9uUxF9',
  availability: 'Seeking PhD, Fall 2026',
  schoolHref: 'https://www.cs.yale.edu/',
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

export const interestsCopy =
  'I am interested in natural language processing, computer vision, privacy-preserving machine learning, and ML security. That includes language models and multilingual understanding, visual representation learning, differential privacy and federated learning, and adversarial robustness.';

export const publications = [
  // { title, authors, venue, year, href?, links?: [{ label, href }] }
];

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
