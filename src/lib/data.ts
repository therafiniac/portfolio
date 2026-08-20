import type { ContactLink, ExperienceEntry, Project, SkillGroup } from "@/types";

export const experience: ExperienceEntry[] = [
  {
    role: "Software Developer",
    org: "Semigon Consultancy Pvt. Ltd",
    location: "Kolkata, India",
    start: "Jul 2025",
    end: "Present",
    bullets: [
      "Building a full-stack Blog Manager SaaS (Next.js, TypeScript, MongoDB, Firebase) with rich text editing, image uploads, RBAC, scheduled publishing, and full CRUD.",
      "Designed an AI-powered chatbot using N8N automation workflows, enabling intelligent query handling and reducing manual support effort.",
      "Deployed and managed production apps on GCP and Firebase Hosting; independently owned foreign client (US/UK) communication, requirements, and sign-off.",
      "Optimized company website performance via Next.js image optimization and lazy loading, improving page load speed.",
      "Mentored a junior developer through code reviews, debugging sessions, and architectural guidance on live projects.",
    ],
  },
  {
    role: "Web Developer",
    org: "Digital Exposure Online Services",
    location: "Kolkata, India",
    start: "Jan 2022",
    end: "Jun 2025",
    bullets: [
      "Designed and delivered 150+ client websites from scratch as sole developer, including landing pages, multi-page sites, and e-commerce stores.",
      "Reduced missed deadlines to zero and cut post-delivery revision cycles through precise requirement gathering and design accuracy.",
      "Managed end-to-end client relationships across Kolkata and pan-India; served as single point of contact for all technical decisions and delivery.",
      "Transitioned to building React.js-based websites in later tenure, expanding into modern frontend development practices.",
    ],
  },
  {
    role: "Freelance Web Developer",
    org: "Self-Employed",
    location: "Kolkata, India",
    start: "2020",
    end: "2021",
    bullets: [
      "Developed and delivered websites for small businesses using HTML, CSS, JavaScript, and WordPress during post-graduation period.",
      "Managed client relationships independently, handling project scoping, design decisions, and final delivery.",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "Reddit Clone",
    tagline:
      "High-performance full-stack Reddit clone — threaded comments, real-time voting, tag-based categorization.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind", "Neon Auth"],
    bullets: [
      "Architected a threaded comment system using a custom linear-to-tree algorithm in TypeScript, resolving infinite-depth nesting in O(N) time and eliminating the N+1 query problem.",
      "Implemented real-time voting using Next.js Server Actions, reducing network roundtrips and enabling immediate cache revalidation.",
      "Designed a relational schema with composite primary keys for unique vote constraints and cascade deletion; Neon Auth handles OAuth and profile provisioning.",
    ],
    liveUrl: "https://reddit-clone-five-chi.vercel.app",
    githubUrl: "https://github.com/therafiniac",
  },
  {
    name: "Blog Manager & CMS Dashboard",
    tagline:
      "Multi-role CMS dashboard architected as a pluggable SaaS product — blog management, feature cards, scheduling.",
    tech: ["Next.js", "TypeScript", "React", "Firebase", "TipTap", "Tailwind CSS"],
    bullets: [
      "Engineered a rich text editing experience using TipTap with custom extensions: nested tables, YouTube embeds, Base64 images, syntax-highlighted code blocks, and task lists.",
      "Implemented a debounced auto-save engine with draft recovery, restoring unsaved sessions on re-mount and cleaning up stale drafts on publish/cancel.",
      "Designed RBAC (admin, manager, employee) using Firebase Auth and Firestore, with route-level guards preventing unauthorized dashboard access.",
      "Integrated Firebase Storage for media uploads and DOMPurify for HTML sanitization, with Firestore server timestamps and paginated queries to optimize performance and billing.",
    ],
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
