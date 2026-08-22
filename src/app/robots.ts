import type { MetadataRoute } from "next";

const SITE_URL = "https://rafiera.com";

// Single-page site, nothing to disallow — this exists mainly to point
// crawlers at the sitemap (see sitemap.ts) and to have the file present
// at all, since its absence is itself a common audit flag.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
