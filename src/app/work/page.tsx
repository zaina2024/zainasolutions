import type { Metadata } from "next";
import { Background } from "@/components/site/Background";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { WorkGallery } from "@/components/sections/WorkGallery";
import { PROJECTS, coverOf } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Selected Work & Case Studies",
  description:
    "Case studies from Zaina Solutions - websites, SaaS platforms and brand identities built for businesses in Kerala, India and the Gulf. Including Top Vision Security, Aardha Enterprises, Go Beyond Gym and Linkafe.",
  keywords: [
    "web design portfolio India",
    "website case studies",
    "web development Calicut",
    "SaaS development case study",
    "branding portfolio Kerala",
  ],
  alternates: { canonical: "/work" },
  openGraph: {
    type: "website",
    siteName: "Zaina Solutions™",
    locale: "en_IN",
    url: "/work",
    title: "Selected Work & Case Studies · Zaina Solutions™",
    description:
      "Websites, SaaS platforms, and brand identities designed and built by Zaina Solutions - with the thinking behind each one.",
  },
};

const SITE = "https://zainasolutions.com";

const WORK_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Work", item: `${SITE}/work` },
      ],
    },
    {
      "@type": "CollectionPage",
      name: "Selected Work & Case Studies · Zaina Solutions",
      description:
        "Case studies from Zaina Solutions - websites, SaaS platforms and brand identities built for businesses in Kerala, India and the Gulf.",
      url: `${SITE}/work`,
      isPartOf: { "@type": "WebSite", name: "Zaina Solutions", url: SITE },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: PROJECTS.length,
        itemListElement: PROJECTS.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE}/work/${p.slug}`,
          item: {
            "@type": "CreativeWork",
            name: p.title,
            description: p.blurb,
            url: `${SITE}/work/${p.slug}`,
            image: `${SITE}${coverOf(p)}`,
            genre: p.category,
            dateCreated: p.year,
            ...(p.url ? { sameAs: [p.url] } : {}),
            creator: { "@type": "Organization", name: "Zaina Solutions" },
          },
        })),
      },
    },
  ],
};

export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WORK_JSON_LD) }}
      />
      <Background />
      <Nav />
      <SmoothScroll />
      <main>
        <WorkGallery />
      </main>
      <Footer />
    </>
  );
}
