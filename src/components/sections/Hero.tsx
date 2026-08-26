"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { HeroCanvasLoader } from "@/components/three/HeroCanvasLoader";
import { HeroMark3DLoader } from "@/components/three/HeroMark3DLoader";
import { CountUp } from "@/components/layout/CountUp";
import { Magnetic } from "@/components/layout/Magnetic";
import { heroRoles, heroStatusLine, heroStats, heroNameLine1, heroNameLine2 } from "@/lib/data/hero";
import { useLanguage } from "@/lib/useLanguage";
import { t, localizeNumber } from "@/lib/i18n";
import { strings } from "@/lib/i18n-strings";

// Answers a real, unspoken question for anyone outside IST — a client
// or recruiter deciding whether a message sent now will be seen soon.
// null on first render (server has no "current time" that could ever
// match the client's, so this can't render anything during SSR without
// risking a hydration mismatch) — the real value fills in a moment after
// mount instead, same reasoning as this file's own CountUp components
// animating in from 0 rather than trying to SSR a final number.
function LocalTimeBadge() {
  const language = useLanguage();
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    function update() {
      const formatted = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
      }).format(new Date());
      // localizeNumber only touches digits (see i18n.ts) — the AM/PM
      // marker is a separate string Intl leaves in English regardless of
      // locale (confirmed directly: Intl.DateTimeFormat("bn-BD", ...)
      // still prints "AM"/"PM", not a Bengali dayPeriod, at least with
      // this project's ICU data), so it needs its own explicit swap.
      const withLocalizedPeriod =
        language === "bn"
          ? formatted.replace("AM", "পূর্বাহ্ণ").replace("PM", "অপরাহ্ণ")
          : formatted;
      setTime(localizeNumber(withLocalizedPeriod, language));
    }
    update();
    const interval = setInterval(update, 30_000);
    return () => clearInterval(interval);
  }, [language]);

  if (!time) return null;

  return (
    <>
      <span className="text-text-muted/50" aria-hidden="true">
        ·
      </span>
      <span>
        {time}, {t(strings.hero.kolkata, language)}
      </span>
    </>
  );
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// One color per role — a small nod to the two brand accents (interactive
// blue / emphasis maroon) standing in for "developer" and "designer"
// rather than two more boxed pills.
const roleColors = ["text-accent", "text-accent-secondary"];

