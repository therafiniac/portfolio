import type { ReactNode } from "react";

type PanelProps = {
  index: string;
  title: string;
  children: ReactNode;
};

export function Panel({ index, title, children }: PanelProps) {
  return (
    <section className="border-t border-line px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
          <span className="text-accent-secondary">{`// ${index}`}</span> — {title}
        </p>
        {children}
      </div>
    </section>
  );
}
