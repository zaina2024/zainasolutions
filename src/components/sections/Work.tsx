"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { MaskText } from "@/components/ui/MaskText";
import { PillButton } from "@/components/ui/PillButton";
import { EASE_OUT, VIEWPORT_ONCE } from "@/lib/motion";
import { PROJECTS, coverOf, isOwnProduct, type Project } from "@/lib/projects";

const FEATURED = ["topvision", "aardha", "gobeyond"];

const featured = FEATURED.map((s) => PROJECTS.find((p) => p.slug === s)!).filter(Boolean);
const rest = PROJECTS.filter((p) => !FEATURED.includes(p.slug));

function FeatureRow({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Gentle parallax on the image as the row passes through the viewport.
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);
  const flip = index % 2 === 1;

  return (
    <motion.article
      ref={ref}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.75, ease: EASE_OUT }}
      className="group relative"
    >
      <Link
        href={`/work/${project.slug}`}
        className="grid items-center gap-7 lg:grid-cols-12 lg:gap-12"
        aria-label={`${project.title} case study`}
      >
        <div
          className={
            flip
              ? "lg:order-2 lg:col-span-7 xl:col-span-8"
              : "lg:col-span-7 xl:col-span-8"
          }
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line bg-elevated transition-colors duration-500 group-hover:border-line-strong">
            <motion.div style={{ y }} className="absolute inset-[-8%]">
              <Image
                src={coverOf(project)}
                alt={`${project.title} - ${project.scope} by Zaina Solutions`}
                fill
                sizes="(max-width: 1024px) 92vw, 62vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </motion.div>
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60"
            />
            <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2">
              <span className="label-mono rounded-full border border-line-strong bg-void/85 px-3 py-1.5 text-[0.56rem] text-paper backdrop-blur-md">
                {project.tag}
              </span>
              {isOwnProduct(project) && (
                <span className="label-mono rounded-full border border-signal bg-signal px-3 py-1.5 text-[0.56rem] text-paper backdrop-blur-md">
                  OUR PRODUCT
                </span>
              )}
            </div>
          </div>
        </div>

        <div className={flip ? "lg:order-1 lg:col-span-5 xl:col-span-4" : "lg:col-span-5 xl:col-span-4"}>
          <span className="label-mono text-[0.62rem] text-muted/70">
            {String(index + 1).padStart(2, "0")} · {project.category}
            {isOwnProduct(project) && (
              <span className="text-signal"> · BUILT &amp; OWNED BY ZAINA</span>
            )}
          </span>
          <h3 className="mt-3 font-display text-[clamp(1.75rem,3.2vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.02em]">
            {project.title}
          </h3>
          <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-muted sm:text-[0.95rem]">
            {project.blurb}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {project.services.slice(0, 3).map((s) => (
              <li
                key={s}
                className="label-mono rounded-full border border-line px-2.5 py-1 text-[0.54rem] text-muted"
              >
                {s}
              </li>
            ))}
          </ul>

          <span className="mt-7 inline-flex items-center gap-2.5 font-sans text-sm font-medium text-paper">
            <span className="border-b border-signal/40 pb-0.5 transition-colors group-hover:border-signal">
              View case study
            </span>
            <span className="grid size-8 place-items-center rounded-full border border-line-strong transition-colors duration-300 group-hover:border-signal group-hover:bg-signal">
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

function MiniCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <Reveal delay={delay}>
      <Link href={`/work/${project.slug}`} className="group block">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-line bg-elevated transition-colors duration-500 group-hover:border-line-strong">
          <Image
            src={coverOf(project)}
            alt={`${project.title} - ${project.scope} by Zaina Solutions`}
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-void via-void/55 to-void/10"
          />
          {isOwnProduct(project) && (
            <span className="label-mono absolute left-4 top-4 rounded-full border border-signal bg-signal px-2.5 py-1 text-[0.5rem] text-paper backdrop-blur-md">
              OUR PRODUCT
            </span>
          )}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
            <div>
              <span className="label-mono text-[0.54rem] text-paper/60">{project.tag}</span>
              <h3 className="mt-1.5 font-display text-lg font-medium leading-tight tracking-tight text-paper">
                {project.title}
              </h3>
            </div>
            <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line-strong text-muted transition-colors duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-paper">
              <ArrowUpRight className="size-4" />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export function Work() {
  return (
    <section id="work" className="relative scroll-mt-24 py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <SectionLabel index="02">SELECTED WORK</SectionLabel>
            </Reveal>
            <MaskText
              segments={[
                { text: "Work we've" },
                { text: "shipped.", className: "text-signal" },
              ]}
              className="mt-6 max-w-2xl font-display text-[clamp(1.9rem,4vw,3.25rem)] font-medium leading-[1.04] tracking-[-0.02em]"
            />
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-lg font-sans text-sm leading-relaxed text-muted sm:text-base">
                Websites, platforms and brands built for real businesses - each one
                with the thinking behind it, not just the screenshots.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <PillButton href="/work" variant="ghost">
              All {PROJECTS.length} projects
            </PillButton>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-20 sm:mt-20 sm:gap-28">
          {featured.map((p, i) => (
            <FeatureRow key={p.slug} project={p} index={i} />
          ))}
        </div>

        <Reveal className="mt-20 sm:mt-28">
          <div className="flex items-center gap-4 border-t border-line pt-8">
            <span className="label-mono text-[0.62rem]">MORE WORK</span>
            <span className="h-px flex-1 bg-line" />
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((p, i) => (
            <MiniCard key={p.slug} project={p} delay={(i % 4) * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}
