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
    name: { en: "Client Project 01", bn: "ক্লায়েন্ট প্রজেক্ট ০১" },
    category: { en: "E-Commerce", bn: "ই-কমার্স" },
    description: {
      en: "Online storefront with catalog browsing and checkout.",
      bn: "ক্যাটালগ ব্রাউজিং এবং চেকআউট সহ অনলাইন স্টোরফ্রন্ট।",
    },
    coverImage:
      "https://images.unsplash.com/photo-1758351507026-71ad3645cb43?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: ShoppingCart,
    tech: ["Next.js", "Shopify", "Stripe"],
  },
  {
    name: { en: "Client Project 02", bn: "ক্লায়েন্ট প্রজেক্ট ০২" },
    category: { en: "Agency", bn: "এজেন্সি" },
    description: {
      en: "Marketing site with a case-study driven layout.",
      bn: "কেস-স্টাডি ভিত্তিক লেআউট সহ মার্কেটিং সাইট।",
    },
    coverImage:
      "https://images.unsplash.com/photo-1581079289196-67865ea83118?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: Palette,
    tech: ["Next.js", "Framer Motion", "Tailwind CSS"],
  },
  {
    name: { en: "Client Project 03", bn: "ক্লায়েন্ট প্রজেক্ট ০৩" },
    category: { en: "Business", bn: "ব্যবসা" },
    description: {
      en: "Multi-page business site with service and contact flows.",
      bn: "সার্ভিস এবং যোগাযোগ ফ্লো সহ মাল্টি-পেজ ব্যবসায়িক সাইট।",
    },
    coverImage:
      "https://images.unsplash.com/photo-1758518731706-be5d5230e5a5?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: Building2,
    tech: ["WordPress", "ACF", "MySQL"],
  },
  {
    name: { en: "Client Project 04", bn: "ক্লায়েন্ট প্রজেক্ট ০৪" },
    category: { en: "Landing Page", bn: "ল্যান্ডিং পেজ" },
    description: {
      en: "Single-page conversion site for a product launch.",
      bn: "প্রোডাক্ট লঞ্চের জন্য সিঙ্গেল-পেজ কনভার্সন সাইট।",
    },
    coverImage:
      "https://images.unsplash.com/photo-1748801584058-29faa47242ee?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: Smartphone,
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
  },
  {
    name: { en: "Client Project 05", bn: "ক্লায়েন্ট প্রজেক্ট ০৫" },
    category: { en: "Restaurant & Hospitality", bn: "রেস্তোরাঁ ও আতিথেয়তা" },
    description: {
      en: "Menu, reservations, and location info for a local business.",
      bn: "একটি স্থানীয় ব্যবসার জন্য মেনু, রিজার্ভেশন এবং লোকেশন তথ্য।",
    },
    coverImage:
      "https://images.unsplash.com/photo-1741606211269-406acef3b7dc?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: UtensilsCrossed,
    tech: ["Next.js", "Sanity CMS", "Tailwind CSS"],
  },
  {
    name: { en: "Client Project 06", bn: "ক্লায়েন্ট প্রজেক্ট ০৬" },
    category: { en: "SaaS", bn: "SaaS" },
    description: {
      en: "Product dashboard with account and billing flows.",
      bn: "অ্যাকাউন্ট এবং বিলিং ফ্লো সহ প্রোডাক্ট ড্যাশবোর্ড।",
    },
    coverImage:
      "https://images.unsplash.com/photo-1686061593213-98dad7c599b9?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: LayoutDashboard,
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
  },
  {
    name: { en: "Client Project 07", bn: "ক্লায়েন্ট প্রজেক্ট ০৭" },
    category: { en: "Real Estate", bn: "রিয়েল এস্টেট" },
    description: {
      en: "Property listings with search, filters, and inquiry forms.",
      bn: "সার্চ, ফিল্টার এবং ইনকোয়ারি ফর্ম সহ প্রপার্টি লিস্টিং।",
    },
    coverImage:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80&auto=format&fit=crop",
    href: "#",
    icon: Home,
    tech: ["Next.js", "Mapbox", "PostgreSQL"],
  },
];
