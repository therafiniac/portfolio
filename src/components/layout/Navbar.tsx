import { ThemeToggle } from "@/components/layout/ThemeToggle";

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="glass-panel sticky top-4 z-40 mx-4 flex items-center justify-between gap-4 rounded-full px-5 py-3 md:mx-8 md:top-6">
      <a
        href="#top"
        className="font-mono text-sm text-text-primary transition-colors hover:text-accent"
      >
        RAL
      </a>
      <nav className="hidden gap-6 font-mono text-xs uppercase tracking-[0.15em] text-text-muted sm:flex">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="transition-colors hover:text-accent"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <ThemeToggle />
    </header>
  );
}
