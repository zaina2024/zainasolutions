"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { Fragment } from "react";
import { EASE_OUT, VIEWPORT_ONCE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Segment = { text: string; className?: string };

type MaskTextProps = {
  segments: Segment[];
  as?: "h1" | "h2" | "h3" | "p" | "blockquote" | "span";
  className?: string;
  show?: boolean;
  delay?: number;
  stagger?: number;
};

export function MaskText({
  segments,
  as = "h2",
  className,
  show,
  delay = 0,
  stagger = 0.05,
}: MaskTextProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  const words = segments.flatMap((seg, si) =>
    seg.text
      .split(" ")
      .filter(Boolean)
      .map((word, wi) => ({ word, className: seg.className, key: `${si}-${wi}` }))
  );

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : delay,
      },
    },
  };

  const item: Variants = {
    hidden: { y: "110%" },
    show: {
      y: "0%",
      transition: reduce ? { duration: 0 } : { duration: 0.7, ease: EASE_OUT },
    },
  };

  const trigger =
    show === undefined
      ? { whileInView: "show" as const, viewport: VIEWPORT_ONCE }
      : { animate: show ? ("show" as const) : ("hidden" as const) };

  return (
    <MotionTag className={className} initial="hidden" variants={container} {...trigger}>
      {words.map(({ word, className: wordClass, key }, i) => (
        <Fragment key={key}>
          <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
            <motion.span
              variants={item}
              className={cn("inline-block will-change-transform", wordClass)}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </MotionTag>
  );
}
