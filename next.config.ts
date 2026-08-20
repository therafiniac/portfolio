import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a one-off verification build write to its own output folder
  // (BUILD_VERIFY_DIR=.next-verify npm run build) instead of the default
  // .next — the dev server also reads/writes .next while running, so a
  // second build against the same folder corrupts its manifests and
  // crashes it mid-session.
  distDir: process.env.BUILD_VERIFY_DIR || ".next",
  images: {
    // Unsplash is a temporary placeholder source for client-work covers
    // until real project screenshots are ready — see src/lib/data.ts.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
