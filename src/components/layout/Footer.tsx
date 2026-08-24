"use client";

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

  return (
    <footer className="border-t border-line/30 px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <a href="#top" aria-label={t(strings.footer.backToTop, language)} className="group">
            <BrandMark size={28} className="text-xs transition-colors group-hover:bg-accent/15" />
          </a>
          <span className="font-mono text-xs text-text-muted">
            © {localizeNumber(year, language)} {t(fullName, language)}
          </span>
          {/* Same "// TAG" code-comment motif as every section's corner
              watermark (see Section.tsx) — recurs here as a quiet sign-off
              instead of living in only one place on the page. */}
          <span aria-hidden="true" className="hidden font-mono text-xs text-text-muted/50 sm:inline">
            {"// EOF"}
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
