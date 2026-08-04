"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { AlertTriangle, ArrowLeft, ArrowRight, Check, RotateCcw, Search } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { MaskText } from "@/components/ui/MaskText";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SITE_CONTACT } from "@/lib/site";
import {
  PROJECT_TYPES,
  DESIGN_MODES,
  CONTENT_EDITING,
  FEATURES,
  TIMELINES,
  HOSTING_OPTIONS,
  FREE_HOSTING_RISK,
  INITIAL_ANSWERS,
  calculateBreakdown,
  type EstimatorAnswers,
  type FeatureKey,
} from "@/lib/estimator";

const TOTAL_STEPS = 8;

function StepShell({
  step,
  title,
  sub,
  children,
}: {
  step: number;
  title: string;
  sub?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="label-mono text-[0.6rem] text-signal">STEP {step} / 7</p>
      <h3 className="mt-3 font-display text-2xl font-medium tracking-tight sm:text-3xl">
        {title}
      </h3>
      {sub && <p className="mt-2 max-w-md font-sans text-sm text-muted">{sub}</p>}
      <div className="mt-8">{children}</div>
    </div>
  );
}

function OptionCard({
  label,
  blurb,
  selected,
  onClick,
  price,
}: {
  label: string;
  blurb: string;
  selected: boolean;
  onClick: () => void;
  price?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex w-full flex-col rounded-xl border p-5 text-left transition-colors duration-200",
        selected
          ? "border-signal/70 bg-signal/[0.07]"
          : "border-line bg-elevated/40 hover:border-line-strong"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-display text-base font-medium tracking-tight sm:text-lg">
          {label}
        </span>
        <span
          className={cn(
            "grid size-6 shrink-0 place-items-center rounded-full border transition-colors duration-200",
            selected ? "border-signal bg-signal text-paper" : "border-line-strong text-transparent"
          )}
        >
          <Check className="size-3.5" strokeWidth={3} />
        </span>
      </div>
      <p className="mt-1.5 font-sans text-sm leading-relaxed text-muted">{blurb}</p>
      {price && (
        <span className="label-mono mt-4 text-[0.62rem] text-muted/70">{price}</span>
      )}
    </button>
  );
}

function Nav({
  onBack,
  onNext,
  nextDisabled,
  nextLabel = "Next",
}: {
  onBack?: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
}) {
  return (
    <div className="mt-9 flex items-center justify-between">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="label-mono inline-flex items-center gap-2 text-[0.62rem] text-muted transition-colors hover:text-paper"
        >
          <ArrowLeft className="size-3.5" /> Back
        </button>
      ) : (
        <span />
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className={cn(
          "group inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 font-sans text-sm font-medium tracking-tight transition-[background-color,box-shadow,opacity] duration-300",
          nextDisabled
            ? "cursor-not-allowed bg-paper/[0.06] text-muted/50"
            : "bg-signal text-paper shadow-[0_2px_20px_-8px_rgba(242,87,74,0.55)] hover:bg-signal-lit hover:shadow-[0_10px_34px_-10px_rgba(242,87,74,0.75)]"
        )}
      >
        {nextLabel}
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  );
}

