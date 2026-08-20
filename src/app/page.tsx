import { Hero } from "@/components/sections/Hero";
import { SignatureViz } from "@/components/sections/SignatureViz";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <SignatureViz />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </main>
  );
}
