import type { Metadata } from "next";
import { Background } from "@/components/site/Background";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { WorkGallery } from "@/components/sections/WorkGallery";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Selected websites, products, and brands designed and built by Zaina Solutions - including Ilmora AI, Go Beyond Gym, Hostel Management, Jar Bot, and Linkafe.",
  alternates: { canonical: "/work" },
  openGraph: {
    type: "website",
    siteName: "Zaina Solutions™",
    locale: "en_IN",
    url: "/work",
    title: "Selected Work · Zaina Solutions™",
    description:
      "Websites, products, and brands designed and built by Zaina Solutions.",
  },
};

const SITE = "https://zainasolutions.com";

const WORK_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Selected Work · Zaina Solutions",
  description:
    "Selected websites, products, and brands designed and built by Zaina Solutions.",
  url: `${SITE}/work`,
  isPartOf: { "@type": "WebSite", name: "Zaina Solutions", url: SITE },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: PROJECTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.title,
        description: p.blurb,
        additionalType: p.category,
        ...(p.url ? { url: p.url } : {}),
        creator: { "@type": "Organization", name: "Zaina Solutions" },
      },
    })),
  },
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
