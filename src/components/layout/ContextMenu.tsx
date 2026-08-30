"use client";

import { useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MENU_WIDTH = 176;
const MENU_HEIGHT = 92;
const VIEWPORT_MARGIN = 8;
const COPIED_LABEL_MS = 1200;
const EMAIL = "therafiniac@gmail.com";

function isTypingTarget(el: Element | null): boolean {
  if (!el) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (el as HTMLElement).isContentEditable;
}

// Replaces the browser's own right-click menu with a small two-item one
// in the site's own voice, site-wide — except over a real form field
// (isTypingTarget, same guard KeyboardShortcuts/Skills use), where the
// native menu is left alone so paste/cut/copy in the contact form still
// works normally. Superseded BrandMark's own earlier attempt at scoping
// this to just the mark itself: that one broke because the popover was a
// nested <a> inside the mark's own wrapping "back to top" link, invalid
// HTML that browsers silently reparent — a global, single-owner menu
// mounted at the root sidesteps that whole class of nesting problem.
export function ContextMenu() {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function handleContextMenu(e: MouseEvent) {
      if (isTypingTarget(e.target as Element | null)) return;
      e.preventDefault();
      const x = Math.min(e.clientX, window.innerWidth - MENU_WIDTH - VIEWPORT_MARGIN);
      const y = Math.min(e.clientY, window.innerHeight - MENU_HEIGHT - VIEWPORT_MARGIN);
      setPosition({ x: Math.max(x, VIEWPORT_MARGIN), y: Math.max(y, VIEWPORT_MARGIN) });
      setCopied(false);
    }
    window.addEventListener("contextmenu", handleContextMenu);
    return () => window.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  useEffect(() => {
    if (!position) return;

    function close() {
      setPosition(null);
    }
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", handleKeydown);
    // A right-click's contextmenu event doesn't produce an accompanying
    // "click" on the button that fired it, but this is still deferred a
    // tick as cheap insurance — same lesson as MatrixRain's dismiss
    // timing fix: a listener attached synchronously inside the event that
    // opens a menu can end up catching that same event once it finishes
    // bubbling to window.
    const outsideClickTimer = window.setTimeout(() => {
      window.addEventListener("click", close);
      window.addEventListener("contextmenu", close);
    }, 0);

    return () => {
      window.clearTimeout(outsideClickTimer);
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("click", close);
      window.removeEventListener("contextmenu", close);
    };
  }, [position]);

  async function copyEmail(e: ReactMouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setPosition(null), COPIED_LABEL_MS);
    } catch {
      // Clipboard permission denied/unavailable — the mailto item right
      // above it still works as a fallback, so this just quietly does
      // nothing rather than surfacing an error for a hidden joke menu.
    }
  }

  return (
    <AnimatePresence>
      {position && (
        <motion.div
          key="context-menu"
          role="menu"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          onClick={(e) => e.stopPropagation()}
          onContextMenu={(e) => e.preventDefault()}
          style={{ left: position.x, top: position.y, width: MENU_WIDTH }}
          className="nav-glass fixed z-[97] overflow-hidden rounded-lg py-1 font-mono text-xs text-text-primary"
        >
          <div className="border-b border-line/40 px-3 py-1.5 text-[length:var(--text-2xs)] uppercase tracking-[0.15em] text-text-muted">
            rafi@portfolio
          </div>
          <a
            href={`mailto:${EMAIL}`}
            role="menuitem"
            onClick={() => setPosition(null)}
            className="block px-3 py-2 transition-colors hover:bg-accent/10 hover:text-accent"
          >
            say hi →
          </a>
          <button
            type="button"
            role="menuitem"
            onClick={copyEmail}
            className="block w-full px-3 py-2 text-left transition-colors hover:bg-accent/10 hover:text-accent"
          >
            {copied ? "copied." : "copy email"}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
