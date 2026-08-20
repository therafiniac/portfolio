import Image from "next/image";

type FramedImageProps = {
  src: string;
  alt: string;
  caption?: string;
  aspectClassName?: string;
  priority?: boolean;
  sizes?: string;
};

// The chamfered frame is the site's visual signature (matches BrandMark) —
// reused here so any photo dropped in reads as "part of this site," not a
// generic stock image.
export function FramedImage({
  src,
  alt,
  caption,
  aspectClassName = "aspect-[4/5]",
  priority,
  sizes = "(min-width: 1024px) 340px, 100vw",
}: FramedImageProps) {
  return (
    <div
      className="glass-panel relative w-full max-w-sm overflow-hidden"
      style={{
        clipPath:
          "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
      }}
    >
      <div className={`relative w-full ${aspectClassName}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
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
