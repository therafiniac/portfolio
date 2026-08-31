"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

type BrandMarkProps = {
  size?: number;
  className?: string;
};

const CLICK_WINDOW_MS = 1200;
const CLICKS_TO_TRIGGER = 5;
const FLOURISH_DURATION_MS = 600;

// A round badge — the site's brand mark, matching the favicon and every
// other use. Used to be a chamfered (corner-cut) shape; retired in favor
// of round everywhere, including here, once chamfer's footprint shrank
// to nothing else on the page.
//
// Five clicks within CLICK_WINDOW_MS spins it a full turn and briefly
// swaps the fill to the signature gradient — a hidden layer for the same
// curious-visitor audience the console log/Konami code/palette hint/
// status-dot triple-click already reward. Both Navbar's and Footer's
// marks are real "back to top" links, so this click handler only adds a
// count on top of that default navigation, never intercepts it (no
// preventDefault/stopPropagation). Right-clicking the mark is handled
// site-wide by ContextMenu.tsx now, not here — an earlier version tried
// a menu scoped to just this element and it broke: the popover ended up
// as an <a> nested inside the mark's own wrapping "back to top" anchor,
// which is invalid HTML.
export function BrandMark({ size = 32, className }: BrandMarkProps) {
  const [spins, setSpins] = useState(0);
  const [flourish, setFlourish] = useState(false);
  const clickTimestamps = useRef<number[]>([]);

  function handleClick() {
    const now = Date.now();
    clickTimestamps.current = [...clickTimestamps.current.filter((t) => now - t < CLICK_WINDOW_MS), now];
    if (clickTimestamps.current.length < CLICKS_TO_TRIGGER) return;

    clickTimestamps.current = [];
    // Decorative-only, so it simply doesn't run under reduced motion
    // rather than showing a degraded version — same call StatusDot and
    // KonamiEasterEgg make for their own flourishes.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setSpins((s) => s + 1);
    setFlourish(true);
    window.setTimeout(() => setFlourish(false), FLOURISH_DURATION_MS);
  }

  return (
    <motion.span
      aria-hidden="true"
      onClick={handleClick}
      animate={{ rotate: spins * 360 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        ...(flourish
          ? { backgroundImage: "var(--gradient-signature)", color: "var(--bg)" }
          : undefined),
      }}
      className={`relative flex shrink-0 items-center justify-center bg-accent/5 font-mono font-bold text-accent transition-all duration-200 ${className ?? ""}`}
    >
      {/* A permanent thin --gradient-signature ring, not a flat
          single-color border — AGENTS.md calls for the signature
          gradient to be the brand mark itself, used deliberately and
          repeatedly, not just on the 5-click flourish below. Same
          padding/mask ring technique as .hover-gradient-border in
          globals.css, just always-on here instead of hover-triggered.
          Hidden during the flourish so it doesn't double up with that
          state's own full gradient fill. */}
      {!flourish && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            padding: "1.5px",
            backgroundImage: "var(--gradient-signature)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      )}
      R
    </motion.span>
  );
}
