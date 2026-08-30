"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

const TRIGGER_EVENT = "easter:surprise";
const VISIBLE_MS = 5000;

// Fired by ContextMenu.tsx's "surprise me" row — used to just scroll to
// a random section, replaced with this because that wasn't actually
// "surprising" (every section is already one scroll away on a one-page
// site) and didn't do anything a section itself couldn't already do.
export function triggerSurprise() {
  window.dispatchEvent(new Event(TRIGGER_EVENT));
}

// Same modal mechanism as RapidToggleWarning.tsx's own alert (dimmed
// backdrop + centered nav-glass panel), --accent not --accent-secondary
// since this isn't a warning of any kind — and unlike that one, this
// backdrop *does* dismiss on click: there's no "still clicking out of
// habit" scenario to guard against here, this only ever opens from a
// deliberate context-menu selection, not a rapid-click streak.
//
// No repeat: Infinity anywhere on the AnimatePresence-tracked elements
// below (backdrop or card) — see RapidToggleWarning.tsx's own comment on
// why that specific combination silently breaks the *entire site's*
// hover/click handling until reload (an infinite transition on a
// property that element also has an `exit` value for never resolves, so
// AnimatePresence never actually unmounts it).
export function SurpriseFact() {
  const [factIndex, setFactIndex] = useState<number | null>(null);
  const language = useLanguage();

  useEffect(() => {
    let hideTimer: number | undefined;

    function handleTrigger() {
      setFactIndex(Math.floor(Math.random() * strings.surprise.facts.length));
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => setFactIndex(null), VISIBLE_MS);
    }

    window.addEventListener(TRIGGER_EVENT, handleTrigger);
    return () => {
      window.clearTimeout(hideTimer);
      window.removeEventListener(TRIGGER_EVENT, handleTrigger);
    };
  }, []);

  const fact = factIndex === null ? null : strings.surprise.facts[factIndex];

  return (
    <AnimatePresence>
      {fact && (
        <motion.div
          key="surprise-backdrop"
          role="status"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => setFactIndex(null)}
          className="fixed inset-0 z-[98] flex items-center justify-center bg-bg/70 px-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow:
                "inset 0 1px 0 color-mix(in srgb, var(--text-primary) 10%, transparent), 0 0 0 2px var(--accent), 0 25px 60px -20px color-mix(in srgb, var(--shadow-color) 60%, transparent)",
            }}
            className="nav-glass flex max-w-sm flex-col items-center gap-3 rounded-2xl px-8 py-9 text-center"
          >
            <Sparkles className="h-8 w-8 text-accent" aria-hidden="true" />
            <p className="font-mono text-sm text-text-primary">{t(fact, language)}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
