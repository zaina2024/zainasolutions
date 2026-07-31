"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  Globe,
  Smartphone,
  PenTool,
  LayoutGrid,
  Bot,
  Rocket,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { MaskText } from "@/components/ui/MaskText";
import { PillButton } from "@/components/ui/PillButton";
import { EASE_OUT, VIEWPORT_ONCE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Service = {
  code: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  featured?: boolean;
  comingSoon?: boolean;
  href?: string;
  span: string;
};

const SERVICES: Service[] = [
  {
    code: "S-01",
    title: "Website Development",
    desc: "Fast, modern sites that convert visitors into customers - engineered to scale.",
    icon: Globe,
    featured: true,
    href: "/work#websites",
    span: "lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-1",
  },
  {
    code: "S-02",
    title: "App Development",
    desc: "Native iOS & Android, built to ship.",
    icon: Smartphone,
    href: "/work#products",
    span: "lg:col-span-2 lg:col-start-3 lg:row-start-1",
  },
  {
    code: "S-03",
    title: "Branding",
    desc: "Identity systems with a backbone.",
    icon: PenTool,
    href: "/work#branding",
    span: "lg:col-start-3 lg:row-start-2",
  },
  {
    code: "S-04",
    title: "UI/UX Design",
    desc: "Interfaces people actually enjoy.",
    icon: LayoutGrid,
    href: "/work#uiux",
    span: "lg:col-start-4 lg:row-start-2",
  },
  {
    code: "S-05",
    title: "AI Automation",
    desc: "AI-powered automations that save hours of manual work every week.",
    icon: Bot,
    featured: true,
    comingSoon: true,
    span: "lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-3",
  },
  {
    code: "S-06",
    title: "MVP Development",
    desc: "From idea to launchable product, fast.",
    icon: Rocket,
    featured: true,
    comingSoon: true,
    span: "lg:col-span-2 lg:row-span-2 lg:col-start-3 lg:row-start-3",
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const reduce = useReducedMotion();
  const Icon = service.icon;

  return (
    <motion.article
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={reduce ? undefined : { y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: reduce ? 0 : index * 0.07 }}
      className={cn(
        "group glass relative flex flex-col overflow-hidden rounded-xl p-6 transition-colors duration-300 hover:border-signal/60 sm:p-7",
        service.span,
        service.featured && "lg:p-9"
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-signal/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />

      {service.href && !service.comingSoon && (
        <Link
          href={service.href}
          aria-label={`See ${service.title} work`}
          className="absolute inset-0 z-10"
        />
      )}

      <div className="flex items-start justify-between">
        <span className="label-mono text-[0.62rem] transition-transform duration-300 group-hover:translate-x-1">
          <span className="text-signal">{service.code}</span>
        </span>
        {service.comingSoon ? (
          <span className="label-mono inline-flex items-center gap-1.5 rounded-full border border-line-strong px-2.5 py-1 text-[0.5rem] text-muted">
            <span className="size-1 rounded-full bg-signal" aria-hidden />
            Coming Soon
          </span>
        ) : (
          <ArrowUpRight className="size-4 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" />
        )}
      </div>

      <div className="mt-auto pt-10">
        <Icon
          className={cn(
            "transition-colors duration-300",
            service.comingSoon
              ? "text-paper/40"
              : "text-paper/70 group-hover:text-signal",
            service.featured ? "size-9" : "size-7"
          )}
          strokeWidth={1.25}
        />
        <h3
          className={cn(
            "mt-5 font-display font-medium leading-tight tracking-tight transition-transform duration-300 group-hover:translate-x-2",
            service.featured ? "text-2xl sm:text-3xl" : "text-xl"
          )}
        >
          {service.title}
        </h3>
        <p
          className={cn(
            "mt-2.5 font-sans text-sm leading-relaxed text-muted",
            service.featured ? "max-w-sm" : ""
          )}
        >
          {service.desc}
        </p>
      </div>
    </motion.article>
  );
}

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <SectionLabel index="03">WHAT WE BUILD</SectionLabel>
            </Reveal>
            <MaskText
              segments={[
                { text: "Six disciplines," },
                { text: "one studio.", className: "text-signal" },
              ]}
              className="mt-6 max-w-2xl font-display text-[clamp(1.9rem,4vw,3.25rem)] font-medium leading-[1.04] tracking-[-0.02em]"
            />
          </div>
          <Reveal delay={0.1} className="max-w-xs">
            <p className="font-sans text-sm leading-relaxed text-muted">
              Everything a growing business needs to go from zero to shipped -
              handled by trained student creators under expert mentorship.
            </p>
            <div className="mt-5">
              <PillButton href="/work" variant="ghost">
                See selected work
              </PillButton>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(11rem,1fr)]">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.code} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
