import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { Footer } from "@/components/layout/Footer";
import { clientProjects } from "@/lib/data/clientWork";

// Matches layout.tsx's own SITE_URL — not imported from there since it's
// a local const in that file, not an export, and duplicating one stable
// string twice doesn't earn a shared constant yet (see this file's own
// icon-destructure comment for the same "don't abstract early" reasoning).
const SITE_URL = "https://rafiera.com";

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

// Home → Work → this project, matching what a visitor actually clicks
// through to land here (ClientWork.tsx's cards) — Google can render this
// directly in search results, and it's a real, checkable navigation path
// rather than an invented hierarchy. Same nonce plumbing as layout.tsx's
// Person/WebSite JSON-LD (the CSP is script-src 'nonce-...', not
// 'unsafe-inline'), read fresh here since this Server Component doesn't
// have access to the one layout.tsx already computed for its own scripts.
async function BreadcrumbJsonLd({ project, slug }: { project: (typeof clientProjects)[number]; slug: string }) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/#work` },
      { "@type": "ListItem", position: 3, name: project.name.en, item: `${SITE_URL}/work/${slug}` },
    ],
  };

  return (
    <script
      nonce={nonce}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
    />
  );
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
      <BreadcrumbJsonLd project={project} slug={slug} />
      <main id="main-content" className="flex flex-1 flex-col">
        <CaseStudy project={caseStudyProject} />
      </main>
      <Footer />
    </>
  );
}
