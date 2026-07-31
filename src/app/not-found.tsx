import type { Metadata } from "next";
import { Background } from "@/components/site/Background";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PillButton } from "@/components/ui/PillButton";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <>
      <Background />
      <Nav />
      <main className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 text-center sm:px-8">
        <SectionLabel>404 - NOT FOUND</SectionLabel>
        <h1 className="mt-7 max-w-2xl font-display text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.04] tracking-[-0.025em]">
          This page is a <span className="text-signal">Zero Asset.</span>
        </h1>
        <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-muted">
          The page you&apos;re looking for was moved, renamed, or never shipped.
          Let&apos;s get you back on course.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <PillButton href="/">Back to home</PillButton>
          <PillButton href="/work" variant="ghost">
            See our work
          </PillButton>
        </div>
      </main>
      <Footer />
    </>
  );
}
