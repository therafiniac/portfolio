"use client";

import { useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

// MutationObserver picks up both an explicit ThemeToggle click and the
// pre-hydration script in layout.tsx setting data-theme initially —
// either one fires this and useSyncExternalStore re-reads the snapshot.
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

// The server has no idea what the pre-hydration script will pick, so this
// must match the CSS default (:root with no [data-theme] override) to keep
// the very first client render identical to the server's — that's what
// avoids a hydration mismatch. useSyncExternalStore then corrects to the
// real value right after hydration, as a normal (not hydration-time)
// update.
function getServerSnapshot(): Theme {
  return "dark";
}

// Shared by anything that needs to know light-vs-dark outside CSS — most
// UI just uses the CSS custom properties directly and never needs this,
// but WebGL materials (HeroCanvas, HeroMark3D) take literal color values,
// not CSS variables, so they need the live theme to pick the right hex.
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
