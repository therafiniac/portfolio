import {
  ShoppingCart,
  Palette,
  Building2,
  Rocket,
  UtensilsCrossed,
  LayoutDashboard,
} from "lucide-react";
import type { ClientProject } from "@/types";

// PLACEHOLDER DATA — names, descriptions, and hrefs below are generic
// stand-ins for Rafi's real client work (150+ sites delivered at Digital
// Exposure Online Services). Cover images are temporary Unsplash stock
// photos. Replace name/category/description/href/coverImage per entry with
// the real project details when ready; hrefs are intentionally "#" rather
// than fake domains so nothing looks like a broken live link in the
// meantime. Add more entries here as Rafi provides them — the grid (see
// ClientWork.tsx) reflows for any N and the first entry is always featured.
export const clientProjects: ClientProject[] = [
  {
    name: "Client Project 01",
    category: "E-Commerce",
    description: "Online storefront with catalog browsing and checkout.",
    coverImage:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: ShoppingCart,
  },
  {
    name: "Client Project 02",
    category: "Agency / Portfolio",
    description: "Marketing site with a case-study driven layout.",
    coverImage:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: Palette,
  },
  {
    name: "Client Project 03",
    category: "Corporate / Business",
    description: "Multi-page business site with service and contact flows.",
    coverImage:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: Building2,
  },
  {
    name: "Client Project 04",
    category: "Landing Page",
    description: "Single-page conversion site for a product launch.",
    coverImage:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: Rocket,
  },
  {
    name: "Client Project 05",
    category: "Restaurant & Hospitality",
    description: "Menu, reservations, and location info for a local business.",
    coverImage:
      "https://images.unsplash.com/photo-1759661881353-5b9cc55e1cf4?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: UtensilsCrossed,
  },
  {
    name: "Client Project 06",
    category: "SaaS / Web App",
    description: "Product dashboard with account and billing flows.",
    coverImage:
      "https://images.unsplash.com/photo-1774901128276-1eab48f1fb9c?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: LayoutDashboard,
  },
];
