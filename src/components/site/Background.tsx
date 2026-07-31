"use client";

import { motion, useReducedMotion } from "motion/react";

export function Background() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_30%,#0a0a0c_0%,#050505_55%,#000_100%)]" />

      <div className="baseline-grid absolute inset-0" />

      <div className="perspective-mesh absolute inset-x-0 top-0 h-[70vh] opacity-30" />

      <motion.div
        className="absolute -right-[10%] top-[8%] size-[45vw] max-w-[640px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(224,71,59,0.12), rgba(120,30,24,0.06) 45%, transparent 68%)",
          filter: "blur(20px)",
        }}
        animate={reduce ? undefined : { opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="grain absolute inset-0" />
    </div>
  );
}
