"use client";

import { motion } from "framer-motion";

// The mechanism as a small connected-node diagram — the same node/edge
// schematic language used in Hero, How I Build, and Work section (small
// circles + thin lines, final node pulsing) instead of a generic
// pill-and-arrow-icon UI pattern. Specific to what this project actually
// does, not a generic graphic swapped in by index.
//
// Client component (the rest of Projects.tsx stays a server component) —
// only the connecting lines need Framer Motion, for the left-to-right
// scaleX reveal below.
export function FlowSteps({ steps }: { steps: string[] }) {
  return (
    <div className="mt-6 flex items-start">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <div key={step} className="contents">
            <div className="flex flex-col items-center gap-2 px-1">
              <span
                className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                  isLast ? "bg-accent-secondary motion-safe:animate-pulse" : "bg-accent-secondary/70"
                }`}
                aria-hidden="true"
              />
              {/* Steps are kept short at the data level (see projects.ts)
                  specifically so this never wraps — a wrapped label makes
                  neighboring dots sit at uneven heights and the whole
                  diagram reads as messy. whitespace-nowrap is the hard
                  guarantee on top of that. */}
              <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.08em] text-text-muted">
                {step}
              </span>
            </div>
            {!isLast && (
              // scaleX (not width) — a transform, so this animates cheaply
              // without triggering layout. transform-origin left makes it
              // grow left-to-right instead of from the center.
              <motion.div
                className="mt-[5px] h-px flex-1 bg-accent/30"
                style={{ transformOrigin: "left" }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.15 }}
                aria-hidden="true"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
