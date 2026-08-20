"use client";

import { motion } from "framer-motion";
import { HeroCanvasLoader } from "@/components/three/HeroCanvasLoader";
import { CountUp } from "@/components/layout/CountUp";
import { Magnetic } from "@/components/layout/Magnetic";
import { FramedImage } from "@/components/layout/FramedImage";
import { TiltCard } from "@/components/layout/TiltCard";
import { heroRoles, heroStatusLine, heroStats } from "@/lib/data/hero";
import type { GithubStats } from "@/lib/github";

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

type HeroProps = {
  githubStats: GithubStats | null;
};

export function Hero({ githubStats }: HeroProps) {
  return (
    <section
      id="top"
      className="relative flex min-h-screen scroll-mt-24 flex-col justify-center overflow-hidden px-6 md:px-12"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="aurora-blob absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />
        <div className="aurora-blob absolute -right-24 bottom-1/4 h-96 w-96 rounded-full bg-accent-secondary/15 blur-[120px] [animation-delay:-9s]" />
        <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/10" />
        <div className="absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/5" />
        <HeroCanvasLoader />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
        {/* Only the CTA button is a bordered/filled element here —
            everything else (kicker, role, stats) is differentiated by
            typography alone, so the eye has one clear place to land
            instead of a stack of same-looking pills. */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-text-muted"
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-status-live motion-safe:animate-pulse"
              aria-hidden="true"
            />
            {heroStatusLine}
          </motion.p>

          <motion.h1
            variants={item}
            className="text-glow mt-4 bg-gradient-to-br from-text-primary via-text-primary to-accent bg-clip-text font-mono text-[clamp(2.75rem,9vw,7rem)] font-medium leading-[0.95] tracking-tight text-transparent"
          >
            Rafi Ahmed
            <br />
            Laskar
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 font-mono text-sm uppercase tracking-[0.2em]"
          >
            {heroRoles.map((role, i) => (
              <span key={role}>
                {i > 0 && <span className="mx-2 text-text-muted">·</span>}
                <span className={roleColors[i % roleColors.length]}>{role}</span>
              </span>
            ))}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Magnetic>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-sm font-medium text-bg transition-opacity hover:opacity-90"
              >
                View My Work
                <span aria-hidden="true">→</span>
              </a>
            </Magnetic>
            <a
              href="#contact"
              className="font-mono text-sm text-text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              Get in Touch
            </a>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-12 flex flex-wrap gap-x-10 gap-y-6"
          >
            {heroStats.map((stat) => (
              <div key={stat.label} className="lg:border-l lg:border-line/60 lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
                <dd className="font-mono text-2xl text-accent-secondary">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted">
                  {stat.label}
                </dt>
              </div>
            ))}
            {githubStats && (
              <div className="lg:border-l lg:border-line/60 lg:pl-8">
                <dd className="flex items-center gap-1.5 font-mono text-2xl text-accent-secondary">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-status-live motion-safe:animate-pulse"
                    aria-hidden="true"
                  />
                  <CountUp value={githubStats.publicRepos} />
                </dd>
                <dt className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted">
                  Public Repos (Live)
                </dt>
              </div>
            )}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex justify-center lg:justify-start"
        >
          {/* w-full needs a definite-width ancestor to resolve against —
              a shrink-to-fit parent (e.g. justify-self-center on the grid
              item) collapses the whole chain to 0px, so sizing is capped
              here via max-w instead of on the flex container above. */}
          <div className="w-full max-w-[260px] sm:max-w-xs lg:max-w-none">
            <TiltCard className="block w-full">
              <FramedImage src="/img1.jpeg" alt="Rafi Ahmed Laskar" priority />
            </TiltCard>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-text-muted transition-colors hover:text-accent"
        aria-label="Scroll to work"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
          Scroll
        </span>
        <span className="h-8 w-px bg-current motion-safe:animate-bounce" />
      </motion.a>
    </section>
  );
}
