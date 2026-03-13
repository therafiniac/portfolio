'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp, Heart, MapPin } from 'lucide-react';
import { siteConfig, navItems, socialLinks } from '@/data/site';
import { cn } from '@/lib/utils';

// ─── Social icon resolver ─────────────────────────────────────
function SocialIcon({ icon }: { icon: string }) {
  if (icon === 'github') return <Github size={16} />;
  if (icon === 'linkedin') return <Linkedin size={16} />;
  if (icon === 'mail') return <Mail size={16} />;
  return null;
}

// ─── Back to top button ───────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 h-11 w-11 flex items-center
            justify-center rounded-xl bg-[var(--brand)] text-white
            shadow-lg shadow-[var(--brand)]/30
            hover:bg-[var(--brand-dark)] hover:shadow-[var(--brand)]/50
            hover:-translate-y-1 transition-all"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── Main component ───────────────────────────────────────────
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <BackToTop />

      <footer className="relative bg-[var(--bg)] border-t border-[var(--border)] overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 bg-grid opacity-20 pointer-events-none"
          aria-hidden
        />

        {/* Top gradient line */}
        <div
          className="absolute top-0 left-0 right-0 h-px
          bg-gradient-to-r from-transparent via-[var(--brand)]/40 to-transparent"
        />

        <div className="container-custom pt-14 pb-8">
          {/* Top row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-10 lg:gap-16 mb-12">
            {/* Brand column */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <span
                  className="relative flex h-10 w-10 items-center justify-center
                  rounded-xl bg-[var(--brand)] text-white font-display font-bold text-lg
                  shadow-lg shadow-[var(--brand)]/30"
                >
                  R
                  <span
                    className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full
                    bg-[var(--accent)] ring-2 ring-[var(--bg)]"
                  />
                </span>
                <div>
                  <p className="font-display font-bold text-[var(--text)] leading-tight">
                    {siteConfig.name}
                  </p>
                  <p className="text-xs font-mono text-[var(--text-muted)]">
                    {siteConfig.title}
                  </p>
                </div>
              </div>

              <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xs">
                Building fast, accessible, and visually polished web experiences
                — from pixel-perfect UIs to robust backend APIs.
              </p>

              <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)]">
                <MapPin size={12} className="text-[var(--brand)]" />
                {siteConfig.location}
              </div>

              <div className="flex items-center gap-2">
                {socialLinks.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="h-9 w-9 flex items-center justify-center rounded-lg
                      border border-[var(--border)] text-[var(--text-muted)]
                      hover:border-[var(--brand)]/50 hover:text-[var(--brand)]
                      hover:bg-[var(--brand)]/5 transition-all"
                  >
                    <SocialIcon icon={s.icon} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Navigation column */}
            <div className="flex flex-col gap-4">
              <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">
                Navigation
              </p>
              <nav className="flex flex-col gap-2.5">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--brand)]
                      hover-underline transition-colors w-fit"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact column */}
            <div className="flex flex-col gap-4">
              <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">
                Get in touch
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 text-sm text-[var(--text-muted)]
                    hover:text-[var(--brand)] transition-colors w-fit"
                >
                  <Mail
                    size={13}
                    className="text-[var(--brand)] flex-shrink-0"
                  />
                  <span className="hover-underline">{siteConfig.email}</span>
                </a>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-2 text-sm text-[var(--text-muted)]
                    hover:text-[var(--brand)] transition-colors w-fit"
                >
                  <span className="text-[var(--brand)] flex-shrink-0 text-xs">
                    📞
                  </span>
                  <span className="hover-underline">{siteConfig.phone}</span>
                </a>

                {siteConfig.availability && (
                  <div
                    className="flex items-center gap-2 mt-1 px-3 py-2 rounded-lg
                    bg-[var(--accent)]/10 border border-[var(--accent)]/20 w-fit"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                    <span className="text-xs font-mono text-[var(--accent)]">
                      Open to work
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent mb-6" />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs font-mono text-[var(--text-muted)] text-center sm:text-left">
              © {currentYear}{' '}
              <span className="text-[var(--text)]">{siteConfig.name}</span>. All
              rights reserved.
            </p>

            <p className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5">
              Crafted with
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                }}
              >
                <Heart size={11} className="text-red-400 fill-red-400" />
              </motion.span>
              by <span className="text-gradient font-medium">Rafi</span>
            </p>

            {/* <p className="text-xs font-mono text-[var(--text-muted)]">
              Built with{' '}
              <span
                className={cn(
                  'text-[var(--text)] font-medium',
                  'hover:text-[var(--brand)] transition-colors cursor-default',
                )}
              >
                Next.js
              </span>
              {' & '}
              <span
                className={cn(
                  'text-[var(--text)] font-medium',
                  'hover:text-[var(--brand)] transition-colors cursor-default',
                )}
              >
                Tailwind CSS
              </span>
            </p> */}
          </div>
        </div>
      </footer>
    </>
  );
}
