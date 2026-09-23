import { IntroProvider } from "@/components/site/Intro";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Background } from "@/components/site/Background";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Model } from "@/components/sections/Model";
import { Work } from "@/components/sections/Work";
import { Services } from "@/components/sections/Services";
import { Estimator } from "@/components/sections/Estimator";
import { Stats } from "@/components/sections/Stats";
import { Team } from "@/components/sections/Team";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { FAQS } from "@/lib/faqs";
import { PROJECT_TYPES } from "@/lib/estimator";

const SITE = "https://zainasolutions.com";

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

const ESTIMATOR_PRICES = PROJECT_TYPES.map((p) => p.base);

const ESTIMATOR_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Zaina Solutions Budget Calculator",
  url: `${SITE}/#estimate`,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any (web-based)",
  description:
    "An 8-step interactive calculator that gives an instant, itemized starting estimate for a website, e-commerce, or custom software project, covering design, features, timeline, hosting, and domain costs. No signup required, not a binding quote.",
  isAccessibleForFree: true,
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "INR",
    lowPrice: Math.min(...ESTIMATOR_PRICES),
    highPrice: Math.max(...ESTIMATOR_PRICES),
    offerCount: PROJECT_TYPES.length,
  },
  provider: { "@type": "Organization", name: "Zaina Solutions", url: SITE },
};

export default function Home() {
  return (
    <IntroProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ESTIMATOR_JSON_LD) }}
      />
      <SmoothScroll />
      <Background />
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Services />
        <Model />
        <Stats />
        <Estimator />
        <Team />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </IntroProvider>
  );
}
