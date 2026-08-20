"use client";

import { motion } from "framer-motion";
import { HeroCanvasLoader } from "@/components/three/HeroCanvasLoader";

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

const stats = [
  { value: "4+", label: "Years Experience" },
  { value: "150+", label: "Sites Shipped" },
  { value: "O(N)", label: "Comment-Tree Algorithm" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen scroll-mt-24 flex-col justify-center overflow-hidden px-6 md:px-12"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="aurora-blob absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />
        <div className="aurora-blob absolute -right-24 bottom-1/4 h-96 w-96 rounded-full bg-accent-secondary/15 blur-[120px] [animation-delay:-9s]" />
        <HeroCanvasLoader />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-5xl"
      >
        <motion.p
          variants={item}
          className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-text-muted"
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-status-live motion-safe:animate-pulse"
            aria-hidden="true"
          />
          STATUS: OPEN TO OPPORTUNITIES · KOLKATA, INDIA / REMOTE
        </motion.p>

        <motion.h1
          variants={item}
          className="text-glow bg-gradient-to-br from-text-primary via-text-primary to-accent bg-clip-text font-mono text-[clamp(2.75rem,9vw,7rem)] font-medium leading-[0.95] tracking-tight text-transparent"
        >
          Rafi Ahmed
          <br />
          Laskar
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-lg text-text-muted md:text-xl"
        >
          Full Stack Developer — Next.js / TypeScript / Systems that scale.
        </motion.p>

        <motion.dl
          variants={item}
          className="mt-10 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.1em]"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-panel flex items-baseline gap-2 rounded-full px-4 py-2"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-accent-secondary">{stat.value}</dd>
              <span className="text-text-muted" aria-hidden="true">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
