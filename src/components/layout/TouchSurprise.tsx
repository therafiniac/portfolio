"use client";

import { useEffect, useRef } from "react";
import { isBackgroundTarget } from "@/lib/backgroundTarget";
import { pickSurpriseOutcome, fireSurpriseOutcome } from "@/lib/easterEggGrabBag";

// Two touch-native gestures, neither with a real desktop equivalent —
// the actual gap in this site's hidden layers: several others already
// reach touch visitors by coincidence (a long-press maps to the native
// "contextmenu" event on both iOS Safari and Android Chrome, so
// ContextMenu.tsx already opens there with zero changes; 5 rapid taps
// fire the same onClick a mouse click would, so BrandMark's spin/
// StatusDot's flourish already work too) — but nothing was built *for*
// touch specifically until now.
//
// SHAKE_THRESHOLD is a commonly-used shake-detection value from how
// devicemotion-based shake detectors are typically built (a delta in
// real m/s² between consecutive accelerationIncludingGravity readings),
// not independently calibrated against a real device here — there isn't
// one to test against in this environment. Unlike ScrollFling's velocity
// guess (removed after it fired on ordinary scrolling), m/s² is a fixed
// physical unit with an established convention to draw from, not an
// arbitrary per-library number, so this is on meaningfully firmer ground
// — but if it still fires too eagerly or not at all, this constant is
// the knob.
const SHAKE_THRESHOLD = 16;
const SHAKE_COOLDOWN_MS = 2000;

export function TouchSurprise() {
  const lastShakeFire = useRef(0);
  const lastAcceleration = useRef<{ x: number; y: number; z: number } | null>(null);

  // A genuine two-finger tap — both touches lift together (exactly two
  // in changedTouches, zero remaining) — no duration/movement thresholds
  // to miscalibrate, just counting fingers. Only over background space
  // (backgroundTarget.ts), same reasoning as the double-click/paint
  // gestures: a two-finger tap on real content shouldn't hijack whatever
  // that content's own touch behavior is.
  useEffect(() => {
    function handleTouchEnd(e: TouchEvent) {
      if (e.touches.length !== 0 || e.changedTouches.length !== 2) return;
      const target = e.changedTouches[0].target as Element | null;
      if (!isBackgroundTarget(target)) return;
      if (document.querySelector('[role="dialog"], [role="alertdialog"]')) return;

      fireSurpriseOutcome(pickSurpriseOutcome());
    }

    window.addEventListener("touchend", handleTouchEnd);
    return () => window.removeEventListener("touchend", handleTouchEnd);
  }, []);

  // Shake the phone to trigger the same grab-bag.
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.DeviceMotionEvent === "undefined") return;

    // iOS 13+ gates devicemotion behind an explicit permission prompt
    // that only a real tap on a dedicated button can trigger — adding
    // one just for this would be more intrusive than the easter egg is
    // worth, so this simply never attaches on iOS rather than silently
    // asking and failing. Android and most other mobile browsers don't
    // gate it at all, so shake-to-reveal works there with no prompt.
    const iosGate = (window.DeviceMotionEvent as unknown as { requestPermission?: () => Promise<string> })
      .requestPermission;
    if (typeof iosGate === "function") return;

    function handleMotion(e: DeviceMotionEvent) {
      const a = e.accelerationIncludingGravity;
      if (!a || a.x === null || a.y === null || a.z === null) return;

      const prev = lastAcceleration.current;
      lastAcceleration.current = { x: a.x, y: a.y, z: a.z };
      if (!prev) return;

      const delta = Math.abs(a.x - prev.x) + Math.abs(a.y - prev.y) + Math.abs(a.z - prev.z);
      if (delta < SHAKE_THRESHOLD) return;

      const now = Date.now();
      if (now - lastShakeFire.current < SHAKE_COOLDOWN_MS) return;
      lastShakeFire.current = now;

      fireSurpriseOutcome(pickSurpriseOutcome());
    }

    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, []);

  return null;
}
