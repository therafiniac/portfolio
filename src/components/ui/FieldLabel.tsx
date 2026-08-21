import type { ReactNode } from "react";

// The small uppercase mono label used both as ClientWork's category tag
// and Projects' per-block field labels ("The Approach", "Mechanism",
// "Stack") — same look at every call site, previously three hand-rolled
// instances of the identical className string.
export function FieldLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-[10px] uppercase tracking-[0.15em] text-accent-secondary ${className}`}>
      {children}
    </p>
  );
}
