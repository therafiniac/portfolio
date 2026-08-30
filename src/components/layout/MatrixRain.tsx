"use client";

import { useEffect, useRef, useState } from "react";

const TRIGGER_EVENT = "easter:matrix";
const DURATION_MS = 4000;
const FONT_SIZE = 16;
const FRAME_INTERVAL_MS = 45;
// Latin digits plus katakana, the same glyph mix the reference "digital
// rain" effect uses — not meaningful text, purely visual texture.
const GLYPHS = "01アイウエオカキクケコサシスセソタチツテト";

// Fired by the Skills terminal's hidden "matrix" command (see
// Skills.tsx).
export function triggerMatrixRain() {
  window.dispatchEvent(new Event(TRIGGER_EVENT));
}

// A canvas rain overlay in the site's own accent/accent-secondary
// colors, read from the live CSS custom properties at trigger time (not
// hardcoded hex) so it stays correct across theme toggles and between
// Mocha/Latte — auto-dismisses after DURATION_MS, or immediately on any
// click/keypress so it never traps someone mid-page.
export function MatrixRain() {
  const [active, setActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    function handleTrigger() {
      // Decorative-only, so it simply doesn't run under reduced motion
      // rather than showing a degraded version — same call every other
      // purely-decorative effect on this site makes.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      setActive(true);
      window.setTimeout(() => setActive(false), DURATION_MS);
    }
    window.addEventListener(TRIGGER_EVENT, handleTrigger);
    return () => window.removeEventListener(TRIGGER_EVENT, handleTrigger);
  }, []);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const bg = styles.getPropertyValue("--bg").trim() || "#11111b";
    const accent = styles.getPropertyValue("--accent").trim() || "#89b4fa";
    const accentSecondary = styles.getPropertyValue("--accent-secondary").trim() || "#eba0ac";

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function dismiss() {
      setActive(false);
    }
    // Deferred a tick, not attached synchronously — the keydown (Enter,
    // submitting "matrix") that triggers this effect is still bubbling up
    // to `window` at this point in the same call stack, so a listener
    // added right here would catch its own trigger and instantly dismiss:
    // a one-frame flash that looked exactly like nothing happened.
    const dismissListenersTimer = window.setTimeout(() => {
      window.addEventListener("keydown", dismiss);
      window.addEventListener("click", dismiss);
    }, 0);

    const columns = Math.ceil(canvas.width / FONT_SIZE);
    const drops = new Array(columns).fill(1);

    const interval = window.setInterval(() => {
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      ctx.font = `${FONT_SIZE}px monospace`;

      drops.forEach((y, i) => {
        const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        ctx.fillStyle = i % 2 === 0 ? accent : accentSecondary;
        ctx.fillText(glyph, i * FONT_SIZE, y * FONT_SIZE);
        drops[i] = y * FONT_SIZE > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
      });
    }, FRAME_INTERVAL_MS);

    return () => {
      window.clearTimeout(dismissListenersTimer);
      window.clearInterval(interval);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("click", dismiss);
    };
  }, [active]);

  if (!active) return null;

  return <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 z-[95] cursor-pointer" />;
}
