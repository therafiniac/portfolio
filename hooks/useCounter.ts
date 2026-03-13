"use client";

import { useEffect, useRef, useState } from "react";

export function useCounter(
  end:      number,
  duration: number = 2000,
  start:    number = 0
) {
  const [count, setCount]     = useState(start);
  const [inView, setInView]   = useState(false);
  const ref                   = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const startTime = performance.now();
    const range     = end - start;

    const step = (now: number) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(start + range * eased));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [inView, start, end, duration]);

  return { count, ref };
}
