'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X, Download } from 'lucide-react';
import { navItems, siteConfig } from '@/data/site';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { cn } from '@/lib/utils';

const sectionIds = navItems.map((i) => i.href.replace('#', '')).filter(Boolean);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const activeId = useScrollSpy(sectionIds, 80);

  // ── mount guard for next-themes ──────────────────────────────
  useEffect(() => setMounted(true), []);

  // ── scroll detection ─────────────────────────────────────────
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // ── lock body scroll when mobile menu open ───────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // ── close menu on resize to desktop ─────────────────────────
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <>
      {/* ── Main navbar ─────────────────────────────────────── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)] shadow-sm'
            : 'bg-transparent',
        )}
        style={{ height: 'var(--nav-height)' }}
      >
        <div className="container-custom h-full flex items-center justify-between">
          {/* ── Logo ──────────────────────────────────────────── */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="relative z-10 flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand)] text-white font-display font-bold text-base shadow-lg shadow-[var(--brand)]/30 group-hover:shadow-[var(--brand)]/50 transition-shadow">
              R
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[var(--accent)] ring-2 ring-[var(--bg)]" />
            </span>
            <span className="font-display font-bold text-[var(--text)] text-sm sm:text-base leading-tight">
              Rafi<span className="text-gradient">.</span>
            </span>
          </motion.a>

          {/* ── Desktop Nav ───────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const id = item.href.replace('#', '');
              const isActive =
                activeId === id || (id === 'home' && activeId === '');
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={cn(
                    'relative px-4 py-2 text-sm font-body font-medium rounded-lg transition-colors duration-200',
                    isActive
                      ? 'text-[var(--brand)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-[var(--brand)]/10"
                      transition={{
                        type: 'spring',
                        bounce: 0.2,
                        duration: 0.4,
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* ── Desktop Right Actions ─────────────────────────── */}
          <div className="hidden md:flex items-center gap-2">
            {/* Availability badge */}
            {siteConfig.availability && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                Open to work
              </motion.span>
            )}

            {/* Theme toggle */}
            {mounted && (
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-9 w-9 flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--brand)] hover:border-[var(--brand)]/40 transition-colors"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            )}

            {/* Resume CTA */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-[var(--brand)] text-white shadow-lg shadow-[var(--brand)]/20 hover:bg-[var(--brand-dark)] hover:shadow-[var(--brand)]/30 transition-all"
            >
              <Download size={14} />
              Resume
            </motion.a>
          </div>

          {/* ── Mobile Right Actions ──────────────────────────── */}
          <div className="flex md:hidden items-center gap-2">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="h-9 w-9 flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)]"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="h-9 w-9 flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {menuOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Menu Overlay ─────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(320px,85vw)] bg-[var(--bg-card)] border-l border-[var(--border)] flex flex-col md:hidden shadow-2xl"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
                <span className="font-display font-bold text-[var(--text)]">
                  Navigation
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="h-8 w-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-secondary)] transition-colors"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1">
                {navItems.map((item, i) => {
                  const id = item.href.replace('#', '');
                  const isActive =
                    activeId === id || (id === 'home' && activeId === '');
                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.1 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20'
                          : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-secondary)]',
                      )}
                    >
                      <span
                        className={cn(
                          'h-1.5 w-1.5 rounded-full flex-shrink-0',
                          isActive ? 'bg-[var(--brand)]' : 'bg-[var(--border)]',
                        )}
                      />
                      {item.label}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Drawer footer */}
              <div className="px-4 py-6 border-t border-[var(--border)] flex flex-col gap-3">
                {siteConfig.availability && (
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20">
                    <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse flex-shrink-0" />
                    <span className="text-xs font-mono text-[var(--accent)]">
                      Available for opportunities
                    </span>
                  </div>
                )}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[var(--brand)] text-white text-sm font-medium shadow-lg shadow-[var(--brand)]/20 hover:bg-[var(--brand-dark)] transition-colors"
                >
                  <Download size={15} />
                  Download Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
