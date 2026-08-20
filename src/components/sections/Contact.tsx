import { Section } from "@/components/layout/Section";
import { contactLinks } from "@/lib/data";

export function Contact() {
  return (
    <Section id="contact" eyebrow="Get in Touch" title="Contact">
      <p className="text-glow bg-gradient-to-br from-text-primary via-text-primary to-accent bg-clip-text text-[clamp(2rem,6vw,4rem)] font-mono font-medium leading-[1.05] tracking-tight text-transparent">
        Let&apos;s build something
        <br />
        that scales.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="glass-panel px-5 py-3 font-mono text-sm text-text-primary transition-colors hover:text-accent"
          >
            <span className="block text-xs uppercase tracking-[0.15em] text-text-muted">
              {link.label}
            </span>
            {link.value}
          </a>
        ))}
      </div>
    </Section>
  );
}
