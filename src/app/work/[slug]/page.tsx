import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { Footer } from "@/components/layout/Footer";
import { clientProjects } from "@/lib/data/clientWork";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Static params for every known project — this route is fully known at
// build time (clientProjects is static data, not user-submitted), so
// there's no reason to render it on demand per-request.
export function generateStaticParams() {
  return clientProjects.map((project) => ({ slug: project.slug }));
}

// Per-project title/description — the actual SEO payoff of a real route
// per case study instead of a same-page modal: each one is indexable
// and shareable under its own project name, not a generic page title.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = clientProjects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.name.en} — Rafi Ahmed Laskar`,
    description: project.description.en,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = clientProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  // Everything but `icon` — it's a component reference (a function),
  // which can't be serialized across this Server → Client boundary, and
  // CaseStudy never renders it anyway. Rest-destructuring here (rather
  // than listing every other field by hand) means a newly added
  // ClientProject field passes through automatically instead of
  // silently getting dropped because this list wasn't updated too.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- icon discarded intentionally, see above.
  const { icon, ...caseStudyProject } = project;

  return (
    <>
      <main id="main-content" className="flex flex-1 flex-col">
        <CaseStudy project={caseStudyProject} />
      </main>
      <Footer />
    </>
  );
}
