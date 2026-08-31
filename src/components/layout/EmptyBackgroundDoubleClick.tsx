"use client";

import { useEffect } from "react";
import { triggerPageShake } from "@/components/layout/PageShake";
import { isBackgroundTarget } from "@/lib/backgroundTarget";

// A hidden gesture no other easter egg on this site claims — double-
// clicking empty space shakes the whole page, the same PageShake.tsx
// effect not-found.tsx and under-construction/page.tsx already trigger
// on their own 3-click gestures. See backgroundTarget.ts for how "empty"
// is actually determined.
export function EmptyBackgroundDoubleClick() {
  useEffect(() => {
    function handleDoubleClick(e: MouseEvent) {
      if (!isBackgroundTarget(e.target as Element | null)) return;
      // Never fires while any dialog (command palette, keyboard
      // shortcuts, the case-study lightbox, this site's own modal-style
      // alerts) is open — a double-click landing on a dialog's own
      // backdrop shouldn't also shake the page underneath it.
      if (document.querySelector('[role="dialog"], [role="alertdialog"]')) return;

      triggerPageShake();
    }

    window.addEventListener("dblclick", handleDoubleClick);
    return () => window.removeEventListener("dblclick", handleDoubleClick);
  }, []);

  return null;
}
