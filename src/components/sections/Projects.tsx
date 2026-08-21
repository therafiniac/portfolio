"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { FlowSteps } from "@/components/sections/FlowSteps";
import { projects } from "@/lib/data/projects";
import type { IconComponent } from "@/types";

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
      className="inline-flex items-center gap-1.5 rounded-full border border-line/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-accent transition-colors duration-200 hover:border-accent/60 hover:bg-accent/10"
    >
      <Icon className="h-3 w-3" aria-hidden="true" />
      {children}
    </a>
  );
}

// Tabs, not stacked cards — deliberately the opposite structure from every
// other grid/panel section on the site (no chrome bar, no dots, no
// bordered card). One project's full deep-dive shows at a time, so the
// content pane's height stays constant regardless of how many projects
// exist — adding a third or fourth means one more tab, not more scroll.
export function Projects() {
  const [active, setActive] = useState(0);
  const project = projects[active];

  return (
    <Section id="built" index="03" eyebrow="Independent Projects" title="What I've Built">
      <p className="-mt-6 mb-10 max-w-2xl text-text-muted">
        A short list on purpose — every entry gets its full architecture
        discussion instead of padding the count.
      </p>

      <div className="flex gap-1 overflow-x-auto border-b border-line/40">
        {projects.map((p, i) => (
          <button
            key={p.name}
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
            {p.name}
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
          key={project.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="pt-8"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 className="font-mono text-2xl text-text-primary md:text-3xl">{project.name}</h3>
            {project.private && (
              <span className="rounded-full border border-line/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted">
                Private Repo
              </span>
            )}
            <div className="ml-auto flex flex-wrap gap-2">
              {project.liveUrl && (
                <LinkBadge href={project.liveUrl} icon={ExternalLink}>
                  Live Demo
                </LinkBadge>
              )}
              {project.githubUrl && (
                <LinkBadge href={project.githubUrl} icon={GithubIcon}>
                  GitHub
                </LinkBadge>
              )}
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-text-muted">{project.tagline}</p>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[auto_1fr]">
            <div className="shrink-0 md:pr-8 md:border-r md:border-line/40">
              <span
                className="block bg-clip-text font-mono text-6xl font-semibold leading-none text-transparent"
                style={{ backgroundImage: "var(--gradient-signature)" }}
              >
                {project.stat.value}
              </span>
              <span className="mt-2 block max-w-[18ch] font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
                {project.stat.label}
              </span>
            </div>

            <div>
              {/* The single most important technical claim in the row —
                  pulled into its own callout instead of reading as one
                  more paragraph, styled like an inline code comment. */}
              <div className="rounded-lg border border-line/40 bg-surface/60 px-4 py-3">
                <p className="flex gap-3 font-mono text-sm text-text-primary">
                  <span className="shrink-0 text-accent-secondary" aria-hidden="true">
                    {"//"}
                  </span>
                  <span>{project.highlight}</span>
                </p>
              </div>

              <FlowSteps steps={project.flow} />

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-line/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
