"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { BrandMark } from "@/components/layout/BrandMark";
import { openCommandPalette } from "@/components/layout/CommandPalette";
import { useModalA11y } from "@/lib/useModalA11y";
import { navLinks } from "@/lib/data/nav";
import { wordmark } from "@/lib/data/hero";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

// isHome as a dependency, not just an empty array: Navbar lives in the
// root layout, so it never unmounts across a client-side route change.
// Without this, the observer set up on first mount keeps a reference to
// whichever section DOM nodes existed *then* — navigate away (those get
// destroyed) and back (fresh ones get created), and the observer is
// left watching detached nodes forever, so the active link silently
// stops updating until a full reload re-mounts everything from scratch.
// Re-running the effect each time isHome flips back to true re-queries
// the (now fresh) elements instead.
function useActiveSection(isHome: boolean) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!isHome) return;

    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    // Each callback only reports entries whose state *changed*, not every
    // currently-intersecting section — so this tracks the running set
    // across callbacks rather than judging only the latest batch. That's
    // what makes clearing it safe: dropping to 0 here means nothing is
    // intersecting *right now* (e.g. scrolled back above Work into Hero),
    // not just that this particular batch didn't happen to mention one.
    const intersecting = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersecting.set(entry.target.id, entry.intersectionRatio);
          } else {
            intersecting.delete(entry.target.id);
          }
        }

        if (intersecting.size === 0) {
          setActiveId(null);
          return;
        }

        const [topId] = [...intersecting.entries()].sort((a, b) => b[1] - a[1])[0];
        setActiveId(topId);
      },
      // The trigger band sits low in the viewport (15%-25% down, just
      // under the sticky navbar) rather than near center (the old
      // 40%-50% band) — a tall section's *top* is what crosses this
      // line first as you scroll, so a near-center band meant the next
      // section lit up while the current one still filled most of the
      // screen. Confirmed empirically: with the old band, "Work" went
      // active ~350px before Hero's own bottom edge.
      { rootMargin: "-15% 0px -75% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  // Derived, not reset via a second setState call in the effect above
  // (that pattern trips react-hooks/set-state-in-effect and causes an
  // extra cascading render) — off-home, activeId may still hold a stale
  // id from the last time it was true, but the hook simply never
  // surfaces it until isHome is true again.
  return isHome ? activeId : null;
}

// Same stagger shape Hero.tsx's own entrance uses — reused here rather
// than inventing a second motion vocabulary for what's ultimately the
// same idea (a list of things appearing in sequence, not all at once).
const menuContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
};