export function Estimator() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<EstimatorAnswers>(INITIAL_ANSWERS);
  const [direction, setDirection] = useState(1);

  const breakdown = useMemo(() => calculateBreakdown(answers), [answers]);

  const whatsappHref = useMemo(() => {
    const project = PROJECT_TYPES.find((p) => p.value === answers.projectType);
    const lines = [
      `Hi! I used the budget calculator on your site and got an estimate.`,
      ``,
      `Project: ${project?.label ?? "-"}`,
      ...breakdown.buildLine
        .filter((l) => l.label !== project?.label)
        .map((l) => `+ ${l.label}: ₹${l.amount.toLocaleString("en-IN")}`),
      ``,
      `Website build total: ₹${breakdown.buildTotal.toLocaleString("en-IN")}`,
      `Domain (est./year): ₹${breakdown.domainYearly.toLocaleString("en-IN")}`,
      `Hosting (est./year): ${breakdown.hostingYearly > 0 ? `₹${breakdown.hostingYearly.toLocaleString("en-IN")}` : "Free"}`,
      answers.domain ? `Domain in mind: ${answers.domain}` : ``,
      ``,
      `Can we talk through the exact quote?`,
    ].filter(Boolean);
    const base = SITE_CONTACT.whatsappHref.split("?")[0];
    return `${base}?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [answers, breakdown]);

  function go(next: number, dir: 1 | -1) {
    setDirection(dir);
    setStep(next);
  }

  function toggleFeature(key: FeatureKey) {
    setAnswers((a) => ({
      ...a,
      features: a.features.includes(key)
        ? a.features.filter((f) => f !== key)
        : [...a.features, key],
    }));
  }

  function reset() {
    setAnswers(INITIAL_ANSWERS);
    go(1, -1);
  }

  const canProceed: Record<number, boolean> = {
    1: !!answers.projectType,
    2: !!answers.designMode,
    3: !!answers.contentEditing,
    4: true,
    5: !!answers.timeline,
    6: !!answers.hosting,
    7: true,
  };

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: reduce ? 0 : dir * 24 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: reduce ? 0 : dir * -24 }),
  };

  return (
    <section id="estimate" className="relative scroll-mt-24 py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[60rem] px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="04">BUDGET CALCULATOR</SectionLabel>
        </Reveal>

        <MaskText
          segments={[
            { text: "What will your website" },
            { text: "actually cost?", className: "text-signal" },
          ]}
          className="mt-6 max-w-2xl font-display text-[clamp(1.9rem,4vw,3.25rem)] font-medium leading-[1.04] tracking-[-0.02em]"
        />
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-lg font-sans text-sm leading-relaxed text-muted sm:text-base">
            Answer a few questions and get an instant estimate. No jargon, no
            commitment - just a real starting number.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-10">
          <div className="glass relative overflow-hidden rounded-2xl p-6 sm:p-10">
            <AnimatePresence>
              {step === 8 && !reduce && (
                <motion.div
                  aria-hidden
                  className="red-bloom pointer-events-none absolute inset-0"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: [0, 1, 0.4], scale: 1.4 }}
                  transition={{ duration: 1.2 }}
                />
              )}
            </AnimatePresence>

            <div className="relative flex items-center gap-1.5">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors duration-300",
                    i < step ? "bg-signal" : "bg-line"
                  )}
                />
              ))}
            </div>

            <div className="relative mt-10 min-h-[22rem]">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                >
                  {step === 1 && (
                    <StepShell step={1} title="What are you looking to build?">
                      <div className="grid gap-3 sm:grid-cols-3">
                        {PROJECT_TYPES.map((p) => (
                          <OptionCard
                            key={p.value}
                            label={p.label}
                            blurb={p.blurb}
                            selected={answers.projectType === p.value}
                            onClick={() =>
                              setAnswers((a) => ({ ...a, projectType: p.value }))
                            }
                          />
                        ))}
                      </div>
                      <Nav onNext={() => go(2, 1)} nextDisabled={!canProceed[1]} />
                    </StepShell>
                  )}

                  {step === 2 && (
                    <StepShell step={2} title="Custom design, or a proven template?">
                      <div className="grid gap-3 sm:grid-cols-2">
                        {DESIGN_MODES.map((d) => (
                          <OptionCard
                            key={d.value}
                            label={d.label}
                            blurb={d.blurb}
                            price={d.add > 0 ? `+₹${d.add.toLocaleString("en-IN")}` : "Included"}
                            selected={answers.designMode === d.value}
                            onClick={() => setAnswers((a) => ({ ...a, designMode: d.value }))}
                          />
                        ))}
                      </div>
                      <Nav onBack={() => go(1, -1)} onNext={() => go(3, 1)} nextDisabled={!canProceed[2]} />
                    </StepShell>
                  )}

                  {step === 3 && (
                    <StepShell step={3} title="Will you want to edit the content yourself later?">
                      <div className="grid gap-3 sm:grid-cols-2">
                        {CONTENT_EDITING.map((c) => (
                          <OptionCard
                            key={c.value}
                            label={c.label}
                            blurb={c.blurb}
                            price={c.add > 0 ? `+₹${c.add.toLocaleString("en-IN")}` : "Included"}
                            selected={answers.contentEditing === c.value}
                            onClick={() => setAnswers((a) => ({ ...a, contentEditing: c.value }))}
                          />
                        ))}
                      </div>
                      <Nav onBack={() => go(2, -1)} onNext={() => go(4, 1)} nextDisabled={!canProceed[3]} />
                    </StepShell>
                  )}

                  {step === 4 && (
                    <StepShell
                      step={4}
                      title="Any extra features you need?"
                      sub="Pick as many as apply - or skip if you're not sure yet."
                    >
                      <div className="grid gap-3 sm:grid-cols-2">
                        {FEATURES.map((f) => (
                          <OptionCard
                            key={f.value}
                            label={f.label}
                            blurb={f.blurb}
                            price={`+₹${f.add.toLocaleString("en-IN")}`}
                            selected={answers.features.includes(f.value)}
                            onClick={() => toggleFeature(f.value)}
                          />
                        ))}
                      </div>
                      <Nav onBack={() => go(3, -1)} onNext={() => go(5, 1)} />
                    </StepShell>
                  )}

                  {step === 5 && (
                    <StepShell step={5} title="What's your timeline?">
                      <div className="grid gap-3 sm:grid-cols-2">
                        {TIMELINES.map((t) => (
                          <OptionCard
                            key={t.value}
                            label={t.label}
                            blurb={t.blurb}
                            price={t.add > 0 ? `+₹${t.add.toLocaleString("en-IN")}` : "Included"}
                            selected={answers.timeline === t.value}
                            onClick={() => setAnswers((a) => ({ ...a, timeline: t.value }))}
                          />
                        ))}
                      </div>
                      <Nav onBack={() => go(4, -1)} onNext={() => go(6, 1)} nextDisabled={!canProceed[5]} />
                    </StepShell>
                  )}

                  {step === 6 && (
                    <StepShell
                      step={6}
                      title="How should we host your site?"
                      sub="Hosting is a separate ongoing cost, not part of the build - here's the real difference."
                    >
                      <div className="grid gap-3 sm:grid-cols-2">
                        {HOSTING_OPTIONS.map((h) => (
                          <OptionCard
                            key={h.value}
                            label={h.label}
                            blurb={h.blurb}
                            selected={answers.hosting === h.value}
                            onClick={() => setAnswers((a) => ({ ...a, hosting: h.value }))}
                          />
                        ))}
                      </div>

                      <AnimatePresence>
                        {answers.hosting === "free" &&
                          answers.projectType &&
                          FREE_HOSTING_RISK[answers.projectType] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: EASE_OUT }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 flex items-start gap-3 rounded-xl border border-signal/30 bg-signal/[0.07] px-4 py-3.5">
                                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-signal" />
                                <p className="font-sans text-sm leading-relaxed text-paper/85">
                                  {FREE_HOSTING_RISK[answers.projectType]}
                                </p>
                              </div>
                            </motion.div>
                          )}
                      </AnimatePresence>

                      <Nav onBack={() => go(5, -1)} onNext={() => go(7, 1)} nextDisabled={!canProceed[6]} />
                    </StepShell>
                  )}

                  {step === 7 && (
                    <StepShell
                      step={7}
                      title="Need a domain?"
                      sub="A domain is a small separate yearly cost (roughly ₹800-₹1,500). Tell us what you'd want, and we'll check availability when we talk."
                    >
                      <div className="relative max-w-md">
                        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted/60" />
                        <input
                          type="text"
                          value={answers.domain}
                          onChange={(e) =>
                            setAnswers((a) => ({ ...a, domain: e.target.value }))
                          }
                          placeholder="yourbusinessname.com (optional)"
                          className="w-full rounded-lg border border-line bg-void/40 py-3 pl-11 pr-4 font-sans text-sm text-paper placeholder:text-muted/60 outline-none transition-colors focus:border-signal/60"
                        />
                      </div>
                      <Nav onBack={() => go(6, -1)} onNext={() => go(8, 1)} nextLabel="Get my estimate" />
                    </StepShell>
                  )}

                  {step === 8 && (
                    <div>
                      <p className="label-mono text-[0.6rem] text-signal">YOUR ESTIMATE</p>
                      <h3 className="mt-3 font-display text-2xl font-medium tracking-tight sm:text-3xl">
                        Here&apos;s what it comes to.
                      </h3>

                      <div className="mt-8 divide-y divide-line rounded-xl border border-line bg-void/30">
                        {breakdown.buildLine.map((line) => (
                          <div
                            key={line.label}
                            className="flex items-center justify-between gap-4 px-5 py-3.5"
                          >
                            <span className="font-sans text-sm text-muted">{line.label}</span>
                            <span className="label-mono text-[0.7rem] text-paper/85">
                              ₹{line.amount.toLocaleString("en-IN")}
                            </span>
                          </div>
                        ))}
                        <div className="flex items-center justify-between gap-4 bg-paper/[0.03] px-5 py-3.5">
                          <span className="font-sans text-sm font-medium text-paper">
                            Website build (one-time)
                          </span>
                          <span className="label-mono text-[0.72rem] font-semibold text-signal">
                            ₹{breakdown.buildTotal.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4 px-5 py-3.5">
                          <span className="font-sans text-sm text-muted">
                            Domain{answers.domain ? ` (${answers.domain})` : ""}, per year
                          </span>
                          <span className="label-mono text-[0.7rem] text-paper/85">
                            ₹{breakdown.domainYearly.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4 px-5 py-3.5">
                          <span className="font-sans text-sm text-muted">Hosting, per year</span>
                          <span className="label-mono text-[0.7rem] text-paper/85">
                            {breakdown.hostingYearly > 0
                              ? `₹${breakdown.hostingYearly.toLocaleString("en-IN")}`
                              : "Free"}
                          </span>
                        </div>
                      </div>

                      {answers.hosting === "free" &&
                        answers.projectType &&
                        FREE_HOSTING_RISK[answers.projectType] && (
                          <div className="mt-3 flex items-start gap-3 rounded-xl border border-signal/30 bg-signal/[0.07] px-4 py-3.5">
                            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-signal" />
                            <p className="font-sans text-xs leading-relaxed text-paper/80">
                              {FREE_HOSTING_RISK[answers.projectType]}
                            </p>
                          </div>
                        )}

                      <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-signal/30 bg-signal/[0.06] px-5 py-4">
                        <span className="font-display text-base font-medium tracking-tight sm:text-lg">
                          Total to get started
                        </span>
                        <span className="font-display text-xl font-semibold tracking-tight text-signal sm:text-2xl">
                          ₹{breakdown.totalToStart.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <p className="mt-3 font-sans text-xs leading-relaxed text-muted/80">
                        Estimate only - domain and hosting are yearly, the website
                        build is one-time. Not a final quote - we&apos;ll confirm
                        exact numbers once we understand your project.
                      </p>

                      <div className="mt-8 border-t border-line pt-6">
                        <p className="font-sans text-sm font-medium text-paper">
                          Prefer to split the payment?
                        </p>
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center justify-between gap-4 text-sm">
                            <span className="text-muted">Pay in full</span>
                            <span className="label-mono text-[0.68rem] text-paper/85">
                              ₹{breakdown.buildTotal.toLocaleString("en-IN")}
                            </span>
                          </div>
                          {breakdown.installments.map((inst) => (
                            <div
                              key={inst.parts}
                              className="flex items-center justify-between gap-4 text-sm"
                            >
                              <span className="text-muted">{inst.label}</span>
                              <span className="label-mono text-[0.68rem] text-paper/85">
                                ₹{inst.each.toLocaleString("en-IN")} × {inst.parts}
                              </span>
                            </div>
                          ))}
                        </div>
                        <p className="mt-3 font-sans text-xs text-muted/70">
                          No interest added - a Zaina instalment plan, on the website
                          build cost only.
                        </p>
                      </div>

                      <div className="mt-9 flex flex-wrap items-center gap-3">
                        <a
                          href={whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2.5 rounded-full bg-paper px-5 py-2.5 font-sans text-sm font-medium tracking-tight text-void shadow-[0_2px_20px_-8px_rgba(244,242,238,0.35)] transition-[background-color,box-shadow] duration-300 hover:bg-paper/90"
                        >
                          <SocialIcon name="whatsapp" className="size-4" />
                          Get this estimate on WhatsApp
                        </a>
                        <button
                          type="button"
                          onClick={reset}
                          className="label-mono inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-[0.62rem] text-muted transition-colors hover:border-paper/40 hover:text-paper"
                        >
                          <RotateCcw className="size-3.5" /> Start over
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
