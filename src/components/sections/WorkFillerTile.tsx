import type { ReactNode } from "react";
import { ArrowUpRight, LayoutGrid, Send } from "lucide-react";
import { CountUp } from "@/components/layout/CountUp";

const CHAMFER_CLIP =
  "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)";

// Small decorative version of the network diagram from HeroSchematic/
// ProjectGraphic — same signature, not a new motif, so it reads as part of
// the system rather than a random filler graphic.
function MiniSchematic() {
  const nodes: [number, number][] = [
    [20, 60],
    [70, 20],
    [70, 100],
    [130, 20],
    [130, 100],
    [180, 60],
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 4],
    [3, 5],
    [4, 5],
  ];

  return (
    <svg viewBox="0 0 200 120" className="h-16 w-full" aria-hidden="true">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="var(--accent)"
          strokeWidth={1.25}
          opacity={0.35}
        />
      ))}
      {nodes.map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={3}
          fill="var(--accent-secondary)"
          opacity={0.6}
          className={i === 5 ? "motion-safe:animate-pulse" : undefined}
        />
      ))}
    </svg>
  );
}

function TileBadge({ icon: Icon }: { icon: typeof LayoutGrid }) {
  return (
    <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-bg/50 text-accent backdrop-blur">
      <Icon className="h-4 w-4" aria-hidden="true" />
    </span>
  );
}

// A soft off-center glow behind the centered content — gives the square
// footprint some depth instead of a flat gradient, so it reads as a
// composed accent tile rather than a plain filler shape.
function TileGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(circle at 28% 22%, color-mix(in srgb, var(--accent-secondary) 22%, transparent), transparent 60%)",
      }}
    />
  );
}

type RowHeight = "tall" | "short";

// Same border-layer-then-inset-content-layer structure as WorkCard (see
// globals.css for why), plus the gradient wash + accent-tinted border that
// make these read as a deliberate brand moment instead of an empty cell.
function TileFrame({
  height,
  href,
  children,
}: {
  height: RowHeight;
  href?: string;
  children: ReactNode;
}) {
  const heightClass = height === "tall" ? "h-80" : "h-48";
  const inner = (
    <>
      <span
        aria-hidden="true"
        className="chamfer-border chamfer-border-accent absolute inset-0"
        style={{ clipPath: CHAMFER_CLIP }}
      />
      <div
        className="chamfer-panel tile-signature absolute inset-[2px] flex flex-col items-center justify-center gap-2 overflow-hidden p-5 text-center"
        style={{ clipPath: CHAMFER_CLIP }}
      >
        <TileGlow />
        {children}
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} className={`group relative block ${heightClass}`}>
        {inner}
      </a>
    );
  }

  return <div className={`group relative ${heightClass}`}>{inner}</div>;
}

type WorkFillerTileProps = { height: RowHeight } & (
  | { type: "stat"; value: number; label: string }
  | { type: "schematic" }
  | { type: "cta" }
);

export function WorkFillerTile(props: WorkFillerTileProps) {
  if (props.type === "stat") {
    return (
      <TileFrame height={props.height}>
        <TileBadge icon={LayoutGrid} />
        <span
          className="bg-clip-text font-mono text-5xl font-semibold text-transparent"
          style={{ backgroundImage: "var(--gradient-signature)" }}
        >
          <CountUp value={props.value} />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted">
          {props.label}
        </span>
      </TileFrame>
    );
  }

  if (props.type === "schematic") {
    return (
      <TileFrame height={props.height}>
        <MiniSchematic />
      </TileFrame>
    );
  }

  return (
    <TileFrame height={props.height} href="#contact">
      <TileBadge icon={Send} />
      <span className="font-mono text-base text-text-primary">Have a project in mind?</span>
      <span className="flex items-center gap-1 font-mono text-xs uppercase tracking-[0.15em] text-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5">
        Get in touch
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
    </TileFrame>
  );
}
