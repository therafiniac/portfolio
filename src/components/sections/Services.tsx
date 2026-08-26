"use client";

import { Pin } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { services, type Service } from "@/lib/data/services";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

// Three pinned notes on a moodboard, not three copies of the same tinted
// card — grounded in the subject (this section is about design work) and
// the one place on the site the palette opens up past blue/maroon into
// the wider Catppuccin decorative hues (see AGENTS.md, and --hue-* in
// globals.css). Different rotation/offset per card keeps them reading as
// scattered objects rather than a disguised grid.
const cardStyle = [
  { hue: "--hue-mauve", rotate: "-rotate-3", offset: "sm:mt-0" },
  { hue: "--hue-sapphire", rotate: "rotate-2", offset: "sm:mt-10" },
  { hue: "--hue-teal", rotate: "-rotate-1", offset: "sm:mt-4" },
];

function ServiceCard({
  icon: Icon,
  name,
  description,
  hue,
  rotate,
  offset,
}: Service & { hue: string; rotate: string; offset: string }) {
  const language = useLanguage();

  return (
    // group lives on this outer, never-transformed wrapper — the pin and
    // its anchor-shadow below are positioned against *this* element, not
    // the paper, so both stay put on the board while the paper (the
    // actual hover:-transformed element further down) swings around them.
    <div className={`group relative w-full max-w-[17rem] shrink-0 ${offset}`}>
      {/* The anchor shadow — a small, tight, dark smudge sitting directly
          on the paper's surface right under the needle tip, separate from
          the pin's own drop-shadow (which shows the head floating a
          little above the surface) and from the paper's big ambient card
          shadow. Without this the pin reads as pasted on top of a flat
          image rather than actually pressed into something. Sits behind
          the pin but in front of the paper, and — like the pin — never
          transforms. */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-0 z-[9] h-2 w-3 -translate-x-1/2 rounded-full blur-[2px]"
        style={{ background: "color-mix(in srgb, black 40%, transparent)" }}
      />

      {/* A real pushpin (lucide's Pin icon — rounded cap over a distinct
          needle, not an abstract gradient circle standing in for one)
          instead of hand-rolled CSS shading. Filled solid in the card's
          hue with a slightly darker stroke for edge definition, sized so
          the needle tip (near the very bottom of the icon's own viewBox)
          lands right at the paper's top edge. Fixed to the board: no
          transition, no transform, ever — only its drop-shadow deepens
          slightly on hover (group-hover, not its own :hover — the mouse
          is over the paper, not this small target) to suggest the paper
          pulling against it, without the pin itself moving a pixel. */}
      <Pin
        aria-hidden="true"
        className="absolute -top-[22px] left-1/2 z-10 h-6 w-6 -translate-x-1/2 drop-shadow-[0_3px_4px_color-mix(in_srgb,var(--shadow-color)_55%,transparent)] transition-[filter] duration-500 group-hover:drop-shadow-[0_5px_7px_color-mix(in_srgb,var(--shadow-color)_70%,transparent)]"
        style={{ color: `color-mix(in srgb, black 25%, var(${hue}))`, fill: `var(${hue})` }}
        strokeWidth={1.5}
      />

      {/* The paper. transform-origin sits exactly at the pin's position
          (top center) — pure rotation only, no translate/lift of any
          kind. A pin holds one fixed point on the sheet; if that point
          is genuinely fixed, the paper can only pivot around it, not
          drift away from it (a translate here would visually pull the
          paper's own pinhole away from the pin graphic sitting above it,
          which breaks the illusion this whole exercise is about). The
          back-ease overshoot (cubic-bezier's middle control points past
          1) is what makes it read as a swing rather than a flat
          animation — it rocks slightly past upright before settling,
          the way a sheet loose on one pin actually behaves. */}
      <div
        className={`relative origin-top rounded-lg border border-line/50 bg-surface p-6 shadow-[0_24px_48px_-28px_color-mix(in_srgb,var(--shadow-color)_65%,transparent)] transition-transform duration-[650ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-0 group-hover:shadow-[0_32px_56px_-24px_color-mix(in_srgb,var(--shadow-color)_68%,transparent)] ${rotate}`}
        style={{
          backgroundImage: `linear-gradient(165deg, color-mix(in srgb, var(${hue}) 16%, var(--surface)), var(--surface) 70%)`,
        }}
      >
        {/* No backdrop-blur here — a blurred child under a transforming
            ancestor forces Chromium to recompute the backdrop every
            frame, which flickers during the transition. */}
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full bg-bg/50"
          style={{ color: `var(${hue})` }}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-base text-text-primary">{t(name, language)}</h3>
        <p className="mt-2 text-sm text-text-muted">{t(description, language)}</p>
      </div>
    </div>
  );
}

export function Services() {
  const language = useLanguage();

  return (
    <Section id="services" tag={strings.sectionTags.services} eyebrow={strings.services.eyebrow} title={strings.services.title}>
      <p className="-mt-6 mb-10 max-w-2xl text-text-muted">{t(strings.services.intro, language)}</p>
      <div className="relative">
        {/* Same recipe as Stack's panel glow (see Skills.tsx) — the
            site's own signature gradient, sitting close behind the box
            (-inset-6, blur-3xl), not the wider decorative palette. */}
        <div
          aria-hidden="true"
          className="aurora-blob pointer-events-none absolute -inset-6 rounded-[2rem] opacity-30 blur-3xl"
          style={{ backgroundImage: "var(--gradient-signature)" }}
        />
        <div
          className="relative flex flex-wrap items-start justify-center gap-8 overflow-hidden rounded-xl border border-line/60 bg-surface px-6 py-16 sm:px-12"
          style={{
            backgroundImage:
              "radial-gradient(circle, color-mix(in srgb, var(--line) 70%, transparent) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        >
          {services.map((service, i) => (
            <ServiceCard key={service.name.en} {...service} {...cardStyle[i]} />
          ))}
        </div>
      </div>
    </Section>
  );
}
