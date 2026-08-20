type MarqueeProps = {
  items: string[];
  reverse?: boolean;
  durationSeconds?: number;
};

// Continuous ambient motion, not a hover-triggered one — the content is
// duplicated once so the translateX(-50%) loop is seamless. Pure CSS
// animation (cheap, no JS per frame); pauses on hover and respects
// prefers-reduced-motion via the .marquee-track rules in globals.css.
export function Marquee({ items, reverse = false, durationSeconds = 22 }: MarqueeProps) {
  return (
    <div className="marquee-mask overflow-hidden">
      <div
        className="marquee-track flex w-max gap-3"
        style={{
          animationDuration: `${durationSeconds}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="glass-panel shrink-0 rounded-full px-4 py-2 text-sm text-text-primary"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
