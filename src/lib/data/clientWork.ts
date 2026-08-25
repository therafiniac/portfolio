import { ShieldCheck, Library, Landmark, Stethoscope, Music } from "lucide-react";
import type { ClientProject } from "@/types";

// Real client/community work only — see AGENTS.md's placeholder-honesty
// rule. Each entry is verified directly (page content, HTTP headers,
// and/or direct facts from Rafi) before it lands here; coverImage/gallery
// are real screenshots (public/work/), never stock photos. slug feeds
// each card's case-study route (/work/[slug], see src/app/work/[slug]) —
// keep it stable once a project's page might already be shared/indexed
// somewhere, rather than renaming it later.
//
// coverImage is a real hero/fold screenshot at a fixed viewport (1600x1000)
// — the grid (see ClientWork.tsx) assumes every entry shares that same
// aspect ratio (no per-card size/shape variation), so screenshots drop
// straight in without any cropping or layout decisions. 5 real entries +
// 2 "coming soon" tiles (ClientWork.tsx's COMING_SOON_COUNT) + the
// stat/CTA filler land on exactly 3 full grid rows — if either count
// changes, sanity-check the last row isn't left with a single stranded
// tile before shipping.
export const clientProjects: ClientProject[] = [
  {
    // First real entry — everything below is verified directly (page
    // content + HTTP response headers: `server: Vercel`, `x-powered-by:
    // Next.js`, firebasestorage.googleapis.com references), not guessed.
    // coverImage is a real screenshot (public/work/, 1600x1000 viewport,
    // matching this file's usual hero/fold framing), not stock. Only the
    // case-study depth fields (challenge/approach/highlights/outcome)
    // are still unset — Rafi's own specifics for this project (his role,
    // the actual challenge, a real outcome) haven't been supplied yet;
    // see docs/Case_Study_Content_Template.md.
    slug: "auditpulse-ai",
    name: { en: "AuditPulse", bn: "অডিটপালস" },
    category: { en: "GRC Platform", bn: "GRC প্ল্যাটফর্ম" },
    description: {
      en: "AI-powered GRC platform that automates evidence collection and compliance testing.",
      bn: "এআই-চালিত GRC প্ল্যাটফর্ম যা এভিডেন্স সংগ্রহ এবং কমপ্লায়েন্স টেস্টিং স্বয়ংক্রিয় করে।",
    },
    coverImage: "/work/auditpulse-01.png",
    href: "https://www.auditpulse.ai",
    icon: ShieldCheck,
    tech: ["Next.js", "Firebase", "Vercel", "n8n"],
    // Built while at Semigon Consultancy — real specifics from Rafi
    // directly, not inferred from the live site the way the fields
    // above were. Outcome is still left unset: no concrete number/quote
    // was given, and per AGENTS.md a vague "great success" line is worse
    // than no Outcome section at all.
    challenge: {
      en: "AuditPulse's team hadn't settled on their own site structure going in — they weren't sure what content or pages they actually needed, so the brief itself had to be discovered through the process, not handed over upfront.",
      bn: "অডিটপালসের টিম শুরুতে নিজেদের সাইট স্ট্রাকচার ঠিক করেনি — কী কনটেন্ট বা পেজ দরকার তা তারা নিশ্চিত ছিল না, ফলে ব্রিফটাই প্রক্রিয়ার মধ্য দিয়ে খুঁজে বের করতে হয়েছে, আগে থেকে দেওয়া হয়নি।",
    },
    approach: {
      en: "Treated the ambiguity itself as the brief — shipped 8–9 full design directions before the client could commit to one, then kept iterating through weekly (sometimes after-hours) feedback rounds until the site actually matched what they needed.",
      bn: "অস্পষ্টতাকেই ব্রিফ হিসেবে ধরা হয়েছে — ক্লায়েন্ট একটি দিক বেছে নেওয়ার আগে ৮-৯টি সম্পূর্ণ ডিজাইন কনসেপ্ট তৈরি করা হয়, এরপর সাপ্তাহিক (কখনো অফিস সময়ের বাইরেও) ফিডব্যাকের মাধ্যমে সাইটটি প্রকৃতপক্ষে তাদের প্রয়োজন অনুযায়ী না হওয়া পর্যন্ত কাজ চলতে থাকে।",
    },
    highlights: [
      {
        en: "8–9 full design concepts shipped before the client could align on one final direction.",
        bn: "ক্লায়েন্ট একটি চূড়ান্ত দিকে একমত হওয়ার আগে ৮-৯টি সম্পূর্ণ ডিজাইন কনসেপ্ট তৈরি করা হয়েছে।",
      },
      {
        en: "A companion CMS dashboard (see the Blog Manager & CMS Dashboard project) for full blog CRUD, plus dynamic section editing — notification marquee, feature cards — updatable without a redeploy.",
        bn: "একটি সহযোগী CMS ড্যাশবোর্ড (দেখুন Blog Manager & CMS Dashboard প্রজেক্ট) — সম্পূর্ণ ব্লগ CRUD এবং নোটিফিকেশন মার্কি, ফিচার কার্ডের মতো ডাইনামিক সেকশন এডিটিং, রিডেপ্লয় ছাড়াই আপডেটযোগ্য।",
      },
      {
        en: "An n8n-powered chatbot (AuditPulse Assistant) handling on-site product/pricing questions and demo requests.",
        bn: "সাইটে প্রোডাক্ট/প্রাইসিং প্রশ্ন এবং ডেমো রিকোয়েস্ট সামলানোর জন্য n8n-চালিত চ্যাটবট (AuditPulse Assistant) ইন্টিগ্রেট করা হয়েছে।",
      },
      {
        en: "Delivered as the production site for a US-based compliance SaaS client, built while at Semigon Consultancy.",
        bn: "সেমিগন কনসালটেন্সিতে কাজ করার সময় একটি US-ভিত্তিক কমপ্লায়েন্স SaaS ক্লায়েন্টের প্রোডাকশন সাইট হিসেবে ডেলিভার করা হয়েছে।",
      },
    ],
    gallery: [
      {
        src: "/work/auditpulse-05.png",
        caption: { en: "The AI-powered automation engine", bn: "এআই-চালিত অটোমেশন ইঞ্জিন" },
      },
      {
        src: "/work/auditpulse-06.png",
        caption: { en: "Centralized evidence library", bn: "সেন্ট্রালাইজড এভিডেন্স লাইব্রেরি" },
      },
      {
        src: "/work/auditpulse-04.png",
        caption: { en: "AuditPulse Assistant — the n8n-powered chatbot", bn: "AuditPulse Assistant — n8n-চালিত চ্যাটবট" },
      },
      {
        src: "/work/auditpulse-02.png",
        caption: {
          en: "The blog — content managed through the companion CMS dashboard",
          bn: "ব্লগ — সহযোগী CMS ড্যাশবোর্ডের মাধ্যমে পরিচালিত কনটেন্ট",
        },
      },
      {
        src: "/work/auditpulse-03.png",
        caption: { en: "Mobile responsive view", bn: "মোবাইল রেসপন্সিভ ভিউ" },
        orientation: "portrait",
      },
    ],
  },
  {
    // Not a paid client engagement like the entries around it — Parallel
    // is a Bengali-language publishing/archive initiative Rafi is
    // personally part of (see the project's own brand foundation
    // document), and he's building its site solo. Verified directly
    // (page content + HTTP headers: `x-powered-by: Next.js`, `platform:
    // hostinger`). Still actively in development — the live URL below is
    // its current working address, not a final custom domain.
    slug: "parallel",
    name: { en: "Parallel", bn: "প্যারালাল" },
    category: { en: "Knowledge Commons Platform", bn: "নলেজ কমন্স প্ল্যাটফর্ম" },
    description: {
      en: "Bengali-language knowledge commons — a magazine, publishing press, and archive built as one growing platform.",
      bn: "বাংলা ভাষার নলেজ কমন্স — একটি ম্যাগাজিন, প্রকাশনা শাখা এবং আর্কাইভ, একটি ক্রমবর্ধমান প্ল্যাটফর্মে গড়ে তোলা।",
    },
    coverImage: "/work/parallel-01.png",
    href: "https://mediumaquamarine-raven-952166.hostingersite.com",
    icon: Library,
    tech: ["Next.js", "Hostinger"],
    // Outcome intentionally left unset — this is an ongoing, actively
    // developed project, not a shipped-and-done engagement with a
    // measurable result to report yet.
    challenge: {
      en: "Parallel is really three things in one — সমান্তর (magazine), Parallel Press (books), and অন্যপাতা (blogzine) — and all three needed to feel connected without turning into three separate websites to maintain. Built solo, which also meant turning feedback from non-technical editorial contributors into real design decisions, with no product team to sort through it first.",
      bn: "প্যারালাল আসলে একসাথে তিনটি জিনিস — সমান্তর (ম্যাগাজিন), প্যারালাল প্রেস (বই) এবং অন্যপাতা (ব্লগজিন) — এবং তিনটিকেই একে অপরের সাথে যুক্ত মনে হতে হতো, অথচ রক্ষণাবেক্ষণের জন্য তিনটি আলাদা ওয়েবসাইট হয়ে যাওয়া চলবে না। একা তৈরি করার কারণে অ-প্রযুক্তিগত সম্পাদকীয় সদস্যদের ফিডব্যাককে — কোনো প্রোডাক্ট টিম ছাড়াই — সরাসরি বাস্তব ডিজাইন সিদ্ধান্তে রূপান্তর করাও একটি চ্যালেঞ্জ ছিল।",
    },
    approach: {
      en: "Built সমান্তর, Parallel Press, and অন্যপাতা as three sections of one site instead of three separate sites — each with its own color and navigation, but sharing the same underlying build — so one person can keep maintaining all three as content keeps growing.",
      bn: "সমান্তর, প্যারালাল প্রেস এবং অন্যপাতা — তিনটি আলাদা সাইট না বানিয়ে একটি সাইটের তিনটি সেকশন হিসেবে তৈরি করা হয়েছে — প্রতিটির নিজস্ব রঙ ও নেভিগেশন থাকলেও একই মূল বিল্ড শেয়ার করে — যাতে কনটেন্ট বাড়তে থাকলেও একজন মানুষ তিনটিই রক্ষণাবেক্ষণ করতে পারে।",
    },
    highlights: [
      {
        en: "Three branded sections — সমান্তর (magazine), Parallel Press (books), অন্যপাতা (blogzine) — each with its own color and navigation, built as one connected site.",
        bn: "সমান্তর (ম্যাগাজিন), প্যারালাল প্রেস (বই), অন্যপাতা (ব্লগজিন) — তিনটি ব্র্যান্ডেড সেকশন, প্রতিটির নিজস্ব রঙ ও নেভিগেশন সহ, একটি সংযুক্ত সাইট হিসেবে তৈরি।",
      },
      {
        en: "পুরাতনী (Archive) — a searchable, filterable collection preserving the publication's older writing by type and era.",
        bn: "পুরাতনী (আর্কাইভ) — ধরন ও যুগ অনুযায়ী ফিল্টারযোগ্য একটি সার্চেবল সংগ্রহ, যা পত্রিকার পুরনো লেখা সংরক্ষণ করে।",
      },
      {
        en: "Built solo while also being an active member of Parallel itself, not an outside vendor — architecture and content decisions happen from inside the editorial team.",
        bn: "প্যারালালের একজন সক্রিয় সদস্য হিসেবে, বাইরের কোনো ভেন্ডর নয় — একাই তৈরি করা হয়েছে; আর্কিটেকচার ও কনটেন্ট সংক্রান্ত সিদ্ধান্ত সম্পাদকীয় দলের ভেতর থেকেই নেওয়া হয়।",
      },
      {
        en: "Still actively in development — sections, content, and the archive continue to grow as the platform matures.",
        bn: "এখনও সক্রিয়ভাবে নির্মাণাধীন — প্ল্যাটফর্ম পরিণত হওয়ার সাথে সাথে সেকশন, কনটেন্ট এবং আর্কাইভ ক্রমাগত বৃদ্ধি পাচ্ছে।",
      },
    ],
    gallery: [
      {
        src: "/work/parallel-02.png",
        caption: {
          en: "সমান্তর — the magazine section, with its own themed navigation and issue archive",
          bn: "সমান্তর — ম্যাগাজিন সেকশন, নিজস্ব থিমড নেভিগেশন ও সংখ্যা আর্কাইভ সহ",
        },
      },
      {
        src: "/work/parallel-03.png",
        caption: {
          en: "Parallel Press — the book publishing arm, with direct purchase links",
          bn: "প্যারালাল প্রেস — বই প্রকাশনা শাখা, সরাসরি কেনার লিংক সহ",
        },
      },
      {
        src: "/work/parallel-04.png",
        caption: {
          en: "পুরাতনী — the searchable archive of older published work",
          bn: "পুরাতনী — পুরনো প্রকাশিত লেখার সার্চযোগ্য আর্কাইভ",
        },
      },
      {
        src: "/work/parallel-05.png",
        caption: { en: "Mobile responsive view", bn: "মোবাইল রেসপন্সিভ ভিউ" },
        orientation: "portrait",
      },
    ],
  },
  {
    // QuantBridge is AuditPulse's parent/holding company — same client
    // relationship, same Semigon engagement, same "same story" build
    // process. Verified directly (page content + HTTP response headers:
    // `server: Vercel`, `x-powered-by: Next.js`, firebasestorage.
    // googleapis.com references) and via the site's own /company page
    // (founding story, founding year, team background). coverImage and
    // gallery are real screenshots (public/work/, 1600x1000 viewport for
    // desktop), not stock.
    slug: "quantbridge",
    name: { en: "QuantBridge", bn: "কোয়ান্টব্রিজ" },
    category: { en: "Parent Company", bn: "প্যারেন্ট কোম্পানি" },
    description: {
      en: "Governance. Risk. Compliance. Accelerated. — the corporate brand behind AuditPulse.",
      bn: "গভর্ন্যান্স। রিস্ক। কমপ্লায়েন্স। ত্বরান্বিত। — অডিটপালসের পেছনের কর্পোরেট ব্র্যান্ড।",
    },
    coverImage: "/work/quantbridge-01.png",
    href: "https://www.quantbridge.org",
    icon: Landmark,
    tech: ["Next.js", "Firebase", "Vercel"],
    // Same client, same brief-discovery process as AuditPulse (see that
    // entry) — the parent/holding brand rather than the product itself.
    // Outcome left unset for the same reason: no concrete number/quote
    // was given for this build specifically.
    challenge: {
      en: "QuantBridge's team hadn't settled on their own site structure going in either — the same open brief as AuditPulse, since both come from the same client relationship — so the actual content and page needs had to be discovered through the build itself.",
      bn: "কোয়ান্টব্রিজের টিমও শুরুতে নিজেদের সাইট স্ট্রাকচার ঠিক করেনি — অডিটপালসের মতোই একই ওপেন ব্রিফ, যেহেতু উভয়ই একই ক্লায়েন্ট সম্পর্ক থেকে আসে — তাই প্রকৃত কনটেন্ট ও পেজের প্রয়োজনীয়তা বিল্ডের মধ্য দিয়েই খুঁজে বের করতে হয়েছে।",
    },
    approach: {
      en: "Same process as AuditPulse — shipped 8–9 full design directions before the client could commit to one, then kept iterating through weekly (sometimes after-hours) feedback rounds until the site actually matched what they needed.",
      bn: "অডিটপালসের মতোই একই প্রক্রিয়া — ক্লায়েন্ট একটি দিক বেছে নেওয়ার আগে ৮-৯টি সম্পূর্ণ ডিজাইন কনসেপ্ট তৈরি করা হয়, এরপর সাপ্তাহিক (কখনো অফিস সময়ের বাইরেও) ফিডব্যাকের মাধ্যমে সাইটটি প্রকৃতপক্ষে তাদের প্রয়োজন অনুযায়ী না হওয়া পর্যন্ত কাজ চলতে থাকে।",
    },
    highlights: [
      {
        en: "QuantBridge is the parent company behind AuditPulse — the corporate/holding brand for the same client relationship, built through the same iterative process.",
        bn: "কোয়ান্টব্রিজ হলো অডিটপালসের প্যারেন্ট কোম্পানি — একই ক্লায়েন্ট সম্পর্কের কর্পোরেট/হোল্ডিং ব্র্যান্ড, একই পুনরাবৃত্তিমূলক প্রক্রিয়ায় তৈরি।",
      },
      {
        en: "A dedicated Company page carries the founding story and \"the problem we solve\" — founded in 2024 by a husband-and-wife duo with Big Four audit backgrounds.",
        bn: "একটি ডেডিকেটেড কোম্পানি পেজে ফাউন্ডিং স্টোরি ও \"যে সমস্যার সমাধান করি\" তৈরি করা হয়েছে — ২০২৪ সালে বিগ ফোর অডিট ব্যাকগ্রাউন্ডের এক স্বামী-স্ত্রী জুটি প্রতিষ্ঠা করেন।",
      },
      {
        en: "8–9 full design concepts shipped before the client could align on one final direction, same as AuditPulse.",
        bn: "অডিটপালসের মতোই ক্লায়েন্ট একটি চূড়ান্ত দিকে একমত হওয়ার আগে ৮-৯টি সম্পূর্ণ ডিজাইন কনসেপ্ট তৈরি করা হয়েছে।",
      },
      {
        en: "Delivered as the production site for a US-based compliance SaaS client, built while at Semigon Consultancy.",
        bn: "সেমিগন কনসালটেন্সিতে কাজ করার সময় একটি US-ভিত্তিক কমপ্লায়েন্স SaaS ক্লায়েন্টের প্রোডাকশন সাইট হিসেবে ডেলিভার করা হয়েছে।",
      },
    ],
    gallery: [
      {
        src: "/work/quantbridge-02.png",
        caption: {
          en: "Solutions page — four illustrated feature offerings",
          bn: "সলিউশনস পেজ — চারটি ইলাস্ট্রেটেড ফিচার অফারিং",
        },
      },
      {
        src: "/work/quantbridge-03.png",
        caption: {
          en: "The Company page — founding story and \"the problem we solve\"",
          bn: "কোম্পানি পেজ — ফাউন্ডিং স্টোরি এবং \"যে সমস্যার সমাধান করি\"",
        },
      },
      {
        src: "/work/quantbridge-04.png",
        caption: { en: "Mobile responsive view", bn: "মোবাইল রেসপন্সিভ ভিউ" },
        orientation: "portrait",
      },
    ],
  },
  {
    // Built for a friend — Dr. Nargis Khatun, a homoeopathy doctor — not
    // a Semigon client engagement. Verified directly (page content, HTTP
    // headers: wp-json links, `x-powered-by: PHP/8.2`, `platform:
    // hostinger`; the site's own footer credits "Design & developed by
    // Rafi Ahmed Laskar"). Currently live as WordPress — tech reflects
    // that, not the planned custom-coded rebuild, which is still just a
    // plan (see highlights below). coverImage/gallery are real
    // screenshots (public/work/, 1600x1000 viewport for desktop).
    slug: "euphoria-homoeo-care",
    name: { en: "Euphoria Homoeo Care", bn: "ইউফোরিয়া হোমিও কেয়ার" },
    category: { en: "Homoeopathy Clinic", bn: "হোমিওপ্যাথি ক্লিনিক" },
    description: {
      en: "Clinic site for a homoeopathy doctor — practice areas, a periodically updated blog, and appointment booking.",
      bn: "একজন হোমিওপ্যাথি চিকিৎসকের ক্লিনিক সাইট — প্র্যাকটিস এরিয়া, নিয়মিত আপডেট হওয়া ব্লগ এবং অ্যাপয়েন্টমেন্ট বুকিং।",
    },
    coverImage: "/work/euphoria-01.png",
    href: "https://euphoriahomoeocare.com",
    icon: Stethoscope,
    tech: ["WordPress", "PHP", "Hostinger"],
    // Outcome left unset — the booking-system and code-migration plans
    // below are roadmap items, not shipped results yet.
    challenge: {
      en: "The clinic's brand colors were two very similar shades — close enough to blur together on screen — so laying out a grid of practice-area and approach cards on top of them risked looking cluttered or repetitive instead of clean.",
      bn: "ক্লিনিকের ব্র্যান্ড রঙ ছিল দুটি খুব কাছাকাছি শেড — স্ক্রিনে একসাথে প্রায় মিলিয়ে যায় — ফলে তার উপর প্র্যাকটিস-এরিয়া ও অ্যাপ্রোচ কার্ডের একটি গ্রিড বসালে তা পরিষ্কার না দেখিয়ে এলোমেলো বা পুনরাবৃত্তিমূলক দেখানোর ঝুঁকি ছিল।",
    },
    approach: {
      en: "Gave each color its own section instead of mixing them in one row of cards, and kept every card down to one icon, one heading, and a short line of text — so the grid stayed easy to read even on a palette with little contrast to work with.",
      bn: "প্রতিটি রঙকে একই সারির কার্ডে না মিশিয়ে তার নিজস্ব সেকশনে রাখা হয়েছে, এবং প্রতিটি কার্ডকে একটি আইকন, একটি হেডিং ও ছোট এক লাইনের লেখায় সীমিত রাখা হয়েছে — যাতে কম কনট্রাস্টের প্যালেটেও গ্রিডটি সহজে পড়া যায়।",
    },
    highlights: [
      {
        en: "A grid of practice-area and approach cards laid out across the brand's two similar colors without the page looking cluttered.",
        bn: "ব্র্যান্ডের দুটি কাছাকাছি রঙ জুড়ে প্র্যাকটিস-এরিয়া ও অ্যাপ্রোচ কার্ডের একটি গ্রিড সাজানো হয়েছে, পেজটি এলোমেলো না দেখিয়েই।",
      },
      {
        en: "A periodically updated blog for real case studies, written and published directly by the doctor.",
        bn: "নিয়মিত আপডেট হওয়া একটি ব্লগ, যেখানে সরাসরি চিকিৎসক নিজে বাস্তব কেস স্টাডি লিখে প্রকাশ করেন।",
      },
      {
        en: "Currently a WordPress build, with a planned migration to a custom-coded site.",
        bn: "বর্তমানে ওয়ার্ডপ্রেসে তৈরি, ভবিষ্যতে একটি কাস্টম-কোডেড সাইটে মাইগ্রেশনের পরিকল্পনা রয়েছে।",
      },
      {
        en: "Roadmap includes a self-hosted appointment booking system with video consultations, replacing the current WhatsApp-based booking flow.",
        bn: "রোডম্যাপে রয়েছে একটি সেলফ-হোস্টেড অ্যাপয়েন্টমেন্ট বুকিং সিস্টেম, ভিডিও কনসালটেশনসহ — যা বর্তমান হোয়াটসঅ্যাপ-ভিত্তিক বুকিং ফ্লো প্রতিস্থাপন করবে।",
      },
    ],
    gallery: [
      {
        src: "/work/euphoria-03.png",
        caption: {
          en: "The homepage's card layout, working within the brand's two similar colors",
          bn: "হোমপেজের কার্ড লেআউট, ব্র্যান্ডের দুটি কাছাকাছি রঙের মধ্যে কাজ করে",
        },
      },
      {
        src: "/work/euphoria-02.png",
        caption: {
          en: "Practice Areas — a grid of the clinic's treatment focuses",
          bn: "প্র্যাকটিস এরিয়া — ক্লিনিকের চিকিৎসা ফোকাসগুলোর একটি গ্রিড",
        },
      },
      {
        src: "/work/euphoria-04.png",
        caption: {
          en: "The blog — periodically updated with real case studies",
          bn: "ব্লগ — নিয়মিত বাস্তব কেস স্টাডি দিয়ে আপডেট করা হয়",
        },
      },
      {
        src: "/work/euphoria-05.png",
        caption: { en: "Mobile responsive view", bn: "মোবাইল রেসপন্সিভ ভিউ" },
        orientation: "portrait",
      },
    ],
  },
  {
    // A friend/community project, not a Semigon client engagement.
    // Verified directly (page content, HTTP headers: wp-json links,
    // `x-powered-by: PHP/8.2`, `platform: hostinger`; the site's own
    // footer credits "Designed & Developed by Rafi Ahmed laskar").
    // coverImage/gallery are real screenshots (public/work/, 1600x1000
    // viewport for desktop).
    slug: "gurukul-music-academy",
    name: { en: "Gurukul Music Academy", bn: "গুরুকুল মিউজিক একাডেমি" },
    category: { en: "Music Academy", bn: "মিউজিক একাডেমি" },
    description: {
      en: "Site for an Indian classical music academy — categorized event galleries, faculty, and courses.",
      bn: "একটি ভারতীয় শাস্ত্রীয় সংগীত একাডেমির সাইট — ক্যাটাগরিভিত্তিক ইভেন্ট গ্যালারি, ফ্যাকাল্টি এবং কোর্স সহ।",
    },
    coverImage: "/work/gurukul-01.png",
    href: "https://gurukulmusicacademy.com",
    icon: Music,
    tech: ["WordPress", "PHP", "Hostinger"],
    // Outcome left unset — no concrete number/quote was given for this
    // one either.
    challenge: {
      en: "Two unrelated challenges compounded: the academy had a large, ongoing volume of event photos and videos that needed real categorization — not one long dump — without tanking page performance. Separately, the brand's visual identity leaned naturally toward a dark aesthetic while the site itself had to be built on a white, light-mode base, so carrying that identity through meant it couldn't just become a generic light site either.",
      bn: "দুটি ভিন্ন চ্যালেঞ্জ একসাথে ছিল — একাডেমির প্রচুর পরিমাণে চলমান ইভেন্ট ছবি ও ভিডিও প্রকৃত ক্যাটাগরিতে ভাগ করতে হতো, একটানা এক ডাম্প নয়, পারফরম্যান্স নষ্ট না করে। আলাদাভাবে, ব্র্যান্ডের ভিজ্যুয়াল আইডেন্টিটি স্বাভাবিকভাবেই ডার্ক এস্থেটিকের দিকে ঝুঁকে ছিল, অথচ সাইটটি সাদা, লাইট-মোড ভিত্তির উপর তৈরি করতে হয়েছে — তাই সেই আইডেন্টিটি ধরে রাখতে গিয়ে সাইটটি নিছক একটি জেনেরিক লাইট সাইটেও পরিণত হতে পারত না।",
    },
    approach: {
      en: "Split the gallery into named categories — Baithaki Program, Guru Purnima, National Achievement, and more — with lazy-loaded, filterable grids instead of one continuous scroll, and reused the brand's dark tones deliberately in a handful of full-width band sections against the white base — enough to carry the identity through without turning the whole site dark.",
      bn: "গ্যালারিকে নামযুক্ত ক্যাটাগরিতে ভাগ করা হয়েছে — Baithaki Program, Guru Purnima, National Achievement এবং আরও — একটানা স্ক্রলের বদলে লেজি-লোডেড, ফিল্টারযোগ্য গ্রিড দিয়ে, এবং ব্র্যান্ডের ডার্ক টোনগুলো সাদা বেসের উপর কয়েকটি ফুল-উইড্থ ব্যান্ড সেকশনে ইচ্ছাকৃতভাবে পুনরায় ব্যবহার করা হয়েছে — যথেষ্ট পরিমাণে, যাতে সম্পূর্ণ সাইট ডার্ক না হয়েও আইডেন্টিটি বজায় থাকে।",
    },
    highlights: [
      {
        en: "A categorized, filterable event gallery — Baithaki Program, Guru Purnima, National Achievement, and more — instead of one long undifferentiated photo dump.",
        bn: "একটি ক্যাটাগরাইজড, ফিল্টারযোগ্য ইভেন্ট গ্যালারি — Baithaki Program, Guru Purnima, National Achievement এবং আরও — একটানা এক দীর্ঘ, অবিভক্ত ছবির ডাম্পের বদলে।",
      },
      {
        en: "A full faculty directory with real photos for all instructors, alongside course and event pages.",
        bn: "সমস্ত ইন্সট্রাক্টরের বাস্তব ছবিসহ একটি সম্পূর্ণ ফ্যাকাল্টি ডিরেক্টরি, কোর্স ও ইভেন্ট পেজের পাশাপাশি।",
      },
      {
        en: "The brand's dark visual identity carried through deliberately placed full-width band sections against an otherwise white, light-mode base.",
        bn: "ব্র্যান্ডের ডার্ক ভিজ্যুয়াল আইডেন্টিটি ইচ্ছাকৃতভাবে স্থাপিত ফুল-উইড্থ ব্যান্ড সেকশনের মাধ্যমে ধরে রাখা হয়েছে, অন্যথায় সাদা, লাইট-মোড বেসের উপর।",
      },
    ],
    gallery: [
      {
        src: "/work/gurukul-03.png",
        caption: {
          en: "The categorized event gallery — Baithaki Program, Guru Purnima, National Achievement, and more, each its own filtered grid",
          bn: "ক্যাটাগরাইজড ইভেন্ট গ্যালারি — Baithaki Program, Guru Purnima, National Achievement এবং আরও, প্রতিটির নিজস্ব ফিল্টার্ড গ্রিড",
        },
      },
      {
        src: "/work/gurukul-02.png",
        caption: {
          en: "Faculty — real photos for the academy's instructors",
          bn: "ফ্যাকাল্টি — একাডেমির ইন্সট্রাক্টরদের বাস্তব ছবি",
        },
      },
      {
        src: "/work/gurukul-04.png",
        caption: { en: "Mobile responsive view", bn: "মোবাইল রেসপন্সিভ ভিউ" },
        orientation: "portrait",
      },
    ],
  },
];

// Two more real projects are still in the pipeline (see ClientWork.tsx's
// COMING_SOON_COUNT) — rendered as explicit "coming soon" tiles rather
// than staying as stock-photo/generic-name placeholder entries here.
// AGENTS.md's placeholder-honesty rule cuts the other way once real
// entries exist alongside them: a still-generic "Client Project 06" card
// sitting next to five verified real ones reads as a fabricated project,
// not an honest placeholder. Add the real entry (matching the pattern
// above) and drop COMING_SOON_COUNT by one as each one is ready.
