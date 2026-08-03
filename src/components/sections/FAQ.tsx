"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { MaskText } from "@/components/ui/MaskText";
import { EASE_OUT } from "@/lib/motion";
import { FAQS, type FaqItem } from "@/lib/faqs";

export { FAQS, type FaqItem };

function FaqRow({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  const reduce = useReducedMotion();
  const id = useId();

  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={id}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="font-display text-lg font-medium tracking-tight sm:text-xl">
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
          className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-paper/70"
        >
          <Plus className="size-4" strokeWidth={1.75} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={id}
            role="region"
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 font-sans text-sm leading-relaxed text-muted sm:text-base">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[60rem] px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="07">QUESTIONS</SectionLabel>
        </Reveal>

        <MaskText
          segments={[
            { text: "Common" },
            { text: "questions.", className: "text-signal" },
          ]}
          className="mt-6 font-display text-[clamp(1.9rem,4vw,3.25rem)] font-medium leading-[1.04] tracking-[-0.02em]"
        />

        <div className="mt-12">
          {FAQS.map((item, i) => (
            <FaqRow
              key={item.q}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
