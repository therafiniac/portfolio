import { Panel } from "@/components/layout/Panel";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <Panel index="03" title="EXPERIENCE">
      <div className="space-y-8">
        {experience.map((entry) => (
          <div
            key={`${entry.org}-${entry.start}`}
            className="grid grid-cols-1 gap-2 border-l border-line pl-6 md:grid-cols-[200px_1fr] md:gap-8"
          >
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
                {entry.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="text-accent" aria-hidden="true">
                      —
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
