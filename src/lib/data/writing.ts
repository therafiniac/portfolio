import { Bug, Share2, Shield } from "lucide-react";
import type { WritingPost } from "@/types";

// Three earlier posts, originally published on Facebook — linked out as
// honest external pointers (see AGENTS.md's placeholder-honesty rule:
// this points at the real post, not a hosted copy) rather than faked as
// native content. New posts get added here going forward; once a full
// on-site blog exists, these can sit alongside it, still clearly marked
// as external. `icon` is picked per post to fit its actual topic (see
// WritingPost's own comment) — Shield for a security/VPN piece, Share2
// for decentralized file-sharing, Bug for a computer-virus history, not
// a generic reused glyph.
export const writingPosts: WritingPost[] = [
  {
    title: {
      en: "VPN, Explained",
      bn: "|| ভিপিএন ||",
    },
    excerpt: {
      en: "How a VPN works, explained through a protective-tunnel analogy — securing traffic between you and your destination and hiding your IP from your ISP.",
      bn: "ভিপিএন কীভাবে কাজ করে, একটি সুরক্ষা-টানেলের উপমা দিয়ে ব্যাখ্যা — ব্যবহারকারী ও গন্তব্যের মধ্যে ট্রাফিক সুরক্ষিত রাখা এবং আইএসপি থেকে আইপি লুকানো।",
    },
    href: "https://www.facebook.com/share/p/1BZ8cHCVK3/",
    platform: "Facebook",
    date: { en: "Jul 2020", bn: "জুলাই ২০২০" },
    language: "bn",
    icon: Shield,
  },
  {
    title: {
      en: "How Torrents Work",
      bn: "|| টরেন্ট ||",
    },
    excerpt: {
      en: "A decentralized file-sharing primer — seeders, leechers, trackers, and magnet links, plus where the BitTorrent protocol's legality actually depends on what's shared.",
      bn: "বিকেন্দ্রীভূত ফাইল-শেয়ারিং নিয়ে একটি প্রাইমার — সিডার, লিচার, ট্র্যাকার ও ম্যাগনেট লিংক, এবং BitTorrent প্রোটোকলের বৈধতা আসলে কীসের উপর নির্ভর করে।",
    },
    href: "https://www.facebook.com/share/p/19itstykQt/",
    platform: "Facebook",
    date: { en: "Apr 2020", bn: "এপ্রিল ২০২০" },
    language: "bn",
    icon: Share2,
  },
  {
    title: {
      en: "A History of the Computer Virus",
      bn: "কম্পিউটার ভাইরাস",
    },
    excerpt: {
      en: "From von Neumann's 1949 self-replicating machines to Creeper, Elk Cloner, and C-Brain — a short history of how the computer virus came to exist.",
      bn: "ভন নয়ম্যানের ১৯৪৯ সালের স্ব-প্রতিলিপি মেশিন থেকে শুরু করে Creeper, Elk Cloner ও C-Brain পর্যন্ত — কম্পিউটার ভাইরাসের সংক্ষিপ্ত ইতিহাস।",
    },
    href: "https://www.facebook.com/share/p/1cXD6oc5tL/",
    platform: "Facebook",
    date: { en: "Mar 2020", bn: "মার্চ ২০২০" },
    language: "bn",
    icon: Bug,
  },
];
