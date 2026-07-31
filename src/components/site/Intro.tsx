"use client";

import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useReducedMotion,
  type Variants,
} from "motion/react";
import Image from "next/image";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const IntroContext = createContext(true);
export const useIntroReady = () => useContext(IntroContext);

const WORDS = [
  { t: "Zero", red: false },
  { t: "Asset", red: false },
  { t: "into", red: false },
  { t: "Novel", red: false },
  { t: "Artifact", red: true },
];

export function IntroProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  return (
    <IntroContext.Provider value={ready}>
      <Preloader reduce={!!reduce} onDone={() => setReady(true)} />
      {children}
    </IntroContext.Provider>
  );
}

function Preloader({ reduce, onDone }: { reduce: boolean; onDone: () => void }) {
  const [show, setShow] = useState(true);
  const [pct, setPct] = useState(0);
  const count = useMotionValue(0);

  useEffect(() => {
    if (reduce) {
      onDone();
      setShow(false);
      return;
    }
    const controls = animate(count, 100, {
      duration: 1.7,
      ease: [0.16, 1, 0.3, 1] as const,
      onUpdate: (v) => setPct(Math.round(v)),
    });
    const t = setTimeout(() => {
      onDone();
      setShow(false);
    }, 2050);
    return () => {
      controls.stop();
      clearTimeout(t);
    };
  }, []);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.11, delayChildren: 0.25 } },
  };
  const word: Variants = {
    hidden: { y: "110%" },
    show: { y: "0%", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-void px-6 py-7 sm:px-10 sm:py-9"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.7, 0, 0.3, 1] as const }}
        >
          <div className="grain pointer-events-none absolute inset-0" aria-hidden />

          <motion.div
            className="relative flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/icon.webp"
              alt=""
              width={32}
              height={32}
              priority
              className="size-7 object-contain mix-blend-screen"
            />
            <span className="font-display text-sm font-medium tracking-tight">
              ZAINA SOLUTIONS™
            </span>
          </motion.div>

          <motion.h2
            variants={container}
            initial="hidden"
            animate="show"
            className="relative max-w-5xl font-display text-[clamp(2.5rem,9vw,7rem)] font-medium leading-[0.95] tracking-[-0.03em]"
          >
            <span className="flex flex-wrap gap-x-[0.25em]">
              {WORDS.map((w) => (
                <span key={w.t} className="overflow-hidden py-[0.04em]">
                  <motion.span
                    variants={word}
                    className={`block ${w.red ? "text-signal" : "text-paper"}`}
                  >
                    {w.t}
                  </motion.span>
                </span>
              ))}
            </span>
          </motion.h2>

          <div className="relative">
            <div className="flex items-end justify-between">
              <span className="label-mono text-[0.62rem]">The Zaina Company</span>
              <span className="font-display text-2xl font-semibold tabular-nums sm:text-3xl">
                {pct}
                <span className="text-muted">%</span>
              </span>
            </div>
            <div className="mt-4 h-px w-full bg-line">
              <motion.div
                className="h-px origin-left bg-signal"
                style={{ scaleX: pct / 100 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
