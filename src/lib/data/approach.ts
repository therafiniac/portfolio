import { Layers, Gauge, ShieldCheck, Palette, ServerCog } from "lucide-react";
import type { IconComponent, Localized } from "@/types";

export type ApproachPoint = {
  icon: IconComponent;
  heading: Localized;
  description: Localized;
};

// Every point below is backed by something already true elsewhere in this
// codebase or the CV (the Reddit Clone's algorithm, the contact form's
// shared Zod schema, the dual Developer/Designer framing from AGENTS.md) —
// no invented metrics or generic "passionate about code" filler.
export const approachPoints: ApproachPoint[] = [
  {
    icon: Layers,
    heading: { en: "Full-Stack Ownership", bn: "ফুল-স্ট্যাক ওনারশিপ" },
    description: {
      en: "Ships the frontend, the backend, and the deploy pipeline — not just the UI layer. Every client project went from empty repo to a URL a customer could use.",
      bn: "ফ্রন্টএন্ড, ব্যাকএন্ড এবং ডিপ্লয় পাইপলাইন — শুধু UI লেয়ার নয়। প্রতিটি ক্লায়েন্ট প্রজেক্ট খালি রেপো থেকে গ্রাহকের ব্যবহারযোগ্য URL পর্যন্ত পৌঁছেছে।",
    },
  },
  {
    icon: Gauge,
    heading: { en: "Performance-First", bn: "পারফরম্যান্স-ফার্স্ট" },
    description: {
      en: "The Reddit Clone's comment tree resolves nested threads in one hash-map pass — a custom linear-to-tree algorithm instead of the recursive N+1 query most implementations reach for.",
      bn: "রেডিট ক্লোনের কমেন্ট ট্রি এক হ্যাশ-ম্যাপ পাসে নেস্টেড থ্রেড রিজলভ করে — বেশিরভাগ ইমপ্লিমেন্টেশন যে রিকার্সিভ N+1 কোয়েরির দিকে যায়, তার বদলে একটি কাস্টম লিনিয়ার-টু-ট্রি অ্যালগরিদম।",
    },
  },
  {
    icon: ShieldCheck,
    heading: { en: "Type-Safe by Default", bn: "ডিফল্টভাবে টাইপ-সেফ" },
    description: {
      en: "TypeScript end to end, with the same Zod schema validating both the client form and the server action — one source of truth, not two definitions that can drift apart.",
      bn: "শুরু থেকে শেষ পর্যন্ত TypeScript, একই Zod স্কিমা ক্লায়েন্ট ফর্ম এবং সার্ভার অ্যাকশন দুটোই যাচাই করে — একটিই সত্যের উৎস, আলাদা হয়ে যেতে পারে এমন দুটি সংজ্ঞা নয়।",
    },
  },
  {
    icon: Palette,
    heading: { en: "Developer and Designer", bn: "ডেভেলপার ও ডিজাইনার" },
    description: {
      en: "Ships the interface and the code behind it — no handoff gap between what's designed and what's shippable.",
      bn: "ইন্টারফেস এবং তার পেছনের কোড, দুটোই ডেলিভার করা হয় — ডিজাইন করা জিনিস আর শিপ করার মতো জিনিসের মধ্যে কোনো ফাঁক থাকে না।",
    },
  },
  {
    icon: ServerCog,
    heading: { en: "Production-Grade from Day One", bn: "শুরু থেকেই প্রোডাকশন-গ্রেড" },
    description: {
      en: "Server actions, rate-limited endpoints, environment-gated secrets — the baseline every project ships with, not an afterthought.",
      bn: "সার্ভার অ্যাকশন, রেট-লিমিটেড এন্ডপয়েন্ট, এনভায়রনমেন্ট-গেটেড সিক্রেট — প্রতিটি প্রজেক্টের সাথেই থাকা বেসলাইন, পরে যোগ করা কিছু নয়।",
    },
  },
];
