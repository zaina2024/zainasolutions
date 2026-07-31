"use client";

import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
  useReducedMotion,
} from "motion/react";
import {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { PillButton } from "@/components/ui/PillButton";
import { cn } from "@/lib/utils";

type Category = "Websites" | "Products" | "Branding" | "UI/UX";
type Project = {
  slug: string;
  title: string;
  category: Category;
  tag: string;
  blurb: string;
  cover?: number;
  pages?: number[];
  srcs?: string[];
  url?: string;
};

const PROJECTS: Project[] = [
  { slug: "topvision", title: "Top Vision Security", category: "Websites", tag: "Website", blurb: "A sleek corporate site for a Saudi security integrator - credibility, scale, and trust front and centre.", srcs: ["/work/ext-topvision-1.webp", "/work/ext-topvision-2.webp", "/work/ext-topvision-3.webp"], url: "https://topvisioncompany.com/" },
  { slug: "pantherklaw", title: "PANTHERKLAW", category: "Websites", tag: "Website", blurb: "A bold, cinematic studio site - dark and kinetic, built to make a film brand feel like a feature.", srcs: ["/work/ext-pantherklaw-1.webp", "/work/ext-pantherklaw-2.webp", "/work/ext-pantherklaw-3.webp"], url: "https://pantherklaw.com/" },
  { slug: "aardha", title: "Aardha Enterprises", category: "Websites", tag: "Website", blurb: "An interactive 3D website giving a 25-year precision rubber-parts manufacturer a modern, premium presence.", srcs: ["/work/ext-aardha-1.webp", "/work/ext-aardha-2.webp", "/work/ext-aardha-3.webp"], url: "https://aardha.in/" },
  { slug: "nellissery", title: "Nellissery Traders", category: "Websites", tag: "Website", blurb: "A clean, fast business website built for clarity and long-term use.", cover: 13, pages: [12, 13, 14, 15] },
  { slug: "soorya", title: "Soorya Maternity & Children's Care", category: "Websites", tag: "Website", blurb: "A warm, trustworthy presence for a maternity & children's care hospital.", cover: 20, pages: [19, 20] },
  { slug: "oneness", title: "The Oneness Living", category: "Websites", tag: "Website", blurb: "A considered brand website with a calm, editorial feel.", cover: 23, pages: [22, 23, 24] },
  { slug: "gobeyond", title: "Go Beyond Gym", category: "Products", tag: "SaaS Platform", blurb: "An all-in-one gym management platform that replaces manual tracking with one easy system.", cover: 33, pages: [31, 32, 33, 34] },
  { slug: "hostel", title: "Hostel Management", category: "Products", tag: "SaaS Platform", blurb: "Hotel & mess management with digital tracking, NFC access, and automated, fair billing.", cover: 36, pages: [35, 36] },
  { slug: "jarbot", title: "Jar Bot", category: "Products", tag: "Connected System", blurb: "Turns everyday physical interaction into structured digital insight for better control.", cover: 38, pages: [37, 38] },
  { slug: "linkafe", title: "Linkafe", category: "Branding", tag: "Identity System", blurb: "A brand identity built to translate consistently across every platform.", cover: 40, pages: [39, 40, 41, 42, 43] },
  { slug: "uiux", title: "UI / UX Designs", category: "UI/UX", tag: "Product Design", blurb: "Selected interface work - mobile app flows and screens designed to feel right.", cover: 26, pages: [25, 26, 27, 28, 29, 30] },
];

const TABS = ["All", "Websites", "Products", "Branding", "UI/UX"] as const;
const img = (pg: number) => `/work/pg-${String(pg).padStart(2, "0")}.webp`;
const coverOf = (p: Project) => p.srcs?.[0] ?? img(p.cover ?? 0);
const pagesOf = (p: Project) => p.srcs ?? (p.pages ?? []).map(img);

export function WorkGallery() {
  const reduce = useReducedMotion();
  const [cat, setCat] = useState<(typeof TABS)[number]>("All");
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<Project | null>(null);

  const list = cat === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === cat);

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const first = useRef(true);

  const center = useCallback(
    (i: number, instant = false) => {
      const track = trackRef.current;
      const vp = viewportRef.current;
      if (!track || !vp) return;
      const card = track.children[i] as HTMLElement | undefined;
      if (!card) return;
      const target = -(card.offsetLeft + card.offsetWidth / 2 - vp.clientWidth / 2);
      if (instant || reduce) x.set(target);
      else animate(x, target, { type: "spring", stiffness: 260, damping: 34 });
    },
    [x, reduce]
  );

  useLayoutEffect(() => {
    center(active, first.current);
    first.current = false;
  }, [active, list.length, center]);

  useEffect(() => {
    const onResize = () => center(active, true);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active, center]);

  const go = useCallback(
    (i: number) => setActive(Math.max(0, Math.min(list.length - 1, i))),
    [list.length]
  );

  const selectCat = (c: (typeof TABS)[number]) => {
    setCat(c);
    setActive(0);
  };

  useEffect(() => {
    const slug = window.location.hash.replace("#", "").toLowerCase();
    const map: Record<string, (typeof TABS)[number]> = {
      websites: "Websites",
      products: "Products",
      branding: "Branding",
      uiux: "UI/UX",
    };
    const target = map[slug];
    if (target) {
      setCat(target);
      setActive(0);
    }
  }, []);

  const startX = useRef<number | null>(null);
  const moved = useRef(false);
  const onDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    moved.current = false;
  };
  const onMove = (e: React.PointerEvent) => {
    if (startX.current != null && Math.abs(e.clientX - startX.current) > 8) {
      moved.current = true;
    }
  };
  const onUp = (e: React.PointerEvent) => {
    if (startX.current == null) return;
    const d = e.clientX - startX.current;
    startX.current = null;
    if (d < -50) go(active + 1);
    else if (d > 50) go(active - 1);
  };
  const onCardClick = (p: Project, i: number, isActive: boolean) => {
    if (moved.current) return;
    if (isActive) setOpen(p);
    else go(i);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="relative">
      <header className="mx-auto max-w-[88rem] px-5 pt-32 sm:px-8 sm:pt-36">
        <Reveal>
          <a href="/" className="label-mono inline-flex items-center gap-2 text-[0.62rem] transition-colors hover:text-paper">
            <ArrowLeft className="size-3.5" /> Back to home
          </a>
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
            Websites, products, and brands we&apos;ve designed and built. Our work
            is not about features - it is about outcomes.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap gap-2 border-t border-line pt-6">
            {TABS.map((t) => {
              const isActive = t === cat;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => selectCat(t)}
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
                  <span className="relative">{t}</span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </header>

      <Reveal delay={0.1}>
        <div className="mt-12 sm:mt-16">
          <div
            ref={viewportRef}
            className="overflow-hidden"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
          >
            <motion.div ref={trackRef} style={{ x }} className="flex gap-5 px-[8vw] sm:gap-8 sm:px-[18vw]">
              {list.map((p, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={p.slug + cat}
                    className={cn(
                      "w-[84vw] flex-none transition-all duration-500 sm:w-[64vw] lg:w-[58vw] xl:w-[52vw]",
                      isActive ? "opacity-100" : "opacity-40"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => onCardClick(p, i, isActive)}
                      className={cn(
                        "group relative block w-full overflow-hidden rounded-2xl border bg-elevated text-left transition-all duration-500",
                        isActive
                          ? "scale-100 border-line-strong shadow-[0_40px_90px_-50px_rgba(0,0,0,0.9)]"
                          : "scale-[0.93] border-line"
                      )}
                    >
                      <div className="relative aspect-video w-full">
                        <Image
                          src={coverOf(p)}
                          alt={`${p.title} - ${p.category}`}
                          fill
                          draggable={false}
                          sizes="(max-width: 640px) 84vw, (max-width: 1280px) 64vw, 52vw"
                          className="object-cover"
                          priority={i === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="label-mono rounded-full border border-line bg-void/50 px-2.5 py-1 text-[0.54rem]">
                                {p.category}
                              </span>
                              <span className="label-mono rounded-full border border-signal/40 px-2.5 py-1 text-[0.54rem] text-signal">
                                {p.tag}
                              </span>
                            </div>
                            <h3 className="mt-3 font-display text-2xl font-medium tracking-tight sm:text-3xl">
                              {p.title}
                            </h3>
                          </div>
                          <span
                            className={cn(
                              "grid size-11 shrink-0 place-items-center rounded-full border transition-colors",
                              isActive
                                ? "border-signal/50 bg-signal text-paper"
                                : "border-line text-muted"
                            )}
                          >
                            <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <div className="mx-auto mt-8 flex max-w-[88rem] items-center justify-between px-5 sm:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous"
                onClick={() => go(active - 1)}
                disabled={active === 0}
                className="grid size-11 place-items-center rounded-full border border-line text-paper transition-colors hover:border-signal/60 hover:text-signal disabled:opacity-30 disabled:hover:border-line disabled:hover:text-paper"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={() => go(active + 1)}
                disabled={active === list.length - 1}
                className="grid size-11 place-items-center rounded-full border border-line text-paper transition-colors hover:border-signal/60 hover:text-signal disabled:opacity-30 disabled:hover:border-line disabled:hover:text-paper"
              >
                <ArrowRight className="size-4" />
              </button>
              <span className="label-mono ml-2 text-[0.62rem]">
                <span className="text-paper">{String(active + 1).padStart(2, "0")}</span>
                <span className="text-muted"> / {String(list.length).padStart(2, "0")}</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {list.map((p, i) => (
                <button
                  key={p.slug + "dot"}
                  type="button"
                  aria-label={`Go to ${p.title}`}
                  onClick={() => go(i)}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300",
                    i === active ? "w-8 bg-signal" : "w-3 bg-line-strong hover:bg-muted"
                  )}
                />
              ))}
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-[88rem] px-5 font-sans text-sm leading-relaxed text-muted sm:px-8">
            {list[active]?.blurb}{" "}
            <button
              type="button"
              onClick={() => setOpen(list[active])}
              className="text-signal underline-offset-4 hover:underline"
            >
              View project →
            </button>
          </p>
        </div>
      </Reveal>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[120] overflow-y-auto bg-void/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(null)}
          >
            <div
              className="mx-auto min-h-full max-w-5xl px-5 py-20 sm:px-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="label-mono rounded-full border border-line px-2.5 py-1 text-[0.54rem]">
                      {open.category}
                    </span>
                    <span className="label-mono rounded-full border border-signal/40 px-2.5 py-1 text-[0.54rem] text-signal">
                      {open.tag}
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-tight tracking-tight">
                    {open.title}
                  </h2>
                  <p className="mt-3 max-w-xl font-sans text-base leading-relaxed text-muted">
                    {open.blurb}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setOpen(null)}
                  className="sticky top-4 grid size-12 shrink-0 place-items-center rounded-full border border-line bg-elevated text-paper transition-colors hover:border-signal/60 hover:text-signal"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="mt-10 flex flex-col gap-6">
                {pagesOf(open).map((src, i) => (
                  <motion.div
                    key={src + i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden rounded-2xl border border-line-strong"
                  >
                    <Image
                      src={src}
                      alt={`${open.title} screen`}
                      width={0}
                      height={0}
                      sizes="(max-width: 1024px) 100vw, 64rem"
                      className="h-auto w-full"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
                <p className="font-display text-xl font-medium tracking-tight">
                  Want something like this?
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  {open.url && (
                    <a
                      href={open.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 font-sans text-sm font-medium text-paper transition-colors hover:border-signal/60 hover:text-signal"
                    >
                      Visit live site <ArrowUpRight className="size-4" />
                    </a>
                  )}
                  <PillButton href="/#contact">Start a Project</PillButton>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
