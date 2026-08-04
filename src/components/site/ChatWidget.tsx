"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MessageCircle, Phone, Send, X, ArrowUpRight, Calculator } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { SITE_CONTACT } from "@/lib/site";
import { cn } from "@/lib/utils";

type ChatAction = "whatsapp" | "call" | "contact" | "estimate";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  actions?: ChatAction[];
};

const GREETING: Message = {
  id: 0,
  role: "assistant",
  content:
    "Hi! I'm the Zaina assistant. Ask me anything about our services, the student-powered model, or how to get started.",
};

const QUICK_PROMPTS = [
  "What services do you offer?",
  "How does the student model work?",
  "What does a project cost?",
  "I want to start a project",
];

const HISTORY_WINDOW = 11;

function ActionButtons({ actions, onContact }: { actions: ChatAction[]; onContact: () => void }) {
  return (
    <div className="mt-2.5 flex flex-wrap gap-2">
      {actions.includes("estimate") && (
        <a
          href="/#estimate"
          onClick={onContact}
          className="inline-flex items-center gap-1.5 rounded-full border border-signal/50 px-3 py-1.5 font-sans text-xs font-medium text-paper transition-colors hover:bg-signal hover:text-paper"
        >
          <Calculator className="size-3.5" />
          Calculate your budget
        </a>
      )}
      {actions.includes("whatsapp") && (
        <a
          href={SITE_CONTACT.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-signal/50 px-3 py-1.5 font-sans text-xs font-medium text-paper transition-colors hover:bg-signal hover:text-paper"
        >
          <SocialIcon name="whatsapp" className="size-3.5" />
          Chat on WhatsApp
        </a>
      )}
      {actions.includes("call") && (
        <a
          href={SITE_CONTACT.phoneHref}
          className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 font-sans text-xs font-medium text-paper transition-colors hover:border-paper/40 hover:bg-paper/[0.04]"
        >
          <Phone className="size-3.5" />
          Call us
        </a>
      )}
      {actions.includes("contact") && (
        <a
          href="/#contact"
          onClick={onContact}
          className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 font-sans text-xs font-medium text-paper transition-colors hover:border-paper/40 hover:bg-paper/[0.04]"
        >
          Start a Project
          <ArrowUpRight className="size-3.5" />
        </a>
      )}
    </div>
  );
}

function TypingDots({ reduce }: { reduce: boolean }) {
  return (
    <div role="status" className="flex items-center gap-1 px-1 py-1.5">
      <span className="sr-only">Assistant is typing</span>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-1.5 rounded-full bg-muted"
          animate={reduce ? undefined : { opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </div>
  );
}

export function ChatWidget() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const stickToBottom = useRef(true);
  const nextId = useRef(1);
  const [showNudge, setShowNudge] = useState(false);
  const dismissedRef = useRef(false);

  useEffect(() => {
    const list = listRef.current;
    if (list && stickToBottom.current) list.scrollTop = list.scrollHeight;
  }, [messages, busy, open]);

  useEffect(() => {
    if (open) {
      stickToBottom.current = true;
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      setShowNudge(false);
      return;
    }
    if (dismissedRef.current) return;
    const t = setTimeout(() => setShowNudge(true), 30000);
    return () => clearTimeout(t);
  }, [open]);

  function close() {
    setOpen(false);
    launcherRef.current?.focus();
  }

  function onListScroll() {
    const list = listRef.current;
    if (!list) return;
    stickToBottom.current = list.scrollHeight - list.scrollTop - list.clientHeight < 80;
  }

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;

    const userMessage: Message = { id: nextId.current++, role: "user", content: trimmed };
    const history = [...messages, userMessage];
    setMessages(history);
    setInput("");
    setBusy(true);
    stickToBottom.current = true;

    const windowed = history
      .filter((m) => m.id !== 0)
      .slice(-HISTORY_WINDOW)
      .map(({ role, content }) => ({ role, content }));
    while (windowed.length && windowed[0].role !== "user") windowed.shift();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: windowed }),
      });
      const data = await res.json();
      const reply: Message = res.ok && data.ok
        ? {
            id: nextId.current++,
            role: "assistant",
            content: data.reply,
            actions: data.actions?.length ? data.actions : undefined,
          }
        : {
            id: nextId.current++,
            role: "assistant",
            content:
              data?.message ??
              "Something went wrong on my end. You can always reach the team on WhatsApp.",
            actions: ["whatsapp"],
          };
      setMessages((prev) => [...prev, reply]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId.current++,
          role: "assistant",
          content: "I couldn't reach the server. You can message the team directly on WhatsApp.",
          actions: ["whatsapp"],
        },
      ]);
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }

  const showQuickPrompts = messages.length === 1 && !busy;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            aria-hidden
            className="fixed inset-0 z-40 bg-void/70 backdrop-blur-sm sm:bg-void/40 sm:backdrop-blur-none"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            id="zaina-chat-panel"
            className="fixed inset-x-3 bottom-3 top-3 z-50 flex flex-col overflow-hidden rounded-2xl border border-line-strong bg-void shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)] sm:inset-auto sm:bottom-24 sm:right-6 sm:top-auto sm:h-[min(34rem,calc(100dvh-8rem))] sm:w-[min(24rem,calc(100vw-2rem))]"
            role="dialog"
            aria-label="Chat with Zaina Solutions"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <span className="relative grid size-8 place-items-center rounded-full bg-signal/15 text-signal">
                  <MessageCircle className="size-4" />
                  <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-emerald-400" aria-hidden />
                </span>
                <div>
                  <p className="font-display text-sm font-medium tracking-tight">Zaina Assistant</p>
                  <p className="label-mono text-[0.55rem] text-muted">Usually replies instantly</p>
                </div>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close chat"
                className="grid size-8 place-items-center rounded-full border border-line text-muted transition-colors hover:border-signal/60 hover:text-paper"
              >
                <X className="size-4" />
              </button>
            </div>

            <div
              ref={listRef}
              onScroll={onListScroll}
              role="log"
              aria-live="polite"
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((m) => (
                <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 font-sans text-sm leading-relaxed",
                      m.role === "user"
                        ? "rounded-br-md bg-signal text-paper"
                        : "rounded-bl-md border border-line bg-elevated text-paper/90"
                    )}
                  >
                    {m.content}
                    {m.role === "assistant" && m.actions && (
                      <ActionButtons actions={m.actions} onContact={close} />
                    )}
                  </div>
                </div>
              ))}
              {busy && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-line bg-elevated px-3.5 py-2.5">
                    <TypingDots reduce={!!reduce} />
                  </div>
                </div>
              )}
              {showQuickPrompts && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK_PROMPTS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => void send(q)}
                      className="rounded-full border border-line px-3 py-1.5 font-sans text-xs text-muted transition-colors hover:border-signal/60 hover:text-paper"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-line p-3">
              <form onSubmit={onSubmit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={2000}
                  placeholder="Ask a question…"
                  aria-label="Your message"
                  className="h-10 flex-1 rounded-full border border-line bg-transparent px-4 font-sans text-sm text-paper placeholder:text-muted/60 focus:border-signal/60 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  aria-label="Send message"
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-signal text-paper transition-opacity disabled:opacity-40"
                >
                  <Send className="size-4" />
                </button>
              </form>
              <p className="mt-2 text-center font-mono text-[0.55rem] uppercase tracking-wider text-muted/70">
                AI assistant · quotes &amp; commitments come from the team
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNudge && !open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 z-50 sm:right-6"
          >
            <div className="relative max-w-[15rem] rounded-2xl rounded-br-md border border-line-strong bg-void/95 p-3.5 shadow-[0_16px_50px_-16px_rgba(0,0,0,0.85)] backdrop-blur-xl">
              <button
                type="button"
                onClick={() => {
                  setShowNudge(false);
                  setOpen(true);
                }}
                className="flex items-start gap-2.5 text-left"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-signal/15 text-signal">
                  <MessageCircle className="size-3.5" />
                </span>
                <span className="font-sans text-xs leading-relaxed text-paper/90">
                  Hi there! 👋 I&apos;m here if you need any help.
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowNudge(false);
                  dismissedRef.current = true;
                }}
                aria-label="Dismiss"
                className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full border border-line bg-elevated text-muted transition-colors hover:text-paper"
              >
                <X className="size-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileTap={reduce ? undefined : { scale: 0.95 }}
        aria-label={open ? "Close chat" : "Chat with us"}
        aria-expanded={open}
        aria-controls="zaina-chat-panel"
        className={cn(
          "fixed bottom-5 right-4 z-50 grid size-14 place-items-center rounded-full bg-signal text-paper shadow-[0_8px_30px_-6px_rgba(242,87,74,0.6)] transition-colors hover:bg-signal-lit sm:right-6",
          open && "max-sm:hidden"
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={reduce ? undefined : { rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={reduce ? undefined : { rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X className="size-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={reduce ? undefined : { rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={reduce ? undefined : { rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageCircle className="size-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
