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

export function Projects() {
  return (
    <Section id="built" index="03" eyebrow="Independent Projects" title="What I've Built">
      {/* Full-width stacked rows, not a matched-height grid — each entry
          gets to be whatever height its own content needs, and there's
          never a second card in the same row it has to line up with. */}
      <div className="flex flex-col gap-10">
        {projects.map((project, index) => {
          const reversed = index % 2 === 1;
          return (
            <article
              key={project.name}
              className="overflow-hidden rounded-2xl border border-line/60 transition-colors duration-300 hover:border-accent/60"
            >
              <div className={`flex flex-col md:flex-row ${reversed ? "md:flex-row-reverse" : ""}`}>
                {/* The real technical claim, in large type — not a
                    decorative diagram standing in for it. The wash angle
                    flips with `reversed` so it always flows toward the
                    content column instead of looking identical (and
                    unmirrored) regardless of which side it's on — that
                    mismatch is exactly what broke the previous version of
                    this section. */}
                <div
                  className={`flex flex-col items-center justify-center gap-2 p-10 text-center md:w-2/5 md:border-line/40 ${
                    reversed ? "md:border-l" : "md:border-r"
                  }`}
                  style={{
                    backgroundImage: `linear-gradient(${reversed ? 225 : 135}deg, color-mix(in srgb, var(--accent) 12%, var(--surface)), color-mix(in srgb, var(--accent-secondary) 12%, var(--surface)))`,
                  }}
                >
                  <span
                    className="bg-clip-text font-mono text-6xl font-semibold leading-none text-transparent"
                    style={{ backgroundImage: "var(--gradient-signature)" }}
                  >
                    {project.stat.value}
                  </span>
                  <span className="max-w-[18ch] font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
                    {project.stat.label}
                  </span>
                </div>

                <div className="p-6 md:w-3/5 md:p-10">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                    <h3 className="font-mono text-2xl text-text-primary">{project.name}</h3>
                    <div className="flex flex-wrap gap-2">
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
                      {project.private && (
                        <span className="inline-flex items-center rounded-full border border-line/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted">
                          Private Repo
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="mt-3 text-text-muted">{project.tagline}</p>

                  {/* The single most important technical claim in the
                      row — pulled into its own callout instead of reading
                      as one more paragraph, styled in mono like an inline
                      code comment to match the "real code, not decorative
                      chrome" idea the rest of this redesign leans on. */}
                  <div className="mt-5 rounded-lg border border-line/40 bg-surface/60 px-4 py-3">
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
            </article>
          );
        })}
      </div>
    </Section>
  );
}
