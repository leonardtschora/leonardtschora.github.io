// Central site metadata and navigation — sourced from the old Jekyll config (see MIGRATION.md).

export const SITE = {
  name: 'Léonard Tschora',
  title: 'Léonard Tschora',
  tagline:
    'Ph.D. in Computer Science — Machine Learning engineer specializing in electricity price forecasting and energy-market analytics.',
  description:
    'Personal site of Léonard Tschora, Ph.D. in Computer Science and Machine Learning engineer working on electricity price forecasting and energy-market analytics.',
  url: 'https://leonardtschora.github.io',
  email: 'leonard.tschora@protonmail.com',
  location: 'Framingham',
  employer: 'INSA Lyon',
  avatar: '/images/profil.jpg',
  resume: '/files/resume_leonard_tschora.pdf',
} as const;

export const NAV: { label: string; href: string }[] = [
  { label: 'Experience', href: '/experience/' },
  { label: 'Education', href: '/education/' },
  { label: 'Thesis', href: '/thesis/' },
  { label: 'Portfolio', href: '/portfolio/' },
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
