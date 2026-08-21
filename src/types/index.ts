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
  tech: string[];
};

export type EducationEntry = {
  degree: string;
  institution: string;
  location: string;
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

export type SkillItem = {
  name: string;
  // Marks tools that repeat across the verified data in experience.ts and
  // projects.ts — a real, checkable signal, not a self-rated proficiency
  // score (AGENTS.md: every claim here has to be interview-defensible).
  core?: boolean;
};

export type SkillGroup = {
  label: string;
  // Short flag-style identifier for the terminal-styled Stack section
  // (e.g. "frontend", not "Frontend"). Separate from `label` so the
  // display label can stay more descriptive.
  flag: string;
  icon: IconComponent;
  items: SkillItem[];
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
