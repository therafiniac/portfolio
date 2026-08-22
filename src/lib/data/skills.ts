import { Code2, LayoutTemplate, Palette, Database, Cloud, GitBranch, Sparkles } from "lucide-react";
import type { SkillGroup } from "@/types";

// `core: true` marks the tools that repeat across the verified work in
// experience.ts and projects.ts — checked against those files, not
// self-rated. Left off items that are real but only show up once (or not
// at all) in that data, even where they're genuinely used day to day.
// (Design tools and Supabase currently fall in that "real but not yet
// repeated in verified work" bucket too — none are marked core.) Item
// names and flags are Localized, but bn is a phonetic transliteration —
// how the same tool/tech name sounds spelled in Bengali script — never a
// semantic translation of what the tool does.
export const skillGroups: SkillGroup[] = [
  {
    label: { en: "Languages", bn: "ভাষা" },
    flag: { en: "lang", bn: "ল্যাং" },
    icon: Code2,
    items: [
      { name: { en: "JavaScript (ES6+)", bn: "জাভাস্ক্রিপ্ট (ES6+)" }, core: true },
      { name: { en: "TypeScript", bn: "টাইপস্ক্রিপ্ট" }, core: true },
    ],
  },
  {
    label: { en: "Frontend", bn: "ফ্রন্টএন্ড" },
    flag: { en: "frontend", bn: "ফ্রন্টএন্ড" },
    icon: LayoutTemplate,
    items: [
      { name: { en: "React.js", bn: "রিয়েক্ট.জেএস" }, core: true },
      { name: { en: "Next.js", bn: "নেক্সট.জেএস" }, core: true },
      { name: { en: "HTML5", bn: "এইচটিএমএল৫" } },
      { name: { en: "CSS3", bn: "সিএসএস৩" } },
      { name: { en: "Tailwind CSS", bn: "টেইলউইন্ড সিএসএস" }, core: true },
      { name: { en: "Bootstrap", bn: "বুটস্ট্র্যাপ" } },
      { name: { en: "SASS", bn: "স্যাস" } },
    ],
  },
  {
    label: { en: "Design", bn: "ডিজাইন" },
    flag: { en: "design", bn: "ডিজাইন" },
    icon: Palette,
    items: [
      { name: { en: "Figma", bn: "ফিগমা" } },
      { name: { en: "Photoshop", bn: "ফটোশপ" } },
      { name: { en: "Illustrator", bn: "ইলাস্ট্রেটর" } },
      { name: { en: "Canva", bn: "ক্যানভা" } },
    ],
  },
  {
    label: { en: "Backend & Data", bn: "ব্যাকএন্ড ও ডেটা" },
    flag: { en: "backend", bn: "ব্যাকএন্ড" },
    icon: Database,
    items: [
      { name: { en: "Node.js", bn: "নোড.জেএস" }, core: true },
      { name: { en: "Express.js", bn: "এক্সপ্রেস.জেএস" } },
      { name: { en: "REST APIs", bn: "রেস্ট এপিআই" } },
      { name: { en: "MongoDB", bn: "মঙ্গোডিবি" }, core: true },
      { name: { en: "Mongoose", bn: "মঙ্গুস" } },
      { name: { en: "PostgreSQL", bn: "পোস্টগ্রেএসকিউএল" }, core: true },
      { name: { en: "Prisma", bn: "প্রিজমা" } },
      { name: { en: "Firebase", bn: "ফায়ারবেস" } },
      { name: { en: "Neon", bn: "নিয়ন" } },
      { name: { en: "Supabase", bn: "সুপাবেস" } },
    ],
  },
  {
    label: { en: "Cloud & Auth", bn: "ক্লাউড ও অথ" },
    flag: { en: "cloud", bn: "ক্লাউড" },
    icon: Cloud,
    items: [
      { name: { en: "GCP", bn: "জিসিপি" } },
      { name: { en: "Vercel", bn: "ভার্সেল" }, core: true },
      { name: { en: "Netlify", bn: "নেটলিফাই" } },
      { name: { en: "JWT", bn: "জেডব্লিউটি" } },
      { name: { en: "Better Auth", bn: "বেটার অথ" } },
    ],
  },
  {
    // Version control and dev tooling, split out from Cloud & Auth —
    // Git/GitHub aren't a hosting/cloud concern, and grouping them there
    // just because both sections happened to be "infra-ish" was the
    // exact miscategorization this split fixes.
    label: { en: "Dev Tools", bn: "ডেভ টুলস" },
    flag: { en: "tools", bn: "টুলস" },
    icon: GitBranch,
    items: [
      { name: { en: "Git", bn: "গিট" }, core: true },
      { name: { en: "GitHub", bn: "গিটহাব" }, core: true },
      { name: { en: "Postman", bn: "পোস্টম্যান" } },
      { name: { en: "N8N", bn: "এন৮এন" } },
    ],
  },
  {
    label: { en: "AI-Assisted Workflow", bn: "AI-সহায়ক ওয়ার্কফ্লো" },
    flag: { en: "workflow", bn: "ওয়ার্কফ্লো" },
    icon: Sparkles,
    items: [
      { name: { en: "GitHub Copilot", bn: "গিটহাব কোপাইলট" } },
      { name: { en: "ChatGPT", bn: "চ্যাটজিপিটি" } },
      { name: { en: "Claude", bn: "ক্লড" } },
    ],
  },
];
