import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Nav } from "@/components/sections/nav";
import { Projects } from "@/components/sections/projects";
import { Stack } from "@/components/sections/stack";
import { Stats } from "@/components/sections/stats";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <About />
        <Stack />
        <Stats />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}