"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/useTheme";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

export function ThemeToggle() {
  const theme = useTheme();
  const language = useLanguage();

  function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    const next = theme === "light" ? "dark" : "light";
    const apply = () => {
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Circular-reveal transition (see globals.css's ::view-transition-*
    // overrides, which strip the browser's default cross-fade so only
    // this clip-path circle shows) — falls back to an instant swap in
    // browsers without View Transitions support and, deliberately,
    // under reduced motion too, same as every other motion on this site.
    if (!document.startViewTransition || reducedMotion) {
      apply();
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(apply);
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`] },
        { duration: 500, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" },
      );
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t(theme === "light" ? strings.nav.switchToDark : strings.nav.switchToLight, language)}
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
