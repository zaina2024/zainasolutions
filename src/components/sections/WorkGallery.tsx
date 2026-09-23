"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { PROJECTS, coverOf, type Category } from "@/lib/projects";

const TABS = ["All", "Websites", "Products", "Branding", "UI/UX"] as const;
type Tab = (typeof TABS)[number];

export function WorkGallery() {
  const [cat, setCat] = useState<Tab>("All");

  // Deep links from the Services section: /work#websites, #products, #branding, #uiux
  useEffect(() => {
    const map: Record<string, Tab> = {
      websites: "Websites",
      products: "Products",
      branding: "Branding",
      uiux: "UI/UX",
    };
    const target = map[window.location.hash.replace("#", "").toLowerCase()];
    if (target) setCat(target);
  }, []);

  const list =
    cat === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === (cat as Category));

  return (
    <div className="relative">
      <header className="mx-auto max-w-[88rem] px-5 pt-32 sm:px-8 sm:pt-36">
        <Reveal>
          <Link
            href="/"
            className="label-mono inline-flex items-center gap-2 text-[0.62rem] transition-colors hover:text-paper"
          >
            <ArrowLeft className="size-3.5" /> Back to home
          </Link>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-8">
            <SectionLabel>SELECTED WORK</SectionLabel>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1.0] tracking-[-0.03em]">
            Things we&apos;ve <span className="text-signal">brought to life.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-muted">
            Websites, products, and brands we&apos;ve designed and built. Every project
            has a case study - the problem, the thinking, and what shipped.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-line pt-6">
            {TABS.map((t) => {
              const isActive = t === cat;
              const count =
                t === "All"
                  ? PROJECTS.length
                  : PROJECTS.filter((p) => p.category === (t as Category)).length;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setCat(t)}
                  aria-pressed={isActive}
                  className={cn(
                    "relative rounded-full px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] transition-colors",
                    isActive ? "text-paper" : "text-muted hover:text-paper"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="work-tab"
                      className="absolute inset-0 rounded-full border border-signal/50 bg-signal/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">
                    {t}
                    <span className="ml-1.5 text-[0.85em] text-muted/70">{count}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </header>

      <div className="mx-auto mt-12 max-w-[88rem] px-5 pb-16 sm:mt-16 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8">
          {list.map((p, i) => (
            <motion.article
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(i, 5) * 0.05 }}
              /* First card in each pair-row spans full width on large screens for rhythm */
              className={cn(i % 5 === 0 && "sm:col-span-2")}
            >
              <Link href={`/work/${p.slug}`} className="group block">
                <div
                  className={cn(
                    "relative w-full overflow-hidden rounded-2xl border border-line bg-elevated transition-colors duration-500 group-hover:border-line-strong",
                    i % 5 === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                  )}
                >
                  <Image
                    src={coverOf(p)}
                    alt={`${p.title} - ${p.scope} by Zaina Solutions`}
                    fill
                    sizes={
                      i % 5 === 0
                        ? "(max-width: 640px) 92vw, 88rem"
                        : "(max-width: 640px) 92vw, 44vw"
                    }
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    priority={i < 2}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-void via-void/55 to-void/10"
                  />
                  <span className="label-mono absolute left-5 top-5 rounded-full border border-line-strong bg-void/85 px-3 py-1.5 text-[0.54rem] text-paper backdrop-blur-md">
                    {p.tag}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
                    <div>
                      <span className="label-mono text-[0.56rem] text-paper/60">
                        {p.category} · {p.year}
                      </span>
                      <h2 className="mt-2 font-display text-xl font-medium leading-tight tracking-tight text-paper sm:text-2xl">
                        {p.title}
                      </h2>
                      <p className="mt-2 max-w-lg font-sans text-[0.82rem] leading-relaxed text-paper/70">
                        {p.blurb}
                      </p>
                    </div>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-paper transition-colors duration-300 group-hover:border-signal group-hover:bg-signal">
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
