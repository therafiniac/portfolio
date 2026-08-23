import { strings } from "@/lib/i18n-strings";
import type { Localized } from "@/types";

export type CommandItem = {
  // Matches a Section's `id` prop directly — the palette navigates via
  // plain `href="#id"` anchors, same mechanism as Navbar/Footer, so there's
  // no separate routing table to keep in sync.
  id: string;
  label: Localized;
};

// Reuses each section's existing `eyebrow` string rather than duplicating
// copy — one source of truth for the category label shown in both the
// section header and here.
export const commandItems: CommandItem[] = [
  { id: "work", label: strings.clientWork.eyebrow },
  { id: "built", label: strings.projects.eyebrow },
  { id: "side-projects", label: strings.sideProjects.eyebrow },
  { id: "stack", label: strings.skills.eyebrow },
  { id: "experience", label: strings.experience.eyebrow },
  { id: "approach", label: strings.howIBuild.eyebrow },
  { id: "services", label: strings.services.eyebrow },
  { id: "contact", label: strings.contact.eyebrow },
];
