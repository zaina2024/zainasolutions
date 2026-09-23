import Image from "next/image";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Reveal } from "@/components/ui/Reveal";

const SOCIALS = [
  { name: "instagram", label: "Instagram", href: "https://www.instagram.com/zainasolutions" },
  { name: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/thezainasolution/" },
  { name: "facebook", label: "Facebook", href: "https://www.facebook.com/people/Zaina-Solutions/61568530567019/" },
];

const EXPLORE = [
  { label: "Home", href: "/" },
  { label: "Work & Case Studies", href: "/work" },
  { label: "Services", href: "/#services" },
  { label: "The Model", href: "/#model" },
  { label: "Budget Calculator", href: "/#estimate" },
  { label: "Leadership", href: "/#team" },
  { label: "Contact", href: "/#contact" },
];

const SERVICES = [
  "Website Development",
  "App Development",
  "Branding",
  "UI/UX Design",
  "AI Automation",
  "MVP Development",
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group relative inline-block font-sans text-sm text-muted transition-colors hover:text-paper"
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-signal transition-all duration-300 group-hover:w-full" />
    </a>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-void">
      <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <Reveal y={16}>
            <div className="flex items-center gap-3">
              <Image
                src="/icon.webp"
                alt="Zaina Solutions logo"
                width={40}
                height={40}
                className="size-8 object-contain mix-blend-screen"
              />
              <span className="font-display text-base font-medium tracking-tight">
                ZAINA SOLUTIONS™
              </span>
            </div>
            <p className="mt-5 max-w-xs font-sans text-sm leading-relaxed text-muted">
              A technology company turning ideas into digital assets for growing
              businesses.
            </p>
            <ul className="mt-7 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-signal/60 hover:text-signal"
                  >
                    <SocialIcon name={s.name} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal y={16} delay={0.08}>
            <nav aria-label="Footer">
              <p className="label-mono text-[0.6rem]">Explore</p>
              <ul className="mt-5 space-y-3">
                {EXPLORE.map((l) => (
                  <li key={l.label}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          <Reveal y={16} delay={0.16}>
            <p className="label-mono text-[0.6rem]">Services</p>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((s) => (
                <li key={s}>
                  <FooterLink href="/#services">{s}</FooterLink>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal y={16} delay={0.24}>
            <p className="label-mono text-[0.6rem]">Get in touch</p>
            <a
              href="mailto:info@zainasolutions.com"
              className="mt-5 block font-mono text-sm text-paper transition-colors hover:text-signal"
            >
              info@zainasolutions.com
            </a>
            <a
              href="tel:+918714313489"
              className="mt-2 block font-mono text-sm text-paper transition-colors hover:text-signal"
            >
              +91 87143 13489
            </a>
            <p className="mt-5 max-w-[16rem] font-mono text-xs leading-relaxed text-muted">
              HiLITE Business Park,
              <br />
              Calicut, Kerala, India
            </p>
          </Reveal>
        </div>

        <Reveal y={12} delay={0.1}>
          <div className="mt-16 flex flex-col gap-2 border-t border-line pt-7 font-mono text-[0.7rem] uppercase tracking-wider text-muted sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 Zaina Innovators LLP · All Rights Reserved</span>
            <span>Zaina Solutions™ is a subsidiary of Zaina Innovators LLP</span>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
