// ─── Navigation ───────────────────────────────────────────────
export interface NavItem {
  label: string;
  href:  string;
}

// ─── Skills ───────────────────────────────────────────────────
export interface Skill {
  name:  string;
  icon:  string;       // react-icons key or lucide name
  level: number;       // 1-5
}

export interface SkillCategory {
  title:  string;
  icon:   string;
  skills: Skill[];
}

// ─── Projects ─────────────────────────────────────────────────
export type ProjectTag =
  | "React"
  | "Next.js"
  | "Node.js"
  | "Express"
  | "MongoDB"
  | "TypeScript"
  | "Tailwind"
  | "MERN"
  | "WordPress"
  | "Figma"
  | "Other";

export interface Project {
  id:          string;
  title:       string;
  description: string;
  longDesc?:   string;
  tags:        ProjectTag[];
  github?:     string;
  live?:       string;
  image?:      string;
  featured:    boolean;
  status:      "completed" | "in-progress" | "archived";
}

// ─── Experience ───────────────────────────────────────────────
export interface ExperienceItem {
  id:           string;
  role:         string;
  company:      string;
  location:     string;
  period:       string;
  current:      boolean;
  description:  string[];
  technologies: string[];
}

// ─── Certifications ───────────────────────────────────────────
export interface Certification {
  id:       string;
  title:    string;
  issuer:   string;
  platform: string;
  year:     string;
  link?:    string;
  icon?:    string;
}

// ─── Contact ──────────────────────────────────────────────────
export interface ContactFormData {
  name:    string;
  email:   string;
  subject: string;
  message: string;
}

export interface SocialLink {
  label: string;
  href:  string;
  icon:  string;
}
