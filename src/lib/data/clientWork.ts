import {
  ShoppingCart,
  Palette,
  Building2,
  Smartphone,
  UtensilsCrossed,
  LayoutDashboard,
  Home,
} from "lucide-react";
import type { ClientProject } from "@/types";

// PLACEHOLDER DATA — names, descriptions, hrefs, and tech below are generic
// stand-ins for Rafi's real client work (150+ sites delivered at Digital
// Exposure Online Services). Cover images are temporary Unsplash stock
// photos, picked for genuine visual variety per category (not more
// laptop-on-desk shots) and verified via curl before use — never guess an
// image URL. Replace name/category/description/href/coverImage/tech per
// entry with the real project details when ready; hrefs are intentionally
// "#" rather than fake domains so nothing looks like a broken live link in
// the meantime. Add more entries here as Rafi provides them.
//
// coverImage is standing in for a real hero/fold screenshot at a fixed
// viewport — the grid (see ClientWork.tsx) assumes every entry shares that
// same aspect ratio (no per-card size/shape variation), so real screenshots
// drop straight in without any cropping or layout decisions once captured
// consistently. Currently 7 entries + the stat/CTA filler tiles (see
// PROJECTS_PER_FILLER) land on exactly 3 full grid rows — if the count
// changes, sanity-check the last row isn't left with a single stranded
// tile before shipping.
export const clientProjects: ClientProject[] = [
  {
    name: "Client Project 01",
    category: "E-Commerce",
    description: "Online storefront with catalog browsing and checkout.",
    coverImage:
      "https://images.unsplash.com/photo-1758351507026-71ad3645cb43?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: ShoppingCart,
    tech: ["Next.js", "Shopify", "Stripe"],
  },
  {
    name: "Client Project 02",
    category: "Agency",
    description: "Marketing site with a case-study driven layout.",
    coverImage:
      "https://images.unsplash.com/photo-1581079289196-67865ea83118?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: Palette,
    tech: ["Next.js", "Framer Motion", "Tailwind CSS"],
  },
  {
    name: "Client Project 03",
    category: "Business",
    description: "Multi-page business site with service and contact flows.",
    coverImage:
      "https://images.unsplash.com/photo-1758518731706-be5d5230e5a5?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: Building2,
    tech: ["WordPress", "ACF", "MySQL"],
  },
  {
    name: "Client Project 04",
    category: "Landing Page",
    description: "Single-page conversion site for a product launch.",
    coverImage:
      "https://images.unsplash.com/photo-1748801584058-29faa47242ee?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: Smartphone,
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
  },
  {
    name: "Client Project 05",
    category: "Restaurant & Hospitality",
    description: "Menu, reservations, and location info for a local business.",
    coverImage:
      "https://images.unsplash.com/photo-1741606211269-406acef3b7dc?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: UtensilsCrossed,
    tech: ["Next.js", "Sanity CMS", "Tailwind CSS"],
  },
  {
    name: "Client Project 06",
    category: "SaaS",
    description: "Product dashboard with account and billing flows.",
    coverImage:
      "https://images.unsplash.com/photo-1686061593213-98dad7c599b9?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: LayoutDashboard,
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
  },
  {
    name: "Client Project 07",
    category: "Real Estate",
    description: "Property listings with search, filters, and inquiry forms.",
    coverImage:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: Home,
    tech: ["Next.js", "Mapbox", "PostgreSQL"],
  },
];
