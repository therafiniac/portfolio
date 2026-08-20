"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

// The pre-hydration script in the root layout already set data-theme on
// <html> before this ever renders, so we can read it straight into the
// initial state. Server render has no `document`, so client/server first
// paint can differ by one render — suppressHydrationWarning on the button
// covers that single, expected mismatch (the standard pattern for
// client-only-knowable UI like a theme toggle).
function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      suppressHydrationWarning
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      aria-pressed={theme === "light"}
      className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-text-muted transition-colors hover:text-accent"
    >
      <span
        suppressHydrationWarning
        className="transition-transform duration-300 group-hover:rotate-45"
      >
        {theme === "light" ? (
          <Moon className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Sun className="h-4 w-4" aria-hidden="true" />
        )}
      </span>
    </button>
  );
}
