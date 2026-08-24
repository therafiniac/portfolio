"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/useTheme";

// A chain of points, not a single dot — point 0 chases the real cursor
// tightly, each point after it chases the one before it a little more
// loosely (see EASE below), so the chain naturally bows into a smooth
// ribbon behind the pointer instead of a rigid offset line. Longer chain
// = longer, more visible tail.
const CHAIN_LENGTH = 18;
const EASE_HEAD = 0.35;
const EASE_TAIL = 0.1;

const HEAD_WIDTH = 5.5;
const TAIL_WIDTH = 0.5;

type RGB = [number, number, number];

function hexToRgb(hex: string): RGB {
  const clean = hex.trim().replace("#", "");
  const n = parseInt(clean, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpRgb(a: RGB, b: RGB, t: number): RGB {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

// A smooth light-ribbon trail, not discrete fading dots — same
// "background light layer, not a custom cursor" rule as CursorGlow.tsx:
// the native OS pointer stays untouched. Runs on a canvas rather than
// DOM nodes (CursorGlow's ref-mutation approach doesn't scale to a
// continuously redrawn curved, tapered, glowing line) with its own
// requestAnimationFrame loop instead of React state, since this needs
// to repaint every frame regardless of whether the mouse is currently
// moving (the chain keeps easing toward its target for a few frames
// after the cursor stops).
export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (isCoarsePointer || reducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Read as literal RGB, not left as a CSS var — canvas gradients/
    // rgba() strings need real channel values to interpolate between,
    // the same constraint useTheme.ts documents for the WebGL materials.
    const rootStyle = getComputedStyle(document.documentElement);
    const headColor = hexToRgb(rootStyle.getPropertyValue("--accent") || "#89b4fa");
    const tailColor = hexToRgb(rootStyle.getPropertyValue("--accent-secondary") || "#eba0ac");

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
      // setTransform, not scale — scale() compounds on every resize
      // call, setTransform replaces it outright.
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const target = { x: width / 2, y: height / 2 };
    const points = Array.from({ length: CHAIN_LENGTH }, () => ({ ...target }));
    let hasMoved = false;

    function handleMove(e: MouseEvent) {
      target.x = e.clientX;
      target.y = e.clientY;
      hasMoved = true;
    }
    window.addEventListener("mousemove", handleMove, { passive: true });

    let frameId: number;
    function tick() {
      frameId = requestAnimationFrame(tick);
      if (!hasMoved) return;

      points[0].x = lerp(points[0].x, target.x, EASE_HEAD);
      points[0].y = lerp(points[0].y, target.y, EASE_HEAD);
      for (let i = 1; i < points.length; i++) {
        const ease = lerp(EASE_HEAD, EASE_TAIL, i / (points.length - 1));
        points[i].x = lerp(points[i].x, points[i - 1].x, ease);
        points[i].y = lerp(points[i].y, points[i - 1].y, ease);
      }

      ctx!.clearRect(0, 0, width, height);
      ctx!.lineCap = "round";
      ctx!.lineJoin = "round";

      // Glow pass: the whole path in one thick, blurred, low-alpha
      // stroke — a single draw call rather than blurring every tapered
      // segment below, which would be the same visual result for far
      // more per-frame cost.
      ctx!.beginPath();
      ctx!.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx!.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      const [gr, gg, gb] = headColor;
      ctx!.strokeStyle = `rgba(${gr}, ${gg}, ${gb}, 0.22)`;
      ctx!.lineWidth = HEAD_WIDTH * 2.2;
      ctx!.shadowColor = `rgba(${gr}, ${gg}, ${gb}, 0.5)`;
      ctx!.shadowBlur = 16;
      ctx!.stroke();
      ctx!.shadowBlur = 0;

      // Core pass: tapered width + color (head accent → tail accent-
      // secondary, the same signature-gradient pairing the rest of the
      // site uses) drawn per-segment, since a single stroke() call can
      // only have one width/color for its entire path.
      for (let i = 0; i < points.length - 1; i++) {
        const t = i / (points.length - 2);
        const [r, g, b] = lerpRgb(headColor, tailColor, t);
        ctx!.beginPath();
        ctx!.moveTo(points[i].x, points[i].y);
        ctx!.lineTo(points[i + 1].x, points[i + 1].y);
        ctx!.lineWidth = lerp(HEAD_WIDTH, TAIL_WIDTH, t);
        ctx!.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lerp(0.9, 0, t)})`;
        ctx!.stroke();
      }
    }
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[31]"
    />
  );
}
