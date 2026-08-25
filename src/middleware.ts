import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { geolocation } from "@vercel/functions";

const isDev = process.env.NODE_ENV === "development";

// A per-request nonce is the only way to allow the app's own inline
// <script> tags (layout.tsx's theme/language init scripts, JSON-LD) while
// still blocking any injected/attacker-controlled inline script — a
// blanket 'unsafe-inline' in script-src would defeat CSP's actual XSS
// protection. 'strict-dynamic' lets Next.js's own nonce'd bootstrap
// script load its chunk graph without having to allowlist every chunk
// URL by hand. style-src keeps 'unsafe-inline': the site uses React's
// style={{...}} prop extensively for CSS-variable-driven gradients
// (Hero, Skills, Services, etc.) — nonce-ing every one of those isn't
// practical, and inline *style* injection is a much narrower attack
// surface than inline *script* injection, which is what this policy
// actually defends against.
export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' https://images.unsplash.com data:",
    "font-src 'self'",
    `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    !isDev && "upgrade-insecure-requests",
  ]
    .filter(Boolean)
    .join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set("Content-Security-Policy", csp);

  // First-visit-only language default: Bengali for Bangladesh and West
  // Bengal (India) visitors, English everywhere else. Kept in its own
  // cookie rather than touching the "language" localStorage key that
  // LanguageToggle/layout.tsx treat as an explicit user choice — the
  // client-side init script (layout.tsx) only falls back to this cookie
  // when no explicit choice exists, so a manual toggle always wins and
  // never gets silently reset by geo-detection on a later visit.
  // geolocation() reads Vercel's edge headers, so it resolves to nothing
  // in local dev and on any host without that header — falls through to
  // English there, same as any other undetected region in production.
  if (!request.cookies.get("geo-language")) {
    const { country, countryRegion } = geolocation(request);
    const isBengaliRegion = country === "BD" || (country === "IN" && countryRegion === "WB");
    response.cookies.set("geo-language", isBengaliRegion ? "bn" : "en", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: [
    // Skip static assets/optimized images/favicon — CSP is a document-
    // level header, applying it to every asset request is pointless
    // overhead and Next's own asset responses don't read it.
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
