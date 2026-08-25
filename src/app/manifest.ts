import type { MetadataRoute } from "next";

// Next's file-convention manifest — auto-linked into every page's <head>
// (<link rel="manifest">), no manual wiring needed in layout.tsx. Lets a
// browser offer "Install" (Chrome/Edge desktop, Android) — pins an icon
// to the home screen/app list that opens the site in its own window, no
// address bar. Colors match the Mocha dark flavor's --bg/crust token
// (AGENTS.md's design table) since that's this site's default theme,
// not the light flavor.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rafi Ahmed Laskar — Full Stack Developer",
    short_name: "Rafi Laskar",
    description: "Full Stack Developer (4+ yrs) — Next.js, TypeScript, systems that scale.",
    start_url: "/",
    display: "standalone",
    background_color: "#11111b",
    theme_color: "#11111b",
    icons: [
      { src: "/icon-192", sizes: "192x192", type: "image/png" },
      { src: "/icon-512", sizes: "512x512", type: "image/png" },
    ],
  };
}
