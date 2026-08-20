import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
