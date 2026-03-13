import { cn } from "@/lib/utils";

interface BadgeProps {
  children:   React.ReactNode;
  variant?:   "default" | "brand" | "accent" | "outline";
  className?: string;
}

export default function Badge({
  children,
  variant   = "default",
  className,
}: BadgeProps) {
  const variants = {
    default: "bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border)]",
    brand:   "bg-[var(--brand)]/10 text-[var(--brand)] border border-[var(--brand)]/20",
    accent:  "bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20",
    outline: "border border-[var(--border)] text-[var(--text-muted)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
