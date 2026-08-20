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
  // The real technical claim, rendered large (e.g. "O(N)", "3") — not a
  // decorative graphic, the actual number/complexity being claimed.
  stat: { value: string; label: string };
  // A short, project-specific mechanism flow (e.g. "Flat list" → "Hash-map
  // pass" → "Tree") — illustrates *this* project's actual approach, not a
  // generic reusable diagram swapped in by index.
  flow: string[];
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
