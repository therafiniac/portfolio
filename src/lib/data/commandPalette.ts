import { strings } from "@/lib/i18n-strings";
import { clientProjects } from "@/lib/data/clientWork";
import { skillGroups } from "@/lib/data/skills";
import { experience } from "@/lib/data/experience";
import { sideProjects } from "@/lib/data/sideProjects";
import { services } from "@/lib/data/services";
import { approachPoints } from "@/lib/data/approach";
import type { Localized } from "@/types";

export type CommandItem = {
  // Matches a Section's `id` prop directly — the palette navigates via
  // plain `href="#id"` anchors, same mechanism as Navbar/Footer, so
  // there's no separate routing table to keep in sync.
  id: string;
  label: Localized;
  badge: Localized;
  // Real terms that live inside this section but don't get their own
  // row — a project name, a skill, a role. Typing one of these matches
  // this section (so "mongodb" or "auditpulse" still finds *something*
  // instead of "No matches") without listing every project/skill/role as
  // its own separate result — an earlier pass tried that and it was more
  // keyword-soup than useful for a 7-section site. English only: these
  // are technical/proper-noun terms (tool names, project names) that
  // don't get a Bengali form anywhere else on the site either.
  keywords: string[];
};

function sectionBadge(id: string): Localized {
  return { en: `#${id}`, bn: `#${id}` };
}

// <Projects /> (page.tsx) is commented out for now, so its "Independent
// Projects" entry stays out of this list too — including it here would
// point searchers at a dead #built anchor.
export const commandItems: CommandItem[] = [
  {
    id: "work",
    label: strings.clientWork.eyebrow,
    badge: sectionBadge("work"),
    keywords: clientProjects.flatMap((p) => [p.name.en, p.category.en]),
  },
  {
    id: "side-projects",
    label: strings.sideProjects.eyebrow,
    badge: sectionBadge("side-projects"),
    keywords: sideProjects.map((p) => p.name.en),
  },
  {
    id: "stack",
    label: strings.skills.eyebrow,
    badge: sectionBadge("stack"),
    keywords: skillGroups.flatMap((g) => [g.label.en, ...g.items.map((i) => i.name.en)]),
  },
  {
    id: "experience",
    label: strings.experience.eyebrow,
    badge: sectionBadge("experience"),
    keywords: experience.flatMap((e) => [e.role.en, e.org]),
  },
  {
    id: "approach",
    label: strings.howIBuild.eyebrow,
    badge: sectionBadge("approach"),
    keywords: approachPoints.map((p) => p.heading.en),
  },
  {
    id: "services",
    label: strings.services.eyebrow,
    badge: sectionBadge("services"),
    keywords: services.map((s) => s.name.en),
  },
  {
    id: "contact",
    label: strings.contact.eyebrow,
    badge: sectionBadge("contact"),
    keywords: ["email", "github", "linkedin"],
  },
];
