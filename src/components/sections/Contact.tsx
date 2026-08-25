"use client";

import { useState, type MouseEvent } from "react";
import { Check, Copy, Download } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/sections/ContactForm";
import { contactInfo, profileLinks } from "@/lib/data/contact";
import { resolvePlaceholderHref } from "@/lib/placeholderLink";
import { useLanguage, type Language } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";
import type { Localized } from "@/types";

// contactInfo's `value` is a plain string for rows that must never
// translate (email) and Localized for rows that should (location) — see
// contact.ts.
function resolveValue(value: string | Localized, language: Language): string {
  return typeof value === "string" ? value : t(value, language);
}

// A secondary affordance next to the mailto link, not a replacement for
// it — clicking the link still opens a mail client for anyone who has
// one configured, but copying the raw address is what most people
// actually want (paste into whatever mail/chat app they're already in).
// Icon swaps to a checkmark briefly instead of a toast — small enough
// that a toast would be overkill for what it's confirming.
function CopyEmailButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const language = useLanguage();

  async function handleCopy(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API can fail (denied permission, insecure context) —
      // the mailto link right next to this still works as a fallback,
      // so this silently no-ops rather than showing a broken "copied"
      // state that didn't actually happen.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={t(strings.contact.copyEmail, language)}
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:text-accent"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-status-live" aria-hidden="true" />
      ) : (
        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
      )}
    </button>
  );
}

// Same hover-reveal treatment as CopyEmailButton right above, on the
// same row — a permanently-visible "Save Contact" link (the first pass)
// sat there competing for attention with the actual email even when
// nobody wanted it; this only shows up once you're already looking at
// that row. A real download link, not a JS action, so no click handler
// needed — the file's own Content-Disposition header (see
// src/app/rafi-ahmed-laskar.vcf/route.ts) is what triggers the save.
function SaveContactButton() {
  const language = useLanguage();

  return (
    <a
      href="/rafi-ahmed-laskar.vcf"
      download
      aria-label={t(strings.contact.saveContact, language)}
      title={t(strings.contact.saveContact, language)}
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:text-accent"
    >
      <Download className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  );
}

// No portrait here — Hero already carries the one photo of Rafi on the
// page, so a second one in the closing section would just be repeating
// itself. The form takes over as the right-column anchor instead,
// closing out the same text-left/object-right rhythm Hero and Stack
// already established, so the page's three biggest sections all resolve
// the same way instead of Contact suddenly doing something new.
export function Contact() {
  const language = useLanguage();

  return (
    <Section id="contact" tag="CONTACT" tint eyebrow={strings.contact.eyebrow} title={strings.contact.title}>
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_440px] lg:gap-16">
        <div>
          <p className="gradient-heading text-glow bg-gradient-to-br from-text-primary via-text-primary to-accent bg-clip-text text-[length:var(--text-display-contact)] font-mono font-medium leading-[1.05] tracking-tight text-transparent">
            {t(strings.contact.headline, language)}
            {/* Three animated dots standing in for the trailing full stop
                — decorative only (the sentence itself is already the full
                accessible name without them), so hidden from screen
                readers rather than announced as "dot dot dot". */}
            <span className="ml-1.5 inline-flex items-baseline gap-1" aria-hidden="true">
              <span className="typing-dot" style={{ animationDelay: "0s" }} />
              <span className="typing-dot" style={{ animationDelay: "0.15s" }} />
              <span className="typing-dot" style={{ animationDelay: "0.3s" }} />
            </span>
          </p>

          {/* No card — same rule Hero states outright ("only the CTA is
              bordered/filled, everything else is differentiated by
              typography alone"). A box around plain info text also
              implies "interactive container," which is actively wrong
              for Location — it isn't a link. Icon + value only, no
              caption line; Location has no href so it renders as plain
              text, not a link. */}
          <div className="mt-8 flex flex-col gap-3">
            {contactInfo.map((info) => {
              // The copy button is a sibling of the <a>, not nested inside
              // it — a <button> inside an <a> is invalid HTML (interactive
              // content inside interactive content), so this row needs its
              // own wrapper to carry the shared `group` hover state instead
              // of the <a> itself being the group like the other rows.
              const isEmail = info.href?.startsWith("mailto:");
              const value = resolveValue(info.value, language);

              if (isEmail) {
                return (
                  <div key={info.label.en} className="group flex items-center gap-2.5">
                    <a href={info.href} className="flex items-center gap-2.5">
                      <info.icon
                        className="h-4 w-4 text-text-muted transition-colors group-hover:text-accent"
                        aria-hidden="true"
                      />
                      <span className="font-mono text-sm text-text-primary transition-colors group-hover:text-accent">
                        {value}
                      </span>
                    </a>
                    <CopyEmailButton value={value} />
                    <SaveContactButton />
                  </div>
                );
              }

              return info.href ? (
                <a key={info.label.en} href={info.href} className="group flex items-center gap-2.5">
                  <info.icon
                    className="h-4 w-4 text-text-muted transition-colors group-hover:text-accent"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-sm text-text-primary transition-colors group-hover:text-accent">
                    {value}
                  </span>
                </a>
              ) : (
                <div key={info.label.en} className="flex items-center gap-2.5">
                  <info.icon className="h-4 w-4 text-text-muted" aria-hidden="true" />
                  <span className="font-mono text-sm text-text-primary">{value}</span>
                </div>
              );
            })}
          </div>

          {/* Icon-only, no visible name — the destination is the whole
              point of a profile link, there's nothing to read the way
              there is with an email or a city. title gives mouse users
              a native tooltip without adding permanent visible text;
              aria-label covers screen readers. href is "#" in the data
              for the ones not yet real (AGENTS.md's placeholder-link
              rule) — resolvePlaceholderHref sends a click there to
              /under-construction instead of a dead "#". */}
          <p className="mt-9 font-mono text-[length:var(--text-1xs)] uppercase tracking-[0.15em] text-text-muted">
            {t(strings.contact.profiles, language)}
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            {profileLinks.map((link) => (
              <a
                key={link.label}
                href={resolvePlaceholderHref(link.href)}
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
