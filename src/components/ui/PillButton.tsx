"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CommonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "ghost";
};

type AsLink = CommonProps & { href: string; onClick?: never; type?: never };
type AsButton = CommonProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function PillButton(props: AsLink | AsButton) {
  const { children, className, variant = "solid" } = props;
  const isSolid = variant === "solid";

  const content = (
    <>
      <span>{children}</span>
      <span className="relative inline-flex size-4 overflow-hidden">
        <ArrowRight
          className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-6"
          strokeWidth={2}
          aria-hidden
        />
        <ArrowRight
          className="absolute inset-0 size-4 -translate-x-6 transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-0"
          strokeWidth={2}
          aria-hidden
        />
      </span>
    </>
  );

  const cls = cn(
    "group inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 font-sans text-sm font-medium tracking-tight transition-[background-color,border-color,box-shadow,color] duration-300",
    isSolid
      ? "bg-signal text-paper shadow-[0_2px_20px_-8px_rgba(242,87,74,0.55)] hover:bg-signal-lit hover:shadow-[0_10px_34px_-10px_rgba(242,87,74,0.75)]"
      : "border border-line-strong text-paper hover:border-paper/40 hover:bg-paper/[0.04]",
    className
  );

  if ("href" in props && props.href) {
    return (
      <motion.a href={props.href} className={cls} whileTap={{ scale: 0.97 }}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={cls}
      whileTap={{ scale: 0.97 }}
    >
      {content}
    </motion.button>
  );
}
