import type { HeroStat, Localized } from "@/types";

// Split across two lines to match Hero's deliberate line break (see
// Hero.tsx) — the Bengali break point isn't the same word boundary as
// the English one, so this is two fields, not one string with a shared
// <br/> position. fullName is the single-line form used where a break
// isn't wanted (Footer's copyright line).
export const heroNameLine1: Localized = { en: "Rafi Ahmed", bn: "রাফি আহমেদ" };
export const heroNameLine2: Localized = { en: "Laskar", bn: "লস্কর" };
export const fullName: Localized = { en: "Rafi Ahmed Laskar", bn: "রাফি আহমেদ লস্কর" };
// The "RAFI" wordmark next to the brand mark in Navbar/Footer.
export const wordmark: Localized = { en: "RAFI", bn: "রাফি" };

export const heroRoles: Localized[] = [
  { en: "Full Stack Developer", bn: "ফুল স্ট্যাক ডেভেলপার" },
  { en: "Designer", bn: "ডিজাইনার" },
];

// Deliberately "work," not "opportunities" (reads job-search-coded) or
// "projects" (reads freelance-coded) — this badge is read by both a
// recruiter and a prospective client, and AGENTS.md rules out ever
// labeling Rafi "a freelancer" outright, so the phrasing needs to hold
// up under either reading rather than picking a side.
export const heroStatusLine: Localized = {
  en: "OPEN TO NEW WORK",
  bn: "নতুন কাজের জন্য উন্মুক্ত",
};

export const heroStats: HeroStat[] = [
  { value: 4, suffix: "+", label: { en: "Years Experience", bn: "বছরের অভিজ্ঞতা" } },
  { value: 150, suffix: "+", label: { en: "Sites Shipped", bn: "সাইট শিপড" } },
];
