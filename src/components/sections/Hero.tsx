"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HeroCanvasLoader } from "@/components/three/HeroCanvasLoader";
import { CountUp } from "@/components/layout/CountUp";
import { Magnetic } from "@/components/layout/Magnetic";
import { FramedImage } from "@/components/layout/FramedImage";
import { heroRoles, heroTagline, heroStatusLine, heroStats } from "@/lib/data/hero";
import type { GithubStats } from "@/lib/github";

const istFormatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

// Ticks locally rather than being server-rendered so it's never stale by
// the time a visitor sees it; null on first paint avoids a server/client
// hydration mismatch (the server has no meaningful "now").
function useISTClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(istFormatter.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
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

type HeroProps = {
  githubStats: GithubStats | null;
};

export function Hero({ githubStats }: HeroProps) {
  const istTime = useISTClock();

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
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="mb-6 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-text-muted"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-status-live motion-safe:animate-pulse"
              aria-hidden="true"
            />
            {heroStatusLine}
            {istTime && <span className="text-accent-secondary">· {istTime} IST</span>}
          </motion.p>

          <motion.h1
            variants={item}
            className="text-glow bg-gradient-to-br from-text-primary via-text-primary to-accent bg-clip-text font-mono text-[clamp(2.75rem,9vw,7rem)] font-medium leading-[0.95] tracking-tight text-transparent"
          >
            Rafi Ahmed
            <br />
            Laskar
          </motion.h1>

          <motion.div variants={item} className="mt-6 flex flex-wrap gap-3">
            {heroRoles.map((role) => (
              <span
                key={role}
                className="glass-panel rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-accent"
              >
                {role}
              </span>
            ))}
          </motion.div>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-lg text-text-muted md:text-xl"
          >
            {heroTagline}
          </motion.p>

          <motion.div variants={item} className="mt-8">
            <Magnetic>
              <a
                href="#work"
                className="glass-panel inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-sm text-text-primary transition-colors hover:border-accent hover:text-accent"
              >
                View My Work
                <span aria-hidden="true">→</span>
              </a>
            </Magnetic>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-8 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.1em]"
          >
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="glass-panel flex items-baseline gap-2 rounded-full px-4 py-2"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-accent-secondary">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
                <span className="text-text-muted" aria-hidden="true">
                  {stat.label}
                </span>
              </div>
            ))}
            {githubStats && (
              <div className="glass-panel flex items-baseline gap-2 rounded-full px-4 py-2">
                <dt className="sr-only">Public GitHub Repos</dt>
                <span
                  className="h-1.5 w-1.5 self-center rounded-full bg-status-live motion-safe:animate-pulse"
                  aria-hidden="true"
                />
                <dd className="text-accent-secondary">
                  <CountUp value={githubStats.publicRepos} />
                </dd>
                <span className="text-text-muted" aria-hidden="true">
                  Public Repos (Live)
                </span>
              </div>
            )}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="hidden lg:flex"
        >
          <FramedImage
            src="/img1.jpeg"
            alt="Rafi Ahmed Laskar"
            caption="Rafi Ahmed Laskar"
            priority
          />
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
