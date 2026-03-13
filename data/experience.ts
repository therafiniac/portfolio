import type { ExperienceItem } from "@/types";

export const experiences: ExperienceItem[] = [
  {
    id:       "digital-exposure",
    role:     "Web Developer",
    company:  "Digital Exposure Online Services",
    location: "Baruipur, Kolkata, India",
    period:   "Jan 2022 – Present",
    current:  true,
    description: [
      "Designed and developed responsive websites using HTML, CSS, JavaScript, and WordPress for small businesses.",
      "Built custom React.js components and improved user interaction in modern web projects.",
      "Integrated third-party APIs, optimized SEO performance, and ensured cross-browser compatibility.",
      "Applied version control best practices using Git and GitHub across all projects.",
      "Collaborated with clients to translate business requirements into clean, functional interfaces.",
    ],
    technologies: [
      "React.js", "JavaScript", "WordPress", "HTML5", "CSS3", "Git", "Elementor",
    ],
  },
  // Add more experience items here in the future
];
