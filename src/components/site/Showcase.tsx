"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;
const LINE = "M0,86 L36,70 L72,78 L108,52 L144,60 L180,36 L216,44 L252,22 L288,30 L320,10";
const AREA = `${LINE} L320,110 L0,110 Z`;

function Card({ delay, ready, reduce }: { delay: number; ready: boolean; reduce: boolean }) {
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className="rounded-lg border border-line bg-surface/60 p-3"
    >
      <span className="block h-1.5 w-8 rounded-full bg-paper/15" />
      <span className="mt-2.5 block h-3 w-12 rounded bg-paper/30" />
      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-paper/10">
        <motion.span
          className="block h-full rounded-full bg-signal"
          initial={{ width: "0%" }}
          animate={reduce ? { width: "70%" } : { width: ["0%", "75%", "55%", "75%"] }}
          transition={{
            duration: reduce ? 0.6 : 5,
            repeat: reduce ? 0 : Infinity,
            ease: "easeInOut",
            delay: delay + 0.3,
          }}
        />
      </div>
    </motion.div>
  );
}

function Row({ delay, ready, reduce }: { delay: number; ready: boolean; reduce: boolean }) {
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: 12 }}
      animate={ready ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className="flex items-center gap-3"
    >
      <span className="size-7 shrink-0 rounded-md border border-line bg-surface/60" />
      <div className="flex-1 space-y-1.5">
        <span className="block h-1.5 w-3/4 rounded-full bg-paper/20" />
        <span className="block h-1.5 w-1/2 rounded-full bg-paper/10" />
      </div>
      <span className="size-1.5 rounded-full bg-signal/70" />
    </motion.div>
  );
}

export function Showcase({ ready = true }: { ready?: boolean }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-lg [perspective:1600px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 rounded-full"
        style={{
          background: "radial-gradient(circle at 60% 40%, rgba(242,87,74,0.14), transparent 60%)",
          filter: "blur(20px)",
        }}
      />

      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, rotateX: 8 }}
        animate={ready ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: 8 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        className="relative"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="overflow-hidden rounded-2xl border border-line bg-elevated shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)]"
        >
          <div className="flex items-center gap-3 border-b border-line bg-void/60 px-4 py-3">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-paper/15" />
              <span className="size-2.5 rounded-full bg-paper/15" />
              <span className="size-2.5 rounded-full bg-paper/15" />
            </div>
            <div className="ml-2 flex flex-1 items-center gap-2 rounded-md border border-line bg-void/50 px-3 py-1.5">
              <Image
                src="/icon.webp"
                alt=""
                width={16}
                height={16}
                className="size-3.5 shrink-0 object-contain mix-blend-screen"
              />
              <span className="font-mono text-[0.62rem] text-muted">zainasolutions.com</span>
            </div>
          </div>

          <div className="space-y-4 p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <span className="block h-2 w-24 rounded-full bg-paper/25" />
                <span className="block h-1.5 w-16 rounded-full bg-paper/10" />
              </div>
              <span className="h-6 w-16 rounded-full bg-signal shadow-[0_4px_16px_-4px_rgba(242,87,74,0.7)]" />
            </div>

            <div className="rounded-xl border border-line bg-surface/40 p-4">
              <div className="flex items-center justify-between">
                <span className="block h-1.5 w-14 rounded-full bg-paper/20" />
                <span className="block h-1.5 w-8 rounded-full bg-signal/50" />
              </div>
              <div className="relative mt-3 h-24">
                <svg viewBox="0 0 320 110" preserveAspectRatio="none" className="size-full overflow-visible">
                  <defs>
                    <linearGradient id="zarea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(242,87,74,0.35)" />
                      <stop offset="100%" stopColor="rgba(242,87,74,0)" />
                    </linearGradient>
                  </defs>
                  {[28, 56, 84].map((y) => (
                    <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  ))}
                  <motion.path
                    d={AREA}
                    fill="url(#zarea)"
                    initial={{ opacity: 0 }}
                    animate={ready ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 1, ease: EASE, delay: 0.8 }}
                  />
                  <motion.path
                    d={LINE}
                    fill="none"
                    stroke="#f2574a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={ready ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 1.4, ease: EASE, delay: 0.5 }}
                  />
                  <motion.circle
                    cx="320"
                    cy="10"
                    r="4"
                    fill="#f2574a"
                    initial={{ opacity: 0 }}
                    animate={ready ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: 1.9 }}
                  />
                  {ready && !reduce && (
                    <motion.circle
                      cx="320"
                      cy="10"
                      r="4"
                      fill="none"
                      stroke="#f2574a"
                      strokeWidth="2"
                      animate={{ r: [4, 11], opacity: [0.6, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 2 }}
                    />
                  )}
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Card delay={1.0} ready={ready} reduce={!!reduce} />
              <Card delay={1.1} ready={ready} reduce={!!reduce} />
              <Card delay={1.2} ready={ready} reduce={!!reduce} />
            </div>

            <div className="space-y-3 pt-1">
              <Row delay={1.3} ready={ready} reduce={!!reduce} />
              <Row delay={1.4} ready={ready} reduce={!!reduce} />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
