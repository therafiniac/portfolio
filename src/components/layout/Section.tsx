"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Localized } from "@/types";

type SectionProps = {
  id?: string;
  // Short, plain-English mono tag (e.g. "WORK", "STACK") rendered as a
  // giant faint "// TAG" watermark, top-right — a code-comment stamp
  // rather than a page-number-style index. Deliberately not translated:
  // like tech/notation elsewhere on the site, this is a fixed label, not
  // prose (see Localized in types/index.ts for that distinction).
  tag?: string;
  eyebrow: Localized;
  title: Localized;
  tint?: boolean;
  // False lets the caller compose its own eyebrow/heading inside
  // children instead of the default stacked-above-children layout — e.g.
  // Stack's two-column header, sitting beside its content instead of on
  // top of it. Section still owns the outer chrome (border, padding, tag
  // watermark, entrance animation) either way; eyebrow/title stay
  // required even when unrendered since they're still this section's
  // identity for anything reading the props.
  renderHeader?: boolean;
  children: ReactNode;
};

export function Section({ id, tag, eyebrow, title, tint, renderHeader = true, children }: SectionProps) {
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
      {tag && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-6 right-4 select-none whitespace-nowrap font-mono text-[clamp(1.5rem,5vw,4rem)] font-bold leading-none tracking-tight text-text-primary/[0.05] md:right-8"
        >
          {"// "}
          {tag}
        </span>
      )}
      <div className="relative mx-auto max-w-6xl">
        {renderHeader && <SectionHeading eyebrow={eyebrow} title={title} />}
        <div className={renderHeader ? "mt-10" : ""}>{children}</div>
      </div>
    </motion.section>
  );
}
