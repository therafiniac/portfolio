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

export type SkillGroup = {
  label: string;
  items: string[];
};

export type ContactLink = {
  label: string;
  value: string;
  href: string;
};
