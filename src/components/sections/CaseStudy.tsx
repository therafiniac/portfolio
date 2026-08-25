"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ZoomIn } from "lucide-react";
import { FieldLabel } from "@/components/ui/FieldLabel";
import { TechChip } from "@/components/ui/TechChip";
import { Lightbox } from "@/components/ui/Lightbox";
import type { ClientProject } from "@/types";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

// Only the plain-data fields, not the whole ClientProject — `icon` is a
// component reference (a function), and this is a Client Component
// rendered from a Server Component (app/work/[slug]/page.tsx); only
// serializable data can cross that boundary, and this page never
// actually renders the icon anyway (the case-study page has room for a
// real cover image, unlike the card, which falls back to the icon only
// while a screenshot is still a placeholder).
type CaseStudyProject = Omit<ClientProject, "icon">;

// The page a Client Work card's "case study" link lands on (see
// AGENTS.md's "Case Study Pages" — the one deliberate multi-page
// exception). Shows exactly what the data actually supports (full,
// untruncated description + tech list, same fields the card already
// has) rather than a fabricated problem/role narrative — today's
// placeholder projects don't have real specifics to tell that story
// with yet, and AGENTS.md's placeholder-honesty rule applies here the
// same as everywhere else.
export function CaseStudy({ project }: { project: CaseStudyProject }) {
  const language = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const gallery = project.gallery ?? [];

  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-32 md:px-12 md:pt-40">
      <Link
        href="/#work"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        {t(strings.clientWork.backToWork, language)}
      </Link>

      <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <FieldLabel>{t(project.category, language)}</FieldLabel>
          <h1 className="mt-2 font-mono text-4xl text-text-primary md:text-5xl">{t(project.name, language)}</h1>
        </div>
        {project.href.startsWith("http") && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line/60 px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-accent transition-colors hover:border-accent/60 hover:bg-accent/10"
          >
            {t(strings.clientWork.visitSite, language)}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        )}
      </div>

      {/* 16/10, matching WorkCard's SHOT_ASPECT (ClientWork.tsx) and the
          actual 1600x1000 viewport every cover screenshot is captured
          at — this used to be 16/9, a wider box than the source image,
          which made object-cover crop real content off the top/bottom
          of every real screenshot. Wipes open on mount (clip-path, not
          opacity) rather than just appearing — plays fresh every time
          this route is entered, priority load means the image itself is
          already there underneath, so this is purely a reveal, never a
          wait. whileInView would be wrong here: this sits above the
          fold, visible on first paint, not something scrolled to. */}
      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line/60"
      >
        <Image
          src={project.coverImage}
          alt={`${t(project.name, language)} ${t(strings.clientWork.preview, language)}`}
          fill
          sizes="(min-width: 768px) 800px, 100vw"
          className="object-cover"
          priority
        />
      </motion.div>

      <p className="mt-8 max-w-2xl text-text-muted">{t(project.description, language)}</p>

      {project.challenge && (
        <>
          <FieldLabel className="mt-10">{t(strings.clientWork.challenge, language)}</FieldLabel>
          <p className="mt-2 max-w-2xl text-text-muted">{t(project.challenge, language)}</p>
        </>
      )}

      {project.approach && (
        <>
          <FieldLabel className="mt-10">{t(strings.projects.theApproach, language)}</FieldLabel>
          {/* Same callout treatment Projects' own "highlight" claim
              uses — the single most important technical/strategic
              decision, pulled out of paragraph flow instead of buried
              in it. */}
          <div className="mt-2 max-w-2xl rounded-lg border border-line/40 bg-surface/60 px-4 py-3">
            <p className="flex gap-3 font-mono text-sm text-text-primary">
              <span className="shrink-0 text-accent-secondary" aria-hidden="true">
                {"//"}
              </span>
              <span>{t(project.approach, language)}</span>
            </p>
          </div>
        </>
      )}

      {project.highlights && project.highlights.length > 0 && (
        <>
          <FieldLabel className="mt-10">{t(strings.clientWork.whatShipped, language)}</FieldLabel>
          <ul className="mt-2 max-w-2xl space-y-2">
            {project.highlights.map((highlight) => (
              <li key={highlight.en} className="flex gap-2 text-text-muted">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-secondary" aria-hidden="true" />
                {t(highlight, language)}
              </li>
            ))}
          </ul>
        </>
      )}

      {project.outcome && (
        <>
          <FieldLabel className="mt-10">{t(strings.clientWork.outcome, language)}</FieldLabel>
          <p className="mt-2 max-w-2xl text-text-muted">{t(project.outcome, language)}</p>
        </>
      )}

      <FieldLabel className="mt-10">{t(strings.projects.stack, language)}</FieldLabel>
      <div className="mt-2 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <TechChip key={tech}>{tech}</TechChip>
        ))}
      </div>

      {project.gallery && project.gallery.length > 0 && (
        <>
          <FieldLabel className="mt-10">{t(strings.clientWork.gallery, language)}</FieldLabel>
          {/* Full container width and stacked, not a cramped 2-col grid
              — these are detail shots (dashboards, data-dense panels),
              and a small thumbnail makes the actual point of including
              them (the detail) illegible. A caption under each says what
              it's actually showing instead of leaving the visitor to
              guess. Portrait (mobile-viewport) captures get their own
              narrower frame rather than being force-cropped into the
              same 16:10 landscape box every desktop screenshot uses —
              that used to crop away most of a portrait shot's height. */}
          <div className="mt-2 flex flex-col gap-8">
            {gallery.map((item, i) => (
              <figure key={item.src} className={item.orientation === "portrait" ? "w-56" : "w-full"}>
                {/* button, not the figure itself — a native, keyboard-
                    reachable trigger for the lightbox rather than an
                    onClick bolted onto a div. ZoomIn only shows up on
                    hover so the gallery still reads as "detail shots" at
                    rest, not "buttons," until you're actually near one. */}
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={t(item.caption, language)}
                  className={`group relative block w-full overflow-hidden rounded-xl border border-line/60 ${
                    item.orientation === "portrait" ? "aspect-[9/19.5]" : "aspect-[16/10]"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={t(item.caption, language)}
                    fill
                    sizes={item.orientation === "portrait" ? "224px" : "(min-width: 896px) 896px, 100vw"}
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-bg/0 opacity-0 transition-all duration-200 group-hover:bg-bg/30 group-hover:opacity-100">
                    <ZoomIn className="h-6 w-6 text-text-primary drop-shadow" aria-hidden="true" />
                  </span>
                </button>
                <figcaption className="mt-2 font-mono text-xs text-text-muted">
                  {t(item.caption, language)}
                </figcaption>
              </figure>
            ))}
          </div>
        </>
      )}

      <Lightbox
        images={gallery.map((item) => ({
          src: item.src,
          alt: t(item.caption, language),
          caption: t(item.caption, language),
          orientation: item.orientation,
        }))}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
