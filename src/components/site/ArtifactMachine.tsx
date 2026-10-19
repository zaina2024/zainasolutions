"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState, type Ref } from "react";
import {
  ArrowUpRight,
  Box,
  Braces,
  Clapperboard,
  Code2,
  Factory,
  Hospital,
  MonitorSmartphone,
  PenTool,
  Sofa,
  Store,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { EASE_OUT } from "@/lib/motion";
import { coverOf, getProject } from "@/lib/projects";

/*
 * The hero headline, acted out: a business need and a student skill meet at
 * the Zaina mark, and a real shipped project comes out the other side.
 * Every match points at a client case study, so the visual doubles as proof.
 */

type Side = { label: string; line: string; icon: LucideIcon };
type Match = { business: Side; student: Side; slug: string };

const MATCHES: Match[] = [
  {
    business: { label: "Supermarket", line: "Shoppers can't find their store", icon: Store },
    student: { label: "Web Developer", line: "Fast pages that rank locally", icon: Code2 },
    slug: "everything-supermarket",
  },
  {
    business: { label: "Film studio", line: "Portfolio must feel like cinema", icon: Clapperboard },
    student: { label: "Creative Developer", line: "Scroll-driven storytelling", icon: MonitorSmartphone },
    slug: "pantherklaw",
  },
  {
    business: { label: "Manufacturer", line: "Precision parts look generic online", icon: Factory },
    student: { label: "3D Developer", line: "Interactive 3D in the browser", icon: Box },
    slug: "aardha",
  },
  {
    business: { label: "Interior firm", line: "Every quote takes an evening", icon: Sofa },
    student: { label: "Software Developer", line: "Turns spreadsheets into apps", icon: Braces },
    slug: "khdec-quotation",
  },
  {
    business: { label: "Hospital", line: "Parents need reassurance, fast", icon: Hospital },
    student: { label: "UI/UX Designer", line: "Calm, clear, caring interfaces", icon: PenTool },
    slug: "soorya",
  },
  {
    business: { label: "Hardware shop", line: "“Do you stock it?” calls all day", icon: Wrench },
    student: { label: "Frontend Developer", line: "Catalogues that order on WhatsApp", icon: Code2 },
    slug: "nellissery",
  },
];

const MATCH_MS = 5600;
// Phases inside one match: 0 inputs arrive, 1 energy flows in, 2 bridge lights, 3 artifact ships.
const T_FLOW = 450;
const T_BRIDGE = 1650;
const T_SHIP = 2050;

type Geo = { w: number; h: number; left: string; right: string; down: string };

function Chip({
  ref,
  kind,
  detail,
  side,
}: {
  ref: Ref<HTMLDivElement>;
  kind: string;
  /** Second word of the label, dropped on phones so it never wraps. */
  detail: string;
  side: Side;
}) {
  const Icon = side.icon;
  return (
    <div
      ref={ref}
      className="relative rounded-xl border border-line bg-void/70 p-3 backdrop-blur-sm sm:p-4"
    >
      <span className="label-mono block whitespace-nowrap text-[0.5rem] text-muted/80">
        {kind}
        <span className="hidden sm:inline"> {detail}</span>
      </span>
      <div className="relative mt-3 min-h-[4.6rem] sm:min-h-[4rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={side.label}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:gap-3"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line-strong bg-elevated">
              <Icon className="size-[18px] text-paper/85" strokeWidth={1.5} />
            </span>
            <div className="min-w-0">
              <p className="font-display text-[0.92rem] font-medium leading-tight text-paper">
                {side.label}
              </p>
              <p className="mt-1 font-sans text-[0.72rem] leading-snug text-muted">{side.line}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** The Zaina mark as vector, so it sits cleanly on the dark disc (the PNG carries a black square). */
function ZainaMark({ lit }: { lit: boolean }) {
  return (
    <svg viewBox="414 442 734 638" className="size-8 sm:size-9" aria-hidden>
      <polygon points="434,794 608,464 612,804 434,1060" fill="#f4f2ee" />
      <polygon points="954,462 1128,792 1128,1060 962,804" fill="#f4f2ee" />
      <motion.polygon
        points="448,1060 616,808 952,804 1112,1056"
        stroke="#050505"
        strokeWidth={16}
        initial={false}
        animate={{ fill: lit ? "#e0473b" : "#f4f2ee" }}
        transition={{ duration: 0.4 }}
      />
    </svg>
  );
}

export function ArtifactMachine({ ready = true }: { ready?: boolean }) {
  const reduce = !!useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.3 });
  const [hover, setHover] = useState(false);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState(3);
  const running = ready && inView && !hover && !reduce;

  useEffect(() => {
    // Paused (hover, off-screen, reduced motion): hold the finished state.
    if (!running) {
      const t = setTimeout(() => setPhase(3), 0);
      return () => clearTimeout(t);
    }
    const timers = [
      setTimeout(() => setPhase(0), 0),
      setTimeout(() => setPhase(1), T_FLOW),
      setTimeout(() => setPhase(2), T_BRIDGE),
      setTimeout(() => setPhase(3), T_SHIP),
      setTimeout(() => setIdx((i) => (i + 1) % MATCHES.length), MATCH_MS),
    ];
    return () => timers.forEach(clearTimeout);
  }, [idx, running]);

  // Connectors are drawn from measured positions so they meet the chips and mark exactly.
  const stageRef = useRef<HTMLDivElement>(null);
  const bizRef = useRef<HTMLDivElement>(null);
  const stuRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const biz = bizRef.current;
    const stu = stuRef.current;
    const mark = markRef.current;
    if (!stage || !biz || !stu || !mark) return;

    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const s = stage.getBoundingClientRect();
        const rel = (el: HTMLElement) => {
          const r = el.getBoundingClientRect();
          return { x: r.left - s.left, y: r.top - s.top, w: r.width, h: r.height };
        };
        const b = rel(biz);
        const u = rel(stu);
        const m = rel(mark);
        const mx = m.x + m.w / 2;
        const my = m.y + m.h / 2;
        const mr = m.w / 2;
        const bx = b.x + b.w / 2;
        const by = b.y + b.h;
        const ux = u.x + u.w / 2;
        const uy = u.y + u.h;
        setGeo({
          w: s.width,
          h: s.height,
          left: `M ${bx} ${by} C ${bx} ${my}, ${bx + (mx - bx) * 0.4} ${my}, ${mx - mr} ${my}`,
          right: `M ${ux} ${uy} C ${ux} ${my}, ${ux - (ux - mx) * 0.4} ${my}, ${mx + mr} ${my}`,
          down: `M ${mx} ${my + mr} L ${mx} ${s.height}`,
        });
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    [stage, biz, stu, mark].forEach((el) => ro.observe(el));
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, []);

  const match = MATCHES[idx];
  const project = getProject(match.slug);
  const flowing = phase === 1;
  const lit = phase >= 2;
  const shipped = phase === 3;

  return (
    <div ref={rootRef} className="relative mx-auto w-full max-w-xl">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-16 rounded-full"
        style={{
          background: "radial-gradient(circle at 50% 45%, rgba(224,71,59,0.14), transparent 62%)",
          filter: "blur(24px)",
        }}
      />

      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.15 }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative rounded-2xl border border-line bg-elevated/40 p-4 backdrop-blur-sm sm:p-7"
        role="group"
        aria-label="How Zaina turns a business need and a student skill into a shipped project"
      >
        <div className="flex items-center justify-between">
          <span className="label-mono flex items-center gap-2 text-[0.56rem] text-muted">
            <span className="relative flex size-1.5">
              {!reduce && (
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60" />
              )}
              <span className="relative inline-flex size-1.5 rounded-full bg-signal" />
            </span>
            The Zaina bridge
          </span>
          <span className="label-mono text-[0.56rem] tabular-nums text-muted">
            {String(idx + 1).padStart(2, "0")} / {String(MATCHES.length).padStart(2, "0")}
          </span>
        </div>

        {/* ---------- inputs → mark ---------- */}
        <div ref={stageRef} className="relative mt-5 pb-7 sm:mt-6 sm:pb-8">
          {geo && (
            <svg
              aria-hidden
              width={geo.w}
              height={geo.h}
              viewBox={`0 0 ${geo.w} ${geo.h}`}
              className="pointer-events-none absolute inset-0 overflow-visible"
            >
              {[geo.left, geo.right].map((d) => (
                <path key={`base-${d}`} d={d} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={1.25} />
              ))}
              {!reduce &&
                [geo.left, geo.right].map((d, i) => (
                  <motion.path
                    key={`pulse-${i}-${idx}`}
                    d={d}
                    fill="none"
                    stroke="#f2574a"
                    strokeWidth={2}
                    strokeLinecap="round"
                    style={{ filter: "drop-shadow(0 0 5px rgba(242,87,74,0.9))" }}
                    initial={{ pathLength: 0.22, pathOffset: 0, opacity: 0 }}
                    animate={
                      flowing
                        ? { pathOffset: 0.78, opacity: [0, 1, 1, 0] }
                        : { pathOffset: 0, opacity: 0 }
                    }
                    transition={
                      flowing
                        ? { duration: (T_BRIDGE - T_FLOW) / 1000, ease: "easeInOut" }
                        : { duration: 0 }
                    }
                  />
                ))}
              <path d={geo.down} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={1.25} strokeDasharray="3 4" />
              <motion.path
                d={geo.down}
                fill="none"
                stroke="#e0473b"
                strokeWidth={1.5}
                initial={false}
                animate={{ pathLength: lit ? 1 : 0, opacity: lit ? 1 : 0 }}
                transition={{ duration: lit ? 0.4 : 0.2, ease: EASE_OUT }}
              />
            </svg>
          )}

          <div className="relative grid grid-cols-2 gap-3 sm:gap-10">
            <Chip ref={bizRef} kind="Business" detail="need" side={match.business} />
            <Chip ref={stuRef} kind="Student" detail="skill" side={match.student} />
          </div>

          <div className="relative mt-6 flex justify-center sm:mt-7">
            <div ref={markRef} className="relative grid size-16 place-items-center sm:size-[4.5rem]">
              <motion.span
                aria-hidden
                className="absolute -inset-2.5 rounded-full border border-dashed border-signal/50"
                animate={
                  reduce
                    ? { opacity: 0.5 }
                    : lit
                      ? { opacity: 1, rotate: 360 }
                      : { opacity: 0.25, rotate: 0 }
                }
                transition={{
                  opacity: { duration: 0.4 },
                  rotate: lit ? { duration: 8, ease: "linear", repeat: Infinity } : { duration: 0 },
                }}
              />
              {!reduce && lit && (
                <motion.span
                  key={`burst-${idx}`}
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(242,87,74,0.55) 0%, transparent 70%)" }}
                  initial={{ opacity: 0.9, scale: 0.8 }}
                  animate={{ opacity: 0, scale: 2 }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                />
              )}
              <div className="relative grid size-full place-items-center rounded-full border border-line-strong bg-void shadow-[0_0_40px_-8px_rgba(224,71,59,0.55)]">
                <ZainaMark lit={lit} />
              </div>
            </div>
          </div>
        </div>

        {/* ---------- output: the novel artifact ---------- */}
        <div className="relative h-[5.75rem] sm:h-[6.25rem]">
          <AnimatePresence mode="wait" initial={false}>
            {shipped && project ? (
              <motion.div
                key={project.slug}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                className="absolute inset-0"
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="group flex h-full items-center gap-3 rounded-xl border border-signal/30 bg-void/80 p-2.5 transition-colors hover:border-signal/70 sm:gap-4 sm:p-3"
                >
                  <div className="relative aspect-[4/3] h-full shrink-0 overflow-hidden rounded-lg border border-line sm:aspect-[16/10]">
                    <Image
                      src={coverOf(project)}
                      alt=""
                      fill
                      sizes="140px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="label-mono block truncate whitespace-nowrap text-[0.5rem] text-signal">
                      <span className="hidden sm:inline">Novel artifact · </span>
                      {project.tag}
                    </span>
                    <p className="mt-1 truncate font-display text-[0.95rem] font-medium leading-tight text-paper sm:text-base">
                      {project.title}
                    </p>
                    <p className="mt-0.5 truncate font-sans text-[0.7rem] text-muted">{project.scope}</p>
                  </div>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line-strong text-paper transition-colors duration-300 group-hover:border-signal group-hover:bg-signal">
                    <ArrowUpRight className="size-4" />
                  </span>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="building"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 grid place-items-center rounded-xl border border-dashed border-line"
              >
                <span className="label-mono text-[0.55rem] text-muted">
                  {lit ? "Shipping…" : "Matching…"}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ---------- footer: zero asset → novel artifact ---------- */}
        <div className="mt-5 flex items-center gap-3">
          <span className="label-mono shrink-0 text-[0.5rem] text-muted/70">Zero asset</span>
          <div className="relative h-px flex-1 overflow-hidden bg-line">
            <motion.div
              key={`${idx}-${running}`}
              className="absolute inset-0 origin-left bg-signal"
              initial={{ scaleX: running ? 0 : 1 }}
              animate={{ scaleX: 1 }}
              transition={running ? { duration: MATCH_MS / 1000, ease: "linear" } : { duration: 0 }}
            />
          </div>
          <span className="label-mono shrink-0 text-[0.5rem] text-paper/80">Novel artifact</span>
        </div>

        <div className="mt-4 flex justify-center gap-1.5">
          {MATCHES.map((m, i) => (
            <button
              key={m.slug}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Show match ${i + 1}: ${m.business.label}`}
              aria-current={i === idx}
              className="grid h-6 place-items-center px-0.5"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === idx ? "w-5 bg-signal" : "w-1.5 bg-paper/25 hover:bg-paper/50"
                }`}
              />
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
