import { SkillCategory, JourneyStep, ServiceItem } from '../types';

/**
 * CONFIGURATION CONSTANT FOR GITHUB PROFILE:
 * Set this to Buike's actual GitHub profile URL when available.
 */
export const GITHUB_URL = 'https://github.com'; // Configure with Buike's real GitHub username (e.g., https://github.com/buike)
export const LINKEDIN_URL = 'https://www.linkedin.com/in/osigwe-chibuike-b48964426';

export const CONTACT_INFO = {
  name: 'Buike',
  role: 'Web Developer & AI Builder',
  email: 'buikedev27@gmail.com',
  phone: '09168144059',
  formattedPhone: '+234 916 814 4059',
  whatsappUrl: 'https://wa.me/2349168144059',
  linkedinUrl: 'https://www.linkedin.com/in/osigwe-chibuike-b48964426',
  location: 'Owerri, Imo State, Nigeria',
  baseLocation: 'Owerri, Imo State',
  status: 'Available for Web & AI Projects',
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend',
    description: 'Creating fast, responsive, and aesthetically refined user interfaces.',
    skills: [
      { name: 'HTML5' },
      { name: 'CSS3' },
      { name: 'JavaScript (ES6+)' },
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
    ],
  },
  {
    title: 'Backend',
    description: 'Building reliable server-side endpoints and application logic.',
    skills: [
      { name: 'Node.js' },
      { name: 'Express.js' },
      { name: 'REST APIs' },
    ],
  },
  {
    title: 'Database / Backend',
    description: 'Data architecture, persistent storage, and document stores.',
    skills: [
      { name: 'Firebase' },
      { name: 'Firestore' },
      { name: 'MongoDB' },
      { name: 'PostgreSQL' },
    ],
  },
  {
    title: 'Tools & Workflow',
    description: 'Modern version control, cloud deployment pipelines, and developer environments.',
    skills: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'VS Code' },
      { name: 'Vercel' },
      { name: 'Netlify' },
    ],
  },
  {
    title: 'AI Engineering',
    description: 'Integrating modern intelligence and LLM capabilities into software.',
    skills: [
      { name: 'AI Application Development' },
      { name: 'AI API Integration' },
      { name: 'AI-Powered Interfaces' },
      { name: 'Prompt Engineering' },
      { name: 'AI Automation' },
    ],
  },
];

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    number: '01',
    title: 'Started Building',
    tagline: 'Learning the fundamentals of web development.',
    description: 'Began with hands-on coding, mastering core computer fundamentals, internet architecture, and the building blocks of the web.',
    techStack: ['HTML', 'CSS', 'Algorithms', 'Web Basics'],
  },
  {
    number: '02',
    title: 'Frontend Development',
    tagline: 'HTML → CSS → JavaScript → React',
    description: 'Progressed to creating dynamic, highly responsive user interfaces with modern JavaScript, state management, and modern component systems.',
    techStack: ['JavaScript', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    number: '03',
    title: 'Full-Stack Exploration',
    tagline: 'Node.js → APIs → Databases → Firebase',
    description: 'Expanded capabilities across the backend stack: creating REST APIs, authentication flows, relational/NoSQL schemas, and cloud deployment pipelines.',
    techStack: ['Node.js', 'Express', 'Firebase', 'MongoDB', 'PostgreSQL'],
  },
  {
    number: '04',
    title: 'Real Projects',
    tagline: 'Turning ideas into actual deployed websites.',
    description: 'Engineered and launched real, production-grade applications across multiple industries: e-commerce, luxury event planning, event discovery, and automotive landing pages.',
    techStack: ['Production Deployments', 'Vercel', 'E-Commerce', 'Performance Tuning'],
  },
  {
    number: '05',
    title: 'AI + Software',
    tagline: 'Exploring AI applications and modern intelligence.',
    description: 'Investigating how modern artificial intelligence, LLM APIs, and intelligent interfaces can fundamentally enhance how software is built and experienced.',
    techStack: ['AI APIs', 'LLM Integration', 'Automation', 'Intelligent UX'],
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Responsive websites and modern web applications built for speed, accessibility, and high performance.',
    deliverables: ['Custom Web Applications', 'Mobile-First Layouts', 'Clean Modular Code', 'Performance Optimization'],
  },
  {
    id: 'business-websites',
    title: 'Business Websites',
    description: 'Professional, trustworthy digital experiences designed to showcase company services and drive conversions.',
    deliverables: ['Brand Storytelling', 'Service Showcases', 'Lead Generation Systems', 'SEO Architecture'],
  },
  {
    id: 'e-commerce',
    title: 'E-Commerce',
    description: 'Modern online stores and product lookbooks designed for seamless catalog browsing and high visual appeal.',
    deliverables: ['Product Showcases', 'Cart & Sizing Flows', 'Catalog Filtering', 'Brand Aesthetics'],
  },
  {
    id: 'landing-pages',
    title: 'Landing Pages',
    description: 'High-converting, visually polished single-page experiences focused on launching products and capturing interest.',
    deliverables: ['High-Impact Hero Visuals', 'Clear Value Propositions', 'Conversion-Optimized CTAs', 'Fast Load Times'],
  },
  {
    id: 'ai-powered-websites',
    title: 'AI-Powered Websites',
    description: 'Exploring and building websites enhanced with artificial intelligence, smart assistants, and automated workflows.',
    deliverables: ['AI API Integrations', 'Interactive Chat & Search', 'Smart Content Processing', 'Modern AI Interfaces'],
  },
];

export const TECH_WALL = [
  { name: 'HTML5', category: 'Frontend', symbol: '</>' },
  { name: 'CSS3', category: 'Styling', symbol: '{ }' },
  { name: 'JavaScript', category: 'Language', symbol: 'JS' },
  { name: 'React', category: 'Framework', symbol: '⚛' },
  { name: 'TypeScript', category: 'Language', symbol: 'TS' },
  { name: 'Tailwind CSS', category: 'Styling', symbol: '≈' },
  { name: 'Node.js', category: 'Runtime', symbol: '⬢' },
  { name: 'Express.js', category: 'Backend', symbol: 'ex' },
  { name: 'Firebase', category: 'Database / Auth', symbol: '🔥' },
  { name: 'Firestore', category: 'Database', symbol: '🗄' },
  { name: 'MongoDB', category: 'Database', symbol: '🍃' },
  { name: 'PostgreSQL', category: 'Database', symbol: '🐘' },
  { name: 'Git', category: 'Version Control', symbol: '⌥' },
  { name: 'GitHub', category: 'Collaboration', symbol: '⎇' },
  { name: 'Vercel', category: 'Deployment', symbol: '▲' },
];
