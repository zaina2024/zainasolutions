"use client";

import { motion, useReducedMotion } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { VIEWPORT_ONCE } from "@/lib/motion";

const STATS = [
  { to: 40, suffix: "+", label: "Projects Delivered" },
  { to: 25, suffix: "+", label: "Student Creators" },
  { to: 30, suffix: "+", label: "Businesses Served" },
  { to: 98, suffix: "%", label: "Client Satisfaction" },
];

export function Stats() {
  const reduce = useReducedMotion();

  return (
    <section
      id="stats"
      className="relative scroll-mt-24 overflow-hidden border-y border-line bg-elevated py-20 sm:py-24"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[50vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(224,71,59,0.10), transparent 65%)",
          filter: "blur(20px)",
        }}
        initial={{ opacity: 0.4 }}
        whileInView={{ opacity: 0.7 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 1.2 }}
      />

      <div className="relative mx-auto max-w-[88rem] px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="05">THE PROOF</SectionLabel>
        </Reveal>

        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="relative">
              <dd className="font-display font-semibold leading-none tracking-tight text-[clamp(2.5rem,6vw,5rem)]">
                <CountUp to={stat.to} suffix={stat.suffix} delay={i * 0.12} />
              </dd>
              <motion.div
                aria-hidden
                className="mt-4 h-px w-full max-w-[8rem] origin-left bg-signal"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              />
              <dt className="label-mono mt-4 text-[0.64rem]">{stat.label}</dt>
            </div>
          ))}
        </dl>

        <ClientLogos />
      </div>
    </section>
  );
}
