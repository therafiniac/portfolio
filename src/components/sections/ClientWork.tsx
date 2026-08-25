"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Hourglass } from "lucide-react";
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
//
// Links to this project's own case-study page (/work/[slug]), not
// straight to the live site — see AGENTS.md's "Case Study Pages". The
// live-site link itself now lives on that page, conditional on a real
// href existing there.
function WorkCard({ project }: { project: ClientProject }) {
  const language = useLanguage();

  return (
    <Link
      href={`/work/${project.slug}`}
      className="hover-glow-panel group relative block overflow-hidden rounded-xl border border-line/60 transition-colors duration-300 hover:border-accent/60"
    >
      <TileGlow />
      <BrowserChrome label={project.tech[0]} />
      <div className={`relative w-full overflow-hidden ${SHOT_ASPECT}`}>
        {/* Reveal-on-hover only from md up — below that there's no
            persistent hover state to trigger it (a touch tap doesn't hold
            :hover), so the real screenshot would never show at all on
            mobile. Below md the default flips: the screenshot shows
            plainly and the icon placeholder stays hidden, since that's
            strictly more informative than a state mobile can never reach. */}
        <div className="tile-signature absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 md:opacity-100 md:group-hover:opacity-0">
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
          className="object-cover opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100"
        />
      </div>
      <div className="flex min-h-36 flex-col p-6">
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
    </Link>
  );
}

// Not a stock-photo placeholder pretending to be a finished case study —
// two more real projects exist but aren't written up yet, and a card
// with a generic name/screenshot sitting next to five verified real
// entries would read as a fabricated one (AGENTS.md's placeholder-
// honesty rule). But it also shouldn't look broken or disabled next to
// real cards: same chrome bar, TileGlow, border, and icon/hover-reveal
// choreography as WorkCard — an Hourglass stands in for the icon slot,
// and the reveal is the section's own signature-gradient lettering
// instead of a screenshot Image, since there's no real one yet. Not a
// Link — it has nowhere real to go yet — but everything else matches.
//
// Hidden below sm (single-column mobile) entirely, not just re-flowed:
// on a touch device there's no hover to trigger the reveal, so the tile
// would sit there either showing the icon and never the "Coming Soon"
// label, or the label with no card content behind it — worse than just
// not spending a slot on a placeholder in an already-short mobile
// stack. Reappears from sm up, where every card's own hover choreography
// already applies normally.
function ComingSoonTile() {
  const language = useLanguage();
  const label = t(strings.clientWork.comingSoon, language);

  return (
    <div className="hover-glow-panel group relative hidden flex-col overflow-hidden rounded-xl border border-line/60 transition-colors duration-300 hover:border-accent/60 sm:flex">
      <TileGlow />
      <BrowserChrome label="Coming Soon" />
      <div className={`relative w-full overflow-hidden ${SHOT_ASPECT}`}>
        <div className="tile-signature absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 md:opacity-100 md:group-hover:opacity-0">
          <Hourglass className="h-14 w-14 text-accent-secondary" strokeWidth={1.25} aria-hidden="true" />
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100"
          style={{ backgroundImage: "var(--gradient-signature)" }}
        >
          <span className="font-mono text-sm uppercase tracking-[0.25em] text-bg">{label}</span>
        </div>
      </div>
      <div className="flex min-h-36 flex-col p-6">
        <FieldLabel>{label}</FieldLabel>
        <p className="mt-1 text-xs text-text-muted">{t(strings.clientWork.comingSoonBody, language)}</p>
      </div>
    </div>
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
  | { kind: "comingSoon" }
  | { kind: "filler" };

// Two more real projects exist but aren't written up in clientWork.ts
// yet (see that file's own note) — shown as ComingSoonTile instead of
// stock-photo placeholder entries. Drop to 0 and delete once both real
// entries land.
const COMING_SOON_COUNT = 2;

// Deliberately curated, not algorithmic: with today's 5 real projects +
// 2 coming-soon tiles, the stat tile sits at slot 5 (dead center of the
// 3x3 grid) and the CTA closes the grid at slot 9 (bottom-right) — both
// meant to be found, not just filler between screenshots. If either count
// changes, re-pick these positions by hand rather than falling back to a
// generic interval; a formula that "just happens" to land on 5 and 9
// isn't worth the complexity for a curated placeholder set this small.
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

  for (let i = 0; i < COMING_SOON_COUNT; i++) {
    items.push({ kind: "comingSoon" });
  }

  items.push({ kind: "filler" });

  return items;
}

export function ClientWork() {
  const items = buildGridItems(clientProjects);
  const language = useLanguage();

  return (
    <Section id="work" tag="WORK" tint eyebrow={strings.clientWork.eyebrow} title={strings.clientWork.title}>
      <p className="-mt-6 mb-10 max-w-2xl text-text-muted">{t(strings.clientWork.intro, language)}</p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) =>
          item.kind === "project" ? (
            <WorkCard key={item.project.name.en} project={item.project} />
          ) : item.kind === "stat" ? (
            <StatShowcase key={`stat-${index}`} value={item.value} suffix={item.suffix} label={item.label} />
          ) : item.kind === "comingSoon" ? (
            <ComingSoonTile key={`coming-soon-${index}`} />
          ) : (
            <WorkFillerTile key={`filler-${index}`} />
          ),
        )}
      </div>
    </Section>
  );
}
