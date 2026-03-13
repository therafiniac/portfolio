import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?:    "sm" | "md" | "lg";
  href?:    string;
  external?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size    = "md",
      children,
      href,
      external,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-body font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap";

    const variants = {
      primary:
        "bg-[var(--brand)] text-white hover:bg-[var(--brand-dark)] shadow-lg shadow-[var(--brand)]/20 hover:shadow-[var(--brand)]/30 hover:-translate-y-0.5 active:translate-y-0",
      secondary:
        "bg-[var(--accent)] text-[#0a0f1a] hover:bg-[var(--accent-dark)] shadow-lg shadow-[var(--accent)]/20 hover:shadow-[var(--accent)]/30 hover:-translate-y-0.5 active:translate-y-0",
      outline:
        "border border-[var(--border)] text-[var(--text)] hover:border-[var(--brand)] hover:text-[var(--brand)] hover:-translate-y-0.5 active:translate-y-0",
      ghost:
        "text-[var(--text-muted)] hover:text-[var(--brand)] hover:bg-[var(--bg-secondary)]",
    };

    const sizes = {
      sm: "text-sm px-4 py-2",
      md: "text-sm px-6 py-2.5",
      lg: "text-base px-8 py-3.5",
    };

    const classes = cn(base, variants[variant], sizes[size], className);

    if (href) {
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={classes}
        >
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
