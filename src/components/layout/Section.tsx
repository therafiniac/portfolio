"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  index?: string;
  eyebrow: string;
  title: string;
  tint?: boolean;
  // False lets the caller compose its own eyebrow/heading inside
  // children instead of the default stacked-above-children layout — e.g.
  // Stack's two-column header, sitting beside its content instead of on
  // top of it. Section still owns the outer chrome (border, padding,
  // index watermark, entrance animation) either way; eyebrow/title stay
  // required even when unrendered since they're still this section's
  // identity for anything reading the props.
  renderHeader?: boolean;
  children: ReactNode;
};

export function Section({ id, index, eyebrow, title, tint, renderHeader = true, children }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative scroll-mt-24 overflow-hidden border-t border-line/30 px-6 py-24 md:px-12 md:py-32 ${
        tint ? "bg-surface/40" : ""
      }`}
    >
      {index && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-4 right-4 select-none font-mono text-[clamp(6rem,18vw,14rem)] font-bold leading-none text-text-primary/[0.035] md:right-8"
        >
          {index}
        </span>
      )}
      <div className="relative mx-auto max-w-6xl">
        {renderHeader && (
          <>
            <span className="inline-block rounded-full border border-line/40 bg-surface/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-secondary backdrop-blur">
              {eyebrow}
            </span>
            <h2 className="mt-4 font-mono text-3xl font-medium text-text-primary md:text-4xl">
              {title}
            </h2>
          </>
        )}
        <div className={renderHeader ? "mt-10" : ""}>{children}</div>
      </div>
    </motion.section>
  );
}
