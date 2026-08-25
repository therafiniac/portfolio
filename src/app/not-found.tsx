"use client";

import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

// Next's own default 404 is unstyled and breaks the site's voice the
// moment someone hits a dead link — this is that page done in the same
// signature-gradient/mono language as Hero's CTA and the case-study
// pages, not a generic error screen. "404" stays plain digits even in
// Bengali mode (a status code is notation, not prose — same reasoning
// Project.stat.value in projects.ts already uses), and is aria-hidden
// since the real accessible heading is the h1 right below it.
export default function NotFound() {
  const language = useLanguage();

  return (
    <>
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
        <span
          className="bg-clip-text font-mono text-8xl font-semibold leading-none text-transparent md:text-9xl"
          style={{ backgroundImage: "var(--gradient-signature)" }}
          aria-hidden="true"
        >
          404
        </span>
        <h1 className="mt-6 font-mono text-2xl text-text-primary md:text-3xl">
          {t(strings.notFound.heading, language)}
        </h1>
        <p className="mt-3 max-w-md text-text-muted">{t(strings.notFound.body, language)}</p>
        <Link
          href="/"
          className="relative mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-sm font-medium text-bg transition-opacity hover:opacity-90"
          style={{ backgroundImage: "var(--gradient-signature)" }}
        >
          {t(strings.notFound.cta, language)}
          <span aria-hidden="true">→</span>
        </Link>
      </main>
      <Footer />
    </>
  );
}
