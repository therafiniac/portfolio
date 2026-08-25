"use client";

import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/layout/BrandMark";
import { heroStatusLine, fullName } from "@/lib/data/hero";
import { useLanguage } from "@/lib/useLanguage";
import { t, localizeNumber } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

// Deliberately thin — a sign-off, not a second navigation layer (the
// sticky Navbar already covers that, and this is a one-page site with
// nowhere else to link to). The brand mark doubles as the "back to top"
// control, same #top target and hover treatment Navbar's own mark uses,
// so the page reads as a loop rather than needing a separate "Back to
// top" link. "Open to opportunities" is the same status Hero opens with.
export function Footer() {
  const year = new Date().getFullYear();
  const language = useLanguage();
  const openStatus = t(heroStatusLine, language);
  // Same cross-page reasoning as Navbar.tsx's brand-mark link — "#top"
  // only resolves on the homepage itself, so off it this points at the
  // real "/" route instead of a "/#top" hash with nothing to land on
  // until after the navigation completes anyway.
  const isHome = usePathname() === "/";

  return (
    <footer className="border-t border-line/30 px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <a
            href={isHome ? "#top" : "/"}
            aria-label={t(strings.footer.backToTop, language)}
            className="group"
          >
            <BrandMark size={28} className="text-xs transition-colors group-hover:bg-accent/15" />
          </a>
          <span className="font-mono text-xs text-text-muted">
            © {localizeNumber(year, language)} {t(fullName, language)}
          </span>
        </div>

        <p className="flex items-center gap-2 font-mono text-[length:var(--text-1xs)] uppercase tracking-[0.15em] text-text-muted">
          <span
            className="h-1.5 w-1.5 rounded-full bg-status-live motion-safe:animate-pulse"
            aria-hidden="true"
          />
          {openStatus}
        </p>
      </div>
    </footer>
  );
}
