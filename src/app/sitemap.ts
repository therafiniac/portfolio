import type { MetadataRoute } from "next";

const SITE_URL = "https://rafiera.com";

// One real route (the root page) — a single-page site has nothing else
// to list. Still required by the audit checklist (§1: sitemap exists,
// referenced from robots.txt) and costs nothing to keep current since
// there's no per-content generation to go stale.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
