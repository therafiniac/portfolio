'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/ui/ScrollProgress';
import CustomCursor from '@/components/ui/CustomCursor';

// Sections — we'll build these one by one
import Hero from '@/components/sections/Hero';
// import About from "@/components/sections/About";
// import Skills from "@/components/sections/Skills";
// import Projects from "@/components/sections/Projects";
// import Experience from "@/components/sections/Experience";
// import Certifications from "@/components/sections/Certifications";
// import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        {/* Sections will be added here one by one */}
        <Hero />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gradient font-display text-4xl font-bold">
            Portfolio — Building in progress ✦
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
