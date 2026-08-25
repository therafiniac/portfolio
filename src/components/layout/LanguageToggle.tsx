"use client";

import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

export function LanguageToggle() {
  const language = useLanguage();

  function toggle() {
    const next = language === "en" ? "bn" : "en";
    const root = document.documentElement;

    function apply() {
      root.setAttribute("data-lang", next);
      root.setAttribute("lang", next);
      localStorage.setItem("language", next);
    }

    // Every piece of copy on the page re-renders at once when this
    // attribute flips — previously an instant, jarring swap (worse than
    // the old theme toggle ever was, since text reflows too, not just
    // colors). A brief fade out, swap, fade in — driven by body's own
    // opacity transition (see globals.css's [data-lang-transitioning]
    // rule) — gives the reflow somewhere to happen out of view instead
    // of visibly snapping. Skipped under reduced motion, same as every
    // other motion on this site.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      return;
    }

    root.setAttribute("data-lang-transitioning", "true");
    window.setTimeout(() => {
      apply();
      window.setTimeout(() => root.removeAttribute("data-lang-transitioning"), 30);
    }, 150);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        language === "en" ? t(strings.nav.switchToBengali, "en") : t(strings.nav.switchToBengali, "bn")
      }
      className="flex h-9 shrink-0 items-center justify-center rounded-full px-2.5 font-mono text-[length:var(--text-1xs)] font-semibold uppercase tracking-[0.1em] text-text-muted transition-colors hover:text-accent"
    >
      {language === "en" ? "বাং" : "EN"}
    </button>
  );
}
