"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useReducedMotion, animate } from "framer-motion";
import { useLanguage } from "@/lib/useLanguage";
import { localizeNumber } from "@/lib/i18n";

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
  const language = useLanguage();

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
        ref.current.textContent = `${prefix}${localizeNumber(Math.round(latest), language)}${suffix}`;
      }
    });
  }, [motionValue, prefix, suffix, language]);

  // The "change" subscription above only fires while the count-up is
  // actually animating — once it settles (e.g. right after mount, in
  // whatever language was active then), a later language toggle has no
  // motionValue change to react to, so the already-finished digits never
  // re-render. This re-stamps the current (possibly mid-animation, more
  // often already-settled) value whenever the language switches.
  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = `${prefix}${localizeNumber(Math.round(motionValue.get()), language)}${suffix}`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <span ref={ref}>
      {prefix}
      {localizeNumber(0, language)}
      {suffix}
    </span>
  );
}
