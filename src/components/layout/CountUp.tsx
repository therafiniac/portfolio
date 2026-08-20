"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useReducedMotion, animate } from "framer-motion";

type CountUpProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
};

export function CountUp({ value, prefix = "", suffix = "", duration = 1.2 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const motionValue = useMotionValue(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      motionValue.set(value);
      return;
    }
    const controls = animate(motionValue, value, { duration, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, value, duration, reducedMotion, motionValue]);

  useEffect(() => {
    return motionValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      }
    });
  }, [motionValue, prefix, suffix]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}
