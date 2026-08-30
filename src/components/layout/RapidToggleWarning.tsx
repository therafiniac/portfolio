"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

const TRIGGER_EVENT = "easter:rapid-toggle";
const VISIBLE_MS = 1800;

// Fired by LanguageToggle.tsx and ThemeToggle.tsx once either one sees 5
// clicks inside its own CLICK_WINDOW_MS — one shared toast for both
// rather than each button growing its own copy of this, since the
// message and behavior are identical either way.
export function triggerRapidToggleWarning() {
  window.dispatchEvent(new Event(TRIGGER_EVENT));
}

export function RapidToggleWarning() {
  const [visible, setVisible] = useState(false);
  const language = useLanguage();

  useEffect(() => {
    let hideTimer: number | undefined;

    function handleTrigger() {
      // Not gated behind reduced motion — this is a real (if playful)
      // status message, not a purely decorative flourish, so it should
      // still reach everyone. The fade itself is the only motion, and
      // framer-motion's own reducedMotion="user" config (see
      // MotionConfig in layout.tsx) already downgrades that to an
      // instant show/hide rather than this component needing its own
      // check.
      setVisible(true);
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => setVisible(false), VISIBLE_MS);
    }

    window.addEventListener(TRIGGER_EVENT, handleTrigger);
    return () => {
      window.clearTimeout(hideTimer);
      window.removeEventListener(TRIGGER_EVENT, handleTrigger);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="rapid-toggle-warning"
          role="status"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="nav-glass fixed left-1/2 top-20 z-[97] -translate-x-1/2 rounded-full px-4 py-2 font-mono text-xs text-text-primary md:top-24"
        >
          {t(strings.rapidToggle.message, language)}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
