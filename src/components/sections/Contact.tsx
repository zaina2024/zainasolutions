"use client";

import { FlaskConical, Mail, MapPin, Phone } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { MaskText } from "@/components/ui/MaskText";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { ContactForm } from "@/components/site/ContactForm";
import { SITE_CONTACT } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28 lg:py-36">
      <div className="relative mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="text-center">
          <Reveal>
            <div className="flex justify-center">
              <SectionLabel index="09">START</SectionLabel>
            </div>
          </Reveal>
          <MaskText
            segments={[
              { text: "Let us chart the course for your" },
              { text: "business.", className: "text-signal" },
            ]}
            className="mx-auto mt-7 max-w-3xl font-display text-[clamp(2rem,4.6vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.025em]"
          />
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-muted">
              Tell us where you want to go. We&apos;ll turn Zero Asset into Novel
              Artifact - and reply within 1–2 business days.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-stretch">
          <Reveal className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <a
              href="mailto:thezainasolutions@gmail.com"
              className="glass group flex h-full items-start gap-4 rounded-xl p-5 transition-colors hover:border-signal/50 sm:col-span-2"
            >
              <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full border border-line text-signal">
                <Mail className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="label-mono text-[0.56rem]">Email</span>
                <span className="mt-1 block truncate font-mono text-sm text-paper transition-colors group-hover:text-signal">
                  thezainasolutions@gmail.com
                </span>
                <span className="mt-1 block truncate font-mono text-xs text-muted transition-colors group-hover:text-signal">
                  info@zainasolutions.com
                </span>
              </span>
            </a>

            <a
              href="tel:+918714313489"
              className="glass group flex h-full items-start gap-4 rounded-xl p-5 transition-colors hover:border-signal/50"
            >
              <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full border border-line text-signal">
                <Phone className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="label-mono text-[0.56rem]">Call</span>
                <span className="mt-1 block font-mono text-sm text-paper transition-colors group-hover:text-signal">
                  +91 87143 13489
                </span>
              </span>
            </a>

            <a
              href={SITE_CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="glass group flex h-full items-start gap-4 rounded-xl p-5 transition-colors hover:border-signal/50"
            >
              <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full border border-line text-signal">
                <SocialIcon name="whatsapp" className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="label-mono text-[0.56rem]">WhatsApp</span>
                <span className="mt-1 block font-mono text-sm text-paper transition-colors group-hover:text-signal">
                  Chat with us instantly
                </span>
              </span>
            </a>

            <a
              href="https://www.google.com/maps?q=11.248164176940918,75.834228515625&z=17&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="glass group flex h-full items-start gap-4 rounded-xl p-5 transition-colors hover:border-signal/50 sm:col-span-2"
            >
              <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full border border-line text-signal">
                <MapPin className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="label-mono text-[0.56rem]">Office</span>
                <span className="mt-1 block font-mono text-xs leading-relaxed text-muted transition-colors group-hover:text-signal">
                  HiLITE Business Park, Calicut, Kerala, India
                </span>
              </span>
            </a>

            <div className="glass flex h-full items-start gap-4 rounded-xl p-5 sm:col-span-2">
              <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full border border-line text-signal">
                <FlaskConical className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="label-mono text-[0.56rem]">Research &amp; Development</span>
                <span className="mt-1 block font-mono text-xs leading-relaxed text-muted">
                  Technology Business Incubator (TBI),
                  <br />
                  MES College of Engineering,
                  <br />
                  Kuttippuram, India
                </span>
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="h-full">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
