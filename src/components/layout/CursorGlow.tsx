"use client";

import { useEffect, useRef } from "react";

// Direct style mutation on a ref, not React state — a per-pixel mousemove
// re-render would be wasteful. This is a background light layer, not a
// custom cursor: the native OS pointer is untouched.
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (isCoarsePointer || reducedMotion) return;

    function handleMove(e: MouseEvent) {
      ref.current?.style.setProperty("--x", `${e.clientX}px`);
      ref.current?.style.setProperty("--y", `${e.clientY}px`);
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
