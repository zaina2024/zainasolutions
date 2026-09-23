import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Background } from "@/components/site/Background";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Reveal } from "@/components/ui/Reveal";
import { PillButton } from "@/components/ui/PillButton";
import { ProductBadge } from "@/components/ui/ProductBadge";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  PROJECTS,
  getProject,
  nextProject,
  coverOf,
  pagesOf,
  isOwnProduct,
} from "@/lib/projects";

const SITE = "https://zainasolutions.com";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const url = `/work/${project.slug}`;
  return {
    title: project.metaTitle,
    description: project.metaDescription,
    keywords: project.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: "Zaina Solutions™",
      locale: "en_IN",
      url,
      title: `${project.title} · ${project.scope}`,
      description: project.metaDescription,
      images: [{ url: `${SITE}${coverOf(project)}`, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} · Zaina Solutions™`,
      description: project.metaDescription,
      images: [`${SITE}${coverOf(project)}`],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const images = pagesOf(project);
  const next = nextProject(project.slug);
  const heroImage = images[0];
  const bodyImages = images.slice(1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Work", item: `${SITE}/work` },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: `${SITE}/work/${project.slug}`,
          },
        ],
      },
      {
        "@type": "CreativeWork",
        name: project.title,
        headline: project.metaTitle,
        description: project.metaDescription,
        abstract: project.overview,
        url: `${SITE}/work/${project.slug}`,
        image: `${SITE}${coverOf(project)}`,
        dateCreated: project.year,
        genre: project.category,
        keywords: project.keywords.join(", "),
        about: project.sector,
        creator: {
          "@type": "Organization",
          name: "Zaina Solutions",
          url: SITE,
        },
        provider: {
          "@type": "Organization",
          name: "Zaina Solutions",
          url: SITE,
        },
        ...(project.url ? { sameAs: [project.url] } : {}),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Background />
      <Nav />
      <SmoothScroll />

      <main>
        {/* ---------------- header ---------------- */}
        <header className="mx-auto max-w-[88rem] px-5 pt-32 sm:px-8 sm:pt-36">
          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="label-mono flex flex-wrap items-center gap-2 text-[0.62rem]">
                <li>
                  <Link href="/" className="transition-colors hover:text-paper">
                    HOME
                  </Link>
                </li>
                <li aria-hidden className="text-muted/40">
                  /
                </li>
                <li>
                  <Link href="/work" className="transition-colors hover:text-paper">
                    WORK
                  </Link>
                </li>
                <li aria-hidden className="text-muted/40">
                  /
                </li>
                <li className="text-paper">{project.title.toUpperCase()}</li>
              </ol>
            </nav>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal delay={0.05}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="label-mono rounded-full border border-line px-2.5 py-1 text-[0.54rem]">
                    {project.category}
                  </span>
                  <span className="label-mono rounded-full border border-signal/40 px-2.5 py-1 text-[0.54rem] text-signal">
                    {project.tag}
                  </span>
                  {isOwnProduct(project) && <ProductBadge />}
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.03em]">
                  {project.title}
                </h1>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-muted sm:text-lg">
                  {project.overview}
                </p>
              </Reveal>
              {project.url && (
                <Reveal delay={0.2}>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 font-sans text-sm font-medium text-paper transition-colors hover:border-signal/60 hover:text-signal"
                  >
                    Visit live site <ArrowUpRight className="size-4" />
                  </a>
                </Reveal>
              )}
            </div>

            <Reveal delay={0.2} className="lg:col-span-5">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-6 rounded-2xl border border-line bg-elevated/40 p-6 sm:p-7">
                <div>
                  <dt className="label-mono text-[0.56rem] text-muted/70">
                    {isOwnProduct(project) ? "OWNED BY" : "CLIENT"}
                  </dt>
                  <dd className="mt-2 font-sans text-sm text-paper">{project.client}</dd>
                </div>
                <div>
                  <dt className="label-mono text-[0.56rem] text-muted/70">YEAR</dt>
                  <dd className="mt-2 font-sans text-sm text-paper">{project.year}</dd>
                </div>
                <div>
                  <dt className="label-mono text-[0.56rem] text-muted/70">SECTOR</dt>
                  <dd className="mt-2 font-sans text-sm text-paper">{project.sector}</dd>
                </div>
                <div>
                  <dt className="label-mono text-[0.56rem] text-muted/70">SCOPE</dt>
                  <dd className="mt-2 font-sans text-sm text-paper">{project.scope}</dd>
                </div>
                <div className="col-span-2 border-t border-line pt-5">
                  <dt className="label-mono text-[0.56rem] text-muted/70">WHAT WE DID</dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {project.services.map((s) => (
                      <span
                        key={s}
                        className="label-mono rounded-full border border-line px-2.5 py-1 text-[0.54rem]"
                      >
                        {s}
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="col-span-2 border-t border-line pt-5">
                  <dt className="label-mono text-[0.56rem] text-muted/70">BUILT WITH</dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <span key={s} className="label-mono text-[0.56rem] text-muted">
                        {s}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </header>

        {/* ---------------- hero image ---------------- */}
        {heroImage && (
          <Reveal delay={0.1} className="mx-auto mt-14 max-w-[88rem] px-5 sm:mt-20 sm:px-8">
            <div className="overflow-hidden rounded-2xl border border-line-strong bg-elevated">
              <Image
                src={heroImage}
                alt={`${project.title} - ${project.scope}`}
                width={1600}
                height={1000}
                priority
                sizes="(max-width: 1024px) 92vw, 88rem"
                className="h-auto w-full"
              />
            </div>
          </Reveal>
        )}

        {/* ---------------- narrative ---------------- */}
        <div className="mx-auto mt-20 max-w-[88rem] px-5 sm:mt-28 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="flex flex-col gap-12 sm:gap-14">
                {project.sections.map((s, i) => (
                  <Reveal key={s.heading} delay={i * 0.05}>
                    <article>
                      <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.1rem)] font-medium leading-tight tracking-[-0.02em]">
                        {s.heading}
                      </h2>
                      <p className="mt-4 max-w-2xl font-sans text-[0.95rem] leading-[1.75] text-muted sm:text-base">
                        {s.body}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.1} className="lg:col-span-5">
              <div className="rounded-2xl border border-line bg-elevated/40 p-6 sm:p-8 lg:sticky lg:top-28">
                <h2 className="label-mono text-[0.62rem] text-signal">WHAT SHIPPED</h2>
                <ul className="mt-6 flex flex-col gap-4">
                  {project.delivered.map((d) => (
                    <li key={d} className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-signal/40 text-signal">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      <span className="font-sans text-sm leading-relaxed text-paper/90">
                        {d}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ---------------- gallery ---------------- */}
        {bodyImages.length > 0 && (
          <section
            aria-label={`${project.title} gallery`}
            className="mx-auto mt-20 max-w-[88rem] px-5 sm:mt-28 sm:px-8"
          >
            <div className="flex flex-col gap-5 sm:gap-7">
              {bodyImages.map((src, i) => (
                <Reveal key={src} delay={0.04 * i}>
                  <div className="overflow-hidden rounded-2xl border border-line bg-elevated">
                    <Image
                      src={src}
                      alt={`${project.title} - screen ${i + 2}`}
                      width={1600}
                      height={1000}
                      sizes="(max-width: 1024px) 92vw, 88rem"
                      className="h-auto w-full"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ---------------- CTA ---------------- */}
        <section className="mx-auto mt-24 max-w-[88rem] px-5 sm:mt-32 sm:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-elevated/60 px-6 py-14 text-center sm:px-12 sm:py-20">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 size-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(242,87,74,0.16), rgba(5,5,5,0) 65%)",
                }}
              />
              <div className="relative">
                <SectionLabel tick={false}>WANT SOMETHING LIKE THIS?</SectionLabel>
                <h2 className="mx-auto mt-5 max-w-2xl font-display text-[clamp(1.75rem,4vw,2.9rem)] font-medium leading-[1.06] tracking-[-0.02em]">
                  Let&apos;s build yours{" "}
                  <span className="text-signal">next.</span>
                </h2>
                <p className="mx-auto mt-5 max-w-lg font-sans text-sm leading-relaxed text-muted sm:text-base">
                  Get an instant, itemized estimate in 60 seconds - or tell us about
                  the project and we&apos;ll reply within 1-2 business days.
                </p>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                  <PillButton href="/#estimate">Calculate your budget</PillButton>
                  <PillButton href="/#contact" variant="ghost">
                    Start a Project
                  </PillButton>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ---------------- next project ---------------- */}
        <section className="mx-auto mt-20 max-w-[88rem] px-5 pb-8 sm:mt-28 sm:px-8">
          <Reveal>
            <div className="flex items-center gap-4 border-t border-line pt-8">
              <span className="label-mono text-[0.62rem]">NEXT PROJECT</span>
              <span className="h-px flex-1 bg-line" />
              <Link
                href="/work"
                className="label-mono inline-flex items-center gap-2 text-[0.62rem] transition-colors hover:text-paper"
              >
                <ArrowLeft className="size-3.5" /> ALL WORK
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <Link href={`/work/${next.slug}`} className="group mt-8 grid items-center gap-7 sm:grid-cols-12 sm:gap-10">
              <div className="sm:col-span-5">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line bg-elevated transition-colors duration-500 group-hover:border-line-strong">
                  <Image
                    src={coverOf(next)}
                    alt={`${next.title} case study`}
                    fill
                    sizes="(max-width: 640px) 92vw, 40vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
              </div>
              <div className="sm:col-span-7">
                <span className="label-mono text-[0.58rem] text-muted/70">
                  {next.category} · {next.tag}
                </span>
                <h2 className="mt-3 font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium leading-tight tracking-[-0.02em]">
                  {next.title}
                </h2>
                <p className="mt-3 max-w-lg font-sans text-sm leading-relaxed text-muted">
                  {next.blurb}
                </p>
                <span className="mt-6 inline-flex items-center gap-2.5 font-sans text-sm font-medium text-paper">
                  <span className="border-b border-signal/40 pb-0.5 transition-colors group-hover:border-signal">
                    View case study
                  </span>
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}
