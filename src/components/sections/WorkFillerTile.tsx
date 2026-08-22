"use client";

import { ArrowUpRight, Send } from "lucide-react";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

// The CTA's decoration: one big icon bleeding off the corner.
function IconBleed() {
  return (
    <Send
      className="pointer-events-none absolute -bottom-8 -right-8 h-36 w-36 text-bg/15"
      strokeWidth={1.25}
      aria-hidden="true"
    />
  );
}

function TileBadge() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-bg/20 text-bg backdrop-blur">
      <Send className="h-5 w-5" aria-hidden="true" />
    </span>
  );
}

// WorkCard (ClientWork.tsx) has no fixed height of its own — its chrome
// bar + fixed-aspect screenshot + fixed-height text stack determine each
// row's height naturally. This tile deliberately has no height of its own
// either; it relies on CSS Grid's default `align-items: stretch` to grow
// to match whatever the real project cards in its row end up being, so it
// never needs to duplicate that math.
//
// Only one filler ever gets built (see buildGridItems in ClientWork.tsx) —
// a "schematic" variant with no href/text used to live here too, for a
// grid-item count that never lands on an even number of rows, but that
// case has never actually come up and the variant sat unreachable. Add it
// back if that scenario ever does.
function TileFrame({ href, children }: { href: string; children: React.ReactNode }) {
  const className =
    "group relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xl p-6 text-center shadow-lg shadow-black/10 transition-[filter] duration-300 hover:brightness-110";
  const style = { backgroundImage: "var(--gradient-signature)" };

  return (
    <a href={href} className={className} style={style}>
      <IconBleed />
      <div className="relative flex flex-col items-center gap-2">{children}</div>
    </a>
  );
}

export function WorkFillerTile() {
  const language = useLanguage();

  return (
    <TileFrame href="#contact">
      <TileBadge />
      <span className="font-mono text-xl text-bg">{t(strings.workFiller.heading, language)}</span>
      <span className="flex items-center gap-1 font-mono text-xs uppercase tracking-[0.2em] text-bg/80 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
        {t(strings.workFiller.cta, language)}
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </TileFrame>
  );
}
