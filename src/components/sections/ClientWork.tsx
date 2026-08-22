"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { CountUp } from "@/components/layout/CountUp";
import { TileGlow } from "@/components/ui/TileGlow";
import { TechChip } from "@/components/ui/TechChip";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { WorkFillerTile } from "@/components/sections/WorkFillerTile";
import { clientProjects } from "@/lib/data/clientWork";
import { heroStats } from "@/lib/data/hero";
import type { ClientProject, Localized } from "@/types";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

// Every project screenshot is captured the same way (hero/fold, fixed
// viewport) and shown at this exact aspect ratio with object-cover — since
// the source and the box already match, nothing ever needs cropping
// decisions or a per-card size tier. Uniformity here is a feature: real
// screenshots drop straight in.
const SHOT_ASPECT = "aspect-[16/10]";

// A thin fake browser top bar above each screenshot — makes it read
// explicitly as "a live website," not a generic photo, which matters most
// while the images are still stock placeholders. Dots light up on hover
// with an on-brand blue → signature-blend → maroon sweep — not literal
// red/yellow/green, since AGENTS.md reserves --danger/--status-live for
// their actual semantic roles, and there's no yellow token in the palette.
function BrowserChrome({ label }: { label: string }) {
  const language = useLanguage();
  const displayLabel = language === "bn" ? (strings.techSounds[label] ?? label) : label;

  return (
    <div className="flex items-center gap-1.5 border-b border-line/40 bg-surface/90 px-3 py-2">
      <span className="h-1.5 w-1.5 rounded-full bg-line transition-colors duration-300 group-hover:bg-accent" />
      <span className="h-1.5 w-1.5 rounded-full bg-line transition-colors delay-75 duration-300 group-hover:bg-[color-mix(in_srgb,var(--accent),var(--accent-secondary))]" />
      <span className="h-1.5 w-1.5 rounded-full bg-line transition-colors delay-150 duration-300 group-hover:bg-accent-secondary" />
      <span className="ml-2 truncate rounded-full bg-bg/60 px-2 py-0.5 font-mono text-[length:var(--text-3xs)] uppercase tracking-[0.1em] text-text-muted">
        {displayLabel}
      </span>
    </div>
  );
}

function TechChips({ tech }: { tech: string[] }) {
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {tech.map((t) => (
        <TechChip key={t} size="sm">
          {t}
        </TechChip>
      ))}
    </div>
  );
}

// Every card is the same shape and weight — no featured/spotlight card,
// since with today's placeholder data there's no real "best one" to
// justify singling out. The section's strength is breadth across
// industries, not any one hero project. A fixed-height text block below
// a fixed-aspect image slot is what keeps every row even regardless of
// description length.
function WorkCard({ project }: { project: ClientProject }) {
  const language = useLanguage();

  return (
    <a
      href={project.href}
      className="hover-glow-panel group relative block overflow-hidden rounded-xl border border-line/60 transition-colors duration-300 hover:border-accent/60"
    >
      <TileGlow />
      <BrowserChrome label={project.tech[0]} />
      <div className={`relative w-full overflow-hidden ${SHOT_ASPECT}`}>
        <div className="tile-signature absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
          <project.icon
            className="h-14 w-14 text-accent-secondary"
            strokeWidth={1.25}
            aria-hidden="true"
          />
        </div>
        <Image
          src={project.coverImage}
          alt={`${t(project.name, language)} ${t(strings.clientWork.preview, language)}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>
      <div className="flex h-36 flex-col p-6">
        <FieldLabel>{t(project.category, language)}</FieldLabel>
        <h3 className="mt-1 flex items-center gap-1 text-base text-text-primary">
          {t(project.name, language)}
          <ArrowUpRight
            className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
            aria-hidden="true"
          />
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-text-muted">{t(project.description, language)}</p>
        <div className="mt-auto">
          <TechChips tech={project.tech.slice(0, 2)} />
        </div>
      </div>
    </a>
  );
}

// A quiet card, not a loud one — same flush neutral shell as WorkCard, but
// the number itself does the work: huge, gradient-clipped typography
// instead of an icon+number+label stack. Loud through scale and a boosted
// internal TileGlow wash, not another colorful gradient fill, which is
// what makes it read as genuinely different from the CTA tile rather than
// a copy of it. Sourced from heroStats (same "150+ Sites Shipped" fact
// Hero already states) rather than a separate hardcoded number, so the
// two never drift apart.
// Same gradient-ring border Stack's terminal panel uses (see Skills.tsx —
// the border is 1px of --gradient-signature itself, showing through a
// 1px inset, rather than a color-mix ring on top of a flat fill) — this
// card is the section's other brand moment, so it gets the same signature
// treatment instead of the neutral hairline the project cards use.
function StatShowcase({ value, suffix, label }: { value: number; suffix?: string; label: Localized }) {
  const language = useLanguage();

  return (
    <div
      className="relative h-full rounded-xl p-px shadow-[0_25px_60px_-20px_color-mix(in_srgb,var(--shadow-color)_50%,transparent)]"
      style={{ backgroundImage: "var(--gradient-signature)" }}
    >
      <div className="hover-glow-panel group relative flex h-full flex-col items-center justify-center gap-2 overflow-hidden rounded-xl bg-surface p-6 text-center">
        <TileGlow intensity={40} spread={85} className="stat-tile-glow" />
        <span
          className="bg-clip-text font-mono text-7xl font-semibold leading-none text-transparent"
          style={{ backgroundImage: "var(--gradient-signature)" }}
        >
          <CountUp value={value} suffix={suffix} />
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
          {t(label, language)}
        </span>
      </div>
    </div>
  );
}

type GridItem =
  | { kind: "project"; project: ClientProject }
  | { kind: "stat"; value: number; suffix?: string; label: Localized }
  | { kind: "filler" };

// Deliberately curated, not algorithmic: with today's 7 projects, the stat
// tile sits at slot 5 (dead center of the 3x3 grid) and the CTA closes the
// grid at slot 9 (bottom-right) — both meant to be found, not just filler
// between screenshots. If the project count changes, re-pick these
// positions by hand rather than falling back to a generic interval; a
// formula that "just happens" to land on 5 and 9 isn't worth the
// complexity for a curated placeholder set this small.
function buildGridItems(projects: ClientProject[]): GridItem[] {
  const sitesShipped = heroStats.find((s) => s.label.en === "Sites Shipped");
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

  items.push({ kind: "filler" });

  return items;
}

export function ClientWork() {
  const items = buildGridItems(clientProjects);
  const language = useLanguage();

  return (
    <Section id="work" index="01" tint eyebrow={strings.clientWork.eyebrow} title={strings.clientWork.title}>
      <p className="-mt-6 mb-10 max-w-2xl text-text-muted">{t(strings.clientWork.intro, language)}</p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) =>
          item.kind === "project" ? (
            <WorkCard key={item.project.name.en} project={item.project} />
          ) : item.kind === "stat" ? (
            <StatShowcase key={`stat-${index}`} value={item.value} suffix={item.suffix} label={item.label} />
          ) : (
            <WorkFillerTile key={`filler-${index}`} />
          ),
        )}
      </div>
    </Section>
  );
}
