"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { PillButton } from "@/components/ui/PillButton";
import { Parallax } from "@/components/ui/Parallax";
import { VIEWPORT_ONCE } from "@/lib/motion";

export function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <SectionLabel index="01">ABOUT</SectionLabel>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-[clamp(2rem,4.4vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.025em]">
                About{" "}
                <span className="font-light text-muted">
                  Zaina&nbsp;Solutions
                  <span className="align-super text-[0.5em]">™</span>
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-7 max-w-xl font-sans text-base leading-relaxed text-muted">
                Zaina Solutions is a technology company focused on transforming
                ideas into digital assets. We help businesses establish a strong
                digital presence through websites, business systems, SaaS
                platforms, branding, and innovative technology solutions. Our
                approach combines strategic thinking, modern design, and scalable
                technology to create solutions that deliver real business value -
                whether it&apos;s a professional website, a custom software
                platform, or a growing digital product, we build with long-term
                impact in mind.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-7 font-display text-lg font-medium tracking-tight sm:text-xl">
                Transforming Ideas into{" "}
                <span className="text-signal">Valuable Digital Assets.</span>
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-9">
                <PillButton href="/work">View Our Work</PillButton>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-2xl border border-line-strong"
            >
              <Parallax amount={4}>
                <Image
                  src="/brand/about.png"
                  alt="The Zaina Solutions team workspace"
                  width={1080}
                  height={1920}
                  sizes="(max-width: 1024px) 100vw, 44rem"
                  className="aspect-[4/3] w-full scale-110 object-cover brightness-[0.92] contrast-[1.03] saturate-[0.9]"
                />
              </Parallax>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/80 via-void/10 to-transparent"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-color"
                style={{ background: "linear-gradient(180deg, transparent, rgba(224,71,59,0.12))" }}
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 pb-4">
                <span className="label-mono text-[0.56rem]">THE ZAINA COMPANY</span>
                <span className="label-mono text-[0.56rem]">HiLITE BUSINESS PARK</span>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
