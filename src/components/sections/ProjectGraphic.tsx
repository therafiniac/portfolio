// Purpose-drawn schematic line-art, cycled by index — not hand-crafted art
// per project (that wouldn't scale as the case-study list grows), but not
// a flat decorative gradient either. Reads as "engineered diagram," fitting
// the technical-deep-dive framing of this section.

const NODE_R = 5;

function TreeGraphic() {
  const nodes: [number, number][] = [
    [40, 60],
    [110, 28],
    [110, 92],
    [190, 16],
    [190, 40],
    [190, 80],
    [190, 104],
    [260, 28],
    [260, 92],
  ];
  const edges: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
    [2, 5],
    [2, 6],
    [3, 7],
    [6, 8],
  ];

  return (
    <svg viewBox="0 0 300 120" className="h-full w-full" aria-hidden="true">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="var(--line)"
          strokeWidth={1.5}
        />
      ))}
      {nodes.map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={NODE_R}
          fill="var(--surface)"
          stroke={i === 0 || i === 7 || i === 8 ? "var(--accent)" : "var(--line)"}
          strokeWidth={1.5}
        />
      ))}
    </svg>
  );
}

function LayersGraphic() {
  const layers = [
    { y: 20, w: 200, accent: false },
    { y: 48, w: 160, accent: true },
    { y: 76, w: 220, accent: false },
  ];

  return (
    <svg viewBox="0 0 300 120" className="h-full w-full" aria-hidden="true">
      {layers.map((layer, i) => (
        <rect
          key={i}
          x={40}
          y={layer.y}
          width={layer.w}
          height={16}
          rx={4}
          fill="none"
          stroke={layer.accent ? "var(--accent)" : "var(--line)"}
          strokeWidth={1.5}
        />
      ))}
      <line x1={60} y1={12} x2={60} y2={100} stroke="var(--line)" strokeWidth={1} strokeDasharray="3 4" />
      <line x1={260} y1={12} x2={260} y2={100} stroke="var(--line)" strokeWidth={1} strokeDasharray="3 4" />
    </svg>
  );
}

const graphics = [TreeGraphic, LayersGraphic];

export function ProjectGraphic({ index }: { index: number }) {
  const Graphic = graphics[index % graphics.length];
  return (
    <div className="h-28 w-full bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface)_60%,transparent),transparent)] p-4">
      <Graphic />
    </div>
  );
}
