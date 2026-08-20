"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Points as ThreePoints } from "three";

const PARTICLE_COUNT = 220;

// Generated once at module load, not during render — a fixed field is
// indistinguishable from a per-mount random one once it's drifting.
function createDriftPositions() {
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    arr[i * 3] = (Math.random() - 0.5) * 12;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }
  return arr;
}

const driftPositions = createDriftPositions();

function DriftField() {
  const pointsRef = useRef<ThreePoints>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.02;
    pointsRef.current.rotation.x = Math.sin(t * 0.05) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[driftPositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#94e2d5"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);
  return reduced;
}

// Some browsers (e.g. LibreWolf) disable WebGL by default for fingerprinting
// resistance. Canvas context creation then fails as an unhandled rejection
// inside react-three/fiber, which no error boundary can catch — so this is
// purely decorative and must never risk breaking the page, we check support
// up front and skip mounting the Canvas entirely rather than let it throw.
function isWebglAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function HeroCanvas() {
  const reducedMotion = usePrefersReducedMotion();
  const [webglAvailable] = useState(isWebglAvailable);

  if (reducedMotion || !webglAvailable) return null;

  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
    >
      <DriftField />
    </Canvas>
  );
}
