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
//
// Headings and descriptions are both plain-language on purpose — this
// section reads as "Philosophy" and gets visited by prospective freelance
// clients as often as technical hiring managers. A heading like "Type-Safe
// by Default" or a paragraph explaining hash-maps and Zod schemas only
// actually lands for the latter; an everyday-words version of the same
// true fact lands for both. The implementation-level detail still exists
// for anyone who wants to dig — Projects and the CV carry it — this
// section just isn't the place a non-technical reader should have to
// translate it themselves.
//
// fullStack and performance are HowIBuild.tsx's two wide (span={2}) tiles
// — genuinely more room than the three narrow ones, so their descriptions
// run a little longer instead of matching the one-liners those get.
// performance also stays generic on purpose (no named project): a claim
// like this is true of the whole practice, not one build, and naming the
// Reddit Clone here would make it read as the claim's only evidence
// rather than a general habit — Projects is where that specific proof
// lives.
export const approachPoints: ApproachPoint[] = [
  {
    icon: Layers,
    heading: { en: "Start to Finish", bn: "শুরু থেকে শেষ পর্যন্ত" },
    description: {
      en: "Builds the whole site — what you see on screen and everything that runs behind it. No handoff between a frontend person and a backend person; the same person carries it from a blank page to a real, working site.",
      bn: "পুরো সাইট তৈরি করা হয় — স্ক্রিনে যা দেখা যায় এবং তার পেছনে যা চলে, দুটোই। ফ্রন্টএন্ড ও ব্যাকএন্ডের জন্য আলাদা মানুষের মধ্যে হাত বদল হয় না; একই মানুষ শূন্য থেকে শুরু করে একটি বাস্তব, ব্যবহারযোগ্য সাইট পর্যন্ত নিয়ে যায়।",
    },
  },
  {
    icon: Gauge,
    heading: { en: "Performance-First", bn: "পারফরম্যান্স-ফার্স্ট" },
    description: {
      en: "Stays fast as a site grows — more pages, more visitors, more data — instead of slowing down the way many sites do once real traffic and content pile up. Speed is built in from the start, not patched in later.",
      bn: "সাইট যত বড় হয় — বেশি পেজ, বেশি ভিজিটর, বেশি ডেটা — ততই দ্রুত থাকে, অনেক সাইটের মতো আসল ট্র্যাফিক ও কনটেন্ট জমলে ধীর হয়ে যায় না। গতি শুরু থেকেই বিল্ডের অংশ, পরে ঠিক করার কিছু নয়।",
    },
  },
  {
    icon: ShieldCheck,
    heading: { en: "Double-Checked by Default", bn: "ডিফল্টভাবে দুইবার যাচাই" },
    description: {
      en: "Every form is checked twice — once on screen, once behind the scenes — so bad entries never slip through.",
      bn: "প্রতিটি ফর্ম দুইবার চেক হয় — একবার স্ক্রিনে, একবার পেছনে — ভুল এন্ট্রি কখনো ঢোকে না।",
    },
  },
  {
    icon: Palette,
    heading: { en: "Developer and Designer", bn: "ডেভেলপার ও ডিজাইনার" },
    description: {
      en: "Designs it and builds it, so nothing gets lost in between.",
      bn: "ডিজাইন করা হয় এবং সেটাই তৈরি করা হয় — মাঝে কিছু হারায় না।",
    },
  },
  {
    icon: ServerCog,
    heading: { en: "Secure From Day One", bn: "শুরু থেকেই নিরাপদ" },
    description: {
      en: "Spam protection and safe password handling are built in from the start, not added later.",
      bn: "স্প্যাম প্রোটেকশন এবং পাসওয়ার্ডের নিরাপদ ব্যবস্থা শুরু থেকেই থাকে, পরে যোগ করা হয় না।",
    },
  },
];
