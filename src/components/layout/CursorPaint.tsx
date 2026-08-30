"use client";

import { useEffect, useRef } from "react";
import { isBackgroundTarget } from "@/lib/backgroundTarget";

// A separate toy from CursorTrail.tsx's own always-on ambient ribbon —
// deliberately its own component/canvas rather than a mode bolted onto
// that one, so nothing here can regress the passive trail every visitor
// already sees. Only draws while the mouse button is actually held down
// and dragged, like a real tool, and only over isBackgroundTarget space
// (backgroundTarget.ts) — gating it to background is what keeps click-
// dragging a real link/button/paragraph (normal text selection, normal
// interaction) completely unaffected; this never even attaches its drag
// listeners unless the drag started on open space.
//
// A cipher trail, not paint — small glyphs spawn along the drag path,
// flicker through a few random characters (the same idea the reference
// "encrypt" button's text-scramble uses, just applied to a trail instead
// of a fixed word — there's no target string to resolve *to* here, so
// each glyph just settles on whatever it lands on and fades), then fade.
// Fits this site's own terminal/matrix vocabulary (MatrixRain.tsx,
// the interactive terminal) far more than a smooth painted line did.
const SPAWN_DISTANCE = 24;
const SCRAMBLE_MS = 160;
const SCRAMBLE_TICK_MS = 40;
const LIFE_MS = 1500;
const FONT_SIZE = 15;
const GLYPH_CHARS = "!@#$%^&*(){}[]<>/\\|;:.,?01";

type RGB = [number, number, number];
type Glyph = {
  x: number;
  y: number;
  bornAt: number;
  lastTickAt: number;
  char: string;
  color: RGB;
};

function hexToRgb(hex: string): RGB {
  const clean = hex.trim().replace("#", "");
  const n = parseInt(clean, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function randomChar(): string {
  return GLYPH_CHARS[Math.floor(Math.random() * GLYPH_CHARS.length)];
}

export function CursorPaint() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Same gating CursorTrail.tsx uses — a coarse pointer (touch) never
    // fires the mouse events this depends on anyway, and reduced motion
    // means no fading/flickering visuals regardless of who's driving them.
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isCoarsePointer || reducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rootStyle = getComputedStyle(document.documentElement);
    const accent = hexToRgb(rootStyle.getPropertyValue("--accent") || "#89b4fa");
    const accentSecondary = hexToRgb(rootStyle.getPropertyValue("--accent-secondary") || "#eba0ac");

    let width = window.innerWidth;
    let height = window.innerHeight;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const glyphs: Glyph[] = [];
    let isDrawing = false;
    let lastSpawnX = 0;
    let lastSpawnY = 0;

    function spawn(x: number, y: number) {
      const now = performance.now();
      glyphs.push({
        x,
        y,
        bornAt: now,
        lastTickAt: now,
        char: randomChar(),
        color: Math.random() < 0.5 ? accent : accentSecondary,
      });
    }

    function handleMouseDown(e: MouseEvent) {
      if (e.button !== 0) return;
      if (!isBackgroundTarget(e.target as Element | null)) return;
      // Without this, dragging over open space still tries to start a
      // native text selection underneath the trail — harmless
      // functionally, but the visible selection highlight fighting the
      // glyphs for attention looked broken, not like a real tool.
      e.preventDefault();
      isDrawing = true;
      lastSpawnX = e.clientX;
      lastSpawnY = e.clientY;
      spawn(e.clientX, e.clientY);
    }

    function handleMouseMove(e: MouseEvent) {
      if (!isDrawing) return;
      // Spawns every SPAWN_DISTANCE of actual travel, not every
      // mousemove event — a raw per-event spawn rate produces a solid
      // wall of glyphs on a fast drag and almost none on a slow one;
      // distance-based spacing keeps the trail's density consistent
      // regardless of drag speed.
      const dx = e.clientX - lastSpawnX;
      const dy = e.clientY - lastSpawnY;
      if (Math.hypot(dx, dy) < SPAWN_DISTANCE) return;
      lastSpawnX = e.clientX;
      lastSpawnY = e.clientY;
      spawn(e.clientX, e.clientY);
    }

    function stopDrawing() {
      isDrawing = false;
    }

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseup", stopDrawing);
    window.addEventListener("mouseleave", stopDrawing);

    let frameId: number;
    function tick() {
      frameId = requestAnimationFrame(tick);
      const now = performance.now();
      ctx!.clearRect(0, 0, width, height);
      ctx!.font = `${FONT_SIZE}px monospace`;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";

      for (let i = glyphs.length - 1; i >= 0; i--) {
        const glyph = glyphs[i];
        const age = now - glyph.bornAt;
        if (age > LIFE_MS) {
          glyphs.splice(i, 1);
          continue;
        }

        // Flickers through random characters for the first SCRAMBLE_MS
        // (the "encrypting" beat), then freezes on whatever it landed on
        // and just fades for the rest of its life — never resolves to a
        // specific target character, since there's no fixed word here,
        // only a trail.
        if (age < SCRAMBLE_MS && now - glyph.lastTickAt >= SCRAMBLE_TICK_MS) {
          glyph.char = randomChar();
          glyph.lastTickAt = now;
        }

        const fadeProgress = Math.max(age - SCRAMBLE_MS, 0) / (LIFE_MS - SCRAMBLE_MS);
        const alpha = 1 - fadeProgress;
        const [r, g, b] = glyph.color;
        ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx!.fillText(glyph.char, glyph.x, glyph.y);
      }
    }
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDrawing);
      window.removeEventListener("mouseleave", stopDrawing);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[32]"
    />
  );
}
