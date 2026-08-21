import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { CountUp } from "@/components/layout/CountUp";
import { WorkFillerTile } from "@/components/sections/WorkFillerTile";
import { clientProjects } from "@/lib/data/clientWork";
import { heroStats } from "@/lib/data/hero";
import type { ClientProject } from "@/types";

// A soft off-center glow behind the screenshot — gives the card some depth
// against the plain surface instead of a flat fill. The filler tiles
// (WorkFillerTile.tsx) don't use this anymore — they're a bold solid
// gradient now, loud on purpose, so a subtle glow would just get lost.
function TileGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(circle at 28% 22%, color-mix(in srgb, var(--accent-secondary) 16%, transparent), transparent 60%)",
      }}
    />
  );
}

// Every project screenshot is captured the same way (hero/fold, fixed
// viewport) and shown at this exact aspect ratio with object-cover — since
// the source and the box already match, nothing ever needs cropping
// decisions or a per-card size tier. Uniformity here is a feature: real
// screenshots drop straight in.
const SHOT_ASPECT = "aspect-[16/10]";

// A thin fake browser top bar above each screenshot — makes it read
// explicitly as "a live website," not a generic photo, which matters most
// while the images are still stock placeholders. Dots are neutral (not
// literal red/yellow/green) since AGENTS.md reserves --danger/--status-live
// for their actual semantic roles, not decoration.
function BrowserChrome({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-line/40 bg-surface/90 px-3 py-2">
      <span className="h-1.5 w-1.5 rounded-full bg-line" />
      <span className="h-1.5 w-1.5 rounded-full bg-line" />
      <span className="h-1.5 w-1.5 rounded-full bg-line" />
      <span className="ml-2 truncate rounded-full bg-bg/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted">
        {label}
      </span>
    </div>
  );
}

function TechChips({ tech }: { tech: string[] }) {
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {tech.map((t) => (
        <span
          key={t}
          className="rounded border border-line/40 px-1.5 py-0.5 font-mono text-[9px] text-text-muted"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

// Every card is the same shape and weight — no featured/spotlight card,
// since with today's placeholder data there's no real "best one" to
// justify singling out. The section's strength is breadth across
// industries, not any one hero project. A fixed-height text block below
// a fixed-aspect screenshot is what keeps every row even regardless of
// description length.
function WorkCard({ project }: { project: ClientProject }) {
  return (
    <a
      href={project.href}
      className="hover-glow-panel group relative block overflow-hidden rounded-xl border border-line/60 transition-colors duration-300 hover:border-accent/60"
    >
      <TileGlow />
      <BrowserChrome label={project.category} />
      <div className={`relative w-full ${SHOT_ASPECT}`}>
        <Image
          src={project.coverImage}
          alt={`${project.name} preview`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex h-36 flex-col p-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent-secondary">
          {project.category}
        </span>
        <h3 className="mt-1 flex items-center gap-1 text-base text-text-primary">
          {project.name}
          <ArrowUpRight
            className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
            aria-hidden="true"
          />
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-text-muted">{project.description}</p>
        <div className="mt-auto">
          <TechChips tech={project.tech.slice(0, 2)} />
        </div>
      </div>
    </a>
  );
}

// A quiet card, not a loud one — same neutral shell as WorkCard, but the
// number itself does the work: huge, gradient-clipped typography instead
// of an icon+number+label stack. Loud through scale, not through another
// colorful gradient fill, which is what makes it read as genuinely
// different from the CTA tile rather than a copy of it. Sourced from
// heroStats (same "150+ Sites Shipped" fact Hero already states) rather
// than a separate hardcoded number, so the two never drift apart.
function StatShowcase({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  return (
    <div className="hover-glow-panel group relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-line/60 p-6 text-center transition-colors duration-300 hover:border-accent/60">
      <TileGlow />
      <span
        className="bg-clip-text font-mono text-7xl font-semibold leading-none text-transparent"
        style={{ backgroundImage: "var(--gradient-signature)" }}
      >
        <CountUp value={value} suffix={suffix} />
      </span>
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">{label}</span>
    </div>
  );
}

type GridItem =
  | { kind: "project"; project: ClientProject }
  | { kind: "stat"; value: number; suffix?: string; label: string }
  | { kind: "filler"; variant: "schematic" }
  | { kind: "filler"; variant: "cta" };

// Deliberately curated, not algorithmic: with today's 7 projects, the stat
// tile sits at slot 5 (dead center of the 3x3 grid) and the CTA closes the
// grid at slot 9 (bottom-right) — both meant to be found, not just filler
// between screenshots. If the project count changes, re-pick these
// positions by hand rather than falling back to a generic interval; a
// formula that "just happens" to land on 5 and 9 isn't worth the
// complexity for a curated placeholder set this small.
function buildGridItems(projects: ClientProject[]): GridItem[] {
  const sitesShipped = heroStats.find((s) => s.label === "Sites Shipped");
  const items: GridItem[] = [];

  projects.forEach((project, i) => {
    if (i === 4 && sitesShipped) {
      items.push({
        kind: "stat",
        value: sitesShipped.value,
        suffix: sitesShipped.suffix,
        label: sitesShipped.label,
      });
    }
    items.push({ kind: "project", project });
  });

  items.push({ kind: "filler", variant: "cta" });

  return items;
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
            <WorkCard key={item.project.name} project={item.project} />
          ) : item.kind === "stat" ? (
            <StatShowcase key={`stat-${index}`} value={item.value} suffix={item.suffix} label={item.label} />
          ) : (
            <WorkFillerTile key={`filler-${index}`} type={item.variant} />
          ),
        )}
      </div>
    </Section>
  );
}
