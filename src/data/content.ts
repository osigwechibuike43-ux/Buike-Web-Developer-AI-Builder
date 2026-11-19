import type { JourneyStep, Service } from '../types';

export const SERVICES: Service[] = [
  {
    id: 'website-development',
    title: 'Website Development',
    icon: 'globe',
    description: 'Fast, responsive websites for businesses, brands and individuals, built to be clear, accessible and easy to maintain.',
    includes: ['Mobile-first layouts', 'Clean, modular code', 'SEO foundations', 'Performance tuning'],
    projectType: 'Website development',
  },
  {
    id: 'web-applications',
    title: 'Web Application Development',
    icon: 'app',
    description: 'Interactive web apps with authentication, databases and dashboards, built with React, TypeScript and Supabase.',
    includes: ['Auth and user accounts', 'Database design', 'Dashboards and forms', 'Deployment on Vercel'],
    projectType: 'Web application',
  },
  {
    id: 'e-commerce',
    title: 'E-commerce Development',
    icon: 'cart',
    description: 'Online storefronts designed for easy browsing and a smooth path from product to purchase.',
    includes: ['Product showcases', 'Cart and sizing flows', 'Catalogue filtering', 'Brand presentation'],
    projectType: 'E-commerce store',
  },
  {
    id: 'ai-integration',
    title: 'AI Integration',
    icon: 'ai',
    description: 'Assistants, tutors and smart features added to new or existing products through language-model APIs.',
    includes: ['LLM API integration', 'Chat and search interfaces', 'Prompt design', 'Safe handling of API keys'],
    projectType: 'AI integration',
  },
  {
    id: 'website-redesign',
    title: 'Website Redesign',
    icon: 'redesign',
    description: 'A fresh look and a faster build for a site that no longer reflects your brand or works well on phones.',
    includes: ['Design refresh', 'Content restructuring', 'Responsive rebuild', 'Speed improvements'],
    projectType: 'Website redesign',
  },
  {
    id: 'landing-pages',
    title: 'Landing Page Development',
    icon: 'rocket',
    description: 'Focused single-page experiences for launching a product, event or offer.',
    includes: ['High-impact hero', 'Clear value proposition', 'Conversion-focused calls to action', 'Fast load times'],
    projectType: 'Landing page',
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
