import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon:  "monitor",
    skills: [
      { name: "React.js",     icon: "SiReact",      level: 5 },
      { name: "Next.js",      icon: "SiNextdotjs",  level: 4 },
      { name: "TypeScript",   icon: "SiTypescript",  level: 4 },
      { name: "JavaScript",   icon: "SiJavascript",  level: 5 },
      { name: "Tailwind CSS", icon: "SiTailwindcss", level: 5 },
      { name: "HTML5",        icon: "SiHtml5",       level: 5 },
      { name: "CSS3",         icon: "SiCss3",        level: 5 },
      { name: "SASS",         icon: "SiSass",        level: 4 },
      { name: "Bootstrap",    icon: "SiBootstrap",   level: 4 },
    ],
  },
  {
    title: "Backend",
    icon:  "server",
    skills: [
      { name: "Node.js",    icon: "SiNodedotjs",  level: 4 },
      { name: "Express.js", icon: "SiExpress",    level: 4 },
      { name: "MongoDB",    icon: "SiMongodb",    level: 4 },
      { name: "Mongoose",   icon: "SiMongoose",   level: 4 },
      { name: "REST APIs",  icon: "SiPostman",    level: 5 },
      { name: "JWT",        icon: "SiJsonwebtokens", level: 4 },
    ],
  },
  {
    title: "Tools & Platforms",
    icon:  "wrench",
    skills: [
      { name: "Git",       icon: "SiGit",       level: 5 },
      { name: "GitHub",    icon: "SiGithub",    level: 5 },
      { name: "VS Code",   icon: "SiVisualstudiocode", level: 5 },
      { name: "Vite",      icon: "SiVite",      level: 4 },
      { name: "Postman",   icon: "SiPostman",   level: 4 },
      { name: "WordPress", icon: "SiWordpress", level: 5 },
      { name: "FileZilla", icon: "SiFilezilla", level: 3 },
    ],
  },
  {
    title: "Design",
    icon:  "palette",
    skills: [
      { name: "Figma",        icon: "SiFigma",         level: 5 },
      { name: "Photoshop",    icon: "SiAdobephotoshop", level: 4 },
      { name: "Illustrator",  icon: "SiAdobeillustrator", level: 3 },
      { name: "Canva",        icon: "SiCanva",          level: 5 },
    ],
  },
];
