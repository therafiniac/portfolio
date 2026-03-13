"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow:   string;
  title:     string;
  highlight?: string;
  subtitle?: string;
  center?:   boolean;
  className?: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  highlight,
  subtitle,
  center = false,
  className,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-16",
        center && "text-center",
        className
      )}
    >
      {/* Eyebrow */}
      <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-[var(--brand)] mb-4">
        <span className="h-px w-6 bg-[var(--brand)] inline-block" />
        {eyebrow}
        <span className="h-px w-6 bg-[var(--brand)] inline-block" />
      </span>

      {/* Title */}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] leading-tight">
        {title}{" "}
        {highlight && (
          <span className="text-gradient">{highlight}</span>
        )}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-4 text-[var(--text-muted)] text-base sm:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
