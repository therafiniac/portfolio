import { ExternalLink } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { ProjectGraphic } from "@/components/sections/ProjectGraphic";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { projects } from "@/lib/data/projects";

export function Projects() {
  return (
    <Section id="case-studies" index="02" eyebrow="Technical Deep Dive" title="Case Studies">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <article
            key={project.name}
            className="glass-panel will-change-transform overflow-hidden transition-transform duration-200 ease-out hover:-translate-y-1"
          >
            <ProjectGraphic index={index} />
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                <h3 className="font-mono text-xl text-text-primary">
                  {project.name}
                </h3>
                <div className="flex gap-4 font-mono text-xs uppercase tracking-[0.15em]">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-accent hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-accent hover:underline"
                    >
                      <GithubIcon className="h-3 w-3" aria-hidden="true" />
                      GitHub
                    </a>
                  )}
                  {project.private && (
                    <span className="text-text-muted">Private Repo</span>
                  )}
                </div>
              </div>

              <p className="mt-3 text-text-muted">{project.tagline}</p>

              <p className="mt-5 flex gap-3 text-sm text-text-primary">
                <span className="text-accent-secondary" aria-hidden="true">
                  →
                </span>
                <span>{project.highlight}</span>
              </p>

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
          </article>
        ))}
      </div>
    </Section>
  );
}
