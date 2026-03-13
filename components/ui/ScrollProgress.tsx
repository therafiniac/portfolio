"use client";

import { useEffect, useRef } from "react";
import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping:   30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      id="scroll-progress"
      style={{ scaleX, width: "100%" }}
    />
  );
}
