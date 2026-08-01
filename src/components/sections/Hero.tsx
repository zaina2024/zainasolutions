"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";
import { EcosystemOrbit } from "@/components/site/EcosystemOrbit";
import { PillButton } from "@/components/ui/PillButton";
import { MaskText } from "@/components/ui/MaskText";
import { useIntroReady } from "@/components/site/Intro";
import { EASE_OUT } from "@/lib/motion";

const TRUST = ["UI/UX", "Web", "Mobile Apps", "Branding", "AI Automation"];

export function Hero() {
  const reduce = useReducedMotion();
  const ready = useIntroReady();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };
  const rise = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
  };

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 lg:pt-24"
    >
      <div className="mx-auto grid w-full max-w-[80rem] grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <motion.div
          style={{ y: contentY }}
          variants={container}
          initial="hidden"
          animate={ready ? "show" : "hidden"}
        >
          <motion.div variants={rise} className="flex items-center gap-3">
            <span className="size-1.5 bg-signal" aria-hidden />
            <span className="label-mono text-[0.66rem]">
              Technology Company · India
            </span>
          </motion.div>

          <MaskText
            as="h1"
            segments={[
              { text: "We turn Zero Asset into" },
              { text: "Novel Artifact.", className: "text-signal" },
            ]}
            show={ready}
            delay={0.42}
            stagger={0.07}
            className="mt-6 max-w-xl font-display text-[clamp(2.5rem,5.2vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.025em]"
          />

          <motion.p
            variants={rise}
            className="mt-6 max-w-lg font-sans text-base leading-relaxed text-muted sm:text-[1.0625rem]"
          >
            Zaina Solutions transforms ideas into digital assets through
            websites, business systems, SaaS platforms, branding, and technology
            solutions built for growing businesses.
          </motion.p>

          <motion.div variants={rise} className="mt-9 flex flex-wrap items-center gap-4">
            <PillButton href="#contact">Start a Project</PillButton>
            <PillButton href="/work" variant="ghost">
              View Our Work
            </PillButton>
          </motion.div>

          <motion.div variants={rise} className="mt-12 border-t border-line pt-6">
            <p className="label-mono text-[0.6rem]">What we do</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {TRUST.map((t) => (
                <li key={t} className="font-sans text-sm text-paper/85">
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: visualY }} className="relative">
          <EcosystemOrbit ready={ready} />
        </motion.div>
      </div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute inset-x-0 bottom-6 mx-auto hidden w-fit flex-col items-center gap-2 sm:flex"
      >
        <span className="label-mono text-[0.58rem]">Scroll</span>
        <motion.span
          className="h-7 w-px bg-gradient-to-b from-signal to-transparent"
          animate={reduce ? undefined : { scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ originY: 0 }}
        />
      </motion.div>
    </section>
  );
}
