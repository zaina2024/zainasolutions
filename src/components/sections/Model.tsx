"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";
import { Users, Workflow, TrendingUp, type LucideIcon } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { MaskText } from "@/components/ui/MaskText";

const GATES: { n: string; label: string; sub: string; icon: LucideIcon }[] = [
  { n: "01", label: "Student Creators", sub: "Trained and mentored, ready to build.", icon: Users },
  { n: "02", label: "Zaina Bridge", sub: "Matched to live projects with real stakes.", icon: Workflow },
  { n: "03", label: "Business Growth", sub: "Professional outcomes, affordably delivered.", icon: TrendingUp },
];

function Gate({
  gate,
  lit,
  reduce,
}: {
  gate: (typeof GATES)[number];
  lit: import("motion/react").MotionValue<number>;
  reduce: boolean | null;
}) {
  const Icon = gate.icon;
  const borderColor = useTransform(
    lit,
    [0, 1],
    ["rgba(255,255,255,0.08)", "rgba(224,71,59,0.6)"]
  );
  const iconColor = useTransform(lit, [0, 1], ["#9a9aa2", "#e0473b"]);

  return (
    <div className="relative flex flex-1 flex-col items-center px-2 text-center">
      <motion.div
        className="grid size-16 place-items-center rounded-2xl border bg-elevated"
        style={reduce ? { borderColor: "rgba(224,71,59,0.6)" } : { borderColor }}
      >
        <motion.span style={reduce ? { color: "#e0473b" } : { color: iconColor }}>
          <Icon className="size-6" strokeWidth={1.5} />
        </motion.span>
      </motion.div>
      <p className="label-mono mt-5 text-[0.58rem]">{gate.n}</p>
      <h3 className="mt-2 font-display text-lg font-medium tracking-tight sm:text-xl">
        {gate.label}
      </h3>
      <p className="mx-auto mt-1.5 max-w-[15rem] font-sans text-sm text-muted">{gate.sub}</p>
    </div>
  );
}

export function Model() {
  const reduce = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 75%", "end 55%"],
  });

  const beamScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lit0 = useTransform(scrollYProgress, [0.0, 0.18], [0.15, 1]);
  const lit1 = useTransform(scrollYProgress, [0.4, 0.6], [0.15, 1]);
  const lit2 = useTransform(scrollYProgress, [0.82, 1], [0.15, 1]);
  const lits = [lit0, lit1, lit2];

  return (
    <section id="model" className="relative scroll-mt-24 py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="04">THE MODEL</SectionLabel>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <MaskText
              segments={[
                { text: "How the student-powered" },
                { text: "model works.", className: "text-signal" },
              ]}
              className="font-display text-[clamp(1.9rem,4vw,3.25rem)] font-medium leading-[1.04] tracking-[-0.02em]"
            />
          </div>
          <Reveal as="div" delay={0.1} className="lg:col-span-5 lg:pt-3">
            <p className="font-sans text-base leading-relaxed text-muted">
              Zaina connects skilled student creators with real business
              projects. Startups and small businesses get professional outcomes
              at an affordable cost - and students earn hands-on,
              portfolio-ready experience.{" "}
              <span className="text-paper">Zero Asset into Novel Artifact.</span>
            </p>
          </Reveal>
        </div>

        <div ref={railRef} className="relative mt-20 sm:mt-24">
          <div className="absolute inset-x-[12%] top-8 hidden h-px bg-line sm:block" />
          <motion.div
            aria-hidden
            className="absolute inset-x-[12%] top-8 hidden h-px origin-left bg-signal/70 sm:block"
            style={{ scaleX: reduce ? 1 : beamScale }}
          />
          <div className="flex flex-col gap-12 sm:flex-row sm:items-start sm:gap-6">
            {GATES.map((gate, i) => (
              <Gate key={gate.n} gate={gate} lit={lits[i]} reduce={reduce} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
