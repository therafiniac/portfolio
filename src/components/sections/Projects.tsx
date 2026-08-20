import { Section } from "@/components/layout/Section";
import { projects } from "@/lib/data";

// Decorative-only gradients cycling across the Catppuccin palette — an
// abstract stand-in for a real project screenshot, one per card. Swap the
// div below for an <img> per project once real screenshots exist.
const covers = [
  "linear-gradient(135deg, rgb(148 226 213 / 35%), rgb(250 179 135 / 25%))",
  "linear-gradient(135deg, rgb(137 180 250 / 35%), rgb(203 166 247 / 25%))",
  "linear-gradient(135deg, rgb(166 227 161 / 35%), rgb(148 226 213 / 25%))",
  "linear-gradient(135deg, rgb(250 179 135 / 35%), rgb(243 139 168 / 25%))",
];

export function Projects() {
  return (
    <Section id="work" eyebrow="Selected Work" title="What I've Shipped">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <article
            key={project.name}
            className="glass-panel overflow-hidden transition-transform duration-300 hover:-translate-y-1"
          >
            <div
              className="h-28 w-full"
              style={{ background: covers[index % covers.length] }}
              aria-hidden="true"
            />
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
