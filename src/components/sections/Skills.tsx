"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/lib/data/skills";
import { services } from "@/lib/data/services";
import { projects } from "@/lib/data/projects";
import { clientProjects } from "@/lib/data/clientWork";
import type { SkillGroup } from "@/types";
import { useLanguage, type Language } from "@/lib/useLanguage";
import { t, localizeNumber } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";
import { triggerPageGlitch } from "@/components/layout/PageGlitch";
import { triggerMatrixRain } from "@/components/layout/MatrixRain";
import { triggerDebugToggle } from "@/components/layout/DebugOverlay";

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

type HistoryLine = { command: string; output: string[] };
type CommandKey = "whoami" | "help" | "contact" | "clear" | "sudo" | "services" | "tools" | "projects" | "work";

// Scoped to the active site language, not "either language works
// everywhere" — typing whoami while the site is in Bengali mode (or
// পরিচয় while it's in English mode) is a genuine "command not found,"
// same as help only ever printing the current language's command names,
// never both at once. "sudo" is the one command present in both maps
// with the same literal spelling — it isn't a translatable concept, it's
// a fixed reference to a real English command, same reasoning as "rafi"
// in the prompt above never translating either.
const COMMAND_ORDER: CommandKey[] = ["whoami", "services", "tools", "projects", "work", "contact", "clear", "help"];

const COMMAND_NAMES: Record<Language, Record<CommandKey, string>> = {
  en: {
    whoami: "whoami",
    help: "help",
    contact: "contact",
    clear: "clear",
    sudo: "sudo",
    services: "services",
    tools: "tools",
    projects: "projects",
    work: "work",
  },
  bn: {
    whoami: "পরিচয়",
    help: "সাহায্য",
    contact: "যোগাযোগ",
    clear: "মুছুন",
    sudo: "sudo",
    services: "সার্ভিস",
    tools: "টুলস",
    projects: "প্রজেক্ট",
    work: "কাজ",
  },
};

function resolveCommand(normalized: string, language: Language): CommandKey | null {
  const names = COMMAND_NAMES[language];
  const entry = (Object.entries(names) as [CommandKey, string][]).find(
    ([, word]) => word.toLowerCase() === normalized,
  );
  return entry ? entry[0] : null;
}

function buildHelpList(language: Language): string {
  const names = COMMAND_NAMES[language];
  return COMMAND_ORDER.map((key) => names[key]).join(" · ");
}

// Every command's output is built from data already real elsewhere on
// the page (services.ts, projects.ts, clientWork.ts, skillGroups) —
// nothing typed here is a fact invented for the terminal specifically,
// same AGENTS.md rule everything else on this site follows.
function buildOutput(canonical: CommandKey, language: Language): string {
  switch (canonical) {
    case "sudo":
      return t(strings.commandPalette.sudoJoke, language);
    case "whoami":
      return t(strings.skills.terminalWhoami, language);
    case "help":
      return `${t(strings.skills.terminalHelp, language)} ${buildHelpList(language)}`;
    case "contact":
      return "therafiniac@gmail.com · github.com/therafiniac · linkedin.com/in/therafiniac";
    case "services":
      return services.map((s) => t(s.name, language)).join(" · ");
    case "tools":
      return skillGroups
        .flatMap((g) => g.items.filter((i) => i.core).map((i) => t(i.name, language)))
        .join(", ");
    case "projects":
      return projects
        .map((p) => {
          const name = t(p.name, language);
          return p.private ? `${name} (${t(strings.skills.terminalPrivate, language)})` : name;
        })
        .join(" · ");
    case "work":
      return t(strings.skills.terminalWorkCount, language).replace(
        "{count}",
        localizeNumber(clientProjects.length, language),
      );
    default:
      return "";
  }
}

