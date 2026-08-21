type SectionHeadingProps = {
  eyebrow: string;
  title: string;
};

// The eyebrow pill + title pairing every section opens with. Section.tsx
// renders this by default; Skills.tsx renders it directly instead (via
// renderHeader={false}) since its two-column layout needs the heading
// beside the content rather than stacked above it — kept as one source
// so the two never drift out of sync with each other.
export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <>
      <span className="inline-block rounded-full border border-line/40 bg-surface/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-secondary backdrop-blur">
        {eyebrow}
      </span>
      <h2 className="mt-4 font-mono text-3xl font-medium text-text-primary md:text-4xl">{title}</h2>
    </>
  );
}
