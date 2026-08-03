import { IntroProvider } from "@/components/site/Intro";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Background } from "@/components/site/Background";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Model } from "@/components/sections/Model";
import { Services } from "@/components/sections/Services";
import { Estimator } from "@/components/sections/Estimator";
import { Stats } from "@/components/sections/Stats";
import { Team } from "@/components/sections/Team";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { FAQS } from "@/lib/faqs";

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function Home() {
  return (
    <IntroProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <SmoothScroll />
      <Background />
      <Nav />
      <main>
        <Hero />
        <About />
        <Model />
        <Services />
        <Estimator />
        <Stats />
        <Team />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </IntroProvider>
  );
}
