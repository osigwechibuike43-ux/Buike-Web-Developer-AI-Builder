export type ProjectKind = 'personal' | 'client';

export type VisualVariant = 'learning' | 'chat' | 'fashion' | 'wedding' | 'events' | 'discover' | 'auto';

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
  liveUrl: string;
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

export interface SkillGroup {
  id: string;
  title: string;
  blurb: string;
  items: string[];
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
