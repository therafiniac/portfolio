"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/lib/data/skills";
import type { SkillGroup } from "@/types";

const EYEBROW = "Capabilities";
const TITLE = "Stack";

// Reads as `$ rafi --stack` output rather than a data file — each group
// is a flag, each entry after it the values that flag expands to. Rows
// stagger in once on scroll, not a loop, so this arrives like real
// command output rather than an ambient marquee.
function StackRow({ group, delay }: { group: SkillGroup; delay: number }) {
  return (
    <motion.div
      className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
    >
      <span className="flex shrink-0 items-center gap-2 font-mono text-sm text-accent-secondary sm:w-40">
        <group.icon className="h-4 w-4" aria-hidden="true" />
        --{group.flag}
      </span>
      <span className="font-mono text-sm leading-relaxed sm:text-base">
        {group.items.map((item, i) => (
          <span key={item.name}>
            <span className={item.core ? "font-semibold text-text-primary" : "text-text-muted"}>
              {item.name}
            </span>
            {i < group.items.length - 1 && <span className="text-text-muted">, </span>}
          </span>
        ))}
      </span>
    </motion.div>
  );
}

export function Skills() {
  return (
    <Section id="stack" index="03" eyebrow={EYEBROW} title={TITLE} renderHeader={false}>
      {/* Same left-copy/right-artifact composition as Hero's own grid —
          the one other place on the page that pairs a text column with a
          single focal object — instead of stacking a left-aligned
          heading above a centered panel, which is what read as two
          unrelated pieces before. */}
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-16">
        <div>
          <SectionHeading eyebrow={EYEBROW} title={TITLE} />
          <p className="mt-4 text-text-muted">
            Four+ years across three roles — from early WordPress builds to the production SaaS
            above.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted">
            <span className="font-semibold text-text-primary">Bold</span> marks what recurs in
            that real work, in Projects and Experience — not a self-rated list.
          </p>
        </div>

        <div className="relative w-full max-w-2xl lg:ml-auto">
          {/* Ambient color behind the panel, not around it — same
              slow-drift aurora-blob motion as Hero, tinted with the
              signature gradient so the glow itself carries the brand
              mark instead of a flat accent wash. */}
          <div
            aria-hidden="true"
            className="aurora-blob pointer-events-none absolute -inset-6 rounded-[2rem] opacity-30 blur-3xl"
            style={{ backgroundImage: "var(--gradient-signature)" }}
          />

          {/* The border is the gradient itself (1px of it showing
              through a 1px inset), not a color-mix ring on top of a flat
              fill — same signature gradient as the glow behind it, plus
              real elevation via the shadow, so this reads as a floating
              panel rather than a flat bordered rectangle. */}
          <div
            className="relative rounded-2xl p-px shadow-[0_25px_60px_-20px_color-mix(in_srgb,var(--shadow-color)_50%,transparent)]"
            style={{ backgroundImage: "var(--gradient-signature)" }}
          >
            <div className="overflow-hidden rounded-2xl bg-surface/95 backdrop-blur">
              <div className="flex items-center gap-1.5 border-b border-line/30 px-4 py-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-line" />
                <span className="h-1.5 w-1.5 rounded-full bg-line" />
                <span className="h-1.5 w-1.5 rounded-full bg-line" />
                <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">
                  rafi@portfolio — zsh
                </span>
              </div>

              <div className="px-6 py-6 sm:px-9 sm:py-8">
                <p className="font-mono text-sm text-text-primary sm:text-base">
                  <span className="text-accent-secondary">$</span> rafi --stack
                </p>

                <div className="mt-5 space-y-5">
                  {skillGroups.map((group, index) => (
                    <StackRow key={group.label} group={group} delay={0.15 + index * 0.1} />
                  ))}
                </div>

                <p className="mt-5 font-mono text-sm text-text-primary sm:text-base">
                  <span className="text-accent-secondary">$</span>{" "}
                  <span className="terminal-caret" aria-hidden="true" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
