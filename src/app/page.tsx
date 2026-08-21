import { Hero } from "@/components/sections/Hero";
import { ClientWork } from "@/components/sections/ClientWork";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { HowIBuild } from "@/components/sections/HowIBuild";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { getGithubStats } from "@/lib/github";

export default async function Home() {
  const githubStats = await getGithubStats();

  return (
    <>
      <main className="flex flex-1 flex-col">
        <Hero />
        <ClientWork />
        <Projects />
        <Skills />
        <Experience />
        <HowIBuild githubStats={githubStats} />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
