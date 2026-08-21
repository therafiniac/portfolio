type BrandMarkProps = {
  size?: number;
  className?: string;
  // "chamfer" (default) is the site's actual signature — matches the
  // favicon and every other use. "circle" exists only for the navbar:
  // now that its pill is a true rounded-full (see globals.css's
  // .nav-glass note), an angular cut-corner mark sitting inside a fully
  // round container reads as mismatched, not as the signature.
  shape?: "chamfer" | "circle";
};

// A chamfered (corner-cut) badge rather than a plain circle/dot — a small
// technical/engineered visual signature instead of generic template chrome.
export function BrandMark({ size = 32, className, shape = "chamfer" }: BrandMarkProps) {
  const chamfer = Math.round(size * 0.19);

  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        clipPath:
          shape === "chamfer"
            ? `polygon(${chamfer}px 0, 100% 0, 100% calc(100% - ${chamfer}px), calc(100% - ${chamfer}px) 100%, 0 100%, 0 ${chamfer}px)`
            : undefined,
        borderRadius: shape === "circle" ? "50%" : undefined,
      }}
      className={`flex shrink-0 items-center justify-center border border-accent/40 bg-accent/5 font-mono font-bold text-accent transition-all duration-200 ${className ?? ""}`}
    >
      R
    </span>
  );
}
