import { Layers, Gauge, ShieldCheck, Palette, ServerCog } from "lucide-react";
import type { IconComponent } from "@/types";

export type ApproachPoint = {
  icon: IconComponent;
  heading: string;
  description: string;
};

// Every point below is backed by something already true elsewhere in this
// codebase or the CV (the Reddit Clone's algorithm, the contact form's
// shared Zod schema, the dual Developer/Designer framing from AGENTS.md) —
// no invented metrics or generic "passionate about code" filler.
export const approachPoints: ApproachPoint[] = [
  {
    icon: Layers,
    heading: "Full-Stack Ownership",
    description:
      "Ships the frontend, the backend, and the deploy pipeline — not just the UI layer. Every client project went from empty repo to a URL a customer could use.",
  },
  {
    icon: Gauge,
    heading: "Performance-First",
    description:
      "The Reddit Clone's comment tree resolves nested threads in one hash-map pass — a custom linear-to-tree algorithm instead of the recursive N+1 query most implementations reach for.",
  },
  {
    icon: ShieldCheck,
    heading: "Type-Safe by Default",
    description:
      "TypeScript end to end, with the same Zod schema validating both the client form and the server action — one source of truth, not two definitions that can drift apart.",
  },
  {
    icon: Palette,
    heading: "Developer and Designer",
    description: "Ships the interface and the code behind it — no handoff gap between what's designed and what's shippable.",
  },
  {
    icon: ServerCog,
    heading: "Production-Grade from Day One",
    description: "Server actions, rate-limited endpoints, environment-gated secrets — the baseline every project ships with, not an afterthought.",
  },
];
