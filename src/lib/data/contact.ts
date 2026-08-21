import { Mail, MapPin } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  XIcon,
  InstagramIcon,
  FacebookIcon,
  TelegramIcon,
  SnapchatIcon,
} from "@/components/icons/BrandIcons";
import type { ContactInfo, ProfileLink } from "@/types";

// Read-worthy, not a link to click through — an address to copy, a city
// that tells you where to expect timezone/response-time overlap.
// "Kolkata, India" is the same verified location used on every entry in
// experience.ts, not a new claim.
export const contactInfo: ContactInfo[] = [
  {
    label: "Email",
    value: "therafiniac@gmail.com",
    href: "mailto:therafiniac@gmail.com",
    icon: Mail,
  },
  {
    label: "Location",
    value: "Kolkata, India",
    icon: MapPin,
  },
];

// Profile links — the destination is the whole point, so icon only, no
// handle text. href is "#" (not a placeholder domain) for the four not
// yet real — see AGENTS.md's placeholder-link rule.
export const profileLinks: ProfileLink[] = [
  { label: "GitHub", href: "https://github.com/therafiniac", icon: GithubIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/therafiniac", icon: LinkedinIcon },
  { label: "X", href: "#", icon: XIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "Facebook", href: "#", icon: FacebookIcon },
  { label: "Telegram", href: "#", icon: TelegramIcon },
  { label: "Snapchat", href: "#", icon: SnapchatIcon },
];
