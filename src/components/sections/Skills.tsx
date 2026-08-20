import { Panel } from "@/components/layout/Panel";
import { skillGroups } from "@/lib/data";

export function Skills() {
  return (
    <Panel index="04" title="STACK">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.label}>
            <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
              {group.label}
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm text-text-primary">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Panel>
  );
}
