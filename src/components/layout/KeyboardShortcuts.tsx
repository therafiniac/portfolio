"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { navLinks } from "@/lib/data/nav";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

const LEADER_TIMEOUT = 600;

// key -> section id, derived from navLinks (Work/Stack/Experience/
// Contact) rather than a hand-maintained map — a fifth nav link added
// later picks up its own shortcut automatically instead of silently
// missing one. "h" (home) isn't a navLinks entry — Hero carries its own
// id="top" directly (same target Navbar's brand-mark link uses), not a
// row in the nav, so it's handled as its own case in the keydown handler
// rather than forced into this map.
const SECTION_KEYS: Record<string, string> = Object.fromEntries(
  navLinks.map((link) => [link.id[0], link.id]),
);

function isTypingTarget(el: Element | null): boolean {
  if (!el) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (el as HTMLElement).isContentEditable;
}

// A quiet, developer-flavored layer on top of the mouse-driven nav — "g"
// then a letter jumps to a section (vim's own "go to" mnemonic), "?"
// shows what's available. Rewards the same audience the console log and
// the command palette's own "sudo" easter egg do, through a third door.
// Guards against firing while any input/textarea/select/contentEditable
// has focus — which also covers the command palette's own search box,
// since that's simply the currently-focused input while it's open — so
// this never hijacks normal typing anywhere on the site.
export function KeyboardShortcuts() {
  const [helpOpen, setHelpOpen] = useState(false);
  const [leaderArmed, setLeaderArmed] = useState(false);
  const lenis = useLenis();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const language = useLanguage();

  useEffect(() => {
    if (!leaderArmed) return;
    const timeout = window.setTimeout(() => setLeaderArmed(false), LEADER_TIMEOUT);
    return () => window.clearTimeout(timeout);
  }, [leaderArmed]);

  useEffect(() => {
    function goToSection(id: string) {
      // Same cross-page reasoning as Navbar/Footer's own hrefs — a bare
      // hash only resolves against elements on the current page, so off
      // the homepage this is a real navigation instead of a Lenis scroll.
      if (isHome) {
        lenis?.scrollTo(`#${id}`);
      } else {
        window.location.href = `/#${id}`;
      }
    }

    function handleKeydown(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTypingTarget(document.activeElement)) return;

      if (e.key === "Escape") {
        setHelpOpen(false);
        setLeaderArmed(false);
        return;
      }

      if (helpOpen) return;

      if (leaderArmed) {
        setLeaderArmed(false);
        if (e.key === "h") goToSection("top");
        else if (SECTION_KEYS[e.key]) goToSection(SECTION_KEYS[e.key]);
        return;
      }

      if (e.key === "?") {
        e.preventDefault();
        setHelpOpen(true);
      } else if (e.key === "g") {
        setLeaderArmed(true);
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [leaderArmed, helpOpen, isHome, lenis]);

  const rows = [
    ...navLinks.map((link) => ({ key: link.id[0], label: t(link.label, language) })),
    { key: "h", label: t(strings.shortcuts.home, language) },
  ];

  return (
    <AnimatePresence>
      {helpOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-bg/70 px-4 backdrop-blur-sm"
          onClick={() => setHelpOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="nav-glass w-full max-w-sm overflow-hidden rounded-2xl"
            role="dialog"
            aria-modal="true"
            aria-label={t(strings.shortcuts.title, language)}
          >
            <div className="border-b border-line/40 px-4 py-3 font-mono text-sm text-text-primary">
              {t(strings.shortcuts.title, language)}
            </div>
            <div className="flex flex-col gap-2.5 p-4">
              {rows.map((row) => (
                <div key={row.key} className="flex items-center justify-between font-mono text-sm">
                  <span className="text-text-muted">{row.label}</span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-line/60 px-1.5 py-0.5 text-xs">g</kbd>
                    <kbd className="rounded border border-line/60 px-1.5 py-0.5 text-xs">{row.key}</kbd>
                  </span>
                </div>
              ))}
              <div className="mt-1 flex items-center justify-between border-t border-line/40 pt-2.5 font-mono text-sm">
                <span className="text-text-muted">{t(strings.shortcuts.openPalette, language)}</span>
                <kbd className="rounded border border-line/60 px-1.5 py-0.5 text-xs">⌘K</kbd>
              </div>
              <div className="flex items-center justify-between font-mono text-sm">
                <span className="text-text-muted">{t(strings.shortcuts.openThis, language)}</span>
                <kbd className="rounded border border-line/60 px-1.5 py-0.5 text-xs">?</kbd>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
