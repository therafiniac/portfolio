type TechChipProps = {
  children: string;
  size?: "sm" | "md";
};

// The tech-tag pill used across ClientWork's cards, Projects' stack list,
// and Experience's tech list — two sizes (`sm` for tight card real
// estate, `md` for looser rows) instead of three hand-rolled className
// strings that happened to converge on the same look.
export function TechChip({ children, size = "md" }: TechChipProps) {
  if (size === "sm") {
    return (
      <span className="rounded border border-line/40 px-1.5 py-0.5 font-mono text-[length:var(--text-3xs)] text-text-muted transition-[transform,color,border-color] duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:text-text-primary">
        {children}
      </span>
    );
  }

  return (
    <span className="rounded-full border border-line/60 px-3 py-1 font-mono text-[length:var(--text-1xs)] uppercase tracking-[0.1em] text-text-muted transition-[transform,color,border-color] duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:text-text-primary">
      {children}
    </span>
  );
}
