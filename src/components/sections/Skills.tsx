import { Section } from "@/components/layout/Section";
import { Marquee } from "@/components/layout/Marquee";
import { skillGroups } from "@/lib/data/skills";

export function Skills() {
  return (
    <Section id="stack" index="04" eyebrow="Capabilities" title="Stack">
      <div className="space-y-8">
        {skillGroups.map((group, index) => (
          <div key={group.label}>
            <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-accent-secondary">
              <group.icon className="h-4 w-4" aria-hidden="true" />
              {group.label}
            </h3>
            <Marquee
              items={group.items}
              reverse={index % 2 === 1}
              durationSeconds={14 + group.items.length * 2}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
