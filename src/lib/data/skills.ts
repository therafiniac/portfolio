import { Code2, LayoutTemplate, Palette, Database, Cloud, GitBranch, Sparkles } from "lucide-react";
import type { SkillGroup } from "@/types";

// `core: true` marks the tools that repeat across the verified work in
// experience.ts and projects.ts — checked against those files, not
// self-rated. Left off items that are real but only show up once (or not
// at all) in that data, even where they're genuinely used day to day.
// (Design tools and Supabase currently fall in that "real but not yet
// repeated in verified work" bucket too — none are marked core.) Item
// names stay plain/English — tool and technology proper nouns aren't
// translated; only the group label is.
export const skillGroups: SkillGroup[] = [
  {
    label: { en: "Languages", bn: "ভাষা" },
    flag: "lang",
    icon: Code2,
    items: [
      { name: "JavaScript (ES6+)", core: true },
      { name: "TypeScript", core: true },
    ],
  },
  {
    label: { en: "Frontend", bn: "ফ্রন্টএন্ড" },
    flag: "frontend",
    icon: LayoutTemplate,
    items: [
      { name: "React.js", core: true },
      { name: "Next.js", core: true },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "Tailwind CSS", core: true },
      { name: "Bootstrap" },
      { name: "SASS" },
    ],
  },
  {
    label: { en: "Design", bn: "ডিজাইন" },
    flag: "design",
    icon: Palette,
    items: [{ name: "Figma" }, { name: "Photoshop" }, { name: "Illustrator" }, { name: "Canva" }],
  },
  {
    label: { en: "Backend & Data", bn: "ব্যাকএন্ড ও ডেটা" },
    flag: "backend",
    icon: Database,
    items: [
      { name: "Node.js", core: true },
      { name: "Express.js" },
      { name: "REST APIs" },
      { name: "MongoDB", core: true },
      { name: "Mongoose" },
      { name: "PostgreSQL", core: true },
      { name: "Prisma" },
      { name: "Firebase" },
      { name: "Neon" },
      { name: "Supabase" },
    ],
  },
  {
    label: { en: "Cloud & Auth", bn: "ক্লাউড ও অথ" },
    flag: "cloud",
    icon: Cloud,
    items: [
      { name: "GCP" },
      { name: "Vercel", core: true },
      { name: "Netlify" },
      { name: "JWT" },
      { name: "Better Auth" },
    ],
  },
  {
    // Version control and dev tooling, split out from Cloud & Auth —
    // Git/GitHub aren't a hosting/cloud concern, and grouping them there
    // just because both sections happened to be "infra-ish" was the
    // exact miscategorization this split fixes.
    label: { en: "Dev Tools", bn: "ডেভ টুলস" },
    flag: "tools",
    icon: GitBranch,
    items: [
      { name: "Git", core: true },
      { name: "GitHub", core: true },
      { name: "Postman" },
      { name: "N8N" },
    ],
  },
  {
    label: { en: "AI-Assisted Workflow", bn: "AI-সহায়ক ওয়ার্কফ্লো" },
    flag: "workflow",
    icon: Sparkles,
    items: [{ name: "GitHub Copilot" }, { name: "ChatGPT" }, { name: "Claude" }],
  },
];
