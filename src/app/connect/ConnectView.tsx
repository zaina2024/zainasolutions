"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "motion/react";
import {
  ArrowUpRight,
  Briefcase,
  Check,
  Copy,
  Globe,
  Mail,
  Phone,
  QrCode,
  Share2,
  UserPlus,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { CONNECT_PROFILE as P, CONNECT_QR } from "@/lib/connect";

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

/** A short buzz on Android; iOS Safari ignores it. */
function tick(ms = 8) {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* not supported */
  }
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

const RED_GRADIENT = "linear-gradient(135deg, #B82E2E 0%, #E0473B 55%, #FF6B4A 100%)";

/* ------------------------------------------------------------------ */
/* brand pieces                                                        */
/* ------------------------------------------------------------------ */

function Mark({
  className,
  floor = "#f4f2ee",
  gap = "#050505",
}: {
  className?: string;
  floor?: string;
  gap?: string;
}) {
  return (
    <svg viewBox="414 442 734 638" className={className} aria-hidden>
      <polygon points="434,794 608,464 612,804 434,1060" fill="#f4f2ee" />
      <polygon points="954,462 1128,792 1128,1060 962,804" fill="#f4f2ee" />
      <polygon
        points="448,1060 616,808 952,804 1112,1056"
        fill={floor}
        stroke={gap}
        strokeWidth={16}
      />
    </svg>
  );
}

/** Contactless symbol; the arcs pulse outward like the tap that opened this page. */
function Contactless({ className }: { className?: string }) {
  const arcs = [
    "M7.27 8.94A4 4 0 0 1 7.27 15.06",
    "M9.84 5.87A8 8 0 0 1 9.84 18.13",
    "M12.41 2.81A12 12 0 0 1 12.41 21.19",
  ];
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      {arcs.map((d, i) => (
        <path
          key={d}
          d={d}
          className="[animation:zc-arc_2.4s_ease-in-out_infinite]"
          style={{ animationDelay: `${i * 0.22}s` }}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* rows                                                                */
/* ------------------------------------------------------------------ */

type Row = {
  key: string;
  label: string;
  sub: string;
  href: string;
  icon: ReactNode;
  kind: "external" | "internal" | "native";
  copy?: { text: string; toast: string; label: string };
};

const CONTACT_ROWS: Row[] = [
  {
    key: "call",
    label: "Call Me",
    sub: P.phone,
    href: `tel:${P.phoneE164}`,
    icon: <Phone className="size-[18px]" strokeWidth={1.8} />,
    kind: "native",
    copy: { text: P.phone, toast: "Number copied", label: "phone number" },
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    sub: "Send a message",
    href: P.whatsappHref,
    icon: <SocialIcon name="whatsapp" className="size-[17px]" />,
    kind: "external",
  },
  {
    key: "email",
    label: "Email Me",
    sub: P.email,
    href: `mailto:${P.email}`,
    icon: <Mail className="size-[18px]" strokeWidth={1.8} />,
    kind: "native",
    copy: { text: P.email, toast: "Email copied", label: "email address" },
  },
];

const EXPLORE_ROWS: Row[] = [
  {
    key: "site",
    label: "Visit Zaina Solutions",
    sub: "zainasolutions.com",
    href: "/",
    icon: <Globe className="size-[18px]" strokeWidth={1.8} />,
    kind: "internal",
  },
  {
    key: "work",
    label: "Explore Our Portfolio",
    sub: "zainasolutions.com/work",
    href: "/work",
    icon: <Briefcase className="size-[18px]" strokeWidth={1.8} />,
    kind: "internal",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    sub: "in/muhammedshifal",
    href: P.linkedin,
    icon: <SocialIcon name="linkedin" className="size-[16px]" />,
    kind: "external",
  },
  {
    key: "instagram",
    label: "Instagram",
    sub: "@zainasolutions",
    href: P.instagram,
    icon: <SocialIcon name="instagram" className="size-[17px]" />,
    kind: "external",
  },
];

type Ripple = { id: number; x: number; y: number };

function RowItem({
  row,
  variants,
  onCopy,
}: {
  row: Row;
  variants: Variants;
  onCopy: (c: NonNullable<Row["copy"]>) => void;
}) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const nextId = useRef(0);

  function onPointerDown(e: ReactPointerEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const id = nextId.current++;
    setRipples((rs) => [...rs, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
  }

  const content = (
    <>
      {ripples.map((rp) => (
        <motion.span
          key={rp.id}
          aria-hidden
          className="pointer-events-none absolute -ml-[220px] -mt-[220px] size-[440px] rounded-full bg-signal/25"
          style={{ left: rp.x, top: rp.y }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => setRipples((rs) => rs.filter((x) => x.id !== rp.id))}
        />
      ))}
      <span className="relative grid size-10 shrink-0 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.035] text-paper/90 transition-colors duration-300 group-hover:border-signal/40 group-hover:text-signal-lit group-active:border-signal/50 group-active:bg-signal/15 group-active:text-signal-lit">
        {row.icon}
      </span>
      <span className="relative min-w-0 flex-1">
        <span className="block text-[15px] font-medium leading-tight text-paper">
          {row.label}
        </span>
        <span className="mt-1 block truncate font-mono text-[11px] leading-none text-muted">
          {row.sub}
        </span>
      </span>
      {!row.copy && (
        <ArrowUpRight
          aria-hidden
          className="relative size-[18px] shrink-0 text-muted transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal-lit"
        />
      )}
    </>
  );

  const cls =
    "group relative flex min-w-0 flex-1 items-center gap-3.5 overflow-hidden py-3.5 pl-4 pr-4 outline-none transition-colors hover:bg-white/[0.02] focus-visible:bg-white/[0.05]";

  return (
    <motion.li variants={variants} className="relative flex items-center">
      {row.kind === "internal" ? (
        <Link href={row.href} className={cls} onPointerDown={onPointerDown} onClick={() => tick()}>
          {content}
        </Link>
      ) : (
        <a
          href={row.href}
          className={cls}
          onPointerDown={onPointerDown}
          onClick={() => tick()}
          {...(row.kind === "external" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {content}
        </a>
      )}
      {row.copy && (
        <button
          type="button"
          onClick={() => row.copy && onCopy(row.copy)}
          aria-label={`Copy ${row.copy.label}`}
          className="mr-2.5 grid size-10 shrink-0 place-items-center rounded-xl text-muted outline-none transition hover:bg-white/[0.05] hover:text-paper focus-visible:bg-white/[0.06] focus-visible:text-paper active:scale-90"
        >
          <Copy className="size-[17px]" strokeWidth={1.8} />
        </button>
      )}
    </motion.li>
  );
}

/* ------------------------------------------------------------------ */
/* page                                                                */
/* ------------------------------------------------------------------ */

export function ConnectView() {
  const reduce = useReducedMotion();
  const [qrOpen, setQrOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [rings, setRings] = useState(true);
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const savedTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const qrButtonRef = useRef<HTMLButtonElement>(null);
  const qrCloseRef = useRef<HTMLButtonElement>(null);

  /* background spotlight follows the finger / cursor */
  const bx = useMotionValue(50);
  const by = useMotionValue(18);
  const sbx = useSpring(bx, { stiffness: 50, damping: 20 });
  const sby = useSpring(by, { stiffness: 50, damping: 20 });
  const bloom = useMotionTemplate`radial-gradient(560px circle at ${sbx}% ${sby}%, rgba(224,71,59,0.17), rgba(224,71,59,0.05) 38%, transparent 62%)`;

  useEffect(() => {
    if (reduce) return;
    function move(e: PointerEvent) {
      bx.set((e.clientX / window.innerWidth) * 100);
      by.set((e.clientY / window.innerHeight) * 100);
    }
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", move);
    };
  }, [reduce, bx, by]);

  const showToast = useCallback((text: string) => {
    clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), text });
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  useEffect(
    () => () => {
      clearTimeout(toastTimer.current);
      clearTimeout(savedTimer.current);
    },
    []
  );

  /* QR sheet: lock scroll, focus the close button, Escape closes */
  useEffect(() => {
    if (!qrOpen) return;
    qrCloseRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setQrOpen(false);
        qrButtonRef.current?.focus();
      } else if (e.key === "Tab") {
        e.preventDefault();
        qrCloseRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [qrOpen]);

  function openQr() {
    tick(10);
    setQrOpen(true);
  }
  function closeQr() {
    setQrOpen(false);
    qrButtonRef.current?.focus();
  }

  async function onCopy(c: NonNullable<Row["copy"]>) {
    tick(10);
    if (await copyText(c.text)) showToast(c.toast);
  }

  async function onShare() {
    tick();
    const data = {
      title: `${P.name} · ${P.company}`,
      text: `${P.name}, ${P.role} at ${P.company}`,
      url: P.connectUrl,
    };
    if (navigator.share) {
      try {
        await navigator.share(data);
      } catch {
        /* user closed the share sheet */
      }
      return;
    }
    if (await copyText(P.connectUrl)) showToast("Link copied");
  }

  function onSave() {
    tick(14);
    setSaved(true);
    clearTimeout(savedTimer.current);
    savedTimer.current = setTimeout(() => setSaved(false), 3200);
  }

  /* entrance choreography */
  const list: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05, delayChildren: reduce ? 0 : 0.2 } },
  };
  const group: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 170, damping: 22, staggerChildren: 0.045 },
    },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 170, damping: 22 } },
  };

  const qrSvg = (
    <svg
      viewBox={`-3 -3 ${CONNECT_QR.size + 6} ${CONNECT_QR.size + 6}`}
      shapeRendering="crispEdges"
      className="block aspect-square w-full"
      role="img"
      aria-label="QR code for zainasolutions.com/connect"
    >
      <path d={CONNECT_QR.path} fill="#050505" />
    </svg>
  );

  return (
    <main className="relative min-h-[100svh] overflow-x-clip">
      {/* ambient layers */}
      <motion.div aria-hidden className="pointer-events-none fixed inset-0" style={{ background: bloom }} />
      <div aria-hidden className="perspective-mesh pointer-events-none fixed inset-0 opacity-70" />
      <div aria-hidden className="grain pointer-events-none fixed inset-0" />

      <div className="relative mx-auto w-full max-w-[420px] px-4 pb-[max(28px,env(safe-area-inset-bottom))] pt-[max(14px,env(safe-area-inset-top))]">
        {/* top bar */}
        <motion.header
          initial={{ opacity: 0, y: reduce ? 0 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex h-12 items-center justify-between"
        >
          <Link href="/" className="flex items-center gap-2.5 outline-none focus-visible:opacity-80" aria-label="Zaina Solutions home">
            <Mark className="h-[22px] w-auto" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/80">
              Zaina Solutions™
            </span>
          </Link>
          <button
            type="button"
            onClick={onShare}
            className="flex h-9 items-center gap-2 rounded-xl border border-line bg-white/[0.03] pl-3 pr-[calc(0.75rem-0.18em)] font-mono text-[11px] uppercase tracking-[0.18em] text-paper/80 outline-none transition hover:border-line-strong hover:text-paper focus-visible:border-signal active:scale-95"
          >
            <Share2 className="size-3.5" strokeWidth={2} aria-hidden />
            Share
          </button>
        </motion.header>

        <motion.div variants={list} initial="hidden" animate="show">
          {/* profile */}
          <section className="mt-8 flex flex-col items-center text-center">
            <div className="relative">
              {!reduce &&
                rings &&
                [0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full border border-signal/60"
                    initial={{ scale: 1, opacity: 0.7 }}
                    animate={{ scale: 2.4, opacity: 0 }}
                    transition={{ duration: 1.6, delay: 0.15 + i * 0.22, ease: [0.16, 1, 0.3, 1] }}
                    onAnimationComplete={i === 2 ? () => setRings(false) : undefined}
                  />
                ))}
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 160, damping: 16, delay: 0.05 }}
                className="relative size-[104px] overflow-hidden rounded-full shadow-[0_0_60px_-12px_rgba(242,87,74,0.6)] ring-1 ring-white/15"
              >
                <Image
                  src="/connect/shifal.jpg"
                  alt=""
                  fill
                  sizes="104px"
                  priority
                  unoptimized
                  className="object-cover"
                />
              </motion.div>
              <span
                aria-hidden
                className="absolute -bottom-0.5 -right-0.5 grid size-8 place-items-center rounded-full border-[3px] border-[#0b0b0d] text-paper"
                style={{ background: RED_GRADIENT }}
              >
                <Contactless className="size-4" />
              </span>
            </div>
            <motion.h1
              variants={item}
              className="mt-5 font-display text-[28px] font-semibold leading-[1.05] text-paper [word-spacing:0.12em]"
            >
              {P.name}
            </motion.h1>
            <motion.p variants={item} className="mt-2 text-[15px] leading-snug text-paper/70">
              {P.role}
            </motion.p>
            <motion.p variants={item} className="mt-1.5 text-[14px] leading-snug text-signal-lit">
              {P.tagline}
            </motion.p>
          </section>

          {/* primary actions */}
          <motion.div variants={item} className="mt-7 flex gap-2.5">
            <a
              href={P.vcardPath}
              onClick={onSave}
              className="group relative flex h-14 min-w-0 flex-1 items-center justify-center overflow-hidden rounded-2xl text-[16px] font-medium text-paper shadow-glow outline-none transition-transform focus-visible:ring-2 focus-visible:ring-paper/70 focus-visible:ring-offset-2 focus-visible:ring-offset-void active:scale-[0.98]"
              style={{ background: RED_GRADIENT }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent [animation:zc-shine_3.6s_ease-in-out_1.8s_infinite]"
              />
              <AnimatePresence mode="wait" initial={false}>
                {saved ? (
                  <motion.span
                    key="saved"
                    className="relative flex items-center gap-2.5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="size-5" strokeWidth={2.2} aria-hidden />
                    Opening contact…
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    className="relative flex items-center gap-2.5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <UserPlus className="size-5" strokeWidth={1.9} aria-hidden />
                    Save Contact
                  </motion.span>
                )}
              </AnimatePresence>
            </a>
            <button
              ref={qrButtonRef}
              type="button"
              onClick={openQr}
              aria-haspopup="dialog"
              aria-label="Show QR code"
              className="flex h-14 shrink-0 items-center gap-2 rounded-2xl border border-line-strong bg-white/[0.04] px-4 text-[15px] font-medium text-paper outline-none transition hover:bg-white/[0.07] focus-visible:border-signal active:scale-95"
            >
              <QrCode className="size-5" strokeWidth={1.8} aria-hidden />
              QR
            </button>
          </motion.div>

          <motion.p variants={item} className="label-mono mb-2.5 mt-8 px-1">
            Contact
          </motion.p>
          <motion.ul
            variants={group}
            className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface/80 backdrop-blur-sm"
          >
            {CONTACT_ROWS.map((row) => (
              <RowItem key={row.key} row={row} variants={item} onCopy={onCopy} />
            ))}
          </motion.ul>

          <motion.p variants={item} className="label-mono mb-2.5 mt-7 px-1">
            Explore
          </motion.p>
          <motion.ul
            variants={group}
            className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface/80 backdrop-blur-sm"
          >
            {EXPLORE_ROWS.map((row) => (
              <RowItem key={row.key} row={row} variants={item} onCopy={onCopy} />
            ))}
          </motion.ul>

          <motion.footer variants={item} className="mt-10 flex flex-col items-center gap-2.5">
            <Link
              href="/"
              className="flex items-center gap-2 text-[13px] text-muted outline-none transition hover:text-paper focus-visible:text-paper"
            >
              <Mark className="h-3.5 w-auto" />
              Powered by Zaina Solutions™
            </Link>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted/60">
              Zero Asset Into Novel Artifact
            </p>
          </motion.footer>
        </motion.div>
      </div>

      {/* QR sheet, for phones without NFC */}
      <AnimatePresence>
        {qrOpen && (
          <motion.div
            key="qr"
            className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div aria-hidden className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeQr} />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="zc-qr-title"
              initial={{ y: reduce ? 0 : 48, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: reduce ? 0 : 48, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="relative w-full max-w-[420px] px-4 pb-[max(16px,env(safe-area-inset-bottom))] sm:pb-0"
            >
              <div
                className="relative overflow-hidden rounded-[24px] p-5 text-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]"
                style={{ background: RED_GRADIENT }}
              >
                <div aria-hidden className="grain absolute inset-0" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <Mark gap="#be3431" className="h-5 w-auto" />
                    <button
                      ref={qrCloseRef}
                      type="button"
                      onClick={closeQr}
                      aria-label="Close QR code"
                      className="grid size-9 place-items-center rounded-full bg-black/15 text-paper outline-none transition hover:bg-black/25 focus-visible:ring-2 focus-visible:ring-paper"
                    >
                      <X className="size-[18px]" strokeWidth={2} />
                    </button>
                  </div>
                  <div className="mx-auto mt-4 w-full max-w-[260px] overflow-hidden rounded-2xl bg-paper">
                    {qrSvg}
                  </div>
                  <p
                    id="zc-qr-title"
                    className="mt-5 font-display text-[22px] font-semibold leading-tight text-paper [word-spacing:0.12em]"
                  >
                    Scan to connect
                  </p>
                  <p className="mt-1.5 font-mono text-[11px] text-paper/85">zainasolutions.com/connect</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* toast */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-[max(20px,env(safe-area-inset-bottom))] z-50 flex justify-center px-4"
      >
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="glass flex items-center gap-2 rounded-xl px-4 py-2.5 text-[14px] text-paper shadow-[0_12px_40px_-12px_rgba(0,0,0,0.8)]"
            >
              <Check className="size-4 text-[#00d294]" strokeWidth={2.4} aria-hidden />
              {toast.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
