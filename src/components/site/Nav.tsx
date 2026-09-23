"use client";

import Image from "next/image";
import { motion, useScroll, useReducedMotion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";
import { useIntroReady } from "@/components/site/Intro";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "top", index: "00", label: "HOME", href: "/" },
  { id: "about", index: "01", label: "ABOUT", href: "/#about" },
  { id: "work", index: "02", label: "WORK", href: "/work" },
  { id: "services", index: "03", label: "SERVICES", href: "/#services" },
  { id: "estimate", index: "04", label: "PRICING", href: "/#estimate" },
  { id: "contact", index: "05", label: "CONTACT", href: "/#contact" },
];

export function Nav() {
  const reduce = useReducedMotion();
  const ready = useIntroReady();
  const pathname = usePathname();
  const onWork = pathname?.startsWith("/work") ?? false;
  const { scrollYProgress } = useScroll();
  const [active, setActive] = useState("top");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (onWork) {
      setActive("work");
      return;
    }
    const els = NAV_ITEMS.map((i) => document.getElementById(i.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [onWork]);

  return (
    <motion.header
      initial={reduce ? { opacity: 0 } : { y: -80, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[padding,background-color,border-color] duration-300",
        scrolled
          ? "border-b border-line bg-void/70 py-3 backdrop-blur-xl"
          : "border-b border-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-4 px-5 sm:px-8">
        <a href="/" className="group flex shrink-0 items-center gap-3">
          <Image
            src="/brand/logo.png"
            alt="Zaina Solutions logo"
            width={40}
            height={40}
            priority
            className="size-8 object-contain mix-blend-screen transition-transform duration-500 group-hover:scale-105 md:size-9"
          />
          <span className="font-display text-[0.95rem] font-medium tracking-tight text-paper">
            ZAINA SOLUTIONS<span className="align-super text-[0.6em] text-muted">™</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={cn(
                  "label-mono relative px-3 py-2 transition-colors duration-200",
                  isActive ? "text-paper" : "hover:text-paper"
                )}
              >
                <span className="text-[0.66rem]">
                  <span className={isActive ? "text-signal" : "text-muted/60"}>
                    {item.index}
                  </span>{" "}
                  {item.label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-2.5 -bottom-0.5 h-px bg-signal"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <span className="label-mono hidden text-[0.62rem] xl:inline">
            HiLITE BUSINESS PARK
          </span>
          <div className="hidden sm:block">
            <PillButton href="/#contact">Start a Project</PillButton>
          </div>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-line text-paper lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-signal"
        style={{ scaleX: scrollYProgress }}
      />

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-void/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col px-5 py-3 sm:px-8">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="label-mono flex items-center gap-3 py-3 text-[0.8rem] text-paper"
                  >
                    <span className="text-signal">{item.index}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
