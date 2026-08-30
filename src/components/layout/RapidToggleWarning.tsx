"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TriangleAlert } from "lucide-react";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

const TRIGGER_EVENT = "easter:rapid-toggle";
const VISIBLE_MS = 5500;

// Fired by LanguageToggle.tsx once it sees enough clicks inside its own
// click-tracking window (that button also shakes itself first — see its
// own SHAKE_DURATION_MS/ALERT_DELAY_MS — so this lands a beat after the
// shake, not in the same instant). ThemeToggle.tsx used to wire into this
// too; pulled back out — its click never reliably reached this at all,
// since a View Transition's old/new snapshots render in the browser's
// own UA top-layer, which composites above the entire document
// *regardless of z-index* for the transition's whole duration. No
// z-index trick could fix that, so rather than keep fighting it there,
// this alert is LanguageToggle's alone now.
export function triggerRapidToggleWarning() {
  window.dispatchEvent(new Event(TRIGGER_EVENT));
}

// A full modal-style alert, not a small corner toast — same dimmed-
// backdrop-plus-centered-panel mechanism KeyboardShortcuts.tsx and
// CommandPalette.tsx already use for their own dialogs. Styled to look
// like a real system alert (bold, uppercase, a wobbling alert-triangle,
// a nervous little rotation jitter on the card itself) — the comedy is
// entirely in the gap between how dramatic the presentation looks and
// how trivial the actual cause is. --accent-secondary (maroon), not
// --danger — AGENTS.md scopes --danger to real form/validation errors
// only; this is a joke, not one.
//
// No click-to-dismiss on the backdrop — it only closes on its own after
// VISIBLE_MS (or Escape). Someone who just rapid-clicked a button is
// often still clicking right where the backdrop now sits; a dismiss-on-
// click backdrop meant that habit instantly closed the alert and dropped
// them straight back into the live page mid-click, undercutting both "it
// should stay a moment" and the bit itself.
export function RapidToggleWarning() {
  const [visible, setVisible] = useState(false);
  const language = useLanguage();

  useEffect(() => {
    let hideTimer: number | undefined;

    function handleTrigger() {
      // Not gated behind reduced motion — this is a real status message,
      // not a purely decorative flourish, so it should still reach
      // everyone; framer-motion's own reducedMotion="user" config
      // (MotionConfig in layout.tsx) already downgrades every animate
      // prop below to an instant, static state rather than this
      // component needing its own checks per-animation.
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

  // Escape stays as the one manual way out — safe to wire up
  // unconditionally (it's never the key that triggers this alert, which
  // fires off a click, not a keydown), unlike a click-based dismiss.
  useEffect(() => {
    if (!visible) return;
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") setVisible(false);
    }
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="rapid-toggle-backdrop"
          role="alertdialog"
          aria-live="assertive"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[98] flex items-center justify-center bg-bg/70 px-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{
              opacity: { duration: 0.2 },
              y: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
              // The overshoot (past 1, settling back) is what makes this
              // read as a startled "pop" rather than a plain fade/scale-in.
              scale: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
            }}
            style={{ boxShadow: "0 0 0 2px var(--accent-secondary), 0 25px 60px -20px color-mix(in srgb, var(--shadow-color) 60%, transparent)" }}
            className="nav-glass flex max-w-sm flex-col items-center gap-3 rounded-2xl px-8 py-9 text-center"
          >
            {/* The endless little "still rattled" wobble lives on this
                inner wrapper, deliberately never on the card above (the
                one AnimatePresence tracks for enter/exit) — a
                repeat: Infinity transition on a property that same
                element also defines an `exit` value for means the exit
                transition for that property never resolves, so
                AnimatePresence never fires its unmount: the backdrop
                below stays in the DOM forever, invisible but still
                position: fixed/inset-0/pointer-events: auto, silently
                blocking every click and hover on the entire page until a
                reload. Confirmed the hard way — this is what broke the
                language toggle and every :hover on the site after the
                alert "closed." A child with its own independent loop and
                no `exit` prop of its own isn't tracked that way; it just
                gets removed along with its parent, mid-loop, the instant
                the parent's own (now purely finite) exit completes. */}
            <motion.div
              animate={{ rotate: [0, -1.2, 1.2, -1, 1, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-3"
            >
              <motion.div
                animate={{ rotate: [0, -14, 14, -10, 10, 0], scale: [1, 1.1, 1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.3, ease: "easeInOut" }}
              >
                <TriangleAlert className="h-10 w-10 text-accent-secondary" aria-hidden="true" />
              </motion.div>
              <p className="font-mono text-lg font-bold uppercase leading-snug tracking-[0.08em] text-accent-secondary">
                {t(strings.rapidToggle.headline, language)}
              </p>
              <p className="font-mono text-sm text-text-muted">{t(strings.rapidToggle.subline, language)}</p>
              <p className="font-mono text-xs text-text-muted/70">{t(strings.rapidToggle.tertiary, language)}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
