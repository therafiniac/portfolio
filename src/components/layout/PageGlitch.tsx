"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TRIGGER_EVENT = "easter:reboot";
const GLITCH_DURATION_MS = 900;

// Fired by the Skills terminal's hidden "reboot" command (see Skills.tsx)
// — a plain window event rather than prop-drilling, same pattern
// CommandPalette's own openCommandPalette() uses.
export function triggerPageGlitch() {
  window.dispatchEvent(new Event(TRIGGER_EVENT));
}

// A brief full-page invert flicker using the site's own signature
// gradient (mix-blend-difference over everything already on screen)
// rather than a faked CRT-scanline overlay — reuses a color already on
// brand instead of inventing a separate glitch palette. Pairs with the
// terminal's boot-sequence text so "reboot" reads as one moment, not two
// unrelated effects.
export function PageGlitch() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    function handleTrigger() {
      // Decorative-only, so it simply doesn't run under reduced motion
      // rather than showing a degraded version — same call every other
      // purely-decorative effect on this site makes.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      setActive(true);
      window.setTimeout(() => setActive(false), GLITCH_DURATION_MS);
    }
    window.addEventListener(TRIGGER_EVENT, handleTrigger);
    return () => window.removeEventListener(TRIGGER_EVENT, handleTrigger);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="glitch"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0, 1, 0, 0.6, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: GLITCH_DURATION_MS / 1000, times: [0, 0.1, 0.2, 0.35, 0.5, 0.7, 1] }}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[96] mix-blend-difference"
          style={{ backgroundImage: "var(--gradient-signature)" }}
        />
      )}
    </AnimatePresence>
  );
}
