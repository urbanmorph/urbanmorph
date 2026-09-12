export const site = {
  name: 'Urban Morph',
  legalName: 'Urban Morph Consultants Pvt Ltd',
  url: 'https://www.urbanmorph.com',
  tagline: 'Full-stack, AI-native urban-tech venture studio in Bengaluru',
  description:
    'Urban Morph builds the platforms and runs the programmes that make Indian cities walkable, cycleable and climate-ready: AltMo, SyntheSYS, active-mobility policy and on-ground delivery.',
  email: 'contact@urbanmorph.com',
  address: '41, Vishnu Nivas, NGEF Colony, Sanjaynagar, Bengaluru 560094, Karnataka, India',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41%2C+Vishnu+Nivas%2C+NGEF+Colony%2C+Sanjaynagar%2C+Bengaluru+560094',
  gaId: 'G-Y58FVNHZF7',
  social: [
    { type: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/company/urbanmorph/' },
    { type: 'x', label: 'X', url: 'https://twitter.com/morphurbanspace/' },
    { type: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/urbanmorph/' },
  ],
  nav: [
    { label: 'Home', href: '/' },
    { label: 'SyntheSYS', href: '/synthesys/' },
    { label: 'Projects', href: '/projects/' },
    { label: 'Media', href: '/media/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Contact', href: '/#contact' },
  ],
  founders: [
    { name: 'Sathya Sankaran', jobTitle: 'Co-Founder & Director', url: 'https://www.sathyasankaran.com' },
    { name: 'Sonal S Kulkarni', jobTitle: 'Co-Founder' },
    { name: 'Subbaiah TS', jobTitle: 'Co-Founder & Director' },
  ],
};

/** Outcome figures shown on the home page. Update here, nowhere else. */
export const outcomes = [
  { value: '10,900+', label: 'AltMo users', detail: 'across 1,000+ organisations in 135+ cities' },
  { value: '550+ t', label: 'CO₂ avoided', detail: 'through logged sustainable commutes' },
  { value: '342%', label: 'more for cycling & walking', detail: "in Bengaluru's Comprehensive Master Plan" },
  { value: '20+ km', label: 'of cycle tracks', detail: 'built in Bengaluru with AltMo data' },
];

export const products = [
  {
    name: 'AltMo',
    kicker: 'Mobility intelligence',
    description:
      'GPS-verified employee engagement and climate action platform. Companies quantify Scope 3 commute emissions, run challenges and report CO₂ avoided.',
    url: 'https://www.altmo.app',
    cta: 'Explore AltMo',
    icon: 'tabler:bike',
  },
  {
    name: 'SyntheSYS',
    kicker: 'AI-native urban services',
    description:
      'Live platforms, revived civic archives, open tools and data stories that orchestrate urban solutions from ward to nation.',
    url: '/synthesys/',
    cta: 'See SyntheSYS',
    icon: 'tabler:topology-star-3',
  },
  {
    name: 'WattsNext Energy',
    kicker: 'Energy delivery',
    description: 'Redefining how power reaches electric vehicles and built form, from battery intelligence to the last metre of delivery.',
    url: null,
    cta: null,
    icon: 'tabler:bolt',
  },
];
