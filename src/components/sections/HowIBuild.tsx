"use client";

import type { ReactElement, ReactNode } from "react";
import { Section } from "@/components/layout/Section";
import { ContactCtaTile } from "@/components/layout/ContactCtaTile";
import { TileGlow } from "@/components/ui/TileGlow";
import { approachPoints, type ApproachPoint } from "@/lib/data/approach";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

// Five small diagrams, one per point below — circles + thin connecting
// lines, one node pulsing, a different topology per concept, so each card
// gets something that actually illustrates its point instead of empty
// gradient space between the icon and the text.
function edgeProps() {
  return { stroke: "var(--accent)", strokeWidth: 1.25, opacity: 0.35 } as const;
}

function nodeProps(pulse: boolean) {
  return {
    r: 3.5,
    fill: "var(--accent-secondary)",
    opacity: 0.6,
    className: pulse ? "motion-safe:animate-pulse" : undefined,
  } as const;
}

// The four "tall" graphics below are deliberately denser than Pipeline —
// more nodes and connections, not just a bigger render of a simple shape —
// since they sit in cards with real room to fill. Pipeline (short card)
// stays minimal on purpose.
function LayersGraphic({ className }: { className?: string }) {
  const cols = [25, 75, 125, 175];
  const rows = [15, 60, 105];
  const spineCols = [75, 125];
  return (
    <svg viewBox="0 0 200 120" className={className} aria-hidden="true">
      {rows.map((y) =>
        cols.slice(0, -1).map((x, i) => (
          <line key={`${y}-${x}`} x1={x} y1={y} x2={cols[i + 1]} y2={y} {...edgeProps()} />
        )),
      )}
      {spineCols.map((x) =>
        rows.slice(0, -1).map((y, i) => (
          <line key={`${x}-${y}`} x1={x} y1={y} x2={x} y2={rows[i + 1]} {...edgeProps()} />
        )),
      )}
      {/* Ripples top row to bottom row on hover — the same order data
          would actually flow down a layered stack. */}
      {rows.map((y, rowIndex) =>
        cols.map((x) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            {...nodeProps(false)}
            className="hib-node"
            style={{ animationDelay: `${rowIndex * 0.15}s` }}
          />
        )),
      )}
      {spineCols.map((x) => (
        <circle key={`pulse-${x}`} cx={x} cy={60} {...nodeProps(true)} />
      ))}
    </svg>
  );
}

