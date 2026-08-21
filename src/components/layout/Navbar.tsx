"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { BrandMark } from "@/components/layout/BrandMark";
import { navLinks } from "@/lib/data/nav";

function useActiveSection() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
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
  }, []);

  return activeId;
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection();

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
          <a
            href="#top"
            className="group flex items-center gap-2.5 font-mono text-sm text-text-primary transition-colors hover:text-accent"
          >
            <BrandMark size={30} className="text-xs group-hover:bg-accent/15" />
            RAFI
          </a>

          <nav className="hidden gap-1 font-mono text-xs uppercase tracking-[0.15em] sm:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
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
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
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
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="nav-glass mt-2 flex flex-col gap-1 rounded-2xl p-3 sm:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={activeId === link.id ? "true" : undefined}
                className={`relative rounded-lg px-3 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-colors hover:text-accent ${
                  activeId === link.id
                    ? "nav-active-text-glow font-medium text-accent"
                    : "text-text-muted"
                }`}
              >
                {activeId === link.id && (
                  <span aria-hidden="true" className="nav-active-torch pointer-events-none absolute -inset-4 -z-10" />
                )}
                {link.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
