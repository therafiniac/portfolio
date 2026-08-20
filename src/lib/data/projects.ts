import type { Project } from "@/types";

// Flagship, technically-deep case studies — see src/lib/data/clientWork.ts
// for the broader (and growing) sample of delivered client work.
export const projects: Project[] = [
  {
    name: "Reddit Clone",
    tagline: "Full-stack Reddit clone with real-time voting and infinite-depth threads.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind", "Neon Auth"],
    highlight:
      "A custom linear-to-tree algorithm resolves nested comments in O(N) via one hash-map pass — no recursion, no N+1 query.",
    liveUrl: "https://reddit-clone-five-chi.vercel.app",
    githubUrl: "https://github.com/therafiniac",
  },
  {
    name: "Blog Manager & CMS Dashboard",
    tagline: "Multi-role CMS platform built as a pluggable SaaS product.",
    tech: ["Next.js", "TypeScript", "React", "Firebase", "TipTap", "Tailwind CSS"],
    highlight:
      "Firebase-backed RBAC across three roles, a TipTap rich-text engine, and a debounced auto-save system with draft recovery.",
    private: true,
  },
];
