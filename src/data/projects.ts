import type { Project } from '../types';

/**
 * Every project below is a personal or concept build. When client work is added,
 * set `kind: 'client'` and the UI labels it automatically.
 * Add a real screenshot by dropping a file in /public/projects and setting `image`.
 */
export const PROJECTS: Project[] = [
  {
    id: 'nuvora',
    number: '01',
    name: 'NUVORA',
    category: 'AI learning platform',
    tagline: 'Learn. Understand. Become.',
    description:
      'An AI-powered learning platform that combines structured learning, personalised paths, practical projects and an AI tutor that helps you understand what you study, not just consume it.',
    kind: 'personal',
    liveUrl: 'https://nuvora-3.vercel.app',
    featured: true,
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'Supabase', 'Groq'],
    highlights: [
      'AI tutor for explaining difficult concepts',
      'Personalised learning paths',
      'Quizzes and practical projects',
      'Career-focused learning mode',
      'Auth with email, Google and GitHub',
    ],
    focus:
      'A calm, restrained interface for long study sessions, a provider-agnostic AI layer so models can be swapped, and Supabase for auth, data and edge functions.',
    visual: 'learning',
    palette: { bg: '#0B0F0D', fg: '#E8F3EC', accent: '#16A34A' },
  },
  {
    id: 'chatbi',
    number: '02',
    name: 'ChatBI',
    category: 'AI assistant',
    tagline: 'An AI that understands you.',
    description:
      'A conversational AI assistant and workspace for real-time answers, prompt starters and everyday productivity, designed to stay out of your way on desktop and mobile.',
    kind: 'personal',
    liveUrl: 'https://chatbi-khaki.vercel.app/',
    featured: true,
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Groq', 'Vercel'],
    highlights: [
      'Conversational chat interface',
      'Productivity prompt starters',
      'Clean response and markdown layout',
      'Responsive on mobile and desktop',
    ],
    focus:
      'A distraction-free chat surface with strong typography, quick prompt starters and a layout that holds up when answers get long.',
    visual: 'chat',
    palette: { bg: '#111317', fg: '#EEF0F4', accent: '#7C9CFF' },
  },
  {
    id: 'buike-clothing',
    number: '03',
    name: 'BUIKÉ',
    category: 'E-commerce / fashion',
    tagline: 'Modern luxury streetwear storefront.',
    description:
      'A monochrome streetwear storefront built around the BUIKÉ brand, with editorial product presentation, a lookbook feel and a mobile-first shopping flow.',
    kind: 'personal',
    liveUrl: 'https://buikeclothingstore.vercel.app/',
    stack: ['React', 'JavaScript', 'Tailwind CSS', 'Vercel'],
    highlights: [
      'Editorial product presentation',
      'Black-and-white brand direction',
      'Cart and product detail flow',
      'Responsive layouts',
    ],
    focus:
      'Letting the product and typography carry the brand: generous space, high contrast and very little decoration.',
    visual: 'fashion',
    palette: { bg: '#0A0A0A', fg: '#F5F5F5', accent: '#FFFFFF' },
  },
  {
    id: 'aurelia-events',
    number: '04',
    name: 'Aurelia Events',
    category: 'Luxury weddings & events',
    tagline: 'Luxury weddings and celebrations.',
    description:
      'A refined wedding and events website with elegant typography, editorial layout and premium visual storytelling. A concept build for the luxury events space.',
    kind: 'personal',
    liveUrl: 'https://aurelia-events-ten.vercel.app/',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    highlights: [
      'Editorial wedding aesthetic',
      'Service and package presentation',
      'Consultation enquiry flow',
      'Responsive interface',
    ],
    focus:
      'Soft, airy composition: delicate borders, graceful type and white space that lets imagery lead.',
    visual: 'wedding',
    palette: { bg: '#F6F0E8', fg: '#2A211B', accent: '#A8845A' },
  },
  {
    id: 'amara-events',
    number: '05',
    name: 'Amara Events',
    category: 'Event planning',
    tagline: 'Luxury Nigerian event planning.',
    description:
      'A luxury event-planning website presenting planning and production services through an elegant, premium experience. A concept build for celebrations and corporate events.',
    kind: 'personal',
    liveUrl: 'https://amara-events-1.vercel.app/',
    stack: ['React', 'JavaScript', 'Tailwind CSS', 'Vercel'],
    highlights: [
      'Service-focused layout',
      'Serif headline typography',
      'Gallery-style presentation',
      'Responsive design',
    ],
    focus:
      'A confident service breakdown with a muted palette and serif headings that feel established.',
    visual: 'events',
    palette: { bg: '#14110F', fg: '#F2EADF', accent: '#C9A15B' },
  },
  {
    id: 'eventera',
    number: '06',
    name: 'Eventera',
    category: 'Event discovery',
    tagline: 'Find your next moment.',
    description:
      'An event discovery interface for browsing concerts, summits, workshops and nightlife by category, with clear date and venue information.',
    kind: 'personal',
    liveUrl: 'https://event-book-delta.vercel.app/',
    stack: ['React', 'JavaScript', 'Tailwind CSS', 'Vercel'],
    highlights: [
      'Category-based discovery',
      'Card-based event layout',
      'Clear date and venue details',
      'Mobile-friendly navigation',
    ],
    focus: 'Reducing friction in discovery with scannable cards and obvious calls to action.',
    visual: 'discover',
    palette: { bg: '#0F1115', fg: '#EDEFF5', accent: '#F0B429' },
  },
  {
    id: 'luxury-cars',
    number: '07',
    name: 'Luxury Cars',
    category: 'Automotive landing page',
    tagline: 'A high-performance showroom page.',
    description:
      'A premium automotive landing page that presents luxury vehicles with strong visual hierarchy, specification highlights and a conversion-focused layout.',
    kind: 'personal',
    liveUrl: 'https://cardealershiplandingpage.vercel.app/',
    stack: ['React', 'JavaScript', 'Tailwind CSS', 'Vercel'],
    highlights: [
      'Vehicle showcase layout',
      'Specification-led presentation',
      'Strong visual hierarchy',
      'Responsive layout',
    ],
    focus: 'Bold contrast and technical typography so the vehicles feel fast even standing still.',
    visual: 'auto',
    palette: { bg: '#100F0E', fg: '#F1EEEA', accent: '#E4470F' },
  },
];
