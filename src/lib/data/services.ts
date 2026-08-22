import { Palette, Sparkles, Megaphone } from "lucide-react";
import type { IconComponent, Localized } from "@/types";

// Capability list, not a client-work log — these are services offered
// going forward. Graphics Design leans on the CV's real tool proficiency
// (Figma, Photoshop, Illustrator, Canva); Branding and Digital Marketing
// have no track record behind them yet, so their copy states what's
// offered without implying a delivered case study or metric.
export type Service = {
  icon: IconComponent;
  name: Localized;
  description: Localized;
};

export const services: Service[] = [
  {
    icon: Palette,
    name: { en: "Graphics Design", bn: "গ্রাফিক্স ডিজাইন" },
    description: {
      en: "UI mockups, marketing graphics, and print-ready assets, done in Figma, Photoshop, and Illustrator.",
      bn: "ফিগমা, ফটোশপ এবং ইলাস্ট্রেটরে করা UI মকআপ, মার্কেটিং গ্রাফিক্স এবং প্রিন্ট-রেডি অ্যাসেট।",
    },
  },
  {
    icon: Sparkles,
    name: { en: "Branding", bn: "ব্র্যান্ডিং" },
    description: {
      en: "Logo, color, and visual identity systems for a brand that needs a consistent look before anything else.",
      bn: "যে ব্র্যান্ডের প্রথমেই একটি সামঞ্জস্যপূর্ণ লুক দরকার, তার জন্য লোগো, রঙ এবং ভিজ্যুয়াল আইডেন্টিটি সিস্টেম।",
    },
  },
  {
    icon: Megaphone,
    name: { en: "Digital Marketing", bn: "ডিজিটাল মার্কেটিং" },
    description: {
      en: "Campaign creative and ad assets, built to spec alongside whoever runs the media buying and strategy.",
      bn: "মিডিয়া বায়িং ও স্ট্র্যাটেজি যিনি পরিচালনা করেন তার সাথে মিলিয়ে তৈরি ক্যাম্পেইন ক্রিয়েটিভ এবং অ্যাড অ্যাসেট।",
    },
  },
];
