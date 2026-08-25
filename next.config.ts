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
    // Every next/image usage already gets on-demand format conversion +
    // per-device resizing for free (confirmed: a 548KB source PNG served
    // as a 17-56KB WebP depending on viewport) — Next's own default only
    // tries WebP, though. AVIF first, WebP as the fallback for the few
    // browsers that support the latter but not the former: same content
    // negotiation Next already does automatically (Vary: Accept), just
    // trying the smaller format first. No source files need touching —
    // this applies to every image already in public/work/ and any
    // future one dropped in the same way.
    formats: ["image/avif", "image/webp"],
  },
  // Stops the framework/version fingerprint (`X-Powered-By: Next.js`)
  // from going out on every response — no functional benefit to leaking
  // it, and it's a free hint to an attacker about which known CVEs to try.
  poweredByHeader: false,
  // Content-Security-Policy is set per-request in middleware.ts instead
  // (it needs a per-request nonce for the inline scripts in layout.tsx —
  // a static header here can't do that). Everything below is static and
  // has no reason to vary per request.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Stops a mislabeled/sniffed response from being executed as a
          // different content type than declared (e.g. a JSON response
          // sniffed as HTML/script).
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Legacy clickjacking header — CSP's frame-ancestors 'none'
          // (middleware.ts) is the modern equivalent; kept together for
          // the browsers that only honor one of the two.
          { key: "X-Frame-Options", value: "DENY" },
          // Never send the full referring URL to a third party — this
          // site has no cross-origin links carrying sensitive query
          // params, but "same-origin" costs nothing and is strictly
          // safer than the browser default.
          { key: "Referrer-Policy", value: "same-origin" },
          // Forces HTTPS on every future visit once a browser has seen
          // this once (HSTS). Inert over plain HTTP (e.g. local dev), so
          // safe to send unconditionally.
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          // Explicitly opts out of browser features this static portfolio
          // never uses — default-deny is safer than trusting every
          // embedded/third-party context to not attempt them.
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
