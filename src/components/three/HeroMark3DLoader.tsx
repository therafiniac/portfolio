"use client";

import dynamic from "next/dynamic";

const HeroMark3D = dynamic(
  () => import("@/components/three/HeroMark3D").then((mod) => mod.HeroMark3D),
  { ssr: false },
);

export function HeroMark3DLoader() {
  return <HeroMark3D />;
}
