export type ProjectKind = 'personal' | 'client';

export type VisualVariant = 'learning' | 'chat' | 'fashion' | 'wedding' | 'events' | 'discover' | 'auto' | 'swap' | 'estate' | 'builder';

export interface Project {
  id: string;
  number: string;
  name: string;
  /** Short category line shown on the card. */
  category: string;
  tagline: string;
  description: string;
  /** "personal" = built for myself / as a portfolio piece. "client" = built for someone else. */
  kind: ProjectKind;
  /** Live website. Optional for projects that only have a public repository. */
  liveUrl?: string;
  /** Public GitHub repository, only where one is known to exist. */
  repoUrl?: string;
  featured?: boolean;
  stack: string[];
  highlights: string[];
  /** What I focused on while building it. */
  focus: string;
  visual: VisualVariant;
  /** Palette for the generated preview panel. */
  palette: { bg: string; fg: string; accent: string };
  /** Optional real screenshot in /public/projects (e.g. "/projects/nuvora.webp"). */
  image?: string;
}

export type TechGroup = 'frontend' | 'backend' | 'database' | 'ai' | 'tools' | 'cloud';

export interface Tech {
  id: string;
  name: string;
  groups: TechGroup[];
  /** Short category label shown on the card. */
  category: string;
  description: string;
  /** Key into BRAND_ICONS. Omit for concepts and for brands without an available official logo. */
  icon?: string;
  /** Lucide-style glyph name for concepts (REST, SQL...). */
  glyph?: 'api' | 'sql' | 'agent' | 'prompt';
  /** Official brand colour (used for the card accent). */
  brand: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  includes: string[];
  /** Value used to pre-select the contact form. */
  projectType: string;
}

export interface JourneyStep {
  number: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
}
