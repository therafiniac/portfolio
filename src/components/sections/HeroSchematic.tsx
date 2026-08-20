// A sparse network diagram spanning the hero, in the same line-art
// language as the How I Build / Work section diagrams — this is the
// site's actual visual signature (schematic diagrams, not decoration), so
// the hero should carry it too rather than leaning on generic blurred
// gradient blobs. Very low opacity: texture, not a competing focal
// element. Static SVG (near-zero cost) except the slow pulse on the three
// "hub" nodes.

const nodes: [number, number][] = [
  [120, 100],
  [300, 60],
  [500, 140],
  [680, 70],
  [900, 120],
  [1100, 80],
  [1300, 160],
  [60, 300],
  [1360, 320],
  [150, 550],
  [1250, 580],
  [350, 700],
  [600, 760],
  [850, 720],
  [1050, 680],
  [1380, 750],
];

const edges: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [0, 7],
  [6, 8],
  [7, 9],
  [8, 10],
  [9, 11],
  [10, 14],
  [11, 12],
  [12, 13],
  [13, 14],
  [14, 15],
  [2, 7],
  [4, 8],
];

const hubIndices = [0, 8, 12];

export function HeroSchematic() {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="var(--accent)"
          strokeWidth={1}
          opacity={0.12}
        />
      ))}
      {nodes.map(([cx, cy], i) => {
        const isHub = hubIndices.includes(i);
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={isHub ? 4.5 : 2.5}
            fill={isHub ? "var(--accent-secondary)" : "var(--accent)"}
            opacity={isHub ? 0.35 : 0.22}
            className={isHub ? "motion-safe:animate-pulse" : undefined}
          />
        );
      })}
    </svg>
  );
}
