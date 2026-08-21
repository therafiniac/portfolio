import { LayoutGrid } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { services, type Service } from "@/lib/data/services";

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
  return (
    <div
      className={`group relative w-full max-w-[17rem] shrink-0 rounded-lg border border-line/50 bg-surface p-6 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.65)] transition-transform duration-300 ease-out hover:-translate-y-1.5 hover:rotate-0 hover:shadow-[0_32px_60px_-24px_rgba(0,0,0,0.7)] ${rotate} ${offset}`}
      style={{
        backgroundImage: `linear-gradient(165deg, color-mix(in srgb, var(${hue}) 16%, var(--surface)), var(--surface) 70%)`,
      }}
    >
      {/* The thumbtack — sells "pinned to a board" more than the
          rotation alone does. */}
      <span
        aria-hidden="true"
        className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
        style={{ background: `var(${hue})` }}
      />
      {/* No backdrop-blur here — a blurred child under a transforming
          ancestor (this card's hover:-translate-y-1.5/rotate-0) forces
          Chromium to recompute the backdrop every frame, which flickers
          during the transition. */}
      <span
        className="flex h-10 w-10 items-center justify-center rounded-full bg-bg/50"
        style={{ color: `var(${hue})` }}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-base text-text-primary">{name}</h3>
      <p className="mt-2 text-sm text-text-muted">{description}</p>
    </div>
  );
}

export function Services() {
  return (
    <Section id="services" index="02" eyebrow="Additional Services" title="Beyond Development">
      <p className="-mt-6 mb-10 max-w-2xl text-text-muted">
        Design and creative work alongside engineering, for clients who need more than just code.
      </p>
      {/* Same "flush panel, chrome bar on top" grammar as Work's browser
          chrome and Stack's terminal bar — every major panel on the site
          gets one, so this reads as part of the same system even though
          what's under the bar (a dot-grid canvas, not a screenshot or
          command output) is unique to this section. */}
      <div className="overflow-hidden rounded-xl border border-line/60">
        <div className="flex items-center gap-1.5 border-b border-line/40 bg-surface/90 px-4 py-2.5">
          <LayoutGrid className="h-3 w-3 text-text-muted" aria-hidden="true" />
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">
            moodboard — services
          </span>
        </div>
        <div
          className="flex flex-wrap items-start justify-center gap-8 px-6 py-16 sm:px-12"
          style={{
            backgroundImage:
              "radial-gradient(circle, color-mix(in srgb, var(--line) 70%, transparent) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        >
          {services.map((service, i) => (
            <ServiceCard key={service.name} {...service} {...cardStyle[i]} />
          ))}
        </div>
      </div>
    </Section>
  );
}
