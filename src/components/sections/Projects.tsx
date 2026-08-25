"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { TechChip } from "@/components/ui/TechChip";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { FlowSteps } from "@/components/sections/FlowSteps";
import { projects } from "@/lib/data/projects";
import type { IconComponent, Project } from "@/types";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

function LinkBadge({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: IconComponent;
  children: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-1.5 rounded-full border border-line/60 px-3 py-1 font-mono text-[length:var(--text-2xs)] uppercase tracking-[0.15em] text-accent transition-colors duration-200 hover:border-accent/60 hover:bg-accent/10"
    >
      <Icon className="h-3 w-3" aria-hidden="true" />
      {children}
    </a>
  );
}

// Below md, the tab strip (nothing to click to reveal — every panel is
// off-screen until scrolled to) becomes a stacked accordion instead: one
// project open at a time, same as the desktop's "one panel visible" rule,
// just triggered by tapping the project's own name instead of a separate
// tab row above the content.
function ProjectAccordionItem({
  project,
  open,
  onToggle,
}: {
  project: Project;
  open: boolean;
  onToggle: () => void;
}) {
  const language = useLanguage();

  return (
    <div className="border-b border-line/40">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center gap-2 py-4 text-left font-mono text-sm text-text-primary"
      >
        {project.liveUrl && (
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-status-live motion-safe:animate-pulse"
            aria-hidden="true"
          />
        )}
        <span className="flex-1">{t(project.name, language)}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6">
              {project.private && (
                <span className="mb-3 inline-block rounded-full border border-line/60 px-3 py-1 font-mono text-[length:var(--text-2xs)] uppercase tracking-[0.15em] text-text-muted">
                  {t(strings.projects.privateRepo, language)}
                </span>
              )}

              <div className="flex flex-wrap gap-2">
                {project.liveUrl && (
                  <LinkBadge href={project.liveUrl} icon={ExternalLink}>
                    {t(strings.projects.liveDemo, language)}
                  </LinkBadge>
                )}
                {project.githubUrl && (
                  <LinkBadge href={project.githubUrl} icon={GithubIcon}>
                    {t(strings.projects.github, language)}
                  </LinkBadge>
                )}
              </div>

              <p className="mt-3 text-text-muted">{t(project.tagline, language)}</p>

              <div className="mt-6 shrink-0">
                <span
                  className="block bg-clip-text font-mono text-5xl font-semibold leading-none text-transparent"
                  style={{ backgroundImage: "var(--gradient-signature)" }}
                >
                  {project.stat.value}
                </span>
                <span className="mt-2 block max-w-[18ch] font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
                  {t(project.stat.label, language)}
                </span>
              </div>

              <FieldLabel className="mt-6">{t(strings.projects.theApproach, language)}</FieldLabel>
              <div className="mt-2 rounded-lg border border-line/40 bg-surface/60 px-4 py-3">
                <p className="flex gap-3 font-mono text-sm text-text-primary">
                  <span className="shrink-0 text-accent-secondary" aria-hidden="true">
                    {"//"}
                  </span>
                  <span>{t(project.highlight, language)}</span>
                </p>
              </div>

              <FieldLabel className="mt-6">{t(strings.projects.mechanism, language)}</FieldLabel>
              <FlowSteps steps={project.flow} />

              <FieldLabel className="mt-6">{t(strings.projects.stack, language)}</FieldLabel>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <TechChip key={tech}>{tech}</TechChip>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Tabs, not stacked cards — deliberately the opposite structure from every
// other grid/panel section on the site (no chrome bar, no dots, no
// bordered card). One project's full deep-dive shows at a time, so the
// content pane's height stays constant regardless of how many projects
// exist — adding a third or fourth means one more tab, not more scroll.
export function Projects() {
  const [active, setActive] = useState(0);
  // Independent from the desktop tab's `active` — an accordion can have
  // nothing open (collapsing the currently-open panel back down), which a
  // tab bar never allows, so it needs its own nullable state rather than
  // reusing `active` directly.
  const [mobileOpen, setMobileOpen] = useState<number | null>(0);
  const project = projects[active];
  const language = useLanguage();

  return (
    <Section id="built" tag="BUILT" eyebrow={strings.projects.eyebrow} title={strings.projects.title}>
      <p className="-mt-6 mb-10 max-w-2xl text-text-muted">{t(strings.projects.intro, language)}</p>

      {/* Below md this tab+panel structure gives way entirely to the
          accordion below — a horizontal-scrolling tab strip works for
          picking one project, but every project's full deep-dive stacked
          under it would mean scrolling sideways AND down just to read one,
          so mobile gets a different structure rather than a squeezed copy
          of this one. */}
      <div className="hidden md:block">
        <div className="flex flex-wrap gap-1 border-b border-line/40">
          {projects.map((p, i) => (
            <button
              key={p.name.en}
              type="button"
              onClick={() => setActive(i)}
              className={`relative flex shrink-0 items-center gap-2 whitespace-nowrap px-5 py-3 font-mono text-sm transition-colors ${
                active === i ? "text-text-primary" : "text-text-muted hover:text-accent"
              }`}
            >
              {p.liveUrl && (
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-status-live motion-safe:animate-pulse"
                  aria-hidden="true"
                />
              )}
              {t(p.name, language)}
              {active === i && (
                <motion.span
                  layoutId="project-tab-underline"
                  className="absolute inset-x-0 -bottom-px h-[2px]"
                  style={{ backgroundImage: "var(--gradient-signature)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={project.name.en}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="pt-8"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h3 className="font-mono text-2xl text-text-primary md:text-3xl">{t(project.name, language)}</h3>
              {project.private && (
                <span className="rounded-full border border-line/60 px-3 py-1 font-mono text-[length:var(--text-2xs)] uppercase tracking-[0.15em] text-text-muted">
                  {t(strings.projects.privateRepo, language)}
                </span>
              )}
              <div className="ml-auto flex flex-wrap gap-2">
                {project.liveUrl && (
                  <LinkBadge href={project.liveUrl} icon={ExternalLink}>
                    {t(strings.projects.liveDemo, language)}
                  </LinkBadge>
                )}
                {project.githubUrl && (
                  <LinkBadge href={project.githubUrl} icon={GithubIcon}>
                    {t(strings.projects.github, language)}
                  </LinkBadge>
                )}
              </div>
            </div>

            <p className="mt-3 max-w-2xl text-text-muted">{t(project.tagline, language)}</p>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[auto_1fr] md:items-center">
              <div className="shrink-0 md:pr-8 md:border-r md:border-line/40">
                <span
                  className="block bg-clip-text font-mono text-6xl font-semibold leading-none text-transparent"
                  style={{ backgroundImage: "var(--gradient-signature)" }}
                >
                  {project.stat.value}
                </span>
                <span className="mt-2 block max-w-[18ch] font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
                  {t(project.stat.label, language)}
                </span>
              </div>

              <div>
                {/* Each block gets its own small mono label — otherwise
                    it's three unrelated-looking elements stacked with no
                    context for what they are, instead of reading as
                    organized documentation the way a spec sheet would. */}
                <FieldLabel>{t(strings.projects.theApproach, language)}</FieldLabel>
                {/* The single most important technical claim in the row —
                    pulled into its own callout instead of reading as one
                    more paragraph, styled like an inline code comment. */}
                <div className="mt-2 rounded-lg border border-line/40 bg-surface/60 px-4 py-3">
                  <p className="flex gap-3 font-mono text-sm text-text-primary">
                    <span className="shrink-0 text-accent-secondary" aria-hidden="true">
                      {"//"}
                    </span>
                    <span>{t(project.highlight, language)}</span>
                  </p>
                </div>

                <FieldLabel className="mt-6">{t(strings.projects.mechanism, language)}</FieldLabel>
                <FlowSteps steps={project.flow} />

                <FieldLabel className="mt-6">{t(strings.projects.stack, language)}</FieldLabel>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <TechChip key={tech}>{tech}</TechChip>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="border-t border-line/40 md:hidden">
        {projects.map((p, i) => (
          <ProjectAccordionItem
            key={p.name.en}
            project={p}
            open={mobileOpen === i}
            onToggle={() => setMobileOpen((open) => (open === i ? null : i))}
          />
        ))}
      </div>
    </Section>
  );
}
