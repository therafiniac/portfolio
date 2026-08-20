import type { ComponentType, SVGProps } from "react";

// Loose enough to accept both lucide-react icons and the hand-written
// brand SVGs in src/components/icons (lucide dropped brand/logo marks).
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type ExperienceEntry = {
  role: string;
  org: string;
  location: string;
  start: string;
  end: string;
  highlights: string[];
};

export type Project = {
  name: string;
  tagline: string;
  tech: string[];
  highlight: string;
  liveUrl?: string;
  githubUrl?: string;
  private?: boolean;
};

export type ClientProject = {
  name: string;
  category: string;
  description: string;
  coverImage: string;
  href: string;
  icon: IconComponent;
  tech: string[];
};

export type SkillGroup = {
  label: string;
  icon: IconComponent;
  items: string[];
};

export type ContactLink = {
  label: string;
  value: string;
  href: string;
  icon: IconComponent;
};

export type HeroStat = {
  value: number;
  suffix?: string;
  label: string;
};

export type NavLink = {
  href: string;
  label: string;
  id: string;
};
