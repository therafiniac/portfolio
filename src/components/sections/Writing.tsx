"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { FacebookIcon } from "@/components/icons/BrandIcons";
import { Section } from "@/components/layout/Section";
import { TileGlow } from "@/components/ui/TileGlow";
import { writingPosts } from "@/lib/data/writing";
import type { IconComponent, WritingPost } from "@/types";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

// Keyed on WritingPost.platform (a plain proper noun, see types.ts) —
// grows as posts move onto other platforms; Facebook is the only one
// with real entries today.
const PLATFORM_ICON: Record<string, IconComponent> = {
  Facebook: FacebookIcon,
};

// Roughly matches the card's own min-width floor + the rail's gap-6
// below (see WritingCard) — an arrow press advances about one card,
// though the exact card width now varies with however many are stretch-
// filling the row, so this is a reasonable nudge, not a pixel-exact one.
const CARD_STEP_PX = 344;

// flex-1 + min-w-* (not a fixed width) is what makes this section fill
// the full container width instead of leaving dead space when there are
// only a few posts: with room to spare, every card grows equally to
// share it (same as a grid's 1fr columns would); once enough cards are
// added that they'd have to shrink past their min-width to keep
// fitting, the browser can't shrink them further and the row genuinely
// overflows — which is exactly the signal Writing()'s ResizeObserver
// below is watching for to turn on the scroll rail. One CSS rule
// handles the "fill, then scroll" switch — no JS mode-toggle needed.
//
// No dedicated bottom slot for the arrow — that read as unnecessary
// blank space at rest. Inline next to the title instead, same reveal
// pattern ClientWork's WorkCard already uses (plain on mobile, since
// there's no persistent hover there; hidden until hover on desktop).
//
// The ruled-paper background lines are this section's one decorative
// flourish beyond TileGlow — the icon badge (below) uses the same
// contained circular-badge treatment Education's entries already use in
// Experience.tsx, a real bounded element rather than a sprawling
// background layer competing with the lines for the same corner.
function WritingCard({ post }: { post: WritingPost }) {
  const language = useLanguage();
  const PlatformIcon = PLATFORM_ICON[post.platform];

  return (
    <a
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover-glow-panel hover-gradient-border group relative flex min-w-72 flex-1 snap-start flex-col gap-5 overflow-hidden rounded-2xl border border-line/60 p-8 sm:min-w-80"
    >
      <TileGlow intensity={14} spread={70} originX={12} originY={85} />
      {/* No background texture layer — both a ruled-lines and a dot-grid
          version were tried here and neither held up once seen. TileGlow
          plus the quotation mark below already carry the card's depth;
          this space stays plain rather than forcing a third layer to
          justify itself. */}
      {/* The top-right corner glyph, separate from the topic-icon badge
          below — a giant version of that same topic icon was tried here
          first, but its linework fighting the ruled lines for the same
          space read as noise. A single translucent quotation mark is
          calm enough to sit on top of the lines instead of competing
          with them, and it's the one combination of the two that
          actually held up once seen. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-1 -top-8 select-none font-mono text-[7rem] leading-none text-accent-secondary/10"
      >
        &ldquo;
      </span>
      <div className="relative flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line/60 bg-surface text-accent-secondary transition-colors duration-300 group-hover:border-accent-secondary/60">
          <post.icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <div className="flex flex-1 flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <span className="flex items-center gap-1.5 font-mono text-[length:var(--text-3xs)] uppercase tracking-[0.1em] text-text-muted">
            {PlatformIcon && <PlatformIcon className="h-3 w-3" aria-hidden="true" />}
            {post.platform}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[length:var(--text-3xs)] text-text-muted">{t(post.date, language)}</span>
            <span className="rounded-full border border-line/60 px-1.5 py-0.5 font-mono text-[length:var(--text-3xs)] uppercase text-text-muted">
              {post.language}
            </span>
          </div>
        </div>
      </div>
      <div className="relative">
        {/* Matches WorkCard's own title+arrow pattern exactly (ClientWork.tsx)
            — the closest sibling to this card: a linked card with an inline
            arrow reveal. Plain body type (Inter), not font-mono — a card
            title in a grid isn't a standalone headline the way Experience's
            per-entry role is (see that file's own comment on when mono
            applies), it's the same weight as every other card title on
            the site. */}
        <h3 className="mt-1 flex items-center gap-1 text-base text-text-primary">
          {t(post.title, language)}
          <ArrowUpRight
            className="h-3.5 w-3.5 shrink-0 translate-x-0 opacity-100 transition-all duration-200 md:-translate-x-1 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100"
            aria-hidden="true"
          />
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-text-muted">{t(post.excerpt, language)}</p>
      </div>
    </a>
  );
}

// A single-row rail, not a wrapping grid — cards stay one row tall and
// only start scrolling once they actually stop fitting the available
// width, tracked via ResizeObserver rather than assumed from the current
// post count, so this stays correct as writing.ts grows (or the
// viewport resizes) without needing a hardcoded "N posts = show
// arrows" threshold. With today's 3 posts there's no overflow yet, so
// no arrows render — they show up the moment a 4th+ post makes the
// row wider than its container.
export function Writing() {
  const language = useLanguage();
  const railRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    function checkOverflow() {
      if (!rail) return;
      setHasOverflow(rail.scrollWidth > rail.clientWidth + 1);
    }

    checkOverflow();
    const observer = new ResizeObserver(checkOverflow);
    observer.observe(rail);
    return () => observer.disconnect();
  }, []);

  function scrollByCard(direction: 1 | -1) {
    railRef.current?.scrollBy({ left: direction * CARD_STEP_PX, behavior: "smooth" });
  }

  return (
    <Section id="writing" tag={strings.sectionTags.writing} eyebrow={strings.writing.eyebrow} title={strings.writing.title}>
      <div className="-mt-6 mb-6 flex items-end justify-between gap-4">
        <p className="max-w-2xl text-text-muted">{t(strings.writing.intro, language)}</p>
        {hasOverflow && (
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label={t(strings.writing.prev, language)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line/60 text-text-muted transition-colors duration-300 hover:border-accent/60 hover:text-accent"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label={t(strings.writing.next, language)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line/60 text-text-muted transition-colors duration-300 hover:border-accent/60 hover:text-accent"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      <div ref={railRef} className="scroll-rail flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2">
        {writingPosts.map((post) => (
          <WritingCard key={post.href} post={post} />
        ))}
      </div>
    </Section>
  );
}
