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

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
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

  return (
    <header className="sticky top-4 z-40 mx-4 md:mx-8 md:top-6">
      <motion.div
        style={{ paddingTop: paddingY, paddingBottom: paddingY }}
        className="glass-panel flex items-center justify-between gap-4 rounded-full px-5"
      >
        <a
          href="#top"
          className="group flex items-center gap-2.5 font-mono text-sm text-text-primary transition-colors hover:text-accent"
        >
          <BrandMark size={30} className="text-xs group-hover:bg-accent/15" />
          RAL
        </a>

        <nav className="hidden gap-1 font-mono text-xs uppercase tracking-[0.15em] sm:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative rounded-full px-3 py-1.5 transition-colors ${
                activeId === link.id
                  ? "text-accent"
                  : "text-text-muted hover:text-accent"
              }`}
              aria-current={activeId === link.id ? "true" : undefined}
            >
              {activeId === link.id && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 -z-10 rounded-full border border-accent/30 bg-accent/10"
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

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass-panel mt-2 flex flex-col gap-1 rounded-2xl p-3 sm:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-colors hover:text-accent ${
                  activeId === link.id ? "text-accent" : "text-text-muted"
                }`}
              >
                {link.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
