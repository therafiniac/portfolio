import type { ExperienceEntry } from "@/types";

// org stays plain/English (company proper nouns aren't translated); role,
// location, and highlights are Localized.
export const experience: ExperienceEntry[] = [
  {
    role: { en: "Software Developer", bn: "সফটওয়্যার ডেভেলপার" },
    org: "Semigon Consultancy Pvt. Ltd",
    location: { en: "Kolkata, India", bn: "কলকাতা, ভারত" },
    start: "Jul 2025",
    end: "Present",
    highlights: [
      {
        en: "Shipping a full-stack Blog Manager SaaS — Next.js, MongoDB, Firebase, RBAC, scheduled publishing.",
        bn: "একটি ফুল-স্ট্যাক ব্লগ ম্যানেজার SaaS ডেলিভার করা হচ্ছে — Next.js, MongoDB, Firebase, RBAC, শিডিউলড পাবলিশিং।",
      },
      {
        en: "Owns GCP/Firebase deployments and direct delivery for US/UK clients.",
        bn: "GCP/Firebase ডিপ্লয়মেন্ট এবং US/UK ক্লায়েন্টদের জন্য সরাসরি ডেলিভারির দায়িত্বে।",
      },
    ],
    tech: ["Next.js", "TypeScript", "MongoDB", "Firebase"],
  },
  {
    role: { en: "Web Developer", bn: "ওয়েব ডেভেলপার" },
    org: "Digital Exposure Online Services",
    location: { en: "Kolkata, India", bn: "কলকাতা, ভারত" },
    start: "Jan 2022",
    end: "Jun 2025",
    highlights: [
      {
        en: "150+ client sites delivered solo, from landing pages to e-commerce.",
        bn: "150+ ক্লায়েন্ট সাইট একাই ডেলিভার করা হয়েছে, ল্যান্ডিং পেজ থেকে ই-কমার্স পর্যন্ত।",
      },
      {
        en: "Sole technical point of contact across Kolkata and pan-India accounts.",
        bn: "কলকাতা এবং সারা ভারতের অ্যাকাউন্টগুলোর জন্য একমাত্র টেকনিক্যাল পয়েন্ট অফ কন্টাক্ট।",
      },
    ],
    tech: ["HTML", "CSS", "JavaScript", "React.js"],
  },
  {
    role: { en: "Independent Web Developer", bn: "স্বাধীন ওয়েব ডেভেলপার" },
    org: "Self-Employed",
    location: { en: "Kolkata, India", bn: "কলকাতা, ভারত" },
    start: "2020",
    end: "2021",
    highlights: [
      {
        en: "Independent web builds for small businesses — HTML, CSS, JS, WordPress.",
        bn: "ছোট ব্যবসার জন্য স্বাধীনভাবে ওয়েব বিল্ড — HTML, CSS, JS, WordPress।",
      },
    ],
    tech: ["HTML", "CSS", "JavaScript", "WordPress"],
  },
];
