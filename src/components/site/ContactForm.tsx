"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { PillButton } from "@/components/ui/PillButton";
import { SERVICES, type FieldErrors } from "@/lib/contact";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const fieldBase =
  "w-full rounded-lg border border-line bg-void/40 px-4 py-3 font-sans text-sm text-paper placeholder:text-muted/60 outline-none transition-colors focus:border-signal/60";

export function ContactForm() {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrors({});

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message ?? "Thanks! We'll be in touch.");
        form.reset();
      } else {
        setStatus("error");
        setErrors(data.errors ?? {});
        setMessage(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again or email us directly.");
    }
  }

  return (
    <div className="glass relative flex h-full flex-col overflow-hidden rounded-2xl p-6 sm:p-8">
      <AnimatePresence>
        {status === "success" && !reduce && (
          <motion.div
            aria-hidden
            className="red-bloom pointer-events-none absolute inset-0"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 1, 0.4], scale: 1.4 }}
            transition={{ duration: 1.2 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative flex min-h-[22rem] flex-col items-center justify-center text-center"
          >
            <span className="grid size-14 place-items-center rounded-full border border-signal/60 text-signal">
              <Check className="size-7" />
            </span>
            <p className="mt-6 font-display text-2xl font-medium tracking-tight">
              Message received.
            </p>
            <p className="mt-3 max-w-xs font-sans text-sm text-muted">{message}</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="label-mono mt-8 text-[0.62rem] underline-offset-4 hover:text-paper hover:underline"
            >
              Send another →
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative space-y-4"
            noValidate
          >
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="pointer-events-none absolute left-[-9999px] opacity-0"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" error={errors.name}>
                <input name="name" placeholder="Your name" className={fieldBase} />
              </Field>
              <Field label="Email" name="email" error={errors.email}>
                <input
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  className={fieldBase}
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Company" name="company" error={errors.company} optional>
                <input name="company" placeholder="Optional" className={fieldBase} />
              </Field>
              <Field label="Service" name="service" error={errors.service}>
                <select name="service" defaultValue="" className={cn(fieldBase, "appearance-none")}>
                  <option value="" disabled>
                    Select a service
                  </option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s} className="bg-elevated">
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Project" name="message" error={errors.message}>
              <textarea
                name="message"
                rows={4}
                placeholder="Tell us what you're building…"
                className={cn(fieldBase, "resize-none")}
              />
            </Field>

            {status === "error" && message && (
              <p className="font-mono text-xs text-signal">{message}</p>
            )}

            <div className="flex items-center justify-between pt-1">
              <p className="label-mono hidden text-[0.56rem] sm:block">
                06 - START
              </p>
              <PillButton type="submit">
                {status === "submitting" ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" /> Sending
                  </span>
                ) : (
                  "Start your Project"
                )}
              </PillButton>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  name,
  error,
  optional,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={name} className="block">
      <span className="label-mono mb-2 flex items-center gap-2 text-[0.56rem]">
        {label}
        {optional && <span className="text-muted/50">(optional)</span>}
      </span>
      {children}
      {error && <span className="mt-1.5 block font-mono text-[0.66rem] text-signal">{error}</span>}
    </label>
  );
}
