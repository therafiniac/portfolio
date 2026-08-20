import { Panel } from "@/components/layout/Panel";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <Panel index="02" title="SELECTED WORK">
      <div className="space-y-12">
        {projects.map((project) => (
          <article
            key={project.name}
            className="rounded border border-line bg-surface p-6 md:p-8"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="font-mono text-xl text-text-primary">
                {project.name}
              </h3>
              <div className="flex gap-4 font-mono text-xs uppercase tracking-[0.15em]">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    GitHub
                  </a>
                )}
                {project.private && (
                  <span className="text-text-muted">Private Repo</span>
                )}
              </div>
            </div>

            <p className="mt-3 text-text-muted">{project.tagline}</p>

            <ul className="mt-6 space-y-2 text-sm text-text-primary">
              {project.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span className="text-accent" aria-hidden="true">
                    →
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}
