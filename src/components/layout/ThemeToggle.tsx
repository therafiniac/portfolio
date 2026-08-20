"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

// MutationObserver picks up both the toggle() call below and the
// pre-hydration script in layout.tsx setting data-theme initially — either
// one fires this and useSyncExternalStore re-reads the snapshot.
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

// The server has no idea what the pre-hydration script will pick, so this
// must match the CSS default (:root with no [data-theme] override) to keep
// the very first client render identical to the server's — that's what
// avoids the hydration mismatch. useSyncExternalStore then corrects to the
// real value right after hydration, as a normal (not hydration-time)
// update, which is the whole point of this hook over a lazy useState.
function getServerSnapshot(): Theme {
  return "dark";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      aria-pressed={theme === "light"}
      className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-text-muted transition-colors hover:text-accent"
    >
      <span className="transition-transform duration-300 group-hover:rotate-45">
        {theme === "light" ? (
          <Moon className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Sun className="h-4 w-4" aria-hidden="true" />
        )}
      </span>
    </button>
  );
}
