"use client";

import { ArrowUpRight, Send } from "lucide-react";
import type { Localized } from "@/types";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";

// The one big background icon — animated rather than static now: a slow
// ambient pulse always running (motion-safe:animate-pulse, the same
// utility the status dots use elsewhere) plus a small drift-toward-the-
// corner + rotation on hover, like it's about to fly off. Everything
// here is a transform/opacity change on an element that's already
// `position: absolute` and `pointer-events: none` — nothing here can
// ever affect this tile's own box size or push a sibling tile, which is
// the actual requirement: a richer hover that still can't cause layout
// shift, guaranteed by only ever animating an out-of-flow element.
function IconBleed() {
  return (
    <Send
      className="pointer-events-none absolute -bottom-8 -right-8 h-36 w-36 text-bg/15 transition-transform duration-500 ease-out motion-safe:animate-pulse group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-6"
      strokeWidth={1.25}
      aria-hidden="true"
    />
  );
}

// Two concentric rings "ping" outward from the badge on hover —
// Tailwind's own built-in animate-ping (scale to ~2x, fade to 0, loop),
// not a new custom keyframe, staggered half a second apart so they read
// as a continuous radar/broadcast pulse rather than two rings moving in
// lockstep. Purely decorative, absolutely-positioned rings inside a
// relatively-positioned badge — same "can't affect layout" reasoning as
// IconBleed above, and small enough (badge is 2.5rem, rings grow to
// ~2x that) to stay well inside the tile's own overflow-hidden bounds
// regardless of where the badge sits in it.
function TileBadge() {
  return (
    <span className="relative flex h-10 w-10 items-center justify-center">
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-bg/40 opacity-0 motion-safe:group-hover:animate-ping motion-safe:group-hover:opacity-100"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-bg/40 opacity-0 [animation-delay:0.5s] motion-safe:group-hover:animate-ping motion-safe:group-hover:opacity-100"
      />
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-bg/20 text-bg backdrop-blur">
        <Send className="h-5 w-5" aria-hidden="true" />
      </span>
    </span>
  );
}

type ContactCtaTileProps = {
  heading: Localized;
  cta: Localized;
  className?: string;
};

// The site's one repeated CTA pattern — ClientWork's WorkFillerTile and
// HowIBuild's own closing tile both render this now instead of each
// keeping a near-identical copy (same gradient fill, same icon bleed,
// same badge, same "come talk to me" framing) — HowIBuild.tsx's own
// comment already called out the duplication before this existed.
// Deliberately NOT the button-hover vocabulary (CtaVoltage/cta-shine/
// cta-spotlight, all built for Hero's/Contact's actual pill-shaped
// <button>/<a> CTAs) — reusing button chrome on a full tile read as the
// wrong kind of hover for the wrong kind of element. hover:brightness-110
// (unchanged) plus the two animated decorations above are the "improve
// this hover" answer instead.
export function ContactCtaTile({ heading, cta, className }: ContactCtaTileProps) {
  const language = useLanguage();

  return (
    <a
      href="#contact"
      className={`group relative flex flex-col items-center justify-center gap-2 overflow-hidden p-6 text-center shadow-lg shadow-black/10 transition-[filter] duration-300 hover:brightness-110 ${className ?? ""}`}
      style={{ backgroundImage: "var(--gradient-signature)" }}
    >
      <IconBleed />
      <div className="relative flex flex-col items-center gap-2">
        <TileBadge />
        <span className="font-mono text-xl text-bg">{t(heading, language)}</span>
        <span className="flex items-center gap-1 font-mono text-xs uppercase tracking-[0.2em] text-bg/80 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
          {t(cta, language)}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}
