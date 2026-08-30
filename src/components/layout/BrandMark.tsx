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
// swaps the fill to the signature gradient — a fifth hidden layer for
// the same curious-visitor audience the console log/Konami code/palette
// hint/status-dot triple-click already reward. Both Navbar's and
// Footer's marks are real "back to top" links, so this click handler
// only adds a count on top of that default navigation, never intercepts
// it (no preventDefault/stopPropagation).
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
          ? { backgroundImage: "var(--gradient-signature)", color: "var(--bg)", borderColor: "transparent" }
          : undefined),
      }}
      className={`flex shrink-0 items-center justify-center border border-accent/40 bg-accent/5 font-mono font-bold text-accent transition-all duration-200 ${className ?? ""}`}
    >
      R
    </motion.span>
  );
}
