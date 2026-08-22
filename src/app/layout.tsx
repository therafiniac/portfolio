import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Hind_Siliguri } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { CursorGlow } from "@/components/layout/CursorGlow";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

// JetBrains Mono/Inter have zero Bengali glyph coverage, and there's no
// real monospace Bengali typeface to reach for — Hind Siliguri stands in
// for BOTH --font-mono and --font-sans when data-lang="bn" (see
// globals.css), so the mono-everywhere aesthetic intentionally doesn't
// carry over to Bengali mode, it becomes one considered Bengali typeface
// instead. Swapping this for a different Bengali font later is a
// one-file change — nothing outside this file ever references the font
// by name, only via the --font-bengali variable it's bound to.
const hindSiliguri = Hind_Siliguri({
  variable: "--font-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://rafiera.com";
const SITE_TITLE = "Rafi Ahmed Laskar — Full Stack Developer";
const SITE_DESCRIPTION =
  "Full Stack Developer (4+ yrs) — Next.js, TypeScript, systems that scale. Selected work, experience, and stack.";

export const metadata: Metadata = {
  // Required for every relative URL below (og:image, canonical, etc.) to
  // resolve to a real absolute URL instead of localhost in production.
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: ["Rafi Ahmed Laskar", "Full Stack Developer", "Next.js Developer", "TypeScript", "Web Designer", "Kolkata"],
  authors: [{ name: "Rafi Ahmed Laskar", url: SITE_URL }],
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_TITLE,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

// Person + WebSite structured data (JSON-LD) — the schema.org types that
// actually match a personal portfolio's content (§3 of the SEO audit
// standard: type must match content, not a generic/mismatched one).
// Values mirror what's literally visible on the page (name, role, the
// same verified profile links Contact.tsx renders) rather than claiming
// anything not shown to users.
const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rafi Ahmed Laskar",
  url: SITE_URL,
  jobTitle: "Full Stack Developer",
  email: "mailto:therafiniac@gmail.com",
  sameAs: ["https://github.com/therafiniac", "https://linkedin.com/in/therafiniac"],
};

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_TITLE,
  url: SITE_URL,
};

// Runs before paint so the stored/system theme applies with no flash of the
// wrong flavor. Kept as a tiny inline script rather than a React effect,
// which would only run after the wrong theme had already painted once.
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;

// Same reasoning/shape as THEME_INIT_SCRIPT — runs before paint so a
// stored Bengali preference applies with no flash of English first.
// Also sets the real lang attribute (not just data-lang) since that's
// what matters for screen readers/SEO, not just CSS/JS.
const LANG_INIT_SCRIPT = `
(function () {
  try {
    var lang = localStorage.getItem("language") === "bn" ? "bn" : "en";
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${hindSiliguri.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: LANG_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
        />
      </head>
      {/* suppressHydrationWarning here specifically guards against browser
          extensions (ColorZilla, Grammarly, etc.) injecting attributes like
          cz-shortcut-listen into <body> before React hydrates — that's a
          client-environment mismatch outside the app's control, not a real
          bug, so it's the correct/standard use of this prop (unlike the
          ThemeToggle case, where the mismatch was actual app state logic
          and needed a real fix, not suppression). */}
      <body
        className="min-h-full flex flex-col bg-bg text-text-primary font-sans"
        suppressHydrationWarning
      >
        <MotionConfig reducedMotion="user">
          <SmoothScroll />
          <ScrollProgress />
          <div className="grain-overlay" aria-hidden="true" />
          <CursorGlow />
          <Navbar />
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}
