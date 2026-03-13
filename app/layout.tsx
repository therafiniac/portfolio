import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans, DM_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Toaster } from "sonner";
import { siteConfig } from "@/data/site";
import "./globals.css";

const syne = Syne({
  subsets:  ["latin"],
  variable: "--font-syne",
  weight:   ["400", "500", "600", "700", "800"],
  display:  "swap",
});

const dmSans = DM_Sans({
  subsets:  ["latin"],
  variable: "--font-dm-sans",
  weight:   ["300", "400", "500", "600"],
  display:  "swap",
});

const dmMono = DM_Mono({
  subsets:  ["latin"],
  variable: "--font-dm-mono",
  weight:   ["300", "400", "500"],
  display:  "swap",
});

export const metadata: Metadata = {
  title: {
    default:  `${siteConfig.name} — ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Full Stack Developer",
    "MERN Stack",
    "React Developer",
    "Next.js",
    "Portfolio",
    "Rafi Ahmed Laskar",
    "Web Developer Kolkata",
    "UI UX Designer",
  ],
  authors:   [{ name: siteConfig.name, url: siteConfig.url }],
  creator:   siteConfig.name,
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         siteConfig.url,
    title:       `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.description,
    siteName:    siteConfig.name,
  },
  twitter: {
    card:        "summary_large_image",
    title:       `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.description,
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)",  color: "#090e1a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background:   "var(--bg-card)",
                border:       "1px solid var(--border)",
                color:        "var(--text)",
                borderRadius: "var(--radius)",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
