import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { clientProjects } from "@/lib/data/clientWork";

export function ClientWork() {
  return (
    <Section id="work" index="01" tint eyebrow="Client Work" title="Work I've Delivered">
      <p className="-mt-6 mb-10 max-w-2xl text-text-muted">
        A sample from 150+ client sites delivered across industries — the
        actual, shipped, paid-for work.
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {clientProjects.map((project, index) => {
          const featured = index === 0;
          return (
            <a
              key={project.name}
              href={project.href}
              className={`glass-panel will-change-transform group block overflow-hidden transition-transform duration-200 ease-out hover:-translate-y-1 ${
                featured ? "sm:col-span-2" : ""
              }`}
            >
              <div
                className={`relative w-full overflow-hidden ${featured ? "h-64" : "h-40"}`}
              >
                <Image
                  src={project.coverImage}
                  alt={`${project.name} preview`}
                  fill
                  sizes={
                    featured
                      ? "(min-width: 640px) 66vw, 100vw"
                      : "(min-width: 640px) 33vw, 100vw"
                  }
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="glass-panel absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-accent">
                  <project.icon className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
              <div className="p-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent-secondary">
                  {project.category}
                </span>
                <h3
                  className={`mt-1 flex items-center gap-1 text-text-primary transition-colors group-hover:text-accent ${
                    featured ? "text-xl" : "text-lg"
                  }`}
                >
                  {project.name}
                  <ArrowUpRight
                    className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </h3>
                <p className="mt-1 text-sm text-text-muted">
                  {project.description}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </Section>
  );
}
