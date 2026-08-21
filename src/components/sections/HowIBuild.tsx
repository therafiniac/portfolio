import type { ReactElement, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { CountUp } from "@/components/layout/CountUp";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { approachPoints, type ApproachPoint } from "@/lib/data/approach";
import type { GithubStats } from "@/lib/github";

// A soft off-center glow behind each tile's content — every card here is
// icon+text (no photo), so this is what gives the panel depth instead of
// a flat gradient fill.
function TileGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(circle at 25% 20%, color-mix(in srgb, var(--accent-secondary) 20%, transparent), transparent 60%)",
      }}
    />
  );
}

// Five small diagrams, one per point below — same node/edge vocabulary as
// the Work section's MiniSchematic (circles + thin connecting lines, one
// node pulsing), just a different topology per concept, so each card gets
// something that actually illustrates its point instead of empty gradient
// space between the icon and the text.
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
      {rows.flatMap((y) => cols.map((x) => [x, y] as const)).map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} {...nodeProps(false)} />
      ))}
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
      {[...chain, ...leaves].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} {...nodeProps(false)} />
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
      {[client, server, left, right, top, bottom, ...outer].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} {...nodeProps(false)} />
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
      {[...left, ...right].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} {...nodeProps(false)} />
      ))}
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
      {nodes.slice(0, -1).map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} {...nodeProps(false)} />
      ))}
      <circle cx={nodes[3][0]} cy={nodes[3][1]} {...nodeProps(true)} />
    </svg>
  );
}

type TileHeight = "tall" | "short";

// Same rounded/bordered card ClientWork's cards use (see globals.css's
// .hover-glow-panel) — this used to need a two-layer border trick for a
// clip-path chamfer cut corner (a plain `border` can't follow one), but
// every tile here is a plain rounded rectangle now, so a single element
// with a normal border does the job directly.
function TileShell({
  span,
  height,
  href,
  // Filler tiles (stat/CTA) default to an accent-tinted ring instead of
  // the neutral one, so they read as a deliberate brand moment at rest,
  // not just on hover like a content card.
  accent = false,
  children,
}: {
  span: 1 | 2;
  height: TileHeight;
  href?: string;
  accent?: boolean;
  children: ReactNode;
}) {
  const heightClass = height === "tall" ? "h-80" : "h-48";
  const spanClass = span === 2 ? "sm:col-span-2" : "";
  const borderClass = accent
    ? "border-accent/55 group-hover:border-accent/85"
    : "border-line/60 group-hover:border-accent/60";
  const inner = (
    <div
      className={`hover-glow-panel tile-signature flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-colors duration-300 ${borderClass}`}
    >
      <TileGlow />
      {children}
    </div>
  );

  if (href) {
    return (
      <a href={href} className={`group relative block ${heightClass} ${spanClass}`}>
        {inner}
      </a>
    );
  }

  return (
    <div className={`group relative ${heightClass} ${spanClass}`}>{inner}</div>
  );
}

type PointGraphic = (props: { className?: string }) => ReactElement;

function PointCard({
  point,
  span,
  height,
  graphic: Graphic,
}: {
  point: ApproachPoint;
  span: 1 | 2;
  height: TileHeight;
  graphic: PointGraphic;
}) {
  const isTall = height === "tall";
  const Icon = point.icon;

  return (
    <TileShell span={span} height={height}>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg/50 text-accent backdrop-blur">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <Graphic className={isTall ? "h-32 w-full max-w-[320px]" : "h-10 w-full max-w-[160px]"} />
      </div>
      <div className="shrink-0">
        <h3 className={`text-text-primary ${isTall ? "text-xl" : "text-base"}`}>{point.heading}</h3>
        <p className={`mt-2 text-text-muted ${isTall ? "text-sm" : "text-xs line-clamp-3"}`}>
          {point.description}
        </p>
      </div>
    </TileShell>
  );
}

function StatTile({ value, label }: { value: number; label: string }) {
  return (
    <TileShell span={1} height="short" accent>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bg/50 text-accent backdrop-blur">
        <GithubIcon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="text-center">
        <span
          className="block bg-clip-text font-mono text-4xl font-semibold text-transparent"
          style={{ backgroundImage: "var(--gradient-signature)" }}
        >
          <CountUp value={value} />
        </span>
        <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted">
          {label}
        </span>
      </div>
    </TileShell>
  );
}

function CtaTile() {
  return (
    <TileShell span={1} height="short" href="#contact" accent>
      <span className="font-mono text-sm text-text-primary">Open to new projects.</span>
      <span className="flex items-center gap-1 font-mono text-xs uppercase tracking-[0.15em] text-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5">
        Get in touch
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
    </TileShell>
  );
}

type HowIBuildProps = {
  githubStats: GithubStats | null;
};

export function HowIBuild({ githubStats }: HowIBuildProps) {
  const [fullStack, performance, typeSafe, devDesign, prodGrade] = approachPoints;

  return (
    <Section id="approach" index="05" eyebrow="Philosophy" title="How I Build">
      <p className="-mt-6 mb-10 max-w-2xl text-text-muted">
        A few things that stay true across every project, regardless of stack.
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <PointCard point={fullStack} span={2} height="tall" graphic={LayersGraphic} />
        <PointCard point={typeSafe} span={1} height="tall" graphic={SchemaGraphic} />
        <PointCard point={performance} span={2} height="tall" graphic={ConvergeGraphic} />
        <PointCard point={devDesign} span={1} height="tall" graphic={DualRoleGraphic} />
        <PointCard point={prodGrade} span={1} height="short" graphic={PipelineGraphic} />
        <CtaTile />
        {githubStats && <StatTile value={githubStats.publicRepos} label="Public Repos (Live)" />}
      </div>
    </Section>
  );
}
