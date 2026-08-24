import { KeyRound, Luggage } from "lucide-react";
import type { SideProject } from "@/types";

// Small utility tools, shown for breadth/shipping habit — not a case study
// (see Project in projects.ts for that). href is a placeholder "#" per the
// site's honest-placeholder convention (see clientWork.ts) until Rafi
// swaps in the real live demo links.
export const sideProjects: SideProject[] = [
  {
    name: { en: "Password Generator", bn: "পাসওয়ার্ড জেনারেটর" },
    description: {
      en: "Configurable password generator — length and character set, copy to clipboard.",
      bn: "কনফিগারযোগ্য পাসওয়ার্ড জেনারেটর — দৈর্ঘ্য ও ক্যারেক্টার সেট, ক্লিপবোর্ডে কপি।",
    },
    href: "#",
    icon: KeyRound,
  },
  {
    name: { en: "Packing List", bn: "প্যাকিং লিস্ট" },
    description: {
      en: "Checklist tool for packing before a trip — add items, check them off.",
      bn: "ভ্রমণের আগে প্যাকিংয়ের জন্য চেকলিস্ট টুল — আইটেম যোগ করুন, চেক করুন।",
    },
    href: "#",
    icon: Luggage,
  },
];
