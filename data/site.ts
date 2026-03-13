import type { NavItem, SocialLink } from "@/types";

export const siteConfig = {
  name:        "Rafi Ahmed Laskar",
  title:       "Full Stack Developer & Designer",
  description:
    "Full Stack Developer with 3+ years of experience building modern web applications. Specialized in MERN stack with a strong eye for design.",
  url:         "https://therafiniac.com",
  email:       "therafiniac@gmail.com",
  phone:       "+91-9563104325",
  location:    "Baruipur, Kolkata, India",
  availability: true, // toggle for "open to work" badge

  roles: [
    "Full Stack Developer",
    "MERN Stack Developer",
    "UI/UX Designer",
    "React Developer",
    "Frontend Engineer",
  ],

  stats: [
    { value: 3,    suffix: "+", label: "Years Experience" },
    { value: 20,   suffix: "+", label: "Projects Built"   },
    { value: 10,   suffix: "+", label: "Happy Clients"    },
    { value: 100,  suffix: "%", label: "Dedication"       },
  ],
} as const;

export const navItems: NavItem[] = [
  { label: "Home",         href: "#home"         },
  { label: "About",        href: "#about"        },
  { label: "Skills",       href: "#skills"       },
  { label: "Projects",     href: "#projects"     },
  { label: "Experience",   href: "#experience"   },
  { label: "Contact",      href: "#contact"      },
];

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href:  "https://github.com/therafiniac",
    icon:  "github",
  },
  {
    label: "LinkedIn",
    href:  "https://linkedin.com/in/therafiniac",
    icon:  "linkedin",
  },
  {
    label: "Email",
    href:  "mailto:therafiniac@gmail.com",
    icon:  "mail",
  },
];
