import {
  ShoppingCart,
  Palette,
  Building2,
  Smartphone,
  UtensilsCrossed,
  LayoutDashboard,
  Home,
  HeartPulse,
} from "lucide-react";
import type { ClientProject } from "@/types";

// PLACEHOLDER DATA — names, descriptions, and hrefs below are generic
// stand-ins for Rafi's real client work (150+ sites delivered at Digital
// Exposure Online Services). Cover images are temporary Unsplash stock
// photos, picked for genuine visual variety per category (not more
// laptop-on-desk shots) and verified via curl before use — never guess an
// image URL. Replace name/category/description/href/coverImage per entry
// with the real project details when ready; hrefs are intentionally "#"
// rather than fake domains so nothing looks like a broken live link in the
// meantime. Add more entries here as Rafi provides them — the grid (see
// ClientWork.tsx) reflows for any N, composed as repeating rows (one
// featured card + a stat/CTA/schematic accent tile, then a compact trio of
// three equal cards) so the bento rhythm still reads as intentional once
// this list has grown a lot. Every real project card stays in one of two
// landscape shapes (2-col-wide or 1-col-wide-short) — never the near-square
// slot next to the featured card, which is reserved for accent tiles, so a
// real screenshot dropped in later never gets cropped into a bad shape.
export const clientProjects: ClientProject[] = [
  {
    name: "Client Project 01",
    category: "E-Commerce",
    description: "Online storefront with catalog browsing and checkout.",
    coverImage:
      "https://images.unsplash.com/photo-1758351507026-71ad3645cb43?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: ShoppingCart,
  },
  {
    name: "Client Project 02",
    category: "Agency / Portfolio",
    description: "Marketing site with a case-study driven layout.",
    coverImage:
      "https://images.unsplash.com/photo-1581079289196-67865ea83118?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: Palette,
  },
  {
    name: "Client Project 03",
    category: "Corporate / Business",
    description: "Multi-page business site with service and contact flows.",
    coverImage:
      "https://images.unsplash.com/photo-1758518731706-be5d5230e5a5?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: Building2,
  },
  {
    name: "Client Project 04",
    category: "Landing Page",
    description: "Single-page conversion site for a product launch.",
    coverImage:
      "https://images.unsplash.com/photo-1748801584058-29faa47242ee?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: Smartphone,
  },
  {
    name: "Client Project 05",
    category: "Restaurant & Hospitality",
    description: "Menu, reservations, and location info for a local business.",
    coverImage:
      "https://images.unsplash.com/photo-1741606211269-406acef3b7dc?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: UtensilsCrossed,
  },
  {
    name: "Client Project 06",
    category: "SaaS / Web App",
    description: "Product dashboard with account and billing flows.",
    coverImage:
      "https://images.unsplash.com/photo-1686061593213-98dad7c599b9?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: LayoutDashboard,
  },
  {
    name: "Client Project 07",
    category: "Real Estate",
    description: "Property listings with search, filters, and inquiry forms.",
    coverImage:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: Home,
  },
  {
    name: "Client Project 08",
    category: "Healthcare & Wellness",
    description: "Clinic site with service listings and appointment booking.",
    coverImage:
      "https://images.unsplash.com/photo-1761971975973-cbb3e59263de?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: HeartPulse,
  },
];
