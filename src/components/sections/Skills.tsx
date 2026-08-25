"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/lib/data/skills";
import type { SkillGroup } from "@/types";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

const EYEBROW = strings.skills.eyebrow;
const TITLE = strings.skills.title;

// Monospace, so a character count converts directly to a "ch" width —
// the classic CSS typewriter (overflow-hidden + animated width) works
// cleanly here without needing to split the string into per-letter spans.
// Everything below it (StackRow, the trailing caret) was already staged
// in via whileInView while this line just appeared instantly — the one
// piece of the "real terminal output" illusion that wasn't actually
// animating.
function TypedPrompt({ text }: { text: string }) {
  const duration = text.length * 0.045;

  return (
    <motion.span
      className="inline-block overflow-hidden whitespace-nowrap align-bottom"
      initial={{ width: "0ch" }}
      whileInView={{ width: `${text.length}ch` }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration, ease: "linear" }}
    >
      {text}
    </motion.span>
  );
}

// Reads as `$ rafi --stack` output rather than a data file — each group
// is a flag, each entry after it the values that flag expands to. Rows
// stagger in once on scroll, not a loop, so this arrives like real
// command output rather than an ambient marquee.
function StackRow({ group, delay }: { group: SkillGroup; delay: number }) {
  const language = useLanguage();

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
        --{t(group.flag, language)}
      </span>
      <span className="font-mono text-sm leading-relaxed sm:text-base">
        {group.items.map((item, i) => (
          <span key={item.name.en}>
            <span className={item.core ? "font-semibold text-text-primary" : "text-text-muted"}>
              {t(item.name, language)}
            </span>
            {i < group.items.length - 1 && <span className="text-text-muted">, </span>}
          </span>
        ))}
      </span>
    </motion.div>
  );
}

export function Skills() {
  const language = useLanguage();
  const promptText = t(strings.skills.prompt, language);
  // Rows now wait for the prompt to actually finish "typing" (see
  // TypedPrompt) before staggering in, instead of starting at a fixed
  // 0.15s regardless of how long the command itself took to appear —
  // Bengali's transliterated prompt is a different length than the
  // English one, so this has to be computed from the real string, not
  // a constant. CARET_DELAY carries the same one-index-further-plus-
  // fade-duration reasoning as before, just anchored to this new start
  // point.
  const firstRowDelay = promptText.length * 0.045 + 0.2;
  const caretDelay = firstRowDelay + skillGroups.length * 0.1 + 0.4;

  return (
    <Section id="stack" tag="STACK" eyebrow={EYEBROW} title={TITLE} renderHeader={false}>
      {/* Same left-copy/right-artifact composition as Hero's own grid —
          the one other place on the page that pairs a text column with a
          single focal object — instead of stacking a left-aligned
          heading above a centered panel, which is what read as two
          unrelated pieces before. */}
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-16">
        <div>
          <SectionHeading eyebrow={EYEBROW} title={TITLE} />
          <p className="mt-4 text-text-muted">{t(strings.skills.intro, language)}</p>
          <p className="mt-4 font-mono text-[length:var(--text-1xs)] uppercase tracking-[0.1em] text-text-muted">
            <span className="font-semibold text-text-primary">{t(strings.skills.boldWord, language)}</span>{" "}
            {t(strings.skills.boldNote, language)}
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
            className="group relative rounded-2xl p-px shadow-[0_25px_60px_-20px_color-mix(in_srgb,var(--shadow-color)_50%,transparent)]"
            style={{ backgroundImage: "var(--gradient-signature)" }}
          >
            <div className="overflow-hidden rounded-2xl bg-surface/95 backdrop-blur">
              {/* Same traffic-light-dots-light-up-on-hover treatment as
                  ClientWork's BrowserChrome — one shared "this terminal
                  chrome is alive" motif instead of two hand-rolled ones,
                  triggered off the whole card's hover (`group` above),
                  not just this title bar. */}
              <div className="flex items-center gap-1.5 border-b border-line/30 px-4 py-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-line transition-colors duration-300 group-hover:bg-accent" />
                <span className="h-1.5 w-1.5 rounded-full bg-line transition-colors delay-75 duration-300 group-hover:bg-[color-mix(in_srgb,var(--accent),var(--accent-secondary))]" />
                <span className="h-1.5 w-1.5 rounded-full bg-line transition-colors delay-150 duration-300 group-hover:bg-accent-secondary" />
                <span className="ml-2 font-mono text-[length:var(--text-2xs)] uppercase tracking-[0.1em] text-text-muted">
                  {t(strings.skills.terminalTitle, language)}
                </span>
              </div>

              <div className="px-6 py-6 sm:px-9 sm:py-8">
                <p className="font-mono text-sm text-text-primary sm:text-base">
                  <span className="text-accent-secondary">$</span> <TypedPrompt text={promptText} />
                </p>

                <div className="mt-5 space-y-5">
                  {skillGroups.map((group, index) => (
                    <StackRow key={group.label.en} group={group} delay={firstRowDelay + index * 0.1} />
                  ))}
                </div>

                <motion.p
                  className="mt-5 font-mono text-sm text-text-primary sm:text-base"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: caretDelay }}
                >
                  <span className="text-accent-secondary">$</span>{" "}
                  <span className="terminal-caret" aria-hidden="true" />
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
