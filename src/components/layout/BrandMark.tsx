type BrandMarkProps = {
  size?: number;
  className?: string;
};

// A chamfered (corner-cut) badge rather than a plain circle/dot — a small
// technical/engineered visual signature instead of generic template chrome.
export function BrandMark({ size = 32, className }: BrandMarkProps) {
  const chamfer = Math.round(size * 0.19);

  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        clipPath: `polygon(${chamfer}px 0, 100% 0, 100% calc(100% - ${chamfer}px), calc(100% - ${chamfer}px) 100%, 0 100%, 0 ${chamfer}px)`,
      }}
      className={`flex shrink-0 items-center justify-center border border-accent/40 bg-accent/5 font-mono font-bold text-accent transition-all duration-200 ${className ?? ""}`}
    >
      R
    </span>
  );
}
