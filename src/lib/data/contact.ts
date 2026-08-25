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
// experience.ts, not a new claim. Email's `value` stays a plain string —
// never translated, in any mode — while location's is Localized like
// the same city name already is in experience.ts/education.ts.
export const contactInfo: ContactInfo[] = [
  {
    label: { en: "Email", bn: "ইমেইল" },
    value: "therafiniac@gmail.com",
    href: "mailto:therafiniac@gmail.com",
    icon: Mail,
  },
  {
    label: { en: "Location", bn: "অবস্থান" },
    value: { en: "Kolkata, India", bn: "কলকাতা, ভারত" },
    icon: MapPin,
  },
];

// Given directly by Rafi (not scraped/inferred from any doc) — +91
// prepended since every other location fact on this site (this file's
// own Location row, every entry in experience.ts/education.ts) is
// Kolkata, India. Used by FloatingActions.tsx's floating WhatsApp button.
export const whatsappHref = "https://wa.me/919563104325";

// Profile links — the destination is the whole point, so icon only, no
// handle text. href is "#" (not a placeholder domain) for the four not
// yet real — see AGENTS.md's placeholder-link rule. Labels stay plain —
// these are platform proper nouns, never translated.
export const profileLinks: ProfileLink[] = [
  { label: "GitHub", href: "https://github.com/therafiniac", icon: GithubIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/therafiniac", icon: LinkedinIcon },
  { label: "X", href: "#", icon: XIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "Facebook", href: "#", icon: FacebookIcon },
  { label: "Telegram", href: "#", icon: TelegramIcon },
  { label: "Snapchat", href: "#", icon: SnapchatIcon },
];