const menuItem = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" as const } },
};

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const language = useLanguage();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useModalA11y(menuOpen, mobileMenuRef);
  // These hrefs are bare "#work"-style fragments so Lenis's anchors:true
  // (SmoothScroll.tsx) can intercept them for an eased same-page scroll —
  // that only resolves on the homepage itself, though. From a case-study
  // page (/work/[slug]) there's no #work element to scroll to, so the
  // same bare hash would silently do nothing; prefixing with "/" there
  // sends it through a real navigation to the homepage followed by the
  // browser's own hash jump instead.
  const pathname = usePathname();
  const isHome = pathname === "/";
  const resolveHref = (href: string) => (isHome ? href : `/${href}`);
  const activeId = useActiveSection(isHome);

  const { scrollY } = useScroll();
  const paddingY = useTransform(scrollY, [0, 120], [14, 8]);
  // Transparent right at the top of Hero, glass panel fades in over the
  // next 80px of scroll — content (brand mark/links/icons) lives on a
  // separate layer above this so it stays fully legible the whole time,
  // it's only the background/blur/border/shadow that ramps in.
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  return (
    <header className="sticky top-4 z-40 mx-4 md:mx-8 md:top-6">
      <div className="relative">
        <motion.div
          aria-hidden="true"
          style={{ opacity: bgOpacity }}
          className="nav-glass-backdrop rounded-full"
        />
        <motion.div
          style={{ paddingTop: paddingY, paddingBottom: paddingY }}
          className="relative z-10 flex items-center justify-between gap-4 rounded-full px-5"
        >
          {/* Not resolveHref("#top") — that resolved to "/#top" off the
              homepage, a hash the browser/Lenis has nothing to scroll to
              until *after* landing on "/", so it read as "stuck on this
              page" rather than a real trip home. "/" alone is the actual
              home route; "#top" (in-page scroll-up via Lenis's anchors)
              only makes sense already being home. */}
          <a
            href={isHome ? "#top" : "/"}
            className="group flex items-center gap-2.5 font-mono text-sm text-text-primary transition-colors hover:text-accent"
          >
            <BrandMark size={30} className="text-xs group-hover:bg-accent/15" />
            {t(wordmark, language)}
          </a>

          <nav className="hidden gap-1 font-mono text-xs uppercase tracking-[0.15em] sm:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={resolveHref(link.href)}
                className={`relative rounded-full px-3 py-1.5 transition-colors ${
                  activeId === link.id
                    ? "nav-active-text-glow font-medium text-accent"
                    : "text-text-muted hover:text-accent"
                }`}
                aria-current={activeId === link.id ? "true" : undefined}
              >
                {activeId === link.id && (
                  <motion.span
                    layoutId="nav-active-torch"
                    aria-hidden="true"
                    className="nav-active-torch pointer-events-none absolute -inset-6 -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {t(link.label, language)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label={t(strings.commandPalette.openLabel, language)}
              className="flex h-9 items-center gap-1.5 rounded-full px-2.5 text-text-muted transition-colors hover:text-accent"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              <kbd className="hidden rounded border border-line/60 px-1.5 py-0.5 font-mono text-[length:var(--text-3xs)] sm:inline-block">
                ⌘K
              </kbd>
            </button>
            <LanguageToggle />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label={t(menuOpen ? strings.nav.closeMenu : strings.nav.openMenu, language)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-text-muted transition-colors hover:text-accent sm:hidden"
            >
              {menuOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dimming backdrop — gives the panel real separation from
                Hero's large headline sitting right behind it (nav-glass's
                92%-opacity/20px-blur look is right for the always-visible
                desktop bar, but read as unfinished for a panel someone is
                actively reading), and doubles as a tap-outside-to-dismiss
                target. Painted within header's own z-40 stacking context
                (position:sticky + z-index create one), so this still
                composites above ordinary page content despite being a
                nested child rather than a portal. */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-0 bg-bg/60 backdrop-blur-sm sm:hidden"
            />
            <motion.nav
              ref={mobileMenuRef}
              variants={menuContainer}
              initial="hidden"
              animate="show"
              exit="hidden"
              onKeyDown={(event) => {
                if (event.key === "Escape") setMenuOpen(false);
              }}
              // nav-mobile-menu (globals.css) carries the actual `position:
              // absolute` — this used to sit in normal document flow after
              // the header's own row, so opening it pushed every section
              // below down the page (a real layout shift, not just visual).
              // A Tailwind `absolute` utility here doesn't work: nav-glass
              // sets its own plain-CSS `position: relative` which silently
              // wins over a layered Tailwind utility regardless of class
              // order (see nav-mobile-menu's comment in globals.css).
              // nav-mobile-menu-panel bumps the background opacity above
              // nav-glass's default for the same cascade-layer reason —
              // see that class's own comment in globals.css.
              className="nav-glass nav-mobile-menu nav-mobile-menu-panel z-10 mt-2 flex flex-col gap-1 overflow-hidden rounded-2xl p-3 sm:hidden"
            >
              {/* A visible touch of --gradient-signature — AGENTS.md calls
                  for reusing it deliberately and repeatedly, not just on
                  the one Hero CTA — rather than another neutral hairline. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-3 top-0 h-px"
                style={{ backgroundImage: "var(--gradient-signature)" }}
              />
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  variants={menuItem}
                  href={resolveHref(link.href)}
                  onClick={() => setMenuOpen(false)}
                  aria-current={activeId === link.id ? "true" : undefined}
                  className={`relative rounded-lg px-3 py-3 font-mono text-sm uppercase tracking-[0.15em] transition-colors hover:text-accent ${
                    activeId === link.id
                      ? "nav-active-text-glow font-medium text-accent"
                      : "text-text-muted"
                  }`}
                >
                  {activeId === link.id && (
                    <span aria-hidden="true" className="nav-active-torch pointer-events-none absolute -inset-4 -z-10" />
                  )}
                  {t(link.label, language)}
                </motion.a>
              ))}
              <motion.a
                variants={menuItem}
                href={resolveHref("#contact")}
                onClick={() => setMenuOpen(false)}
                className="mt-1 flex items-center justify-between rounded-lg px-3 py-3 font-mono text-sm text-bg"
                style={{ backgroundImage: "var(--gradient-signature)" }}
              >
                {t(strings.hero.getInTouch, language)}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </motion.a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
