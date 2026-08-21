import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/sections/ContactForm";
import { contactInfo, profileLinks } from "@/lib/data/contact";

// No portrait here — Hero already carries the one photo of Rafi on the
// page, so a second one in the closing section would just be repeating
// itself. The form takes over as the right-column anchor instead,
// closing out the same text-left/object-right rhythm Hero and Stack
// already established, so the page's three biggest sections all resolve
// the same way instead of Contact suddenly doing something new.
export function Contact() {
  return (
    <Section id="contact" index="07" tint eyebrow="Get in Touch" title="Contact">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_440px] lg:gap-16">
        <div>
          <p className="text-glow bg-gradient-to-br from-text-primary via-text-primary to-accent bg-clip-text text-[clamp(2rem,6vw,4rem)] font-mono font-medium leading-[1.05] tracking-tight text-transparent">
            Let&apos;s build something
            <br />
            that scales.
          </p>

          {/* No card — same rule Hero states outright ("only the CTA is
              bordered/filled, everything else is differentiated by
              typography alone"). A box around plain info text also
              implies "interactive container," which is actively wrong
              for Location — it isn't a link. Icon + value only, no
              caption line; Location has no href so it renders as plain
              text, not a link. */}
          <div className="mt-8 flex flex-col gap-3">
            {contactInfo.map((info) =>
              info.href ? (
                <a key={info.label} href={info.href} className="group flex items-center gap-2.5">
                  <info.icon
                    className="h-4 w-4 text-text-muted transition-colors group-hover:text-accent"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-sm text-text-primary transition-colors group-hover:text-accent">
                    {info.value}
                  </span>
                </a>
              ) : (
                <div key={info.label} className="flex items-center gap-2.5">
                  <info.icon className="h-4 w-4 text-text-muted" aria-hidden="true" />
                  <span className="font-mono text-sm text-text-primary">{info.value}</span>
                </div>
              ),
            )}
          </div>

          {/* Icon-only, no visible name — the destination is the whole
              point of a profile link, there's nothing to read the way
              there is with an email or a city. title gives mouse users
              a native tooltip without adding permanent visible text;
              aria-label covers screen readers. href is "#" for the ones
              not yet real — see AGENTS.md's placeholder-link rule. */}
          <p className="mt-9 font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted">
            Profiles
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            {profileLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                title={link.label}
                aria-label={link.label}
                className="glass-panel flex h-11 w-11 items-center justify-center text-text-muted transition-colors hover:text-accent"
              >
                <link.icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <ContactForm />
      </div>
    </Section>
  );
}
