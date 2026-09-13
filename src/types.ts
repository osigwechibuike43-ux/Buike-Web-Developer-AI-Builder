export interface Project {
  id: string;
  number: string;
  name: string;
  category: string;
  headline?: string;
  description: string;
  liveUrl: string;
  buttonText: string;
  isFeatured?: boolean;
  theme: {
    accent: string;
    bgStyle: string;
    badge: string;
  };
  highlights: string[];
  technologies: string[];
  caseStudy: {
    overview: string;
    objective: string;
    design: string;
    development: string;
    keyFeatures: string[];
    desktopMockupType: 'fashion' | 'amara' | 'aurelia' | 'eventera' | 'cars' | 'chatbi';
  };
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    iconName?: string;
  }[];
}

export interface JourneyStep {
  number: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
}
