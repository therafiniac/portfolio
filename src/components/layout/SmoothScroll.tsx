"use client";

import { useSyncExternalStore } from "react";
import { ReactLenis } from "lenis/react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

// Treated as reduced-motion until the client snapshot corrects it post-
// hydration — matches every other reduced-motion check on this site in
// defaulting to the safer/quieter state rather than risking a flash of
// the animated one.
function getServerSnapshot() {
  return true;
}

// Lenis intercepts wheel/touch/keyboard scroll input and eases it into
// continuous, momentum-driven motion — the buttery feel CSS
// `scroll-behavior: smooth` can't produce on its own (that only smooths
// anchor-link jumps, not ordinary scrolling). `anchors: true` also routes
// nav-link/hash clicks through the same eased scrollTo instead of a
// native jump, so this replaces globals.css's scroll-behavior rule
// rather than stacking with it — running both fights over who owns the
// scroll position. useSyncExternalStore (not the effect+setState hook
// used elsewhere on this site) so reading `window` here stays safe
// during SSR without needing a separate ssr:false loader component.
export function SmoothScroll() {
  const reducedMotion = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (reducedMotion) return null;

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        anchors: true,
        // Lenis has no built-in idea that a Next.js route just changed —
        // without this, clicking a real link (e.g. a WorkCard) to a
        // different pathname left Lenis mid-animation from the old page,
        // still fighting for control of the new one. This resets that
        // in-flight state the moment a same-tab click's target pathname
        // differs from the current one. It only covers clicks, though —
        // see RouteScrollReset.tsx for the browser back/forward case,
        // which never fires a click at all.
        stopInertiaOnNavigate: true,
      }}
    />
  );
}
