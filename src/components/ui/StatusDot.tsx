"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CLICK_WINDOW_MS = 600;
const CLICKS_TO_TRIGGER = 3;
const FLOURISH_DURATION_MS = 650;

type StatusDotProps = {
  className?: string;
};

// The pulsing "open to opportunities" dot Hero and Footer both render —
// shared here specifically because the interactive part (triple-click
// timing, the flourish, the reduced-motion guard) would otherwise be the
// same stateful logic duplicated across two files, not just markup.
// Three clicks within CLICK_WINDOW_MS rings the signature gradient out
// from the dot once and fades — a fourth quiet layer for the same
// curious-visitor audience the console log/Konami code/"g"+letter
// shortcuts already reward, this one mouse-only and undocumented
// anywhere (no hint text, no cursor change) since it's purely for
// whoever already clicks around.
export function StatusDot({ className = "" }: StatusDotProps) {
  const [flourish, setFlourish] = useState(false);
  const clickTimestamps = useRef<number[]>([]);

  function handleClick() {
    const now = Date.now();
    clickTimestamps.current = [...clickTimestamps.current.filter((t) => now - t < CLICK_WINDOW_MS), now];
    if (clickTimestamps.current.length < CLICKS_TO_TRIGGER) return;

    clickTimestamps.current = [];
    // Decorative-only, so it simply doesn't run under reduced motion
    // rather than showing a degraded version — same call KonamiEasterEgg
    // makes for its own burst.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setFlourish(true);
    window.setTimeout(() => setFlourish(false), FLOURISH_DURATION_MS);
  }

  return (
    <span className={`relative inline-flex ${className}`}>
      <span
        onClick={handleClick}
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-status-live motion-safe:animate-pulse"
        aria-hidden="true"
      />
      <AnimatePresence>
        {flourish && (
          <motion.span
            key="flourish"
            initial={{ opacity: 0.85, scale: 1 }}
            animate={{ opacity: 0, scale: 8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: FLOURISH_DURATION_MS / 1000, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{ backgroundImage: "var(--gradient-signature)" }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </span>
  );
}
