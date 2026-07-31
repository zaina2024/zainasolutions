import { IntroProvider } from "@/components/site/Intro";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Background } from "@/components/site/Background";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Model } from "@/components/sections/Model";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { Team } from "@/components/sections/Team";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <IntroProvider>
      <SmoothScroll />
      <Background />
      <Nav />
      <main>
        <Hero />
        <About />
        <Model />
        <Services />
        <Stats />
        <Team />
        <Contact />
      </main>
      <Footer />
    </IntroProvider>
  );
}
