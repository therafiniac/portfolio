"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";

// A comet-style light that travels the full page's scroll progress,
// leading with whichever end is actually in the direction of travel —
// same "small bright segment traveling a line" language as Experience's
// timeline and FlowSteps, just scoped to the whole page instead of one
// section. Position/gradient/opacity are set imperatively via a ref, not
// React state — Lenis fires this callback on every scroll frame, and
// routing that through a re-render would be far more expensive than a
// direct style mutation on one element.
export function ScrollProgress() {
  const headRef = useRef<HTMLDivElement>(null);
  const lastDirection = useRef<1 | -1 | 0>(0);

  useLenis((lenis) => {
    const head = headRef.current;
    if (!head) return;

    head.style.top = `${lenis.progress * 100}%`;
    head.style.opacity = lenis.isScrolling ? "1" : "0";

    if (lenis.direction !== 0 && lenis.direction !== lastDirection.current) {
      lastDirection.current = lenis.direction;
      // The leading edge (direction of travel) is always the brighter
      // accent-secondary end of the signature gradient, fading to
      // transparent at the trailing tail — flipped depending on whether
      // that leading edge is currently the top or the bottom.
      head.style.backgroundImage =
        lenis.direction === 1
          ? "linear-gradient(to bottom, transparent, var(--accent), var(--accent-secondary))"
          : "linear-gradient(to bottom, var(--accent-secondary), var(--accent), transparent)";
    }
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 right-0 z-30 w-px"
      style={{ background: "color-mix(in srgb, var(--line) 40%, transparent)" }}
    >
      <div
        ref={headRef}
        className="absolute left-1/2 h-16 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-[1.5px] transition-opacity duration-300"
        style={{
          top: "0%",
          backgroundImage: "linear-gradient(to bottom, transparent, var(--accent), var(--accent-secondary))",
        }}
      />
    </div>
  );
}
