import type { ComponentType, SVGProps } from "react";

// Loose enough to accept both lucide-react icons and the hand-written
// brand SVGs in src/components/icons (lucide dropped brand/logo marks).
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

// Any user-facing copy that needs a Bengali counterpart — inline on the
// same field rather than a parallel bn/ data directory, so English and
// Bengali for one entry can never drift out of sync with each other.
// Real proper nouns that should never change spelling regardless of
// language (companies, institutions kept in Latin, tech/tool/brand
// names, URLs) and raw stat/notation numbers stay plain strings; the
// site's own name/title-style content (person's name, project titles)
// gets a transliterated bn value like anything else. Consumed via
// `t(field)` (src/lib/i18n.ts), never `.en`/`.bn` accessed directly, so
// the fallback-to-English behavior lives in exactly one place.
export type Localized = { en: string; bn: string };

export type ExperienceEntry = {
  role: Localized;
  org: string;
  location: Localized;
  start: string;
  end: string;
  highlights: Localized[];
  tech: string[];
};

export type EducationEntry = {
  degree: Localized;
  institution: Localized;
  location: Localized;
};

export type Project = {
  name: Localized;
  tagline: Localized;
  tech: string[];
  highlight: Localized;
  // The real technical claim, rendered large (e.g. "O(N)", "3") — not a
  // decorative graphic, the actual number/complexity being claimed.
  // value stays plain (notation, not prose); label is translated.
  stat: { value: string; label: Localized };
  // A short, project-specific mechanism flow (e.g. "Flat list" → "Hash-map
  // pass" → "Tree") — illustrates *this* project's actual approach, not a
  // generic reusable diagram swapped in by index.
  flow: Localized[];
  liveUrl?: string;
  githubUrl?: string;
  private?: boolean;
};

// Small, self-contained tools built for fun rather than as a technical
// case study — no stack/architecture story attached (see SideProjects.tsx),
// unlike Project above, which is reserved for deep-dive builds.
export type SideProject = {
  name: Localized;
  description: Localized;
  href: string;
  icon: IconComponent;
};

export type ClientProject = {
  // URL segment for this project's case-study page (/work/[slug]) — a
  // plain slug, not translated (same reasoning as ProfileLink.label: it's
  // an identifier, not prose).
  slug: string;
  name: Localized;
  category: Localized;
  description: Localized;
  coverImage: string;
  href: string;
  icon: IconComponent;
  tech: string[];
  // Everything below is optional, shown only on the case-study page
  // (never the card), and rendered conditionally there — CaseStudy.tsx
  // skips a section outright when its field is absent rather than
  // showing it empty. Left unset for every placeholder entry today
  // rather than filled with invented specifics: AGENTS.md's placeholder-
  // honesty rule applies here the same as name/description/tech do.
  // Fill these in once real client details exist for a project.
  challenge?: Localized;
  approach?: Localized;
  // Concrete, concise — "what shipped," not marketing copy.
  highlights?: Localized[];
  // Only ever a real, specific, checkable result — omit rather than
  // write a vague "great success" placeholder.
  outcome?: Localized;
  gallery?: GalleryImage[];
};

// caption says what the shot actually shows (rendered as a small label
// under the image, see CaseStudy.tsx) — a gallery of unlabeled
// screenshots asks the visitor to guess what they're looking at.
// orientation defaults to landscape (most screenshots); mark "portrait"
// for a mobile-viewport capture so it gets its own narrower frame
// instead of being force-cropped into a 16:10 landscape box.
export type GalleryImage = {
  src: string;
  caption: Localized;
  orientation?: "portrait";
};

export type SkillItem = {
  // Phonetic transliteration in bn, not translation — same tool/tech
  // name spelled in Bengali script by sound (see skills.ts).
  name: Localized;
  // Marks tools that repeat across the verified data in experience.ts and
  // projects.ts — a real, checkable signal, not a self-rated proficiency
  // score (AGENTS.md: every claim here has to be interview-defensible).
  core?: boolean;
};

export type SkillGroup = {
  label: Localized;
  // Short flag-style identifier for the terminal-styled Stack section
  // (e.g. "frontend", not "Frontend"). Separate from `label` so the
  // display label can stay more descriptive. Localized like everything
  // else here — bn is a phonetic transliteration, still presented as
  // literal `--flag` CLI syntax either way.
  flag: Localized;
  icon: IconComponent;
  items: SkillItem[];
};

// Read-worthy info — an email you'd copy, a location that tells you
// where someone's based. Rendered as icon + value, no href required
// (location has nowhere to link to). value is a plain string for rows
// that must never translate (the email address) and Localized for rows
// that should (the city name) — see contact.ts.
export type ContactInfo = {
  label: Localized;
  value: string | Localized;
  icon: IconComponent;
  href?: string;
};

// Click-through only — a profile you visit, not text you read. Icon
// only; the href is the whole point, there's nothing else to show. Label
// stays plain — it's a platform proper noun (GitHub, LinkedIn, ...).
export type ProfileLink = {
  label: string;
  href: string;
  icon: IconComponent;
};

export type HeroStat = {
  value: number;
  suffix?: string;
  label: Localized;
};

export type NavLink = {
  href: string;
  label: Localized;
  id: string;
};

// A post published on another platform, not hosted here — href points at
// the real post, same honesty rule as ProfileLink's not-yet-real hrefs
// (see AGENTS.md). `language` marks the post's own written language
// (Bengali today, English for later posts) independent of the site's own
// bn/en toggle — a Bengali visitor reading the English-mode site should
// still see a post correctly flagged "BN", not have it relabeled by the
// UI language. `platform` stays plain, same reasoning as ProfileLink.label
// (a proper noun, never translated). `icon` is the post's own topic
// glyph (e.g. a shield for a VPN explainer) — decorative, picked per
// entry to fit what that specific post is actually about, distinct from
// PLATFORM_ICON in Writing.tsx which marks where it was published.
export type WritingLanguage = "bn" | "en";

export type WritingPost = {
  title: Localized;
  excerpt: Localized;
  href: string;
  platform: string;
  date: Localized;
  language: WritingLanguage;
  icon: IconComponent;
};
