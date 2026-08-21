import type { Project } from "@/types";

// Independent, technically-deep builds (not client work — see
// src/lib/data/clientWork.ts for the broader sample of delivered client
// projects). Keep this list small: every entry earns its full deep-dive
// treatment (real architecture detail, defensible in an interview) rather
// than padding the count — add another only when there's a build that's
// genuinely as deep as these two.
export const projects: Project[] = [
  {
    name: "Reddit Clone",
    tagline: "Full-stack Reddit clone with real-time voting and infinite-depth threads.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind", "Neon Auth"],
    highlight:
      "A custom linear-to-tree algorithm resolves nested comments in O(N) via one hash-map pass — no recursion, no N+1 query.",
    stat: { value: "O(N)", label: "not O(N²) recursion" },
    // Short on purpose — the flow diagram's dots/lines need single-line
    // labels to stay aligned; the full mechanism is already spelled out
    // in `highlight` above.
    flow: ["Flat list", "Hash-map", "Tree"],
    liveUrl: "https://reddit-clone-five-chi.vercel.app",
    // Real repo URL not published yet — "#" per the placeholder-link
    // convention (see src/lib/data/clientWork.ts), never a fake domain.
    githubUrl: "#",
  },
  {
    name: "Blog Manager & CMS Dashboard",
    tagline: "Multi-role CMS platform built as a pluggable SaaS product.",
    tech: ["Next.js", "TypeScript", "React", "Firebase", "TipTap", "Tailwind CSS"],
    highlight:
      "Firebase-backed RBAC across three roles, a TipTap rich-text engine, and a debounced auto-save system with draft recovery.",
    stat: { value: "3", label: "role-based access tiers" },
    flow: ["Request", "Role check", "Action"],
    private: true,
  },
];
