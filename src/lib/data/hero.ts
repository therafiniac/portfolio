import type { HeroStat, Localized } from "@/types";

export const heroRoles: Localized[] = [
  { en: "Full Stack Developer", bn: "ফুল স্ট্যাক ডেভেলপার" },
  { en: "Designer", bn: "ডিজাইনার" },
];

export const heroStatusLine: Localized = {
  en: "OPEN TO OPPORTUNITIES",
  bn: "সুযোগের জন্য উন্মুক্ত",
};

export const heroStats: HeroStat[] = [
  { value: 4, suffix: "+", label: { en: "Years Experience", bn: "বছরের অভিজ্ঞতা" } },
  { value: 150, suffix: "+", label: { en: "Sites Shipped", bn: "সাইট শিপড" } },
];
