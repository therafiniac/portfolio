"use client";

import dynamic from "next/dynamic";

const HeroCanvas = dynamic(
  () => import("@/components/three/HeroCanvas").then((mod) => mod.HeroCanvas),
  { ssr: false },
);

export function HeroCanvasLoader() {
  return <HeroCanvas />;
}
