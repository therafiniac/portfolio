import { Code2, LayoutTemplate, Database, Cloud, Sparkles } from "lucide-react";
import type { SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    icon: Code2,
    items: ["JavaScript (ES6+)", "TypeScript"],
  },
  {
    label: "Frontend",
    icon: LayoutTemplate,
    items: [
      "React.js",
      "Next.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
      "SASS",
    ],
  },
  {
    label: "Backend & Data",
    icon: Database,
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "MongoDB",
      "Mongoose",
      "PostgreSQL",
      "Prisma",
      "Firebase",
    ],
  },
  {
    label: "Cloud, Auth & Tools",
    icon: Cloud,
    items: [
      "GCP",
      "Vercel",
      "Netlify",
      "JWT",
      "Better Auth",
      "Git",
      "GitHub",
      "Postman",
      "N8N",
    ],
  },
  {
    label: "AI-Assisted Workflow",
    icon: Sparkles,
    items: ["GitHub Copilot", "ChatGPT", "Claude"],
  },
];
