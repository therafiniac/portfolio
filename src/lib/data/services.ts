import { Palette, Sparkles, Megaphone } from "lucide-react";
import type { IconComponent } from "@/types";

// Capability list, not a client-work log — these are services offered
// going forward. Graphics Design leans on the CV's real tool proficiency
// (Figma, Photoshop, Illustrator, Canva); Branding and Digital Marketing
// have no track record behind them yet, so their copy states what's
// offered without implying a delivered case study or metric.
export type Service = {
  icon: IconComponent;
  name: string;
  description: string;
};

export const services: Service[] = [
  {
    icon: Palette,
    name: "Graphics Design",
    description:
      "UI mockups, marketing graphics, and print-ready assets, done in Figma, Photoshop, and Illustrator.",
  },
  {
    icon: Sparkles,
    name: "Branding",
    description:
      "Logo, color, and visual identity systems for a brand that needs a consistent look before anything else.",
  },
  {
    icon: Megaphone,
    name: "Digital Marketing",
    description:
      "Campaign creative and ad assets, built to spec alongside whoever runs the media buying and strategy.",
  },
];
