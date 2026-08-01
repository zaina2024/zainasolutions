"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import {
  BarChart3,
  BrainCircuit,
  Code2,
  Dumbbell,
  Factory,
  Megaphone,
  PenTool,
  Rocket,
  ShoppingBag,
  UtensilsCrossed,
  Hospital,
  type LucideIcon,
} from "lucide-react";
import { EASE_OUT } from "@/lib/motion";

type Item = { label: string; icon: LucideIcon };

const BUSINESSES: Item[] = [
  { label: "Hospital", icon: Hospital },
  { label: "Gym", icon: Dumbbell },
  { label: "Retail", icon: ShoppingBag },
  { label: "Restaurant", icon: UtensilsCrossed },
  { label: "Startup", icon: Rocket },
  { label: "Manufacturing", icon: Factory },
];

const STUDENTS: Item[] = [
  { label: "Software Developer", icon: Code2 },
  { label: "UI/UX Designer", icon: PenTool },
  { label: "AI Engineer", icon: BrainCircuit },
  { label: "Data Analyst", icon: BarChart3 },
  { label: "Digital Marketer", icon: Megaphone },
];

const ROTATE_MS = 2600;
const PARTICLE_COUNT = 3;

// Shared viewBox: 0-1000 wide, 0-220 tall. Logo sits at cx=500,cy=110.
// Both arcs are mirror images of one another for visual symmetry.
const LEFT_PATH = "M 95,110 C 240,110 260,70 400,70 C 460,70 470,110 500,110";
const RIGHT_PATH = "M 500,110 C 530,110 540,150 600,150 C 740,150 760,110 905,110";

function useCycle(length: number, ms: number, paused: boolean) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % length), ms);
    return () => clearInterval(id);
  }, [length, ms, paused]);
  return index;
}

function IconStack({
  side,
  heading,
  items,
  index,
  reduce,
}: {
  side: "left" | "right";
  heading: string;
  items: Item[];
  index: number;
  reduce: boolean;
}) {
  const active = items[index];
  const Icon = active.icon;
  const align = side === "left" ? "items-end text-right" : "items-start text-left";

  return (
    <div className={`flex flex-1 flex-col ${align}`}>
      <span className="label-mono text-[0.6rem] text-muted">{heading}</span>

      <div className="relative mt-4 h-16 w-16">
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(224,71,59,0.22) 0%, transparent 70%)",
          }}
          animate={reduce ? undefined : { scale: [0.9, 1.15, 0.9], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex size-16 items-center justify-center rounded-2xl border border-line bg-elevated/80 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.label}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7, rotate: side === "left" ? -8 : 8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
            >
              <Icon className="size-7 text-paper/85" strokeWidth={1.4} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="mt-3 h-9 w-28">
        <AnimatePresence mode="wait">
          <motion.p
            key={active.label}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="font-sans text-[0.8rem] leading-snug text-paper/80"
          >
            {active.label}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

function FlowParticles({ path, reduce, reverse }: { path: string; reduce: boolean; reverse?: boolean }) {
  if (reduce) return null;

  return (
    <>
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <circle key={i} r="2.4" fill="#e0473b">
          <animateMotion
            dur="2.8s"
            begin={`${(i * 2.8) / PARTICLE_COUNT}s`}
            repeatCount="indefinite"
            keyPoints={reverse ? "1;0" : "0;1"}
            keyTimes="0;1"
            calcMode="linear"
          >
            <mpath href={`#${path}`} />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="2.8s"
            begin={`${(i * 2.8) / PARTICLE_COUNT}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </>
  );
}

export function EcosystemOrbit({ ready = true }: { ready?: boolean }) {
  const reduce = !!useReducedMotion();
  const paused = !ready || reduce;
  const bizIndex = useCycle(BUSINESSES.length, ROTATE_MS, paused);
  const stuIndex = useCycle(STUDENTS.length, ROTATE_MS + 300, paused);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setPulse((p) => p + 1), 1400);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-16 rounded-full"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(224,71,59,0.14), transparent 62%)",
          filter: "blur(24px)",
        }}
      />

      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.15 }}
        className="relative flex items-center justify-between gap-2 rounded-2xl border border-line bg-elevated/40 px-5 py-12 sm:px-8"
      >
        <svg
          viewBox="0 0 1000 220"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 size-full overflow-visible"
          aria-hidden
        >
          <path id="ecosystem-left-path" d={LEFT_PATH} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <path id="ecosystem-right-path" d={RIGHT_PATH} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <FlowParticles path="ecosystem-left-path" reduce={reduce} />
          <FlowParticles path="ecosystem-right-path" reduce={reduce} reverse />
        </svg>

        <IconStack side="left" heading="Businesses" items={BUSINESSES} index={bizIndex} reduce={reduce} />

        <div className="relative z-10 flex shrink-0 items-center justify-center px-2">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 m-auto size-20 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(242,87,74,0.45) 0%, transparent 70%)" }}
            key={pulse}
            initial={{ opacity: 0.75, scale: 0.7 }}
            animate={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
          />

          <div className="relative z-10 flex size-16 items-center justify-center rounded-full border border-line-strong bg-void shadow-[0_0_40px_-8px_rgba(224,71,59,0.5)] sm:size-[4.5rem]">
            <Image
              src="/brand/logo.png"
              alt="Zaina Solutions"
              width={40}
              height={40}
              className="size-8 object-contain sm:size-9"
              priority
            />
          </div>
        </div>

        <IconStack side="right" heading="Students" items={STUDENTS} index={stuIndex} reduce={reduce} />
      </motion.div>
    </div>
  );
}
