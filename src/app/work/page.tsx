import type { Metadata } from "next";
import { Background } from "@/components/site/Background";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { WorkGallery } from "@/components/sections/WorkGallery";

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

export default function WorkPage() {
  return (
    <>
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
