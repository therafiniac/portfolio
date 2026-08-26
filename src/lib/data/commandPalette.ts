import { strings } from "@/lib/i18n-strings";
import { clientProjects } from "@/lib/data/clientWork";
import { skillGroups } from "@/lib/data/skills";
import { experience } from "@/lib/data/experience";
import { sideProjects } from "@/lib/data/sideProjects";
import { services } from "@/lib/data/services";
import { resolvePlaceholderHref } from "@/lib/placeholderLink";
import type { Localized } from "@/types";

export type CommandItem = {
  // Unique key. For section entries this doubles as the anchor id
  // (kept exactly as before); every other entry gets a prefixed id
  // instead since it doesn't correspond to its own DOM anchor.
  id: string;
  label: Localized;
  // Small badge shown on the right — literal "#id" for a section (still
  // a real anchor), or the entry's own real category/group where one
  // exists (a project's category, a skill's group label) since that's
  // more informative than implying every result jumps to the same
  // anchor its section does.
  badge: Localized;
  // "#id" for a same-page anchor, "/work/slug" for a real case-study
  // route, or an external URL — CommandPalette.tsx picks the right
  // element (plain anchor / next/link / new-tab anchor) from this shape
  // rather than the type carrying a separate "kind" flag.
  href: string;
};

function sectionBadge(id: string): Localized {
  return { en: `#${id}`, bn: `#${id}` };
}

// Reuses each section's existing `eyebrow` string rather than duplicating
// copy — one source of truth for the category label shown in both the
// section header and here.
//
// <Projects /> (page.tsx) is commented out for now, so its "Independent
// Projects" entry stays out of this list too — including it here would
// point searchers at a dead #built anchor, same reasoning as the section
// entry itself.
const sectionItems: CommandItem[] = [
  { id: "work", label: strings.clientWork.eyebrow, badge: sectionBadge("work"), href: "#work" },
  { id: "side-projects", label: strings.sideProjects.eyebrow, badge: sectionBadge("side-projects"), href: "#side-projects" },
  { id: "stack", label: strings.skills.eyebrow, badge: sectionBadge("stack"), href: "#stack" },
  { id: "experience", label: strings.experience.eyebrow, badge: sectionBadge("experience"), href: "#experience" },
  { id: "approach", label: strings.howIBuild.eyebrow, badge: sectionBadge("approach"), href: "#approach" },
  { id: "services", label: strings.services.eyebrow, badge: sectionBadge("services"), href: "#services" },
  { id: "contact", label: strings.contact.eyebrow, badge: sectionBadge("contact"), href: "#contact" },
];

// Every real case study, searchable by name — jumps straight to its own
// page rather than just scrolling to the Work section, since that's the
// actual destination a search for a project name implies.
const projectItems: CommandItem[] = clientProjects.map((project) => ({
  id: `project-${project.slug}`,
  label: project.name,
  badge: project.category,
  href: `/work/${project.slug}`,
}));

// Every skill/tool name, flattened out of its group — this is the bulk of
// "search anything," since typing a specific technology (e.g. "MongoDB")
// previously matched nothing at all despite it being real, listed data.
const skillItems: CommandItem[] = skillGroups.flatMap((group) =>
  group.items.map((item) => ({
    id: `skill-${item.name.en}`,
    label: item.name,
    badge: group.label,
    href: "#stack",
  })),
);

// Role + org together as one searchable line — matches how the timeline
// itself presents each entry, so a search for either half finds it.
const experienceItems: CommandItem[] = experience.map((entry) => ({
  id: `experience-${entry.org}-${entry.start}`,
  label: { en: `${entry.role.en} · ${entry.org}`, bn: `${entry.role.bn} · ${entry.org}` },
  badge: sectionBadge("experience"),
  href: "#experience",
}));

// Real hrefs (or the honest /under-construction placeholder — see
// SideProjects.tsx's own use of the same resolver) rather than always
// pointing at the section anchor, since these are individually linkable
// tools, not case studies that only make sense in context.
const sideProjectItems: CommandItem[] = sideProjects.map((project) => ({
  id: `side-project-${project.name.en}`,
  label: project.name,
  badge: sectionBadge("side-projects"),
  href: resolvePlaceholderHref(project.href),
}));

const serviceItems: CommandItem[] = services.map((service) => ({
  id: `service-${service.name.en}`,
  label: service.name,
  badge: sectionBadge("services"),
  href: "#services",
}));

export const commandItems: CommandItem[] = [
  ...sectionItems,
  ...projectItems,
  ...skillItems,
  ...experienceItems,
  ...sideProjectItems,
  ...serviceItems,
];
