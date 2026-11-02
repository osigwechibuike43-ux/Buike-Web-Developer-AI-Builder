import type { JourneyStep, Service, SkillGroup } from '../types';

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    blurb: 'Fast, accessible interfaces with a strong sense of craft.',
    items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'Vite', 'Motion'],
  },
  {
    id: 'backend',
    title: 'Backend & data',
    blurb: 'Reliable APIs, auth and storage behind the interface.',
    items: ['Node.js', 'Express', 'REST APIs', 'Supabase', 'PostgreSQL', 'Firebase', 'Firestore', 'MongoDB'],
  },
  {
    id: 'ai',
    title: 'AI engineering',
    blurb: 'Putting language models to work inside real products.',
    items: ['LLM API integration', 'Groq', 'Gemini', 'Prompt engineering', 'AI-powered interfaces', 'Automation'],
  },
  {
    id: 'tooling',
    title: 'Tooling & delivery',
    blurb: 'Version control and deployment that keep shipping safe.',
    items: ['Git', 'GitHub', 'VS Code', 'Vercel', 'Netlify'],
  },
];

export const SERVICES: Service[] = [
  {
    id: 'web-development',
    title: 'Web development',
    description: 'Responsive websites and web applications built for speed, accessibility and long-term maintainability.',
    includes: ['Custom web applications', 'Mobile-first layouts', 'Clean, modular code', 'Performance tuning'],
    projectType: 'Website or web application',
  },
  {
    id: 'business-websites',
    title: 'Business websites',
    description: 'Professional sites that explain what you do clearly and make it easy for people to get in touch.',
    includes: ['Brand-led design', 'Service showcases', 'Enquiry and lead forms', 'SEO foundations'],
    projectType: 'Business website',
  },
  {
    id: 'e-commerce',
    title: 'E-commerce',
    description: 'Online stores and product lookbooks designed for easy browsing and a smooth path to purchase.',
    includes: ['Product showcases', 'Cart and sizing flows', 'Catalogue filtering', 'Brand presentation'],
    projectType: 'E-commerce store',
  },
  {
    id: 'landing-pages',
    title: 'Landing pages',
    description: 'Focused single-page experiences for launching a product, event or offer.',
    includes: ['High-impact hero', 'Clear value proposition', 'Conversion-focused calls to action', 'Fast load times'],
    projectType: 'Landing page',
  },
  {
    id: 'ai-powered',
    title: 'AI-powered products',
    description: 'Assistants, tutors and smart features built on language-model APIs, wrapped in an interface people enjoy using.',
    includes: ['LLM API integration', 'Chat and search interfaces', 'Prompt design', 'Auth and data with Supabase'],
    projectType: 'AI-powered product',
  },
];

export const JOURNEY: JourneyStep[] = [
  {
    number: '01',
    title: 'Started building',
    tagline: 'Learning the fundamentals of the web.',
    description: 'Began with hands-on coding: how the internet works, how pages are structured, and how to make them look right.',
    tags: ['HTML', 'CSS', 'Web basics'],
  },
  {
    number: '02',
    title: 'Frontend development',
    tagline: 'HTML, CSS, JavaScript, then React.',
    description: 'Moved on to dynamic, responsive interfaces: modern JavaScript, component thinking and state management.',
    tags: ['JavaScript', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    number: '03',
    title: 'Full-stack exploration',
    tagline: 'APIs, databases and authentication.',
    description: 'Widened the stack to include Node, REST APIs, auth flows and both SQL and document databases.',
    tags: ['Node.js', 'Express', 'Supabase', 'Firebase', 'PostgreSQL'],
  },
  {
    number: '04',
    title: 'Shipping real projects',
    tagline: 'Turning ideas into live websites.',
    description: 'Built and deployed live projects across e-commerce, events, automotive and AI, learning from each release.',
    tags: ['Vercel', 'E-commerce', 'Live deployments'],
  },
  {
    number: '05',
    title: 'AI and software',
    tagline: 'Where I am now.',
    description: 'Building AI assistants and learning tools, and exploring how language models change the way software is made and used.',
    tags: ['LLM APIs', 'Groq', 'Prompt design', 'Automation'],
  },
];

export const INTERESTS = [
  { title: 'AI in everyday software', text: 'Assistants, tutors and tools that actually help, not just demo well.' },
  { title: 'Editorial interface design', text: 'Typography, spacing and restraint over decoration.' },
  { title: 'E-commerce and events', text: 'Experiences where a clear layout turns visitors into customers.' },
  { title: 'Performance and craft', text: 'Fast pages, accessible markup and details that feel considered.' },
];

export const PROCESS = [
  {
    number: '01',
    title: 'Discover',
    text: 'We talk through the goal, the audience and what success looks like, so the work starts from the right problem.',
  },
  {
    number: '02',
    title: 'Plan',
    text: 'A clear scope, page structure and design direction agreed before any heavy building begins.',
  },
  {
    number: '03',
    title: 'Build',
    text: 'Responsive, accessible code in small steps you can preview, so feedback lands early.',
  },
  {
    number: '04',
    title: 'Launch & improve',
    text: 'Testing, deployment and a handover that leaves you able to keep growing the site.',
  },
];

export const FAQ = [
  {
    q: 'Who is Buike?',
    a: 'Buike is Osigwe Chibuike Joseph, a web developer based in Owerri, Nigeria. He builds responsive websites and AI-powered products with React, TypeScript, Tailwind CSS and Supabase.',
  },
  {
    q: 'Are the projects on this site client work?',
    a: 'No. Every project listed here is a personal or concept build, and each one is labelled that way. If client work is added later it will be marked clearly as client work.',
  },
  {
    q: 'What kinds of projects do you take on?',
    a: 'Business websites, landing pages, e-commerce storefronts, and AI-powered web apps such as assistants and learning tools.',
  },
  {
    q: 'Can you add AI features to a website?',
    a: 'Yes. NUVORA and ChatBI are both built on language-model APIs, so I can add assistants, chat interfaces or smart workflows to a new or existing product.',
  },
  {
    q: 'How long does a project take?',
    a: 'It depends on scope. After an initial conversation I share a plan with milestones, so you know what to expect before work begins.',
  },
  {
    q: 'How do I get in touch?',
    a: 'Use the contact form, email, or WhatsApp. WhatsApp is usually the quickest way to reach me.',
  },
];
