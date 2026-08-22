import type { Localized } from "@/types";

// UI-chrome copy hardcoded in components (button labels, section
// eyebrows/titles, terminal prompts, form labels) — as opposed to
// per-entity content, which lives in src/lib/data/*.ts. Same reasoning
// as before this file existed: this is the section's own fixed
// vocabulary, not data about a specific project/job/skill, so it stays
// out of the data/ directory. Consumed the same way as data fields, via
// t(strings.foo.bar, language).
export const strings = {
  clientWork: {
    eyebrow: { en: "Client Work", bn: "ক্লায়েন্ট কাজ" } satisfies Localized,
    title: { en: "Work I've Delivered", bn: "যে কাজ ডেলিভার করেছি" } satisfies Localized,
    intro: {
      en: "A sample from 150+ client sites delivered across industries — the actual, shipped, paid-for work.",
      bn: "বিভিন্ন ইন্ডাস্ট্রি জুড়ে ডেলিভার করা 150+ ক্লায়েন্ট সাইট থেকে একটি নমুনা — প্রকৃত, শিপড, পেইড কাজ।",
    } satisfies Localized,
  },
  workFiller: {
    heading: { en: "Open to new projects.", bn: "নতুন প্রজেক্টের জন্য উন্মুক্ত।" } satisfies Localized,
    cta: { en: "Get in touch", bn: "যোগাযোগ করুন" } satisfies Localized,
  },
  services: {
    eyebrow: { en: "Additional Services", bn: "অতিরিক্ত সার্ভিস" } satisfies Localized,
    title: { en: "Beyond Development", bn: "ডেভেলপমেন্টের বাইরেও" } satisfies Localized,
    intro: {
      en: "Design and creative work alongside engineering, for clients who need more than just code.",
      bn: "ইঞ্জিনিয়ারিংয়ের পাশাপাশি ডিজাইন ও ক্রিয়েটিভ কাজ — যে ক্লায়েন্টদের শুধু কোডের বেশি কিছু দরকার, তাদের জন্য।",
    } satisfies Localized,
    canvasLabel: { en: "moodboard — services", bn: "মুডবোর্ড — সার্ভিস" } satisfies Localized,
  },
  projects: {
    eyebrow: { en: "Independent Projects", bn: "স্বাধীন প্রজেক্ট" } satisfies Localized,
    title: { en: "What I've Built", bn: "যা তৈরি করেছি" } satisfies Localized,
    intro: {
      en: "A short list on purpose — every entry gets its full architecture discussion instead of padding the count.",
      bn: "ইচ্ছাকৃতভাবে ছোট একটি তালিকা — সংখ্যা বাড়ানোর বদলে প্রতিটি এন্ট্রি তার সম্পূর্ণ আর্কিটেকচার আলোচনা পায়।",
    } satisfies Localized,
    liveDemo: { en: "Live Demo", bn: "লাইভ ডেমো" } satisfies Localized,
    github: { en: "GitHub", bn: "গিটহাব" } satisfies Localized,
    privateRepo: { en: "Private Repo", bn: "প্রাইভেট রেপো" } satisfies Localized,
    theApproach: { en: "The Approach", bn: "পদ্ধতি" } satisfies Localized,
    mechanism: { en: "Mechanism", bn: "মেকানিজম" } satisfies Localized,
    stack: { en: "Stack", bn: "স্ট্যাক" } satisfies Localized,
  },
  skills: {
    eyebrow: { en: "Capabilities", bn: "দক্ষতা" } satisfies Localized,
    title: { en: "Stack", bn: "স্ট্যাক" } satisfies Localized,
    intro: {
      en: "Four+ years across three roles — from early WordPress builds to the production SaaS above.",
      bn: "তিনটি ভূমিকায় চার+ বছর — শুরুর দিকের WordPress বিল্ড থেকে উপরের প্রোডাকশন SaaS পর্যন্ত।",
    } satisfies Localized,
    boldNote: {
      en: "marks what recurs in that real work, in Projects and Experience — not a self-rated list.",
      bn: "মানে সেটা প্রজেক্ট ও অভিজ্ঞতার বাস্তব কাজে বারবার এসেছে — এটা নিজে-রেট-করা তালিকা নয়।",
    } satisfies Localized,
    boldWord: { en: "Bold", bn: "বোল্ড" } satisfies Localized,
    terminalTitle: { en: "rafi@portfolio — zsh", bn: "rafi@portfolio — zsh" } satisfies Localized,
    prompt: { en: "rafi --stack", bn: "rafi --stack" } satisfies Localized,
  },
  experience: {
    eyebrow: { en: "Track Record", bn: "ট্র্যাক রেকর্ড" } satisfies Localized,
    title: { en: "Experience", bn: "অভিজ্ঞতা" } satisfies Localized,
    education: { en: "Education", bn: "শিক্ষা" } satisfies Localized,
    year: { en: "yr", bn: "বছর" } satisfies Localized,
    years: { en: "yrs", bn: "বছর" } satisfies Localized,
    month: { en: "mo", bn: "মাস" } satisfies Localized,
    months: { en: "mos", bn: "মাস" } satisfies Localized,
    present: { en: "Present", bn: "বর্তমান" } satisfies Localized,
  },
  howIBuild: {
    eyebrow: { en: "Philosophy", bn: "দর্শন" } satisfies Localized,
    title: { en: "How I Build", bn: "যেভাবে আমি তৈরি করি" } satisfies Localized,
    intro: {
      en: "A few things that stay true across every project, regardless of stack.",
      bn: "স্ট্যাক যাই হোক না কেন, প্রতিটি প্রজেক্ট জুড়ে যা সবসময় সত্য থাকে।",
    } satisfies Localized,
    ctaHeading: { en: "Open to new projects.", bn: "নতুন প্রজেক্টের জন্য উন্মুক্ত।" } satisfies Localized,
    cta: { en: "Get in touch", bn: "যোগাযোগ করুন" } satisfies Localized,
    publicRepos: { en: "Public Repos (Live)", bn: "পাবলিক রেপো (লাইভ)" } satisfies Localized,
  },
  contact: {
    eyebrow: { en: "Get in Touch", bn: "যোগাযোগ করুন" } satisfies Localized,
    title: { en: "Contact", bn: "যোগাযোগ" } satisfies Localized,
    headline: {
      en: "Let's build something that scales.",
      bn: "চলুন এমন কিছু তৈরি করি যা স্কেল করে।",
    } satisfies Localized,
    profiles: { en: "Profiles", bn: "প্রোফাইল" } satisfies Localized,
  },
  contactForm: {
    name: { en: "Name", bn: "নাম" } satisfies Localized,
    email: { en: "Email", bn: "ইমেইল" } satisfies Localized,
    message: { en: "Message", bn: "বার্তা" } satisfies Localized,
    sending: { en: "Sending…", bn: "পাঠানো হচ্ছে…" } satisfies Localized,
    send: { en: "Send Message", bn: "বার্তা পাঠান" } satisfies Localized,
    sentTitle: { en: "Message sent.", bn: "বার্তা পাঠানো হয়েছে।" } satisfies Localized,
    sentBody: {
      en: "Thanks for reaching out — I'll get back to you soon.",
      bn: "যোগাযোগ করার জন্য ধন্যবাদ — শীঘ্রই উত্তর দেব।",
    } satisfies Localized,
  },
  hero: {
    viewWork: { en: "View My Work", bn: "আমার কাজ দেখুন" } satisfies Localized,
    getInTouch: { en: "Get in Touch", bn: "যোগাযোগ করুন" } satisfies Localized,
    scroll: { en: "Scroll", bn: "স্ক্রল" } satisfies Localized,
    scrollToWork: { en: "Scroll to work", bn: "কাজে স্ক্রল করুন" } satisfies Localized,
  },
  footer: {
    backToTop: { en: "Back to top", bn: "উপরে ফিরে যান" } satisfies Localized,
  },
  nav: {
    openMenu: { en: "Open menu", bn: "মেনু খুলুন" } satisfies Localized,
    closeMenu: { en: "Close menu", bn: "মেনু বন্ধ করুন" } satisfies Localized,
    switchToDark: { en: "Switch to dark mode", bn: "ডার্ক মোডে যান" } satisfies Localized,
    switchToLight: { en: "Switch to light mode", bn: "লাইট মোডে যান" } satisfies Localized,
    switchToBengali: { en: "Switch to Bengali", bn: "ইংরেজিতে যান" } satisfies Localized,
  },
};
