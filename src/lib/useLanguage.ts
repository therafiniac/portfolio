"use client";

import { useSyncExternalStore } from "react";

export type Language = "en" | "bn";

// Same pattern as useTheme.ts — MutationObserver on the same
// data-attribute-on-<html> approach, picking up both an explicit
// LanguageToggle click and the pre-hydration script in layout.tsx.
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-lang"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Language {
  return document.documentElement.getAttribute("data-lang") === "bn" ? "bn" : "en";
}

// Must match the server-rendered default (English) to avoid a hydration
// mismatch — see useTheme.ts's identical reasoning. The pre-hydration
// script corrects this immediately after hydration if "bn" was stored.
function getServerSnapshot(): Language {
  return "en";
}

export function useLanguage(): Language {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
