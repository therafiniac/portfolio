import { Code2, LayoutTemplate, Database, Cloud, Sparkles } from "lucide-react";
import type { SkillGroup } from "@/types";

// `core: true` marks the tools that repeat across the verified work in
// experience.ts and projects.ts — checked against those files, not
// self-rated. Left off items that are real but only show up once (or not
// at all) in that data, even where they're genuinely used day to day.
export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    flag: "lang",
    icon: Code2,
    items: [
      { name: "JavaScript (ES6+)", core: true },
      { name: "TypeScript", core: true },
    ],
  },
  {
    label: "Frontend",
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
    label: "Backend & Data",
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
    ],
  },
  {
    label: "Cloud, Auth & Tools",
    flag: "cloud",
    icon: Cloud,
    items: [
      { name: "GCP" },
      { name: "Vercel", core: true },
      { name: "Netlify" },
      { name: "JWT" },
      { name: "Better Auth" },
      { name: "Git", core: true },
      { name: "GitHub", core: true },
      { name: "Postman" },
      { name: "N8N" },
    ],
  },
  {
    label: "AI-Assisted Workflow",
    flag: "workflow",
    icon: Sparkles,
    items: [{ name: "GitHub Copilot" }, { name: "ChatGPT" }, { name: "Claude" }],
  },
];
