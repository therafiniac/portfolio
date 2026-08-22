import type { Project } from "@/types";

// Independent, technically-deep builds (not client work — see
// src/lib/data/clientWork.ts for the broader sample of delivered client
// projects). Keep this list small: every entry earns its full deep-dive
// treatment (real architecture detail, defensible in an interview) rather
// than padding the count — add another only when there's a build that's
// genuinely as deep as these two. name/tech/stat.value stay plain
// (proper nouns and notation, not prose); everything else is Localized.
export const projects: Project[] = [
  {
    name: "Reddit Clone",
    tagline: {
      en: "Full-stack Reddit clone with real-time voting and infinite-depth threads.",
      bn: "রিয়েল-টাইম ভোটিং এবং অসীম-গভীরতার থ্রেড সহ ফুল-স্ট্যাক রেডিট ক্লোন।",
    },
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind", "Neon Auth"],
    highlight: {
      en: "A custom linear-to-tree algorithm resolves nested comments in O(N) via one hash-map pass — no recursion, no N+1 query.",
      bn: "একটি কাস্টম লিনিয়ার-টু-ট্রি অ্যালগরিদম এক হ্যাশ-ম্যাপ পাসের মাধ্যমে O(N)-এ নেস্টেড কমেন্ট রিজলভ করে — কোনো রিকার্শন নেই, N+1 কোয়েরি নেই।",
    },
    stat: { value: "O(N)", label: { en: "not O(N²) recursion", bn: "O(N²) রিকার্শন নয়" } },
    // Short on purpose — the flow diagram's dots/lines need single-line
    // labels to stay aligned; the full mechanism is already spelled out
    // in `highlight` above.
    flow: [
      { en: "Flat list", bn: "ফ্ল্যাট লিস্ট" },
      { en: "Hash-map", bn: "হ্যাশ-ম্যাপ" },
      { en: "Tree", bn: "ট্রি" },
    ],
    liveUrl: "https://reddit-clone-five-chi.vercel.app",
    // Real repo URL not published yet — "#" per the placeholder-link
    // convention (see src/lib/data/clientWork.ts), never a fake domain.
    githubUrl: "#",
  },
  {
    name: "Blog Manager & CMS Dashboard",
    tagline: {
      en: "Multi-role CMS platform built as a pluggable SaaS product.",
      bn: "একটি প্লাগেবল SaaS প্রোডাক্ট হিসেবে তৈরি মাল্টি-রোল CMS প্ল্যাটফর্ম।",
    },
    tech: ["Next.js", "TypeScript", "React", "Firebase", "TipTap", "Tailwind CSS"],
    highlight: {
      en: "Firebase-backed RBAC across three roles, a TipTap rich-text engine, and a debounced auto-save system with draft recovery.",
      bn: "তিনটি রোল জুড়ে Firebase-ভিত্তিক RBAC, একটি TipTap রিচ-টেক্সট ইঞ্জিন, এবং ড্রাফট রিকভারি সহ একটি ডিবাউন্সড অটো-সেভ সিস্টেম।",
    },
    stat: { value: "3", label: { en: "role-based access tiers", bn: "রোল-ভিত্তিক অ্যাক্সেস স্তর" } },
    flow: [
      { en: "Request", bn: "রিকোয়েস্ট" },
      { en: "Role check", bn: "রোল চেক" },
      { en: "Action", bn: "অ্যাকশন" },
    ],
    private: true,
  },
];
