type TileGlowProps = {
  intensity?: number;
  spread?: number;
  originX?: number;
  originY?: number;
};

// A soft off-center glow behind a tile's content — used by both
// ClientWork's project/stat cards and HowIBuild's approach tiles for the
// same "lit from within" depth effect, instead of a flat fill. Position/
// intensity/spread are all tunable per call site since each set of tiles
// calibrated its own feel independently before this was unified; the
// defaults match ClientWork's original always-on values, so its plain
// `<TileGlow />` calls stay a no-op.
export function TileGlow({ intensity = 16, spread = 60, originX = 28, originY = 22 }: TileGlowProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        background: `radial-gradient(circle at ${originX}% ${originY}%, color-mix(in srgb, var(--accent-secondary) ${intensity}%, transparent), transparent ${spread}%)`,
      }}
    />
  );
}
