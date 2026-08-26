"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useLenis } from "lenis/react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Shared behavior for every overlay-style UI on this site (Lightbox,
// CommandPalette, the mobile nav menu) — each used to implement its own
// partial version of this (some had scroll-lock, none had a focus trap
// or returned focus on close, background content stayed keyboard-
// reachable throughout). One hook instead of three inconsistent ad-hoc
// implementations.
//
// `dialogRef` must point to a node that is (or, via a portal, has been
// made into) a direct child of <body> — layout.tsx's MotionConfig/
// AnimatePresence wrappers render no DOM of their own, so every real
// dialog root already satisfies this once portaled correctly (see
// Lightbox.tsx). That's what makes the inert-siblings loop below a
// single generic technique rather than something each consumer has to
// special-case.
export function useModalA11y(open: boolean, dialogRef: RefObject<HTMLElement | null>) {
  const previouslyFocused = useRef<HTMLElement | null>(null);
  // SmoothScroll.tsx's Lenis intercepts wheel/touch input at the window
  // level and drives its own virtual scroll independent of the native
  // scrollbar — body.style.overflow alone (below) doesn't stop it, which
  // is exactly why scrolling inside a dialog was scrolling the page
  // underneath it instead. lenis.stop()/start() is the actual fix;
  // returns undefined when reduced motion is on (SmoothScroll renders
  // nothing then), so every call below is optional-chained.
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const inertedSiblings: HTMLElement[] = [];
    for (const child of Array.from(document.body.children)) {
      if (!(child instanceof HTMLElement)) continue;
      if (child === dialog || child.contains(dialog)) continue;
      child.setAttribute("inert", "");
      inertedSiblings.push(child);
    }

    function handleKeydown(event: KeyboardEvent) {
      if (event.key !== "Tab") return;
      const focusable = dialog!.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    dialog.addEventListener("keydown", handleKeydown);

    return () => {
      dialog.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = previousOverflow;
      inertedSiblings.forEach((el) => el.removeAttribute("inert"));
      previouslyFocused.current?.focus();
      lenis?.start();
    };
  }, [open, dialogRef, lenis]);
}
