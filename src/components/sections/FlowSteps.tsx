"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Localized } from "@/types";
import { useLanguage } from "@/lib/useLanguage";
import { t } from "@/lib/i18n";

type Track = { left: number; width: number };

// The mechanism as a small connected-node diagram — the same node/edge
// schematic language used in Hero, How I Build, and Work section (small
// circles + thin lines, final node pulsing) instead of a generic
// pill-and-arrow-icon UI pattern. Specific to what this project actually
// does, not a generic graphic swapped in by index.
//
// Client component (the rest of Projects.tsx stays a server component) —
// only the connecting lines need Framer Motion, for the left-to-right
// scaleX reveal below.
export function FlowSteps({ steps }: { steps: Localized[] }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [track, setTrack] = useState<Track | null>(null);
  const language = useLanguage();

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    // The Experience timeline gets the light's travel bounds for free —
    // its dots sit at a fixed offset regardless of content, so a plain
    // percentage-based CSS animation already lines up with them. Here
    // each dot centers inside a column sized to its own label, so the
    // equivalent bound has to be measured rather than assumed: this
    // reads the real first/last dot positions so the track div below
    // can be sized to exactly [first dot, last dot].
    const measure = () => {
      const dots = dotRefs.current.filter((el): el is HTMLSpanElement => el !== null);
      if (dots.length < 2) {
        setTrack(null);
        return;
      }
      const rowRect = row.getBoundingClientRect();
      const centers = dots.map((dot) => {
        const dotRect = dot.getBoundingClientRect();
        return dotRect.left + dotRect.width / 2 - rowRect.left;
      });
      const left = centers[0];
      setTrack({ left, width: centers[centers.length - 1] - left });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    return () => observer.disconnect();
  }, [steps]);

  return (
    <div ref={rowRef} className="relative mt-6 flex items-start">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <div key={step.en} className="contents">
            <div className="flex flex-col items-center gap-2 px-1">
              <span
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
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
              <span className="whitespace-nowrap font-mono text-[length:var(--text-2xs)] uppercase tracking-[0.08em] text-text-muted">
                {t(step, language)}
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

      {/* Exactly the Experience timeline's trail-light mechanism (see
          globals.css), turned 90 degrees: a plain CSS animation — not
          Framer Motion — travels left/opacity by percentage inside an
          overflow-hidden container, so it's cheap and its speed doesn't
          depend on measuring anything. The only thing that does need
          measuring is where that container goes (see the effect above);
          once it's sized to exactly [first dot, last dot], the -8%/108%
          overshoot in flow-light-travel gets clipped at those dots the
          same way the vertical version gets clipped at its line's ends. */}
      {track && (
        <div
          className="pointer-events-none absolute top-[5px] h-[3px] -translate-y-1/2 overflow-hidden"
          style={{ left: track.left, width: track.width }}
          aria-hidden="true"
        >
          <span className="flow-light absolute top-1/2 h-[3px] w-16 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent blur-[1px]" />
        </div>
      )}
    </div>
  );
}
