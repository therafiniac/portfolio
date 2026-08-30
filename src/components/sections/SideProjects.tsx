"use client";

import { useRef, useState, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { sideProjects } from "@/lib/data/sideProjects";
import { resolvePlaceholderHref } from "@/lib/placeholderLink";
import type { SideProject } from "@/types";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

const CLICK_WINDOW_MS = 1200;
const CLICKS_TO_TRIGGER = 5;
const LOG_VISIBLE_MS = 3000;

// Deliberately silly, generic commit messages — never a real metric,
// user count, or claim about the tool itself (see AGENTS.md: every
// project claim must be interview-defensible). This is a joke overlay
// that reads as obviously fake, not a second, dishonest description of
// the project sitting next to the real one.
const FAKE_GIT_LOG = [
  "8f3a1c2 wip: pretend this file has more than 40 lines",
  "a9e04b1 fix: nothing was actually broken",
  "021bb7f chore: add more coffee",
];

// Deliberately not another bordered-card grid — this is the one section
// on the page still using the plain "eyebrow + title + intro + grid"
// template every other section had already broken out of one way or
// another (ClientWork's stat/CTA/coming-soon tiles, Services' pinned
// moodboard, HowIBuild's wide/narrow bento). A big-type link list fits
// this content specifically: only two entries, deliberately kept short
// (see sideProjects.ts), so the name itself can carry the visual weight
// instead of being shrunk into a card alongside a screenshot it doesn't
// have. The name's own hover motion (scale/color/icon-rotate) is the
// section's kinetic-typography moment — no separate decoration needed.
function SideProjectRow({ project }: { project: SideProject }) {
  const language = useLanguage();
  // "#" is the honest placeholder for a not-yet-real link (see
  // sideProjects.ts) — the live-status dot only lights up once a real URL
  // replaces it, same signal Projects.tsx's tabs use for `liveUrl`.
  // resolvePlaceholderHref sends a click there to /under-construction
  // instead of a dead "#".
  const isLive = project.href.startsWith("http");
  const [gitLog, setGitLog] = useState(false);
  const clickTimestamps = useRef<number[]>([]);

  // Five clicks on the icon specifically — never the row itself, so the
  // link's real navigation (even to a placeholder) never gets a debounce
  // delay bolted on just to detect a click streak. preventDefault/
  // stopPropagation run on every icon click unconditionally, so poking
  // the icon never navigates at all, only counts.
  function handleIconClick(e: MouseEvent<SVGSVGElement>) {
    e.preventDefault();
    e.stopPropagation();
    const now = Date.now();
    clickTimestamps.current = [...clickTimestamps.current.filter((t) => now - t < CLICK_WINDOW_MS), now];
    if (clickTimestamps.current.length < CLICKS_TO_TRIGGER) return;

    clickTimestamps.current = [];
    setGitLog(true);
    window.setTimeout(() => setGitLog(false), LOG_VISIBLE_MS);
  }

  return (
    <a
      href={resolvePlaceholderHref(project.href)}
      target={isLive ? "_blank" : undefined}
      rel={isLive ? "noopener noreferrer" : undefined}
      className="group flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
    >
      <div className="flex items-center gap-4 sm:gap-6">
        <span className="relative">
          <project.icon
            onClick={handleIconClick}
            className="h-6 w-6 shrink-0 cursor-default text-accent-secondary transition-transform duration-300 ease-out group-hover:-rotate-12 group-hover:scale-110"
            strokeWidth={1.25}
            aria-hidden="true"
          />
          <AnimatePresence>
            {gitLog && (
              <motion.div
                key="gitlog"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="nav-glass glass-popover left-0 top-full z-20 mt-2 w-72 rounded-lg p-3 font-mono text-[length:var(--text-2xs)] text-text-muted"
              >
                {FAKE_GIT_LOG.map((line) => (
                  <p key={line} className="truncate">
                    {line}
                  </p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </span>
        {/* First pass (md:text-3xl) still read as "the same size" as
            SectionHeading's own h2 (text-3xl md:text-4xl) at a glance —
            same typeface, same color, only a 6px gap at md doesn't
            register as a real hierarchy difference in practice, even
            though it's technically smaller. Dropped a full step further
            so the gap is unambiguous at every breakpoint, not just on a
            ruler. */}
        <h3 className="font-mono text-lg text-text-primary transition-colors duration-300 group-hover:text-accent sm:text-xl md:text-2xl">
          {t(project.name, language)}
        </h3>
        {isLive && (
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-status-live motion-safe:animate-pulse"
            aria-hidden="true"
          />
        )}
      </div>
      <div className="flex items-center gap-3 pl-10 sm:pl-0">
        <p className="max-w-xs text-sm text-text-muted">{t(project.description, language)}</p>
        <ArrowUpRight
          className="h-5 w-5 shrink-0 translate-x-0 text-text-muted opacity-100 transition-all duration-300 ease-out md:-translate-x-1 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:text-accent md:group-hover:opacity-100"
          aria-hidden="true"
        />
      </div>
    </a>
  );
}

export function SideProjects() {
  const language = useLanguage();

  return (
    <Section id="side-projects" tag={strings.sectionTags.builds} eyebrow={strings.sideProjects.eyebrow} title={strings.sideProjects.title}>
      <p className="-mt-6 mb-2 max-w-2xl text-text-muted">{t(strings.sideProjects.intro, language)}</p>
      {/* divide-y, not border-b per row — a divider between each row
          without also framing the whole list top and bottom. Those outer
          lines (tried first) sat too close to the intro paragraph above
          and the next section below, both of which already have their
          own spacing doing that job. */}
      <div className="flex flex-col divide-y divide-line/50">
        {sideProjects.map((project) => (
          <SideProjectRow key={project.name.en} project={project} />
        ))}
      </div>
    </Section>
  );
}
