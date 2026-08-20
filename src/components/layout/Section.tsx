"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function Section({ id, eyebrow, title, children }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="scroll-mt-24 px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <span className="inline-block rounded-full border border-line/40 bg-surface/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-secondary backdrop-blur">
          {eyebrow}
        </span>
        <h2 className="mt-4 font-mono text-3xl font-medium text-text-primary md:text-4xl">
          {title}
        </h2>
        <div className="mt-10">{children}</div>
      </div>
    </motion.section>
  );
}