// Three commands deliberately left out of COMMAND_NAMES/buildHelpList —
// "help" only ever lists the 8 documented commands above, these three
// stay pure "you have to already know to try it," same discovery grammar
// as the Konami code or the command palette's own sudo. Dry/technical,
// so English-only like the console log and view-source comment already
// are — not a translatable joke, a fixed reference. Content is
// deliberately generic ("wip", "cold boot") rather than any real project
// fact, so it stays honest under the same rule everything else on this
// site follows even though it's obviously a gag.
const BOOT_LINES = [
  "[    0.000000] rafi-portfolio: cold boot requested",
  "[    0.114000] mounting /dev/curiosity ... ok",
  "[    0.328000] loading stack: next.js, typescript, three.js ... ok",
  "[    0.512000] checking for pulse ... alive",
  "[    0.701000] rafi@portfolio ready.",
];
const HIDDEN_COMMANDS = ["reboot", "matrix", "debug"] as const;
type HiddenCommand = (typeof HIDDEN_COMMANDS)[number];

function isTypingTarget(el: Element | null): boolean {
  if (!el) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (el as HTMLElement).isContentEditable;
}

// Turns the trailing "$" + blinking caret (previously pure decoration —
// nothing happened if you clicked it) into a real, small terminal: type
// a command, get real output. Only a handful of real commands, not a
// full shell — see COMMAND_NAMES above for the full list, including
// "sudo" reusing the exact same joke the command palette's own sudo
// easter egg has, so the three hidden layers on this site (console log,
// palette, this) share one voice instead of three unrelated ones.
function InteractiveTerminal() {
  const language = useLanguage();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryLine[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Guarded on history actually having something in it — this effect
  // also fires on the component's first mount (history is still the
  // initial empty array, but the effect still runs once), and an
  // unconditional scrollIntoView there was yanking the whole page down
  // to this ref's position inside the Stack section on every page
  // load/reveal, before anyone had typed a single command. Only scroll
  // once there's real output to bring into view.
  useEffect(() => {
    if (history.length === 0) return;
    historyEndRef.current?.scrollIntoView({ block: "nearest" });
  }, [history]);

  // "When the section is in focus, just typing on the keyboard should
  // work" — an IntersectionObserver on this component's own root rather
  // than a scroll-position calculation, and a real DOM query for an open
  // dialog rather than tracked state, since three separate modals
  // (command palette, keyboard-shortcuts help, the case-study lightbox)
  // would each need their own "is it open" flag threaded in here
  // otherwise. Only claims a single printable keystroke with no
  // modifier and nothing else already focused — Cmd/Ctrl shortcuts, the
  // vim-style "g" leader sequence, and typing in any other field (the
  // contact form, the command palette's own search box) all pass through
  // untouched.
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    let inView = false;
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    observer.observe(node);

    function handleGlobalKeydown(e: globalThis.KeyboardEvent) {
      if (!inView) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.length !== 1) return;
      if (isTypingTarget(document.activeElement)) return;
      if (document.querySelector('[role="dialog"]')) return;

      // Without this, the character that triggers the focus could land
      // twice — once from this handler's own setInput, once more from
      // the input's native text-insertion for the same keystroke once
      // it's freshly focused (confirmed empirically: typing "help" cold
      // produced "hhelp" without this). preventDefault suppresses that
      // native insertion regardless of exactly when the focus change
      // takes effect relative to it.
      e.preventDefault();
      setInput((prev) => prev + e.key);
      inputRef.current?.focus();
    }

    window.addEventListener("keydown", handleGlobalKeydown);
    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", handleGlobalKeydown);
    };
  }, []);

  // Appends the boot log one line at a time to the *last* history entry
  // rather than all at once — makes "reboot" read as a real stream of
  // output instead of a static block, the same "arrives like real
  // command output" reasoning StackRow's own stagger already follows.
  function pushBootSequence(raw: string) {
    setHistory((h) => [...h, { command: raw, output: [] }]);
    BOOT_LINES.forEach((line, i) => {
      window.setTimeout(() => {
        setHistory((h) => {
          const last = h[h.length - 1];
          if (!last) return h;
          return [...h.slice(0, -1), { ...last, output: [...last.output, line] }];
        });
      }, i * 220);
    });
  }

  function runHiddenCommand(hidden: HiddenCommand, raw: string) {
    if (hidden === "reboot") {
      triggerPageGlitch();
      pushBootSequence(raw);
      return;
    }
    if (hidden === "matrix") {
      triggerMatrixRain();
      setHistory((h) => [...h, { command: raw, output: [t(strings.skills.terminalMatrix, language)] }]);
      return;
    }
    triggerDebugToggle();
    setHistory((h) => [...h, { command: raw, output: [t(strings.skills.terminalDebug, language)] }]);
  }

  function runCommand(raw: string) {
    const normalized = raw.trim().toLowerCase();
    if (!normalized) return;

    if ((HIDDEN_COMMANDS as readonly string[]).includes(normalized)) {
      runHiddenCommand(normalized as HiddenCommand, raw);
      return;
    }

    const canonical = resolveCommand(normalized, language);

    if (canonical === "clear") {
      setHistory([]);
      return;
    }

    const output = canonical
      ? buildOutput(canonical, language)
      : `${t(strings.skills.terminalNotFound, language)}: ${raw} — try "${COMMAND_NAMES[language].help}"`;
    setHistory((h) => [...h, { command: raw, output: [output] }]);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    runCommand(input);
    setInput("");
  }

  return (
    <div ref={rootRef} className="mt-5">
      {history.map((line, i) => (
        <div key={i} className="mt-2">
          <p className="font-mono text-sm text-text-primary sm:text-base">
            <span className="text-accent-secondary">$</span> {line.command}
          </p>
          {line.output.map((line_, j) => (
            <p key={j} className="mt-1 font-mono text-sm text-text-muted sm:text-base">
              {line_}
            </p>
          ))}
        </div>
      ))}
      <p className="mt-2 flex items-center font-mono text-sm text-text-primary sm:text-base">
        <span className="mr-2 text-accent-secondary" aria-hidden="true">
          $
        </span>
        {/* Sized to its own content in monospace "ch" units (one
            character = one ch, exactly, in a monospace font) rather than
            w-full — a form-field-width input with a native focus ring
            was the actual complaint: it read as "typing into a text
            box," not "typing into a terminal line." Native caret hidden
            (caret-transparent) in favor of the block cursor right after
            it — a plain text I-beam blinking there looked like an
            ordinary input, not a terminal prompt. */}
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          aria-label={t(strings.skills.terminalInputLabel, language)}
          style={{ width: `${Math.max(input.length, 1)}ch` }}
          className="terminal-input min-w-[1ch] border-0 bg-transparent p-0 font-mono text-sm text-text-primary caret-transparent outline-none sm:text-base"
        />
        <span className="terminal-caret" aria-hidden="true" />
      </p>
      <div ref={historyEndRef} />
    </div>
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
    <Section id="stack" tag={strings.sectionTags.stack} eyebrow={EYEBROW} title={TITLE} renderHeader={false}>
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

              {/* Clicking anywhere in the panel — the static prompt/stack
                  rows included, not just InteractiveTerminal's own
                  history+input area — focuses the terminal input. A
                  plain DOM query for the target rather than a lifted ref,
                  matching how CommandPalette.tsx already reaches a
                  specific rendered element by a stable selector instead
                  of threading a ref through a parent/child boundary for
                  a single one-off action. Real click/tap focus still
                  matters even with the type-anywhere-while-in-view
                  behavior below — it's what summons a mobile on-screen
                  keyboard, which a raw keydown listener never sees. */}
              <div
                className="cursor-text px-6 py-6 sm:px-9 sm:py-8"
                onClick={() => document.querySelector<HTMLInputElement>(".terminal-input")?.focus()}
              >
                <p className="font-mono text-sm text-text-primary sm:text-base">
                  <span className="text-accent-secondary">$</span> <TypedPrompt text={promptText} />
                </p>

                <div className="mt-5 space-y-5">
                  {skillGroups.map((group, index) => (
                    <StackRow key={group.label.en} group={group} delay={firstRowDelay + index * 0.1} />
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: caretDelay }}
                >
                  <InteractiveTerminal />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
