import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/sections/ContactForm";
import { FramedImage } from "@/components/layout/FramedImage";
import { contactLinks } from "@/lib/data/contact";

export function Contact() {
  return (
    <Section id="contact" index="05" tint eyebrow="Get in Touch" title="Contact">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px] lg:gap-16">
        <div>
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
                className="glass-panel group flex items-center gap-3 px-5 py-3 font-mono text-sm text-text-primary transition-colors hover:text-accent"
              >
                <link.icon
                  className="h-4 w-4 text-text-muted transition-colors group-hover:text-accent"
                  aria-hidden="true"
                />
                <span>
                  <span className="block text-xs uppercase tracking-[0.15em] text-text-muted">
                    {link.label}
                  </span>
                  {link.value}
                </span>
              </a>
            ))}
          </div>

          <div className="mt-12 max-w-xl">
            <ContactForm />
          </div>
        </div>

        <div className="hidden lg:block">
          <FramedImage
            src="/img2.jpeg"
            alt="Rafi at work"
            caption="Currently building"
            aspectClassName="aspect-[4/5]"
            sizes="280px"
          />
        </div>
      </div>
    </Section>
  );
}
