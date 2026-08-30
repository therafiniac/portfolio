"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

// Long enough that this is a real "stepped away" gap, not an ordinary
// alt-tab to check something and come straight back.
const AWAY_THRESHOLD_MS = 90_000;
const TOAST_VISIBLE_MS = 4000;

// Swaps the browser tab title while this tab is hidden, back to whatever
// it actually was the moment it's visible again — a small nudge for
// anyone who tabbed away mid-read. Browser chrome only, never rendered
// on the page itself, so it doesn't compete with any on-page copy.
//
// Also tracks how long the tab was actually away — coming back after
// AWAY_THRESHOLD_MS+ shows a small toast (not a modal: nothing here
// needs confirming or blocks anything). A hidden layer for the one
// gesture nothing else on this site rewards: leaving the page alone for
// a while, not clicking/typing/scrolling at it.
export function TabAttention() {
  const language = useLanguage();
  const [welcomeBack, setWelcomeBack] = useState(false);
  const awayStart = useRef<number | null>(null);

  useEffect(() => {
    const originalTitle = document.title;
    const awayTitle = t(strings.tabAttention.comeBack, language);
    let toastTimer: number | undefined;

    function handleVisibilityChange() {
      if (document.hidden) {
        document.title = awayTitle;
        awayStart.current = Date.now();
        return;
      }

      document.title = originalTitle;
      const awayFor = awayStart.current === null ? 0 : Date.now() - awayStart.current;
      awayStart.current = null;
      if (awayFor < AWAY_THRESHOLD_MS) return;

      setWelcomeBack(true);
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => setWelcomeBack(false), TOAST_VISIBLE_MS);
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.title = originalTitle;
      window.clearTimeout(toastTimer);
    };
  }, [language]);

  return (
    <AnimatePresence>
      {welcomeBack && (
        <motion.div
          key="welcome-back-toast"
          role="status"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2 }}
          className="glass-fab bottom-6 left-6 z-30 rounded-full px-4 py-2 font-mono text-xs text-text-muted"
        >
          {t(strings.tabAttention.welcomeBack, language)}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
