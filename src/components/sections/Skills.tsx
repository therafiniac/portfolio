import { Section } from "@/components/layout/Section";
import { skillGroups } from "@/lib/data";

export function Skills() {
  return (
    <Section id="stack" eyebrow="Capabilities" title="Stack">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.label}>
            <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-accent-secondary">
              {group.label}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="glass-panel rounded-full px-3 py-1.5 text-sm text-text-primary transition-colors hover:text-accent"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
