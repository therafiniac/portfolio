"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

// SmoothScroll.tsx's stopInertiaOnNavigate only resets Lenis when a click
// initiates the navigation — the browser's back/forward buttons (and
// swipe-back gestures) fire a popstate, not a click, so that reset never
// ran for them. Left unhandled, Lenis kept whatever scroll-animation
// state and position it had on the *previous* route, which is what made
// "back" from a case-study page feel broken or land somewhere wrong.
// usePathname() re-renders on every route change regardless of how it
// was triggered, so this catches the case stopInertiaOnNavigate can't.
//
// Root-mounted (ReactLenis's `root` option publishes to a global store,
// not just React context), so this can live as its own sibling in
// layout.tsx rather than needing to nest inside <ReactLenis>.
export function RouteScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    // A destination that already carries its own hash (e.g. "/#work" from
    // the case-study "Back to Work" link) has somewhere specific to land —
    // forcing scroll-to-top here would fight that instead of complementing
    // it, so this only handles the plain, hash-less navigations.
    if (window.location.hash) return;
    lenis.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}
