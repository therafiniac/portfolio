import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { WorkFillerTile } from "@/components/sections/WorkFillerTile";
import { clientProjects } from "@/lib/data/clientWork";
import type { ClientProject } from "@/types";

// Same chamfered signature shape as BrandMark/FramedImage — ties these
// cards into the site's mark instead of generic rounded rectangles.
const CHAMFER_CLIP =
  "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)";

// Every card shares one structure — full-bleed photo, gradient scrim, text
// overlaid on top — so its total height is fixed by the `height` prop alone,
// never by how long its description happens to be. That's what keeps a row
// even: cards only line up when nothing inside them can grow taller than
// its box. Variety comes from row to row (a "tall" row vs a "short" row),
// not from mixing different heights inside one row.
type RowHeight = "tall" | "short";

type SlotSpec =
  | { kind: "project"; span: 1 | 2; height: RowHeight; featured?: boolean }
  | { kind: "filler"; span: 1; height: RowHeight };

// A "tall" row: one 2-col-wide featured photo + one 1-col filler tile.
// The 1-col slot next to it is only ever a filler, never a real project —
// at 1 column wide but full tall-row height it's close to square, which
// would badly crop a real website screenshot (the real content this grid
// is standing in for). A filler tile has no such constraint. Every real
// project card stays in one of two genuinely landscape shapes: 2-col-wide
// tall, or 1-col-wide short.
const ROW_CYCLE: SlotSpec[] = [
  { kind: "project", span: 2, height: "tall", featured: true },
  { kind: "filler", span: 1, height: "tall" },
  { kind: "project", span: 1, height: "short" },
  { kind: "project", span: 1, height: "short" },
  { kind: "project", span: 1, height: "short" },
];
const PROJECT_SLOTS_PER_CYCLE = ROW_CYCLE.filter((slot) => slot.kind === "project").length;

// Ordered so the functional tiles (a real stat, a contact CTA) surface
// first as the list grows — the purely decorative schematic tile is the
// one that can wait until there's enough content to need a third accent.
type FillerVariant = "stat" | "schematic" | "cta";
const FILLER_CYCLE: FillerVariant[] = ["stat", "cta", "schematic"];

type GridItem =
  | { kind: "project"; project: ClientProject; span: 1 | 2; height: RowHeight; featured?: boolean }
  | { kind: "filler"; variant: "stat"; span: 1; height: RowHeight; value: number; label: string }
  | { kind: "filler"; variant: "schematic"; span: 1; height: RowHeight }
  | { kind: "filler"; variant: "cta"; span: 1; height: RowHeight };

function buildGridItems(projects: ClientProject[]): GridItem[] {
  const industriesServed = new Set(projects.map((p) => p.category)).size;
  const items: GridItem[] = [];
  let projectCursor = 0;
  let fillerCursor = 0;
  const cycles = Math.ceil(projects.length / PROJECT_SLOTS_PER_CYCLE);

  for (let c = 0; c < cycles; c++) {
    for (const slot of ROW_CYCLE) {
      if (slot.kind === "project") {
        if (projectCursor >= projects.length) continue;
        const project = projects[projectCursor];
        projectCursor++;
        items.push({ kind: "project", project, span: slot.span, height: slot.height, featured: slot.featured });
        continue;
      }

      const variant = FILLER_CYCLE[fillerCursor % FILLER_CYCLE.length];
      fillerCursor++;
      items.push(
        variant === "stat"
          ? { kind: "filler", variant, span: slot.span, height: slot.height, value: industriesServed, label: "Industries Served" }
          : { kind: "filler", variant, span: slot.span, height: slot.height },
      );
    }
  }

  return items;
}

function WorkCard({
  project,
  span,
  height,
  featured,
}: {
  project: ClientProject;
  span: 1 | 2;
  height: RowHeight;
  featured?: boolean;
}) {
  const isTall = height === "tall";

  return (
    <a
      href={project.href}
      className={`group relative block ${isTall ? "h-80" : "h-48"} ${span === 2 ? "sm:col-span-2" : ""}`}
    >
      {/* Border layer, painted first (behind). See globals.css for why
          this can't be a plain `border` or a z-index pseudo-element. */}
      <span aria-hidden="true" className="chamfer-border absolute inset-0" style={{ clipPath: CHAMFER_CLIP }} />
      {/* Content layer, inset so the border layer stays visible as a ring
          underneath it — including along the chamfer cut. */}
      <div
        className="chamfer-panel absolute inset-[2px] overflow-hidden bg-bg"
        style={{ clipPath: CHAMFER_CLIP }}
      >
        <Image
          src={project.coverImage}
          alt={`${project.name} preview`}
          fill
          sizes={span === 2 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent"
          aria-hidden="true"
        />
        <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white">
          <project.icon className="h-4 w-4" aria-hidden="true" />
        </span>
        {featured && (
          <span
            className="absolute right-4 top-4 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-bg"
            style={{ backgroundImage: "var(--gradient-signature)" }}
          >
            Featured
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/70">
            {project.category}
          </span>
          <h3 className={`mt-1 flex items-center gap-1 text-white ${isTall ? "text-xl" : "text-base"}`}>
            {project.name}
            <ArrowUpRight
              className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
              aria-hidden="true"
            />
          </h3>
          <p className={`mt-1 text-white/70 ${isTall ? "text-sm" : "text-xs line-clamp-1"}`}>
            {project.description}
          </p>
        </div>
      </div>
    </a>
  );
}

export function ClientWork() {
  const items = buildGridItems(clientProjects);

  return (
    <Section id="work" index="01" tint eyebrow="Client Work" title="Work I've Delivered">
      <p className="-mt-6 mb-10 max-w-2xl text-text-muted">
        A sample from 150+ client sites delivered across industries — the
        actual, shipped, paid-for work.
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) =>
          item.kind === "project" ? (
            <WorkCard
              key={item.project.name}
              project={item.project}
              span={item.span}
              height={item.height}
              featured={item.featured}
            />
          ) : item.variant === "stat" ? (
            <WorkFillerTile
              key={`filler-${index}`}
              type="stat"
              value={item.value}
              label={item.label}
              height={item.height}
            />
          ) : (
            <WorkFillerTile key={`filler-${index}`} type={item.variant} height={item.height} />
          ),
        )}
      </div>
    </Section>
  );
}
