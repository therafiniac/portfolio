type BrandMarkProps = {
  size?: number;
  className?: string;
};

// A round badge — the site's brand mark, matching the favicon and every
// other use. Used to be a chamfered (corner-cut) shape; retired in favor
// of round everywhere, including here, once chamfer's footprint shrank
// to nothing else on the page.
export function BrandMark({ size = 32, className }: BrandMarkProps) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, borderRadius: "50%" }}
      className={`flex shrink-0 items-center justify-center border border-accent/40 bg-accent/5 font-mono font-bold text-accent transition-all duration-200 ${className ?? ""}`}
    >
      R
    </span>
  );
}
