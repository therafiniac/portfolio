"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { commandItems } from "@/lib/data/commandPalette";
import { useModalA11y } from "@/lib/useModalA11y";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

const OPEN_EVENT = "command-palette:open";

// Navbar's trigger button fires this rather than reaching into this
// component's state directly — keeps CommandPalette the single owner of
// its own open/closed state instead of prop-drilling a setter through
// layout.tsx.
export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const language = useLanguage();

  useModalA11y(open, dialogRef);
  // Same cross-page reasoning as Navbar.tsx's resolveHref — these items
  // jump to a homepage section by id, which only resolves as a bare hash
  // when the palette is opened from the homepage itself.
  const isHome = usePathname() === "/";

  // Matches against `id` as well as the visible label — the label is each
  // section's short eyebrow ("Capabilities"), which doesn't always share a
  // word with the more obvious thing someone would type (its id, "stack",
  // shown right in the row as "#stack").
  const normalizedQuery = query.trim().toLowerCase();
  const results = commandItems.filter(
    (item) =>
      t(item.label, language).toLowerCase().includes(normalizedQuery) ||
      item.id.toLowerCase().includes(normalizedQuery),
  );

  // Resets live at the call site that actually causes them (opening the
  // palette, or the query changing) rather than in an effect watching
  // `open`/`query` — avoids the cascading-render anti-pattern of deriving
  // state via setState-in-effect for state that's really just "reset when
  // this user action happens."
  function openPalette() {
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
    // Focus after the entrance animation mounts the input this frame.
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function closePalette() {
    setOpen(false);
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    setActiveIndex(0);
  }

  // Depends on `open` so the Cmd/Ctrl+K toggle branch always reads the
  // current value (re-attaching a couple of listeners on toggle is cheap),
  // rather than a functional setState updater calling setQuery/
  // setActiveIndex from inside it — updater functions are expected to stay
  // pure, with no side effects.
  useEffect(() => {
    function handleOpenEvent() {
      openPalette();
    }
    function handleKeydown(e: globalThis.KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) closePalette();
        else openPalette();
      } else if (e.key === "Escape") {
        closePalette();
      }
    }
    window.addEventListener(OPEN_EVENT, handleOpenEvent);
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener(OPEN_EVENT, handleOpenEvent);
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [open]);

  // Enter re-dispatches a click on the same rendered <a> the mouse path
  // uses (via data-command-id), rather than assigning location.hash
  // directly — that keeps keyboard selection going through the exact same
  // Lenis-intercepted smooth-scroll a real click gets (see SmoothScroll.tsx
  // — anchors: true), instead of a jarring native jump.
  function handleKeydownInList(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      const target = results[activeIndex];
      if (!target) return;
      document.querySelector<HTMLAnchorElement>(`a[data-command-id="${target.id}"]`)?.click();
      closePalette();
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-bg/70 px-4 pt-[15vh] backdrop-blur-sm"
          onClick={closePalette}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="nav-glass w-full max-w-md overflow-hidden rounded-2xl"
            role="dialog"
            aria-modal="true"
            aria-label={t(strings.commandPalette.openLabel, language)}
          >
            <div className="flex items-center gap-3 border-b border-line/40 px-4 py-3">
              <Search className="h-4 w-4 shrink-0 text-text-muted" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-autocomplete="list"
                aria-controls="command-palette-listbox"
                aria-activedescendant={results[activeIndex] ? `command-option-${results[activeIndex].id}` : undefined}
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onKeyDown={handleKeydownInList}
                placeholder={t(strings.commandPalette.placeholder, language)}
                className="w-full bg-transparent font-mono text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
              />
            </div>

            <div id="command-palette-listbox" role="listbox" className="max-h-72 overflow-y-auto p-2">
              {normalizedQuery === strings.commandPalette.sudoQuery ? (
                <p className="px-3 py-6 text-center font-mono text-xs text-text-muted">
                  {t(strings.commandPalette.sudoJoke, language)}
                </p>
              ) : results.length === 0 ? (
                <p className="px-3 py-6 text-center font-mono text-xs text-text-muted">
                  {t(strings.commandPalette.noResults, language)}
                </p>
              ) : (
                results.map((item, i) => (
                  <a
                    key={item.id}
                    id={`command-option-${item.id}`}
                    role="option"
                    aria-selected={i === activeIndex}
                    href={isHome ? `#${item.id}` : `/#${item.id}`}
                    data-command-id={item.id}
                    onClick={closePalette}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 font-mono text-sm transition-colors ${
                      i === activeIndex ? "bg-accent/10 text-accent" : "text-text-primary hover:bg-accent/5"
                    }`}
                  >
                    {t(item.label, language)}
                    <span className="font-mono text-[length:var(--text-2xs)] uppercase tracking-[0.15em] text-text-muted">
                      {`#${item.id}`}
                    </span>
                  </a>
                ))
              )}
            </div>

            <div className="hidden items-center justify-end gap-2 border-t border-line/40 px-4 py-2 font-mono text-[length:var(--text-2xs)] text-text-muted sm:flex">
              <kbd className="rounded border border-line/60 px-1.5 py-0.5">↑↓</kbd>
              <kbd className="rounded border border-line/60 px-1.5 py-0.5">Enter</kbd>
              <kbd className="rounded border border-line/60 px-1.5 py-0.5">Esc</kbd>
              <span>{t(strings.commandPalette.hint, language)}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
