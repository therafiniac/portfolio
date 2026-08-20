import { Panel } from "@/components/layout/Panel";
import { contactLinks } from "@/lib/data";

export function Contact() {
  return (
    <Panel index="05" title="CONTACT">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="rounded border border-line px-5 py-3 font-mono text-sm text-text-primary transition-colors hover:border-accent hover:text-accent"
          >
            <span className="block text-xs uppercase tracking-[0.15em] text-text-muted">
              {link.label}
            </span>
            {link.value}
          </a>
        ))}
      </div>
    </Panel>
  );
}
