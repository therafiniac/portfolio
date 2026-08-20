import type { ReactNode } from "react";
import { ArrowUpRight, LayoutGrid, Send } from "lucide-react";

// Small decorative version of the site's network diagram — used as the
// schematic filler variant's own decoration (see WorkFillerTile below).
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
    <svg
      viewBox="0 0 200 120"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
      aria-hidden="true"
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="var(--bg)"
          strokeWidth={1}
        />
      ))}
      {nodes.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={2.5} fill="var(--bg)" />
      ))}
    </svg>
  );
}

// The CTA's decoration: one big icon bleeding off the corner.
function IconBleed({ icon: Icon }: { icon: typeof LayoutGrid }) {
  return (
    <Icon
      className="pointer-events-none absolute -bottom-8 -right-8 h-36 w-36 text-bg/15"
      strokeWidth={1.25}
      aria-hidden="true"
    />
  );
}

function TileBadge({ icon: Icon }: { icon: typeof LayoutGrid }) {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bg/20 text-bg backdrop-blur">
      <Icon className="h-5 w-5" aria-hidden="true" />
    </span>
  );
}

// WorkCard (ClientWork.tsx) has no fixed height of its own — its chrome
// bar + fixed-aspect screenshot + fixed-height text stack determine each
// row's height naturally. This tile deliberately has no height of its own
// either; it relies on CSS Grid's default `align-items: stretch` to grow
// to match whatever the real project cards in its row end up being, so it
// never needs to duplicate that math.
//
// This is meant to be loud — full --gradient-signature fill (the same
// brand gradient used for the primary CTA and key headlines elsewhere)
// and high-contrast text. `text-bg` follows the same convention the
// "Featured" pill already uses to sit on this gradient. (The stat tile at
// grid slot 5 — see StatShowcase in ClientWork.tsx — is loud a different
// way: a quiet neutral card with one huge gradient-clipped number, so the
// two don't end up reading as copies of each other.)
function TileFrame({
  href,
  decoration,
  children,
}: {
  href?: string;
  decoration: ReactNode;
  children: ReactNode;
}) {
  const className =
    "group relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xl p-6 text-center shadow-lg shadow-black/10 transition-[filter] duration-300 hover:brightness-110";
  const style = { backgroundImage: "var(--gradient-signature)" };

  // Decoration painted first (behind) and the text wrapper second (in
  // front) — both are positioned with z-index:auto, so plain DOM order
  // decides stacking here, no z-index needed.
  const inner = (
    <>
      {decoration}
      <div className="relative flex flex-col items-center gap-2">{children}</div>
    </>
  );

  if (href) {
    return (
      <a href={href} className={className} style={style}>
        {inner}
      </a>
    );
  }

  return (
    <div className={className} style={style}>
      {inner}
    </div>
  );
}

type WorkFillerTileProps = { type: "schematic" } | { type: "cta" };

export function WorkFillerTile(props: WorkFillerTileProps) {
  if (props.type === "schematic") {
    return <TileFrame decoration={<MiniSchematic />}>{null}</TileFrame>;
  }

  return (
    <TileFrame href="#contact" decoration={<IconBleed icon={Send} />}>
      <TileBadge icon={Send} />
      <span className="font-mono text-xl text-bg">Open to new projects.</span>
      <span className="flex items-center gap-1 font-mono text-xs uppercase tracking-[0.2em] text-bg/80 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
        Get in touch
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </TileFrame>
  );
}
