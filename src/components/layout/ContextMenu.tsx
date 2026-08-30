"use client";

import { useLayoutEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useLenis } from "lenis/react";
import { Mail, Copy, Link2, ArrowUp, SunMoon, Languages, Keyboard, Sparkles, Check } from "lucide-react";
import { openShortcutsHelp } from "@/components/layout/KeyboardShortcuts";
import { pickSurpriseOutcome, fireSurpriseOutcome } from "@/lib/easterEggGrabBag";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

const VIEWPORT_MARGIN = 8;
const COPIED_LABEL_MS = 1200;
const EMAIL = "therafiniac@gmail.com";

type CopiedItem = "email" | "link" | null;

function isTypingTarget(el: Element | null): boolean {
  if (!el) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (el as HTMLElement).isContentEditable;
}

// Rows stagger in on open rather than appearing all at once — same
// "a list of things appearing in sequence" motion vocabulary Navbar's
// own mobile menu uses, not a separate one invented just for this.
const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.028, delayChildren: 0.04 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, x: -6 },
  show: { opacity: 1, x: 0, transition: { duration: 0.16 } },
};

// Replaces the browser's own right-click menu with a small useful one in
// the site's own voice, site-wide — except over a real form field
// (isTypingTarget, same guard KeyboardShortcuts/Skills use), where the
// native menu is left alone so paste/cut/copy in the contact form still
// works normally. Holding Shift while right-clicking is every browser's
// own built-in override for a page that calls preventDefault() here —
// standard behavior, nothing this component needs to special-case.
//
// Uses .glass-fab (position: fixed baked into its own plain-CSS rule),
// not .nav-glass + a Tailwind `fixed` utility — nav-glass's own plain
// CSS `position: relative` silently wins over a layered Tailwind
// positioning utility regardless of class order (see FloatingActions.tsx's
// own comment on glass-fab for the same trap). Getting this wrong here
// specifically meant the menu was actually position: relative the whole
// time — rendering wherever it happened to sit in the component tree
// instead of at the cursor, and shoving real page content down by its
// own height every time it opened.
export function ContextMenu() {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [copied, setCopied] = useState<CopiedItem>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const language = useLanguage();

  function close() {
    setPosition(null);
  }

  useLayoutEffect(() => {
    function handleContextMenu(e: MouseEvent) {
      if (isTypingTarget(e.target as Element | null)) return;
      e.preventDefault();
      setCopied(null);
      // Opens at the exact cursor point first — the effect below only
      // ever nudges this closer to the viewport edge, on the rare click
      // near one, never moves it away from the cursor otherwise.
      setPosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("contextmenu", handleContextMenu);
    return () => window.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  // Runs synchronously after the menu mounts at its raw cursor position
  // but before the browser paints (useLayoutEffect, not useEffect) — so
  // measuring the *actual* rendered size here and correcting `position`
  // if it would overflow never produces a visible jump. Real measurement
  // rather than a guessed width/height constant, so this stays correct
  // regardless of how many items or how long their labels are. Converges
  // in at most one extra pass: once corrected, the same measurement
  // yields the same clamped values, so the `!==` check below stops it
  // from looping.
  useLayoutEffect(() => {
    if (!position || !menuRef.current) return;
    const rect = menuRef.current.getBoundingClientRect();
    const maxX = Math.max(window.innerWidth - rect.width - VIEWPORT_MARGIN, VIEWPORT_MARGIN);
    const maxY = Math.max(window.innerHeight - rect.height - VIEWPORT_MARGIN, VIEWPORT_MARGIN);
    const x = Math.min(position.x, maxX);
    const y = Math.min(position.y, maxY);
    if (x !== position.x || y !== position.y) {
      setPosition({ x, y });
    }
  }, [position]);

  useLayoutEffect(() => {
    if (!position) return;

    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", handleKeydown);
    // A right-click's contextmenu event doesn't produce an accompanying
    // "click" on most platforms, but this is still deferred a tick as
    // cheap insurance — same lesson as MatrixRain's dismiss timing fix: a
    // listener attached synchronously inside the event that opens a menu
    // can end up catching that same event once it finishes bubbling to
    // window.
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

  async function copy(item: CopiedItem, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(item);
      window.setTimeout(close, COPIED_LABEL_MS);
    } catch {
      // Clipboard permission denied/unavailable — the mailto item still
      // works as a real fallback for the email specifically, so this
      // just quietly does nothing rather than surfacing an error for a
      // hidden joke-adjacent menu.
    }
  }

  function backToTop() {
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    close();
  }

  // A lighter-weight toggle than ThemeToggle.tsx's own — that one drives
  // a circular view-transition reveal anchored to the click that started
  // it, which doesn't map cleanly onto "opened from a context menu row"
  // (there's no natural single point to anchor the circle to that isn't
  // just the cursor again). This is a quick-access shortcut to the same
  // real state, not a full reimplementation of that flourish.
  function toggleTheme() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    close();
  }

  // Same simplification as toggleTheme above — skips LanguageToggle.tsx's
  // own fade-out/swap/fade-in choreography (driven by the
  // [data-lang-transitioning] attribute) for the same "quick-access
  // shortcut, not a full reimplementation" reasoning.
  function toggleLanguage() {
    const root = document.documentElement;
    const next = root.getAttribute("data-lang") === "bn" ? "en" : "bn";
    root.setAttribute("data-lang", next);
    root.setAttribute("lang", next);
    localStorage.setItem("language", next);
    close();
  }

  function showShortcuts() {
    close();
    openShortcutsHelp();
  }

  // Used to scroll to a random section — dropped that: every section is
  // already one scroll away on a one-page site, so it didn't actually
  // surprise anyone. Picks from a shuffle-bag over the site's other
  // hidden effects instead (see easterEggGrabBag.ts for why a bag, not
  // plain Math.random(), and why each of these reuses its own real
  // trigger instead of a separate reimplementation).
  function surpriseMe() {
    close();
    fireSurpriseOutcome(pickSurpriseOutcome());
  }

  function stop(e: ReactMouseEvent) {
    e.stopPropagation();
  }

  return (
    <AnimatePresence>
      {position && (
        <motion.div
          key="context-menu"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          onClick={stop}
          onContextMenu={(e) => e.preventDefault()}
          style={{
            left: position.x,
            top: position.y,
            transformOrigin: "top left",
            // Layers one more shadow onto .glass-fab's own two (its inset
            // highlight + elevation shadow) rather than replacing them —
            // an inline `boxShadow` overrides the whole property, class
            // and all, so this has to restate glass-fab's own values
            // alongside the new one, not just add the glow on its own.
            // A restrained ambient glow — a soft colored shadow, not a
            // blurred gradient blob behind the panel (tried first; at any
            // opacity/blur strong enough to read as intentional it looked
            // like a smear rather than a glow).
            boxShadow:
              "inset 0 1px 0 color-mix(in srgb, var(--text-primary) 10%, transparent), 0 12px 32px -12px var(--shadow-elevated), 0 0 22px -6px color-mix(in srgb, var(--accent) 30%, transparent)",
          }}
          className="glass-fab z-[97] min-w-[212px] rounded-xl"
        >
          <div ref={menuRef} className="overflow-hidden rounded-xl py-1.5 font-mono text-text-primary">
            {/* Same signature-gradient hairline Navbar's mobile menu uses
                rather than another neutral border — AGENTS.md calls for
                reusing the gradient deliberately and repeatedly, not just
                on Hero's CTA. */}
            <span
              aria-hidden="true"
              className="absolute inset-x-3 top-0 h-px"
              style={{ backgroundImage: "var(--gradient-signature)" }}
            />
            <div className="px-3 pb-1.5 pt-2 text-[length:var(--text-2xs)] uppercase tracking-[0.15em] text-text-muted">
              {t(strings.contextMenu.header, language)}
            </div>

            <motion.div variants={listVariants} initial="hidden" animate="show">
              <MenuItem icon={<Mail className="h-3.5 w-3.5" aria-hidden="true" />} href={`mailto:${EMAIL}`} onClick={close}>
                {t(strings.contextMenu.sayHi, language)}
              </MenuItem>
              <MenuItem
                icon={
                  copied === "email" ? (
                    <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  )
                }
                onClick={() => copy("email", EMAIL)}
              >
                {copied === "email" ? t(strings.contextMenu.copiedLabel, language) : t(strings.contextMenu.copyEmail, language)}
              </MenuItem>
              <MenuItem
                icon={
                  copied === "link" ? (
                    <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  ) : (
                    <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
                  )
                }
                onClick={() => copy("link", window.location.href)}
              >
                {copied === "link" ? t(strings.contextMenu.copiedLabel, language) : t(strings.contextMenu.copyLink, language)}
              </MenuItem>

              <div className="my-1 h-px bg-line/40" aria-hidden="true" />

              <MenuItem icon={<ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />} onClick={backToTop}>
                {t(strings.contextMenu.backToTop, language)}
              </MenuItem>
              <MenuItem icon={<SunMoon className="h-3.5 w-3.5" aria-hidden="true" />} onClick={toggleTheme}>
                {t(strings.contextMenu.toggleTheme, language)}
              </MenuItem>
              <MenuItem icon={<Languages className="h-3.5 w-3.5" aria-hidden="true" />} onClick={toggleLanguage}>
                {t(strings.contextMenu.toggleLanguage, language)}
              </MenuItem>
              <MenuItem icon={<Keyboard className="h-3.5 w-3.5" aria-hidden="true" />} onClick={showShortcuts}>
                {t(strings.contextMenu.shortcuts, language)}
              </MenuItem>

              <div className="my-1 h-px bg-line/40" aria-hidden="true" />

              <MenuItem icon={<Sparkles className="h-3.5 w-3.5" aria-hidden="true" />} onClick={surpriseMe}>
                {t(strings.contextMenu.surpriseMe, language)}
              </MenuItem>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type MenuItemProps = {
  icon: ReactNode;
  children: ReactNode;
  onClick: () => void;
  href?: string;
};

// One row shape shared by every item — icon, then label, same left-
// aligned gap regardless of whether it renders as an <a> (real
// navigation: mailto) or a <button> (an in-page action) — a visitor
// scanning the menu shouldn't be able to tell which is which from the
// layout alone. Both variants carry `variants={itemVariants}` with no
// `initial`/`animate` of their own so they pick up the stagger from
// listVariants' parent instead of animating independently.
function MenuItem({ icon, children, onClick, href }: MenuItemProps) {
  const className =
    "flex w-full items-center gap-2.5 px-3 py-2 text-left text-xs transition-colors hover:bg-accent/10 hover:text-accent";

  if (href) {
    return (
      <motion.a variants={itemVariants} href={href} role="menuitem" onClick={onClick} className={className}>
        <span className="text-text-muted">{icon}</span>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button variants={itemVariants} type="button" role="menuitem" onClick={onClick} className={className}>
      <span className="text-text-muted">{icon}</span>
      {children}
    </motion.button>
  );
}
