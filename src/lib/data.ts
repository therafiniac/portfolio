import type { ContactLink, ExperienceEntry, Project, SkillGroup } from "@/types";

export const experience: ExperienceEntry[] = [
  {
    role: "Software Developer",
    org: "Semigon Consultancy Pvt. Ltd",
    location: "Kolkata, India",
    start: "Jul 2025",
    end: "Present",
    highlights: [
      "Shipping a full-stack Blog Manager SaaS — Next.js, MongoDB, Firebase, RBAC, scheduled publishing.",
      "Owns GCP/Firebase deployments and direct delivery for US/UK clients.",
    ],
  },
  {
    role: "Web Developer",
    org: "Digital Exposure Online Services",
    location: "Kolkata, India",
    start: "Jan 2022",
    end: "Jun 2025",
    highlights: [
      "150+ client sites delivered solo, from landing pages to e-commerce.",
      "Sole technical point of contact across Kolkata and pan-India accounts.",
    ],
  },
  {
    role: "Freelance Web Developer",
    org: "Self-Employed",
    location: "Kolkata, India",
    start: "2020",
    end: "2021",
    highlights: ["Independent web builds for small businesses — HTML, CSS, JS, WordPress."],
  },
];

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

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: ["JavaScript (ES6+)", "TypeScript"],
  },
  {
    label: "Frontend",
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
    items: ["GitHub Copilot", "ChatGPT", "Claude"],
  },
];

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: "therafiniac@gmail.com",
    href: "mailto:therafiniac@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/therafiniac",
    href: "https://github.com/therafiniac",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/therafiniac",
    href: "https://linkedin.com/in/therafiniac",
  },
];
