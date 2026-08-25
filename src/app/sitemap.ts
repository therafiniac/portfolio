import type { MetadataRoute } from "next";
import { clientProjects } from "@/lib/data/clientWork";

const SITE_URL = "https://rafiera.com";

// The root page, plus one entry per case-study route (/work/[slug] — see
// AGENTS.md's "Case Study Pages") — the actual SEO payoff of giving each
// project its own real URL instead of same-page modal content that a
// crawler would never see as a separate, indexable page.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...clientProjects.map((project) => ({
      url: `${SITE_URL}/work/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
