"use client";

import { useEffect, useState } from "react";

const TOGGLE_EVENT = "easter:debug";

// Fired by the Skills terminal's hidden "debug" command (see
// Skills.tsx) — each call flips the overlay on/off, no separate
// on/off events needed since there's exactly one listener.
export function triggerDebugToggle() {
  window.dispatchEvent(new Event(TOGGLE_EVENT));
}

// An inspector-style grid overlay — a different kind of reward than the
// other hidden layers (console log, Konami burst, matrix rain): those
// are all "look what it does," this one's "look how it's built,"
// literalizing the site's own 8px-ish rhythm as a visible grid rather
// than a new unrelated gag. Session-only (no localStorage) — this is a
// throwaway inspection mode, not a real preference worth persisting.
export function DebugOverlay() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    function handleToggle() {
      setActive((prev) => !prev);
    }
    // Escape is safe to wire up unconditionally (unlike a plain "any
    // key" listener — see MatrixRain's dismiss for why that's not safe
    // here): it's never the key that triggers this effect (the terminal's
    // "debug" command runs on Enter), so it can't catch its own trigger.
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(false);
    }
    window.addEventListener(TOGGLE_EVENT, handleToggle);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener(TOGGLE_EVENT, handleToggle);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Outlines every element via a scoped class in globals.css — kept as a
  // documentElement class toggle (same mechanism THEME_INIT_SCRIPT uses
  // for data-theme) rather than a full-page React tree of outline divs,
  // since the grid overlay below already covers the "visible structure"
  // part and per-element outlines are a pure CSS concern.
  useEffect(() => {
    document.documentElement.classList.toggle("debug-mode", active);
    return () => document.documentElement.classList.remove("debug-mode");
  }, [active]);

  if (!active) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[95]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to right, color-mix(in srgb, var(--accent) 14%, transparent) 0 1px, transparent 1px 64px), repeating-linear-gradient(to bottom, color-mix(in srgb, var(--accent) 14%, transparent) 0 1px, transparent 1px 64px)",
      }}
    >
      <span className="fixed left-3 top-3 rounded-full border border-accent/40 bg-bg/80 px-2.5 py-1 font-mono text-[length:var(--text-2xs)] uppercase tracking-[0.15em] text-accent">
        debug
      </span>
    </div>
  );
}
