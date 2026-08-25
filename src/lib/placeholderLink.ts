// "#" is this site's data-layer marker for "not real yet" (see
// clientWork.ts/sideProjects.ts/contact.ts's own comments — the honest-
// placeholder convention AGENTS.md calls for instead of a fake domain).
// Previously that meant the link just went nowhere when clicked; this is
// the one place that resolves it to somewhere real instead — a page that
// says exactly that, rather than a dead "#" or an invented destination.
// Three call sites (Contact's profileLinks, SideProjects' tool cards,
// ClientWork's Coming Soon tiles) is what earns this its own module
// rather than three copies of the same ternary.
export const UNDER_CONSTRUCTION_HREF = "/under-construction";

export function resolvePlaceholderHref(href: string): string {
  return href.startsWith("http") ? href : UNDER_CONSTRUCTION_HREF;
}
