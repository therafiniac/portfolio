"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { triggerRapidToggleWarning } from "@/components/layout/RapidToggleWarning";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

const CLICK_WINDOW_MS = 1500;
const CLICKS_TO_TRIGGER = 4;
const CONFUSED_DURATION_MS = 550;
// The button visibly shakes first, then the big alert lands — this delay
// is the beat between them, not just a number: without it the two fire
// in the same instant and read as one messy flinch instead of "uh oh...
// [alert]".
const SHAKE_DURATION_MS = 400;
const ALERT_DELAY_MS = 200;

export function LanguageToggle() {
  const language = useLanguage();
  const [confused, setConfused] = useState(false);
  const [shaking, setShaking] = useState(false);
  const clickTimestamps = useRef<number[]>([]);

  // Every click already does its real job (flips the language), so
  // unlike BrandMark/StatusDot there's nothing to intercept — this only
  // layers a brief label stutter + shake on top after the 4th rapid
  // click, purely cosmetic and never touching the actual language state
  // underneath.
  function trackRapidClicks() {
    const now = Date.now();
    clickTimestamps.current = [...clickTimestamps.current.filter((t) => now - t < CLICK_WINDOW_MS), now];
    if (clickTimestamps.current.length < CLICKS_TO_TRIGGER) return;

    clickTimestamps.current = [];
    setConfused(true);
    window.setTimeout(() => setConfused(false), CONFUSED_DURATION_MS);

    // Decorative-only, so the shake simply doesn't run under reduced
    // motion — same call every other purely-decorative effect on this
    // site makes. The alert itself still fires regardless (it's a real
    // status message, same reasoning RapidToggleWarning's own comment
    // gives), just without the lead-in shake or its delay.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      triggerRapidToggleWarning();
      return;
    }
    setShaking(true);
    window.setTimeout(() => setShaking(false), SHAKE_DURATION_MS);
    window.setTimeout(triggerRapidToggleWarning, ALERT_DELAY_MS);
  }

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
    <motion.button
      type="button"
      onClick={() => {
        trackRapidClicks();
        toggle();
      }}
      animate={shaking ? { x: [0, -3, 3, -3, 3, -2, 2, 0] } : { x: 0 }}
      transition={{ duration: SHAKE_DURATION_MS / 1000, ease: "easeInOut" }}
      aria-label={
        language === "en" ? t(strings.nav.switchToBengali, "en") : t(strings.nav.switchToBengali, "bn")
      }
      className="flex h-9 shrink-0 items-center justify-center rounded-full px-2.5 font-mono text-[length:var(--text-1xs)] font-semibold uppercase tracking-[0.1em] text-text-muted transition-colors hover:text-accent"
    >
      {confused ? "??" : language === "en" ? "বাং" : "EN"}
    </motion.button>
  );
}
