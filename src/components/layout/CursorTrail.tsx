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

// A fast enough flick of the cursor bursts a shower of small embers off
// the trail that actually fall (real projectile motion — x is linear in
// time, y adds a constant-acceleration term) rather than just fading in
// place — a hidden layer triggered by raw motion instead of a click or
// keypress, the one input channel none of the others use. No dedicated
// UI, no hint anywhere: purely for whoever already whips their mouse
// around a page out of habit.
const SPARK_VELOCITY_THRESHOLD = 1.2; // px/ms — a brisk flick, not a hard slam
const SPARK_DECAY_MS = 300;
const PARTICLE_COUNT_PER_BURST = 12;
const PARTICLE_LIFE_MS = 700;
// px/ms² — tuned by eye so a particle has visibly arced/fallen by the
// time it fades out, not just drifted.
const PARTICLE_GRAVITY = 0.0005;

type RGB = [number, number, number];

type Particle = {
  x0: number;
  y0: number;
  vx: number;
  vy: number;
  bornAt: number;
  color: RGB;
};

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
    const particles: Particle[] = [];

    let lastMoveTime = performance.now();
    let lastX = target.x;
    let lastY = target.y;
    let sparkUntil = 0;

    // Emitted once per flick (the `now >= sparkUntil` check below is the
    // rising edge into a new spark window, not every qualifying frame
    // while the cursor is still moving fast) — otherwise a single long
    // flick would spawn a full burst on every mousemove event along the
    // way instead of one shower at the start of it.
    function spawnSparkBurst(x: number, y: number, dx: number, dy: number, now: number) {
      const angleBase = Math.atan2(-dy, -dx);
      for (let i = 0; i < PARTICLE_COUNT_PER_BURST; i++) {
        const angle = angleBase + (Math.random() - 0.5) * 2.4;
        const speed = 0.12 + Math.random() * 0.28;
        particles.push({
          x0: x,
          y0: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          bornAt: now,
          color: Math.random() < 0.5 ? headColor : tailColor,
        });
      }
    }

    function handleMove(e: MouseEvent) {
      const now = performance.now();
      const dt = Math.max(now - lastMoveTime, 1);
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const velocity = Math.hypot(dx, dy) / dt;
      if (velocity > SPARK_VELOCITY_THRESHOLD) {
        if (now >= sparkUntil) spawnSparkBurst(e.clientX, e.clientY, dx, dy, now);
        sparkUntil = now + SPARK_DECAY_MS;
      }
      lastMoveTime = now;
      lastX = e.clientX;
      lastY = e.clientY;

      target.x = e.clientX;
      target.y = e.clientY;
      hasMoved = true;
    }
    window.addEventListener("mousemove", handleMove, { passive: true });

    let frameId: number;
    function tick() {
      frameId = requestAnimationFrame(tick);
      if (!hasMoved) return;

      const now = performance.now();
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

      const sparking = now < sparkUntil;

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
      ctx!.strokeStyle = `rgba(${gr}, ${gg}, ${gb}, ${sparking ? 0.35 : 0.22})`;
      ctx!.lineWidth = HEAD_WIDTH * (sparking ? 2.8 : 2.2);
      ctx!.shadowColor = `rgba(${gr}, ${gg}, ${gb}, 0.5)`;
      ctx!.shadowBlur = sparking ? 30 : 16;
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

      // Spark particles: real projectile motion computed from each one's
      // own birth time rather than accumulated per-frame, so their arc
      // stays correct regardless of the actual frame rate.
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const age = now - p.bornAt;
        if (age > PARTICLE_LIFE_MS) {
          particles.splice(i, 1);
          continue;
        }
        const progress = age / PARTICLE_LIFE_MS;
        const x = p.x0 + p.vx * age;
        const y = p.y0 + p.vy * age + 0.5 * PARTICLE_GRAVITY * age * age;
        const alpha = (1 - progress) ** 1.5;
        const radius = lerp(2.2, 0.3, progress);
        const [pr, pg, pb] = p.color;
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(${pr}, ${pg}, ${pb}, ${alpha})`;
        ctx!.arc(x, y, radius, 0, Math.PI * 2);
        ctx!.fill();
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
      className="cursor-trail pointer-events-none fixed inset-0 z-[31]"
    />
  );
}