export function Hero() {
  const language = useLanguage();

  // Two different rates/directions so the blobs visibly separate as the
  // reader scrolls past Hero — a depth cue aurora-drift alone can't give,
  // since that keyframe only wobbles each blob in place (see
  // globals.css). Pinned to [0, 0] under reduced motion: MotionConfig's
  // reducedMotion="user" (layout.tsx) governs Framer's animate/variants
  // controls, not a raw useTransform value plumbed into a style prop, so
  // this needs the same explicit useReducedMotion() guard CountUp.tsx
  // uses rather than relying on that global config alone.
  const { scrollY } = useScroll();
  const reducedMotion = useReducedMotion();
  const blobOneY = useTransform(scrollY, [0, 800], reducedMotion ? [0, 0] : [0, -120]);
  const blobTwoY = useTransform(scrollY, [0, 800], reducedMotion ? [0, 0] : [0, 80]);

  return (
    <section
      id="top"
      // -mt-16/pt-16 reclaims the navbar's reserved sticky-flow height
      // (it's transparent at rest, so nothing shows through) so Hero's
      // own glow layer starts at the true page top instead of at a hard
      // line 64px down — without this, everything above that line has
      // none of the section's ambient light and everything below it
      // does, which reads as a visible cut. pt-16 keeps the actual
      // content position unchanged; only the decorative box moves.
      className="relative -mt-16 flex min-h-screen scroll-mt-24 flex-col justify-center overflow-hidden px-6 pb-6 pt-24 md:px-12 md:pb-0"
    >
      {/* Pulled in from the margins to sit directly behind the copy they
          light — the headline and the stats row — instead of drifting in
          empty space at the section's edges, where they read as ambient
          background decoration rather than an actual light source. */}
      {/* print:hidden — CSS can reset a DOM element's background/color for
          print (see globals.css's @media print), but a WebGL canvas
          paints its own pixels outside the CSS cascade entirely, so
          HeroCanvasLoader's drift field has to be hidden at the
          container level or it prints as an uncontrolled splash of
          color regardless of any stylesheet override. */}
      <div className="pointer-events-none absolute inset-0 print:hidden" aria-hidden="true">
        <motion.div style={{ y: blobOneY }} className="absolute left-32 top-[22%] h-96 w-96">
          <div className="aurora-blob h-full w-full rounded-full bg-accent/20 blur-[120px]" />
        </motion.div>
        <motion.div style={{ y: blobTwoY }} className="absolute bottom-[8%] left-[18%] h-96 w-96">
          <div className="aurora-blob h-full w-full rounded-full bg-accent-secondary/14 blur-[120px] [animation-delay:-9s]" />
        </motion.div>
        <HeroCanvasLoader />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_520px] lg:gap-16">
        {/* Only the CTA button is a bordered/filled element here —
            everything else (kicker, role, stats) is differentiated by
            typography alone, so the eye has one clear place to land
            instead of a stack of same-looking pills. */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-text-muted"
          >
            <span className="text-accent" aria-hidden="true">
              &gt;
            </span>
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-status-live motion-safe:animate-pulse"
              aria-hidden="true"
            />
            {t(heroStatusLine, language)}
            <LocalTimeBadge />
          </motion.p>

          <motion.h1
            variants={item}
            className="gradient-heading text-glow mt-8 bg-gradient-to-br from-text-primary via-text-primary to-accent bg-clip-text font-mono text-[length:var(--text-display-hero)] font-medium leading-[1.05] tracking-tight text-transparent md:leading-[0.95]"
          >
            {t(heroNameLine1, language)}
            <br />
            {t(heroNameLine2, language)}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 font-mono text-sm uppercase tracking-[0.2em]"
          >
            {heroRoles.map((role, i) => (
              <span key={role.en}>
                {i > 0 && <span className="mx-2 text-text-muted">·</span>}
                <span className={roleColors[i % roleColors.length]}>{t(role, language)}</span>
              </span>
            ))}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Magnetic>
              {/* --gradient-signature, not flat bg-accent — AGENTS.md
                  calls for the gradient on the primary CTA specifically,
                  "repeatedly... so it reads as a signature." This is
                  that CTA; Contact's submit button already matches it. */}
              <a
                href="#work"
                className="relative inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-sm font-medium text-bg transition-opacity hover:opacity-90"
                style={{ backgroundImage: "var(--gradient-signature)" }}
              >
                <span className="cta-glow" aria-hidden="true" />
                {t(strings.hero.viewWork, language)}
                <span aria-hidden="true">→</span>
              </a>
            </Magnetic>
            <a
              href="#contact"
              className="font-mono text-sm text-text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              {t(strings.hero.getInTouch, language)}
            </a>
          </motion.div>

          <motion.div variants={item} className="relative mt-10 pl-6 lg:mt-12">
            {/* Same trail-light mechanism as Experience's timeline, just
                shorter — a quiet answer to the orbit's traveling spark on
                this otherwise-static side of the layout, not a new motif. */}
            <div
              className="absolute inset-y-0 left-0 w-px overflow-hidden"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, var(--line) 20%, var(--line) 80%, transparent)",
              }}
            >
              <span
                aria-hidden="true"
                className="trail-light absolute left-1/2 h-10 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-accent to-transparent blur-[1px]"
              />
            </div>
            <dl className="flex flex-wrap gap-x-10 gap-y-6">
              {heroStats.map((stat, i) => (
                <div key={stat.label.en} className="relative lg:pl-8 lg:first:pl-0">
                  {/* Every divider between stats gets the same trail-light
                      treatment as the leading one above, not a plain
                      static border — otherwise only the first divider
                      reads as "lit" and the rest look inconsistent next
                      to it. */}
                  {i > 0 && (
                    <div
                      className="absolute inset-y-0 left-0 hidden w-px overflow-hidden lg:block"
                      style={{
                        background:
                          "linear-gradient(to bottom, transparent, var(--line) 20%, var(--line) 80%, transparent)",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="trail-light absolute left-1/2 h-10 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-accent to-transparent blur-[1px]"
                        style={{ animationDelay: "-1.5s" }}
                      />
                    </div>
                  )}
                  <dd className="font-mono text-2xl text-accent-secondary">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dt className="mt-1 font-mono text-[length:var(--text-2xs)] uppercase tracking-[0.15em] text-text-muted">
                    {t(stat.label, language)}
                  </dt>
                </div>
              ))}
            </dl>
          </motion.div>
        </motion.div>

        {/* opacity only, no scale — r3f's Canvas (inside HeroMark3DLoader)
            measures its container via getBoundingClientRect() on mount,
            which *includes* ancestor CSS transforms; animating `scale`
            here caught it mid-transform and permanently locked in a 5%
            too-small canvas (520px container measured as 494px), flush-
            left with a gap on the right. Confirmed by removing scale. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="relative flex justify-center print:hidden lg:justify-start"
        >
          {/* The mark IS the light source — a bright signature-gradient
              glow bleeding out from directly behind it, sized to the mark's
              own box so it reads as light the object is casting, not
              another ambient blob floating nearby. First in DOM order
              (and -z-10, for safety) so it paints behind the mark without
              needing to fight it for stacking. */}
          <div
            aria-hidden="true"
            className="aurora-blob pointer-events-none absolute inset-0 -z-10 scale-90 rounded-full opacity-40 blur-[90px]"
            style={{ backgroundImage: "var(--mark-glow)" }}
          />
          {/* The brand mark (navbar/footer/favicon — a round accent-ring
              "R") scaled up into an actual 3D object instead of a
              portrait photo: nothing to photograph once "no real photo"
              was the ask, and unlike a stand-in diagram, this is a real
              rendered scene, not a decoration pretending to be one.
              w-full needs a definite-width ancestor to resolve against —
              a shrink-to-fit parent (e.g. justify-self-center on the grid
              item) collapses the whole chain to 0px, so sizing is capped
              here via max-w instead of on the flex container above. */}
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-none">
            <HeroMark3DLoader />
          </div>
        </motion.div>
      </div>

      {/* Static in flow on mobile, absolute-pinned on md+ — on small
          screens the stacked text+mark content is routinely taller than
          one viewport, so min-h-screen's height ends up dictated by
          content rather than the viewport; an absolute bottom-8 then lands
          at the bottom of the *content* (right on the mark) instead of
          the bottom of the screen. Letting it sit in normal flow below
          the mark avoids the overlap outright instead of chasing the
          exact height math. */}
      <motion.a
        href="#work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative z-10 mx-auto mt-4 flex w-fit flex-col items-center gap-2 text-text-muted transition-colors hover:text-accent md:absolute md:bottom-8 md:left-1/2 md:mt-0 md:-translate-x-1/2"
        aria-label={t(strings.hero.scrollToWork, language)}
      >
        <span className="font-mono text-[length:var(--text-2xs)] uppercase tracking-[0.2em]">
          {t(strings.hero.scroll, language)}
        </span>
        <span className="h-8 w-px bg-current motion-safe:animate-bounce" />
      </motion.a>
    </section>
  );
}
