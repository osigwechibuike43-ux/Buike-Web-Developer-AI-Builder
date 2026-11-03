import type { Tech, TechGroup } from '../types';

export const TECH_GROUPS: { id: TechGroup | 'all'; label: string }[] = [
  { id: 'all', label: 'Everything' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Database' },
  { id: 'ai', label: 'Artificial intelligence' },
  { id: 'tools', label: 'Development tools' },
  { id: 'cloud', label: 'Cloud & integrations' },
];

/**
 * Brand colours are each technology's recognisable official colour.
 * Paystack and Infobip have no official logo in the icon libraries used here, so they render as name tiles.
 * To use the real marks, add the SVG to src/data/brandIcons.ts and set `icon` below.
 */
export const TECHNOLOGIES: Tech[] = [
  // Frontend
  { id: 'html5', name: 'HTML5', groups: ['frontend'], category: 'Markup', description: 'Semantic, accessible page structure.', icon: 'html5', brand: '#E34F26' },
  { id: 'css3', name: 'CSS3', groups: ['frontend'], category: 'Styling', description: 'Layout, animation and responsive design.', icon: 'css3', brand: '#1572B6' },
  { id: 'javascript', name: 'JavaScript', groups: ['frontend'], category: 'Language', description: 'The language of the browser and beyond.', icon: 'javascript', brand: '#F7DF1E' },
  { id: 'typescript', name: 'TypeScript', groups: ['frontend'], category: 'Language', description: 'Typed JavaScript for safer, scalable code.', icon: 'typescript', brand: '#3178C6' },
  { id: 'react', name: 'React', groups: ['frontend'], category: 'Framework', description: 'Component-based user interfaces.', icon: 'react', brand: '#61DAFB' },
  { id: 'nextjs', name: 'Next.js', groups: ['frontend'], category: 'Framework', description: 'React framework for full-stack web apps.', icon: 'nextjs', brand: '#000000' },
  { id: 'tailwind', name: 'Tailwind CSS', groups: ['frontend'], category: 'Styling', description: 'Utility-first CSS for fast, consistent UI.', icon: 'tailwind', brand: '#06B6D4' },
  { id: 'vite', name: 'Vite', groups: ['frontend'], category: 'Build tool', description: 'Fast dev server and production bundler.', icon: 'vite', brand: '#646CFF' },

  // Backend
  { id: 'nodejs', name: 'Node.js', groups: ['backend'], category: 'Runtime', description: 'JavaScript on the server.', icon: 'nodejs', brand: '#5FA04E' },
  { id: 'python', name: 'Python', groups: ['backend'], category: 'Language', description: 'Scripting, automation and AI work.', icon: 'python', brand: '#3776AB' },
  { id: 'rest', name: 'REST APIs', groups: ['backend'], category: 'Architecture', description: 'Designing and consuming HTTP APIs.', glyph: 'api', brand: '#8B654A' },
  { id: 'sql', name: 'SQL', groups: ['backend'], category: 'Language', description: 'Querying and shaping relational data.', glyph: 'sql', brand: '#336791' },
  { id: 'edge', name: 'Supabase Edge Functions', groups: ['backend'], category: 'Serverless', description: 'Server-side logic close to the user.', icon: 'supabase', brand: '#3FCF8E' },

  // Database
  { id: 'supabase', name: 'Supabase', groups: ['database'], category: 'Backend platform', description: 'Postgres, auth and storage in one platform.', icon: 'supabase', brand: '#3FCF8E' },
  { id: 'postgresql', name: 'PostgreSQL', groups: ['database'], category: 'Database', description: 'Reliable relational database.', icon: 'postgresql', brand: '#4169E1' },
  { id: 'firebase', name: 'Firebase', groups: ['database'], category: 'Backend platform', description: 'Realtime data and authentication.', icon: 'firebase', brand: '#FFA000' },

  // Artificial intelligence
  { id: 'openai', name: 'OpenAI', groups: ['ai'], category: 'AI provider', description: 'GPT models through the API.', icon: 'openai', brand: '#000000' },
  { id: 'groq', name: 'Groq', groups: ['ai'], category: 'AI provider', description: 'Very fast LLM inference.', icon: 'groq', brand: '#F55036' },
  { id: 'ollama', name: 'Ollama', groups: ['ai'], category: 'Local AI', description: 'Running open models locally.', icon: 'ollama', brand: '#000000' },
  { id: 'claude', name: 'Claude', groups: ['ai'], category: 'AI provider', description: 'Anthropic’s assistant and API.', icon: 'claude', brand: '#D97757' },
  { id: 'gemini', name: 'Google Gemini', groups: ['ai'], category: 'AI provider', description: 'Google’s multimodal AI models.', icon: 'gemini', brand: '#8E75B2' },
  { id: 'agents', name: 'AI Agents', groups: ['ai'], category: 'Concept', description: 'Systems that plan and act with tools.', glyph: 'agent', brand: '#8B654A' },
  { id: 'prompting', name: 'Prompt Engineering', groups: ['ai'], category: 'Skill', description: 'Designing instructions that get reliable output.', glyph: 'prompt', brand: '#8B654A' },

  // Development tools
  { id: 'vscode', name: 'Visual Studio Code', groups: ['tools'], category: 'Editor', description: 'My everyday code editor.', icon: 'vscode', brand: '#007ACC' },
  { id: 'git', name: 'Git', groups: ['tools'], category: 'Version control', description: 'Tracking and managing changes.', icon: 'git', brand: '#F05032' },
  { id: 'github', name: 'GitHub', groups: ['tools'], category: 'Collaboration', description: 'Hosting code and collaborating.', icon: 'github', brand: '#181717' },
  { id: 'vercel', name: 'Vercel', groups: ['tools', 'cloud'], category: 'Deployment', description: 'Deploying and hosting web apps.', icon: 'vercel', brand: '#000000' },
  { id: 'lovable', name: 'Lovable', groups: ['tools'], category: 'AI builder', description: 'AI-assisted app building.', icon: 'lovable', brand: '#FF3D77' },
  { id: 'windows11', name: 'Windows 11', groups: ['tools'], category: 'Operating system', description: 'My development environment.', icon: 'windows11', brand: '#0078D4' },
  { id: 'virtualbox', name: 'VirtualBox', groups: ['tools'], category: 'Virtualisation', description: 'Running virtual machines for testing.', icon: 'virtualbox', brand: '#2F61B4' },

  // Cloud and integrations
  { id: 'supabase-cloud', name: 'Supabase Cloud', groups: ['cloud'], category: 'Cloud backend', description: 'Hosted database, auth and functions.', icon: 'supabase', brand: '#3FCF8E' },
  { id: 'resend', name: 'Resend', groups: ['cloud'], category: 'Email API', description: 'Transactional email delivery.', icon: 'resend', brand: '#000000' },
  { id: 'brevo', name: 'Brevo', groups: ['cloud'], category: 'Email & SMS', description: 'Email and marketing messaging.', icon: 'brevo', brand: '#0B996E' },
  { id: 'infobip', name: 'Infobip', groups: ['cloud'], category: 'Messaging', description: 'SMS and communication APIs.', brand: '#F36F21' },
  { id: 'paystack', name: 'Paystack', groups: ['cloud'], category: 'Payments', description: 'Online payments for African businesses.', brand: '#00A3E0' },
  { id: 'oauth', name: 'OAuth', groups: ['cloud'], category: 'Authentication', description: 'Social and third-party sign-in.', icon: 'oauth', brand: '#EB5424' },
];

export const EXPLORING_NOW = [
  'Advanced JavaScript and TypeScript',
  'React architecture',
  'Backend engineering',
  'Python programming',
  'Artificial intelligence',
  'AI agents',
  'Machine learning fundamentals',
  'Cloud infrastructure',
  'Cybersecurity',
  'System design',
  'Mobile application development',
];

/** Technologies I already use on projects. */
export const USING_TODAY = ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Node.js', 'Supabase', 'PostgreSQL', 'Groq', 'Git & GitHub', 'Vercel'];
