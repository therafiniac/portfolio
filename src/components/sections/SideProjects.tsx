"use client";

import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { TileGlow } from "@/components/ui/TileGlow";
import { sideProjects } from "@/lib/data/sideProjects";
import type { SideProject } from "@/types";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

// Deliberately lighter than WorkCard (ClientWork.tsx) — no screenshot, no
// browser chrome, no tech chips: these are fun utilities, not case studies,
// so the card shouldn't imply the same depth as a client project.
function SideProjectCard({ project }: { project: SideProject }) {
  const language = useLanguage();
  // "#" is the honest placeholder for a not-yet-real link (see
  // sideProjects.ts) — the live-status dot only lights up once a real URL
  // replaces it, same signal Projects.tsx's tabs use for `liveUrl`.
  const isLive = project.href.startsWith("http");

  return (
    <a
      href={project.href}
      target={isLive ? "_blank" : undefined}
      rel={isLive ? "noopener noreferrer" : undefined}
      className="hover-glow-panel group relative flex items-start gap-4 overflow-hidden rounded-xl border border-line/60 p-6 transition-colors duration-300 hover:border-accent/60"
    >
      <TileGlow intensity={12} />
      <project.icon className="h-8 w-8 shrink-0 text-accent-secondary" strokeWidth={1.25} aria-hidden="true" />
      <div>
        <h3 className="flex items-center gap-2 text-base text-text-primary">
          {isLive && (
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-status-live motion-safe:animate-pulse"
              aria-hidden="true"
            />
          )}
          {t(project.name, language)}
          <ArrowUpRight
            className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
            aria-hidden="true"
          />
        </h3>
        <p className="mt-1 text-xs text-text-muted">{t(project.description, language)}</p>
      </div>
    </a>
  );
}

export function SideProjects() {
  const language = useLanguage();

  return (
    <Section id="side-projects" index="03" eyebrow={strings.sideProjects.eyebrow} title={strings.sideProjects.title}>
      <p className="-mt-6 mb-10 max-w-2xl text-text-muted">{t(strings.sideProjects.intro, language)}</p>
      {/* sm: 2-up, lg: 3-up — reflows on its own as entries are added, no
          layout logic to touch when the list grows. */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sideProjects.map((project) => (
          <SideProjectCard key={project.name.en} project={project} />
        ))}
      </div>
    </Section>
  );
}
