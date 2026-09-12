export const site = {
  name: 'Urban Morph',
  legalName: 'Urban Morph Consultants Pvt Ltd',
  url: 'https://www.urbanmorph.com',
  tagline: 'AI-native, full-stack policy and urban-tech venture studio · Bengaluru',
  description:
    'Urban Morph is an AI-native, full-stack policy and urban-tech venture studio in Bengaluru. Mobility is our mainstay; urban governance and policy support are core: AltMo, SyntheSYS, the Council for Active Mobility and on-ground delivery with cities and communities.',
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

/**
 * Outcome figures on the home page, one per strand of the studio's work:
 * policy, institutions, platforms, community. Update here, nowhere else.
 */
export const outcomes = [
  { value: '342%', label: 'more for cycling & walking', detail: "in Bengaluru's Comprehensive Master Plan, on the back of our data and advocacy" },
  { value: '1st', label: 'Active Mobility Centre of Excellence in India', detail: 'set up with the IISc Sustainable Transportation Lab in 2024' },
  { value: '10,900+', label: 'people on AltMo', detail: 'across 1,000+ organisations in 135+ cities, 550+ tonnes of CO₂ avoided' },
  { value: '725', label: 'Relief Riders volunteers', detail: 'across 12 cities during COVID-19; UN World Bicycle Day Special Award 2021' },
];

/** The three strands of work shown on the home page. */
export const focus = [
  {
    name: 'Mobility',
    kicker: 'Our mainstay',
    icon: 'tabler:bike',
    description:
      "Cycling, walking and public transport: from India's first pop-up pedestrian street and a decade of Cycle Days to a GPS-verified platform that lets organisations count and cut commute emissions.",
    links: [
      { label: 'AltMo', href: 'https://www.altmo.app' },
      { label: 'Council for Active Mobility', href: 'https://cfam.in' },
      { label: 'Mobility projects', href: '/projects/' },
    ],
  },
  {
    name: 'Urban governance & policy',
    kicker: 'Core to everything we do',
    icon: 'tabler:building-bank',
    description:
      'Support for governments, legislators and citizens: a model framework and campaign for the Karnataka Active Mobility Bill, strategic dashboards for the Karnataka Digital Economy Mission, revived civic archives, and thesis-led advisory for philanthropies deploying capital in cities.',
    links: [
      { label: 'Active Mobility Bill', href: 'https://cfam.in' },
      { label: 'KDEM dashboard', href: 'https://kdem.vercel.app' },
      { label: 'Advisory for philanthropies', href: '#offer' },
    ],
  },
  {
    name: 'AI-native urban services',
    kicker: 'SyntheSYS',
    icon: 'tabler:topology-star-3',
    description:
      'Live platforms, revived civic archives, open tools and data stories that orchestrate urban solutions from ward to nation: Neighbourhoods of the Future, India Together, Praja, mapunitygroups, bharatlas and more.',
    links: [
      { label: 'Explore SyntheSYS', href: '/synthesys/' },
      { label: 'Open tools', href: '/synthesys/#tools' },
      { label: 'Data stories', href: '/synthesys/#stories' },
    ],
  },
];
