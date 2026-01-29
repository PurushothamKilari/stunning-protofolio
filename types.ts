export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  // year removed
  category: 'Manufacturing' | 'Open Source' | 'Experimental' | 'Continuous Improvement' | 'Logistics' | 'Maintenance'  | 'Quality';
  link?: string;
  featured: boolean;
  image?: string; // URL for background image
  impact?: string; // Business impact metric
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
  type?: 'work' | 'education';
}

export interface SkillCategory {
  level: 'Advanced' | 'Intermediate' | 'Exploring';
  skills: string[];
  context: string;
}

export interface Service {
  title: string;
  description: string;
  // price field removed
  features: string[];
  recommended?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export enum FilterType {
  ALL = 'All',
  THREE = 'WebGL',
  MANUFACTURING = "MANUFACTURING",
  LOGISTICS = "LOGISTICS",
  QUALITY = "QUALITY",
  CONTINUOUS_IMPROVEMENT = "CONTINUOUS_IMPROVEMENT",
}