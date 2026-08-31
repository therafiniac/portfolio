"use client";

import { useEffect } from "react";

const TRIGGER_EVENT = "easter:shake";
const SHAKE_DURATION_MS = 600;

// Fired by not-found.tsx and under-construction/page.tsx — the two "you
// ended up somewhere that isn't real content" pages share this one
// effect rather than each inventing their own, same reasoning as the
// terminal's "reboot" reusing PageGlitch for its own moment. A shake, not
// a glitch, so it reads as a distinct effect from PageGlitch rather than
// the same one wired to a second trigger.
export function triggerPageShake() {
  window.dispatchEvent(new Event(TRIGGER_EVENT));
}

// A CSS keyframe animation toggled via a class on <html> (see
// .page-shake in globals.css) rather than a React/framer-motion
// transform — the transform has to land on the root element so every
// fixed-position layer (Navbar, the cursor effects, floating buttons)
// shakes along with the actual page content, which a component-local
// motion.div wrapping only its own children couldn't do.
export function PageShake() {
  useEffect(() => {
    function handleTrigger() {
      // Decorative-only, so it simply doesn't run under reduced motion
      // rather than showing a degraded version — same call every other
      // purely-decorative effect on this site makes.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const root = document.documentElement;
      // Removing then re-adding on the next frame (rather than just
      // adding) restarts the animation even if it's still mid-shake from
      // a very recent previous trigger — re-adding a class that's already
      // present is a no-op for CSS animations, so without this a rapid
      // second trigger would silently do nothing.
      root.classList.remove("page-shake");
      void root.offsetWidth;
      root.classList.add("page-shake");
      window.setTimeout(() => root.classList.remove("page-shake"), SHAKE_DURATION_MS);
    }
    window.addEventListener(TRIGGER_EVENT, handleTrigger);
    return () => window.removeEventListener(TRIGGER_EVENT, handleTrigger);
  }, []);

  return null;
}
