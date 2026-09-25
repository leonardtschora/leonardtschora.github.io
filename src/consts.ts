// Central site metadata and navigation — sourced from the old Jekyll config (see MIGRATION.md).

export const SITE = {
  name: 'Léonard Tschora',
  title: 'Léonard Tschora',
  tagline: 'I take AI systems from prototype to production.',
  description:
    'Léonard Tschora — independent AI/ML consultant in Paris. RAG, agents and LLM pipelines taken to production, and forecasting where the number drives a decision.',
  url: 'https://leonardtschora.github.io',
  email: 'leonard.tschora@protonmail.com',
  location: 'Paris, France',
  avatar: '/images/profil.jpg',
  resume: '/files/resume_leonard_tschora.pdf',
  booking: 'https://calendar.proton.me/bookings#BkOlkqnkxQ3nrc5Goql85c8S7s--kr-DpnMvrVkWVF0=',
} as const;

export const NAV: { label: string; href: string }[] = [
  { label: 'Work', href: '/work/' },
  { label: 'About', href: '/about/' },
  { label: 'Experience', href: '/experience/' },
  { label: 'Contact', href: '/contact/' },
];

export const SOCIALS: { label: string; href: string }[] = [
  { label: 'GitHub', href: 'https://github.com/leonardtschora' },
  {
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?user=O-R4mTsAAAAJ&hl=en&oi=sra',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/léonard-tschora-220132194',
  },
];