function ConvergeGraphic({ className }: { className?: string }) {
  const chain: [number, number][] = [[16, 12], [16, 36], [16, 60], [16, 84], [16, 108]];
  const root: [number, number] = [112, 60];
  const leaves: [number, number][] = [[178, 14], [188, 44], [188, 76], [178, 106]];
  return (
    <svg viewBox="0 0 200 120" className={className} aria-hidden="true">
      {chain.slice(0, -1).map(([x, y], i) => (
        <line key={i} x1={x} y1={y} x2={chain[i + 1][0]} y2={chain[i + 1][1]} {...edgeProps()} />
      ))}
      {chain.map(([x, y], i) => (
        <line key={`c${i}`} x1={x} y1={y} x2={root[0]} y2={root[1]} {...edgeProps()} />
      ))}
      {leaves.map(([x, y], i) => (
        <line key={`l${i}`} x1={root[0]} y1={root[1]} x2={x} y2={y} {...edgeProps()} />
      ))}
      {/* Chain sweeps toward the root first (converging), then the
          leaves light up fanning back out — acting out "converge" rather
          than just labeling it. */}
      {chain.map(([cx, cy], i) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          {...nodeProps(false)}
          className="hib-node"
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
      {leaves.map(([cx, cy], i) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          {...nodeProps(false)}
          className="hib-node"
          style={{ animationDelay: `${0.5 + i * 0.1}s` }}
        />
      ))}
      <circle cx={root[0]} cy={root[1]} {...nodeProps(true)} />
    </svg>
  );
}

function SchemaGraphic({ className }: { className?: string }) {
  const client: [number, number] = [14, 60];
  const server: [number, number] = [186, 60];
  const center: [number, number] = [100, 60];
  const left: [number, number] = [66, 60];
  const right: [number, number] = [134, 60];
  const top: [number, number] = [100, 22];
  const bottom: [number, number] = [100, 98];
  const outer: [number, number][] = [
    [48, 32], [152, 32], [152, 88], [48, 88],
  ];
  return (
    <svg viewBox="0 0 200 120" className={className} aria-hidden="true">
      <line x1={client[0]} y1={client[1]} x2={left[0]} y2={left[1]} {...edgeProps()} />
      <line x1={left[0]} y1={left[1]} x2={center[0]} y2={center[1]} {...edgeProps()} />
      <line x1={center[0]} y1={center[1]} x2={right[0]} y2={right[1]} {...edgeProps()} />
      <line x1={right[0]} y1={right[1]} x2={server[0]} y2={server[1]} {...edgeProps()} />
      <line x1={top[0]} y1={top[1]} x2={left[0]} y2={left[1]} {...edgeProps()} />
      <line x1={top[0]} y1={top[1]} x2={right[0]} y2={right[1]} {...edgeProps()} />
      <line x1={bottom[0]} y1={bottom[1]} x2={left[0]} y2={left[1]} {...edgeProps()} />
      <line x1={bottom[0]} y1={bottom[1]} x2={right[0]} y2={right[1]} {...edgeProps()} />
      <line x1={top[0]} y1={top[1]} x2={outer[0][0]} y2={outer[0][1]} {...edgeProps()} />
      <line x1={top[0]} y1={top[1]} x2={outer[1][0]} y2={outer[1][1]} {...edgeProps()} />
      <line x1={bottom[0]} y1={bottom[1]} x2={outer[2][0]} y2={outer[2][1]} {...edgeProps()} />
      <line x1={bottom[0]} y1={bottom[1]} x2={outer[3][0]} y2={outer[3][1]} {...edgeProps()} />
      <line x1={left[0]} y1={left[1]} x2={outer[0][0]} y2={outer[0][1]} {...edgeProps()} />
      <line x1={left[0]} y1={left[1]} x2={outer[3][0]} y2={outer[3][1]} {...edgeProps()} />
      <line x1={right[0]} y1={right[1]} x2={outer[1][0]} y2={outer[1][1]} {...edgeProps()} />
      <line x1={right[0]} y1={right[1]} x2={outer[2][0]} y2={outer[2][1]} {...edgeProps()} />
      {/* Lights up outward from the hub in two rings — one hop away
          (left/right/top/bottom) first, then two hops away (client/
          server/the four outer corners) — the same "one source of truth
          propagating out" the point itself is about. */}
      {[left, right, top, bottom].map(([cx, cy]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          {...nodeProps(false)}
          className="hib-node"
          style={{ animationDelay: "0.1s" }}
        />
      ))}
      {[client, server, ...outer].map(([cx, cy]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          {...nodeProps(false)}
          className="hib-node"
          style={{ animationDelay: "0.3s" }}
        />
      ))}
      <circle cx={center[0]} cy={center[1]} {...nodeProps(true)} />
    </svg>
  );
}

function DualRoleGraphic({ className }: { className?: string }) {
  const left: [number, number][] = [[14, 18], [48, 45], [48, 75], [14, 102]];
  const right: [number, number][] = [[186, 18], [152, 45], [152, 75], [186, 102]];
  const center: [number, number] = [100, 60];
  return (
    <svg viewBox="0 0 200 120" className={className} aria-hidden="true">
      {left.slice(0, -1).map(([x, y], i) => (
        <line key={`l${i}`} x1={x} y1={y} x2={left[i + 1][0]} y2={left[i + 1][1]} {...edgeProps()} />
      ))}
      {right.slice(0, -1).map(([x, y], i) => (
        <line key={`r${i}`} x1={x} y1={y} x2={right[i + 1][0]} y2={right[i + 1][1]} {...edgeProps()} />
      ))}
      <line x1={left[1][0]} y1={left[1][1]} x2={center[0]} y2={center[1]} {...edgeProps()} />
      <line x1={left[2][0]} y1={left[2][1]} x2={center[0]} y2={center[1]} {...edgeProps()} />
      <line x1={right[1][0]} y1={right[1][1]} x2={center[0]} y2={center[1]} {...edgeProps()} />
      <line x1={right[2][0]} y1={right[2][1]} x2={center[0]} y2={center[1]} {...edgeProps()} />
      {/* Both sides pulse from their tips inward, in sync, arriving at
          the center together — two roles meeting in the middle, not
          two unrelated chains that happen to share a page. */}
      {[left, right].map((side) =>
        side.map(([cx, cy], i) => {
          const distanceFromCenter = Math.min(i, side.length - 1 - i);
          return (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              {...nodeProps(false)}
              className="hib-node"
              style={{ animationDelay: `${distanceFromCenter * 0.15}s` }}
            />
          );
        }),
      )}
      <circle cx={center[0]} cy={center[1]} {...nodeProps(true)} />
    </svg>
  );
}

function PipelineGraphic({ className }: { className?: string }) {
  const nodes: [number, number][] = [[20, 60], [75, 60], [130, 60], [180, 60]];
  return (
    <svg viewBox="0 0 200 120" className={className} aria-hidden="true">
      {nodes.slice(0, -1).map(([x, y], i) => (
        <line key={i} x1={x} y1={y} x2={nodes[i + 1][0]} y2={nodes[i + 1][1]} {...edgeProps()} />
      ))}
      <circle
        cx={nodes[3][0]}
        cy={nodes[3][1]}
        r={10}
        fill="none"
        stroke="var(--accent-secondary)"
        strokeWidth={1.25}
        opacity={0.4}
      />
      {nodes.slice(0, -1).map(([cx, cy], i) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          {...nodeProps(false)}
          className="hib-node"
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
      <circle cx={nodes[3][0]} cy={nodes[3][1]} {...nodeProps(true)} />
    </svg>
  );
}

// Same rounded/bordered card ClientWork's cards use (see globals.css's
// .hover-glow-panel) — this used to need a two-layer border trick for a
// clip-path chamfer cut corner (a plain `border` can't follow one), but
// every tile here is a plain rounded rectangle now, so a single element
// with a normal border does the job directly.
//
// h-80 by default; the closing row (CtaTile + Production-Grade) uses
// h-56 instead — smaller than the other four (they're the grid's
// closing beat, not another full-weight tile) but not shrunk down to
// the old "short" variant's cramped, smaller-font version either.
function TileShell({
  span,
  compact,
  children,
}: {
  span: 1 | 2;
  compact?: boolean;
  children: ReactNode;
}) {
  // h-auto below sm — at that width every tile is single-column regardless
  // of `span` (sm:col-span-2 hasn't kicked in yet), but the two wide tiles'
  // copy was sized for the double-width column they get from sm up, so it
  // wraps to more lines in that narrower box. A fixed height there forced
  // the graphic (itself a fixed h-32) to overlap that overflow text; auto
  // lets the card grow to fit whichever tile's content is tallest, same
  // as any other single-column stack. Fixed height comes back at sm since
  // that's exactly where the layout it was tuned for starts applying.
  const heightClass = compact ? "h-auto sm:h-56" : "h-auto sm:h-80";
  const spanClass = span === 2 ? "sm:col-span-2" : "";

  return (
    <div className={`group relative ${heightClass} ${spanClass}`}>
      <div className="hover-glow-panel tile-signature flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line/60 p-6 transition-colors duration-300 group-hover:border-accent/60">
        <TileGlow intensity={20} spread={60} originX={25} originY={20} />
        {children}
      </div>
    </div>
  );
}

type PointGraphic = (props: { className?: string }) => ReactElement;

function PointCard({
  point,
  span,
  compact,
  graphic: Graphic,
}: {
  point: ApproachPoint;
  span: 1 | 2;
  compact?: boolean;
  graphic: PointGraphic;
}) {
  const Icon = point.icon;
  const language = useLanguage();

  return (
    <TileShell span={span} compact={compact}>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg/50 text-accent backdrop-blur transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <Graphic className={compact ? "h-24 w-full max-w-[320px]" : "h-32 w-full max-w-[320px]"} />
      </div>
      <div className="shrink-0">
        <h3 className="text-xl text-text-primary">{t(point.heading, language)}</h3>
        <p className="mt-2 text-sm text-text-muted">{t(point.description, language)}</p>
      </div>
    </TileShell>
  );
}

// The site's one other full-gradient CTA (see ContactCtaTile.tsx, shared
// with WorkFillerTile.tsx in ClientWork) — same recipe: full
// --gradient-signature fill, bg-toned content, one big icon bleeding off
// the corner. Anchored bottom-left and spanning 2 columns so it reads as
// the section's one loud brand moment, not another neutral card in the
// grid.
function CtaTile() {
  return (
    <ContactCtaTile
      heading={strings.howIBuild.ctaHeading}
      cta={strings.howIBuild.cta}
      // order-last only below sm — below that breakpoint the grid is a
      // single column, so DOM order is visual order, and the CTA sitting
      // second-to-last (ahead of the last PointCard) reads as an odd
      // interruption rather than a closing tile. sm:order-none restores
      // plain source order once the grid is 2+ columns, where its bottom-
      // left anchoring already works as intended.
      className="order-last h-56 rounded-2xl sm:order-none sm:col-span-2"
    />
  );
}

export function HowIBuild() {
  const [fullStack, performance, typeSafe, devDesign, prodGrade] = approachPoints;
  const language = useLanguage();

  return (
    <Section id="approach" tag={strings.sectionTags.approach} eyebrow={strings.howIBuild.eyebrow} title={strings.howIBuild.title}>
      <p className="-mt-6 mb-10 max-w-2xl text-text-muted">{t(strings.howIBuild.intro, language)}</p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <PointCard point={fullStack} span={2} graphic={LayersGraphic} />
        <PointCard point={typeSafe} span={1} graphic={SchemaGraphic} />
        <PointCard point={performance} span={2} graphic={ConvergeGraphic} />
        <PointCard point={devDesign} span={1} graphic={DualRoleGraphic} />
        <CtaTile />
        <PointCard point={prodGrade} span={1} compact graphic={PipelineGraphic} />
      </div>
    </Section>
  );
}
