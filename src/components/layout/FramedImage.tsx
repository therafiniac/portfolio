import Image from "next/image";

type FramedImageProps = {
  src: string;
  alt: string;
  caption?: string;
  aspectClassName?: string;
  priority?: boolean;
  sizes?: string;
};

// Rounded, glass-panel frame — matches the rest of the site's cards now
// that the chamfer cut-corner treatment has been fully retired.
export function FramedImage({
  src,
  alt,
  caption,
  aspectClassName = "aspect-[4/5]",
  priority,
  sizes = "(min-width: 1024px) 340px, 100vw",
}: FramedImageProps) {
  return (
    <div className="glass-panel relative w-full max-w-sm overflow-hidden">
      <div className={`relative w-full ${aspectClassName}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-20"
        style={{ backgroundImage: "var(--gradient-signature)" }}
        aria-hidden="true"
      />
      {caption && (
        <span className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 [text-shadow:0_1px_4px_rgb(0_0_0_/_60%)]">
          {caption}
        </span>
      )}
    </div>
  );
}
