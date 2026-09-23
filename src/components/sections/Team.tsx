"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { PillButton } from "@/components/ui/PillButton";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Parallax } from "@/components/ui/Parallax";
import { VIEWPORT_ONCE } from "@/lib/motion";

const FACET_CLIP =
  "polygon(0 6%, 6% 0, 100% 0, 100% 94%, 94% 100%, 0 100%)";

export function Team() {
  const reduce = useReducedMotion();

  return (
    <section id="team" className="relative scroll-mt-24 py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="07">WHO LEADS</SectionLabel>
        </Reveal>

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <blockquote className="font-display text-[clamp(1.75rem,3.6vw,3rem)] font-medium leading-[1.08] tracking-[-0.02em]">
                <span aria-hidden className="text-signal">“</span>
                Let us chart the course for your{" "}
                <span className="text-signal">business.</span>
                <span aria-hidden className="text-signal">”</span>
              </blockquote>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-muted">
                Muhammed Shifal is the Founder &amp; CEO of Zaina Solutions,
                driving the company&apos;s mission to transform ideas into
                digital assets. He leads the studio&apos;s work across websites,
                business systems, SaaS platforms, and branding - pairing
                strategic thinking with modern engineering to deliver outcomes
                that scale with the businesses they serve.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div>
                  <p className="font-display text-xl font-medium tracking-tight">
                    Muhammed Shifal
                  </p>
                  <p className="label-mono mt-1.5 text-[0.62rem]">
                    Founder &amp; CEO
                  </p>
                </div>
                <div className="flex items-center gap-3 sm:ml-2">
                  <a
                    href="https://www.linkedin.com/in/muhammedshifal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Muhammed Shifal on LinkedIn"
                    className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-signal/60 hover:text-signal"
                  >
                    <SocialIcon name="linkedin" className="size-4" />
                  </a>
                  <a
                    href="https://www.instagram.com/_shifal.___"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Muhammed Shifal on Instagram"
                    className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-signal/60 hover:text-signal"
                  >
                    <SocialIcon name="instagram" className="size-4" />
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-9">
                <PillButton href="#contact" variant="ghost">
                  Work with the team
                </PillButton>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto max-w-sm"
            >
              <motion.div
                aria-hidden
                className="absolute -inset-6 -z-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(242,87,74,0.4), rgba(120,30,24,0.18) 45%, transparent 70%)",
                  filter: "blur(36px)",
                }}
                animate={reduce ? undefined : { opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              <div
                className="relative overflow-hidden border border-line-strong"
                style={{ clipPath: FACET_CLIP }}
              >
                <Parallax amount={3}>
                  <Image
                    src="/brand/shifal.png"
                    alt="Muhammed Shifal, Founder & CEO of Zaina Solutions"
                    width={1080}
                    height={1080}
                    className="aspect-square w-full scale-110 object-cover"
                    sizes="(max-width: 1024px) 24rem, 24rem"
                  />
                </Parallax>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-void/90 to-transparent px-5 pb-4 pt-12">
                  <span className="label-mono text-[0.56rem]">FOUNDER / 01</span>
                  <span className="label-mono text-[0.56rem]">ZAINA INNOVATORS LLP</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
