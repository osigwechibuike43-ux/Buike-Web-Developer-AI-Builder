export const SITE = {
  name: 'Osigwe Chibuike Joseph',
  brand: 'Buike',
  role: 'Web Developer',
  /** Full professional title, used in metadata and structured data. */
  roleFull: 'Web Developer / Software Developer',
  tagline: 'Websites with taste. Products that ship.',
  description:
    'Osigwe Chibuike Joseph is a Nigerian web developer passionate about software engineering, artificial intelligence and building innovative digital experiences.',
  /** Page <title>. */
  title: 'Osigwe Chibuike Joseph — Web Developer in Nigeria | Buike',
  shortTitle: 'Osigwe Chibuike Joseph — Web Developer in Nigeria',
  url: 'https://buike-web-developer-ai-builder.vercel.app',
  location: 'Owerri, Imo State, Nigeria',
  timezone: 'WAT (UTC+1)',
  status: 'Open to web & AI projects',
  email: 'buikedev27@gmail.com',
  phone: '+234 916 814 4059',
  whatsapp: 'https://wa.me/2349168144059',
  github: 'https://github.com/osigwechibuike43-ux',
  linkedin: 'https://www.linkedin.com/in/osigwe-chibuike-b48964426',
  tiktok: 'https://www.tiktok.com/@buiketech7',
  tiktokHandle: '@buiketech7',
  /** Add real profile URLs to switch these on. Empty values are not shown. */
  instagram: '',
  x: '',
  portrait: '/images/osigwe-chibuike-joseph-web-developer-nigeria',
  /** Profile photo files (crawlable JPEGs for metadata and structured data). */
  photo: '/images/osigwe-chibuike-joseph-web-developer-nigeria.jpg',
  photoSquare: '/images/osigwe-chibuike-joseph-web-developer-nigeria-square.jpg',
  photoAlt: 'Osigwe Chibuike Joseph, a Nigerian web developer, in a black-and-white portrait wearing dark-framed glasses',
} as const;

export const NAV = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'toolbox', label: 'Toolbox' },
  { id: 'services', label: 'Services' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
] as const;

export const SOCIALS = [
  { id: 'github', label: 'GitHub', hint: 'Code and experiments', href: SITE.github, brand: '#181717' },
  { id: 'linkedin', label: 'LinkedIn', hint: 'Professional profile', href: SITE.linkedin, brand: '#0A66C2' },
  { id: 'tiktok', label: 'TikTok', hint: SITE.tiktokHandle, href: SITE.tiktok, brand: '#FE2C55' },
  { id: 'whatsapp', label: 'WhatsApp', hint: SITE.phone, href: SITE.whatsapp, brand: '#25D366' },
  { id: 'instagram', label: 'Instagram', hint: 'Photos and updates', href: SITE.instagram, brand: '#E4405F' },
  { id: 'x', label: 'X (Twitter)', hint: 'Short updates', href: SITE.x, brand: '#000000' },
].filter((s) => s.href);
