"use client";

import { useRef } from "react";
import Link from "next/link";
import { Hourglass } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { triggerPageShake } from "@/components/layout/PageShake";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

const CLICK_WINDOW_MS = 1200;
const CLICKS_TO_TRIGGER = 3;

// Where every not-yet-real link on the site now points instead of a
// dead "#" — the two Coming Soon work tiles, the social links without a
// real profile yet, the side-project tools not live yet (see
// src/lib/placeholderLink.ts, the one place that decides "#" resolves
// here). Same signature-gradient/mono voice as not-found.tsx, Hourglass
// matching ComingSoonTile's own icon so the visual language for
// "in progress" stays the same wherever it shows up. Deliberately not
// linked from the sitemap or any nav — nothing points a visitor or a
// crawler here directly, it's only ever a landing spot.
export default function UnderConstruction() {
  const language = useLanguage();
  const clickTimestamps = useRef<number[]>([]);

  // Same trigger, same effect as not-found.tsx's own "404" click —
  // both pages are the same kind of dead end, so they share one easter
  // egg rather than each getting its own.
  function handleClick() {
    const now = Date.now();
    clickTimestamps.current = [...clickTimestamps.current.filter((t) => now - t < CLICK_WINDOW_MS), now];
    if (clickTimestamps.current.length < CLICKS_TO_TRIGGER) return;

    clickTimestamps.current = [];
    triggerPageShake();
  }

  return (
    <>
      {/* A real 200-status page (unlike not-found.tsx's 404), so it'd be
          crawlable/indexable by default — this is a landing spot for
          not-yet-real links, not real content, so it shouldn't show up
          in search results next to actual pages. React/Next hoist a
          <meta> rendered anywhere in the tree into <head> automatically,
          so this works from a Client Component without needing the
          Server-Component-only `metadata` export. */}
      <meta name="robots" content="noindex, nofollow" />
      <main id="main-content" className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
        <span
          onClick={handleClick}
          className="flex h-20 w-20 cursor-default items-center justify-center rounded-full"
          style={{ backgroundImage: "var(--gradient-signature)" }}
          aria-hidden="true"
        >
          <Hourglass className="h-8 w-8 text-bg" strokeWidth={1.25} />
        </span>
        <h1 className="mt-6 font-mono text-2xl text-text-primary md:text-3xl">
          {t(strings.underConstruction.heading, language)}
        </h1>
        <p className="mt-3 max-w-md text-text-muted">{t(strings.underConstruction.body, language)}</p>
        <Link
          href="/"
          className="relative mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-sm font-medium text-bg transition-opacity hover:opacity-90"
          style={{ backgroundImage: "var(--gradient-signature)" }}
        >
          {t(strings.notFound.cta, language)}
          <span aria-hidden="true">→</span>
        </Link>
      </main>
      <Footer />
    </>
  );
}
