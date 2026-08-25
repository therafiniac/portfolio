"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const PARTICLE_COUNT = 24;

function isTypingTarget(el: Element | null): boolean {
  if (!el) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (el as HTMLElement).isContentEditable;
}

// A third hidden layer for the same curious-visitor audience the console
// log and the command palette's "sudo" joke already reward — the
// classic sequence, typed anywhere on the page (not while focused in an
// input, same guard KeyboardShortcuts.tsx uses), bursts a ring of small
// accent-colored dots from center and fades. Nothing to click, nothing
// promoted anywhere — purely for whoever already knows to try it.
function Burst() {
  // Math.random() in a lazy useState initializer, not inline in the
  // render body — React's purity rule (correctly) flags calling it
  // directly during render, since a render can happen more than once for
  // reasons that have nothing to do with this component's own state. A
  // lazy initializer runs exactly once per mount, which is what "pick
  // this burst's random spread once, not every re-render" actually needs.
  const [particles] = useState(() =>
    Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
      const distance = 140 + Math.random() * 120;
      return {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        color: i % 2 === 0 ? "var(--accent)" : "var(--accent-secondary)",
        delay: Math.random() * 0.15,
      };
    }),
  );

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center"
    >
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute h-2 w-2 rounded-full"
          style={{ background: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: p.delay }}
        />
      ))}
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="absolute font-mono text-sm uppercase tracking-[0.2em] text-text-primary"
      >
        Nice.
      </motion.span>
    </motion.div>
  );
}

export function KonamiEasterEgg() {
  const [progress, setProgress] = useState(0);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (isTypingTarget(document.activeElement)) return;

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = KONAMI_SEQUENCE[progress];

      if (key !== expected) {
        setProgress(key === KONAMI_SEQUENCE[0] ? 1 : 0);
        return;
      }

      const next = progress + 1;
      if (next < KONAMI_SEQUENCE.length) {
        setProgress(next);
        return;
      }

      setProgress(0);
      // Decorative-only, so it simply doesn't run under reduced motion
      // rather than showing a degraded (static-dots, no burst) version —
      // same call every other purely-decorative effect on this site makes.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      setTriggered(true);
      window.setTimeout(() => setTriggered(false), 1600);
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [progress]);

  return <AnimatePresence>{triggered && <Burst key="burst" />}</AnimatePresence>;
}
