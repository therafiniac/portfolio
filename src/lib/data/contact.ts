import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import type { ContactLink } from "@/types";

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: "therafiniac@gmail.com",
    href: "mailto:therafiniac@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/therafiniac",
    href: "https://github.com/therafiniac",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/therafiniac",
    href: "https://linkedin.com/in/therafiniac",
    icon: LinkedinIcon,
  },
];
