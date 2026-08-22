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

export const metadata: Metadata = {
  title: "Rafi Ahmed Laskar — Full Stack Developer",
  description:
    "Full Stack Developer (4+ yrs) — Next.js, TypeScript, systems that scale. Selected work, experience, and stack.",
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
