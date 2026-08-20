import { Section } from "@/components/layout/Section";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <Section id="experience" eyebrow="Track Record" title="Experience">
      <div className="relative space-y-12">
        <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/70 via-line/60 to-transparent" />
        {experience.map((entry) => (
          <div
            key={`${entry.org}-${entry.start}`}
            className="relative grid grid-cols-1 gap-2 pl-8 md:grid-cols-[200px_1fr] md:gap-8"
          >
            <span
              className="absolute left-0 top-1.5 h-[10px] w-[10px] rounded-full bg-accent shadow-[0_0_12px_2px_rgb(148_226_213_/_50%)]"
              aria-hidden="true"
            />
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent-secondary">
              {entry.start} — {entry.end}
            </p>
            <div>
              <h3 className="text-text-primary">
                {entry.role} <span className="text-text-muted">· {entry.org}</span>
              </h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-text-muted">
                {entry.location}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-text-muted">
                {entry.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="text-accent" aria-hidden="true">
                      —
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
