import type { Localized } from '@/types';

// UI-chrome copy hardcoded in components (button labels, section
// eyebrows/titles, terminal prompts, form labels) — as opposed to
// per-entity content, which lives in src/lib/data/*.ts. Same reasoning
// as before this file existed: this is the section's own fixed
// vocabulary, not data about a specific project/job/skill, so it stays
// out of the data/ directory. Consumed the same way as data fields, via
// t(strings.foo.bar, language).
export const strings = {
  clientWork: {
    eyebrow: { en: 'Client Work', bn: 'ক্লায়েন্ট কাজ' } satisfies Localized,
    title: {
      en: "Work I've Delivered",
      bn: 'যে কাজ ডেলিভার করেছি',
    } satisfies Localized,
    intro: {
      en: 'A sample from 150+ client sites delivered across industries — the actual, shipped, paid-for work.',
      bn: 'বিভিন্ন ইন্ডাস্ট্রি জুড়ে ডেলিভার করা 150+ ক্লায়েন্ট সাইট থেকে একটি নমুনা — প্রকৃত, শিপড, পেইড কাজ।',
    } satisfies Localized,
    preview: { en: 'preview', bn: 'প্রিভিউ' } satisfies Localized,
    backToWork: { en: 'Back to Work', bn: 'কাজে ফিরে যান' } satisfies Localized,
    visitSite: { en: 'Visit Site', bn: 'সাইট দেখুন' } satisfies Localized,
    challenge: { en: 'The Challenge', bn: 'চ্যালেঞ্জ' } satisfies Localized,
    whatShipped: {
      en: 'What Shipped',
      bn: 'যা ডেলিভার হয়েছে',
    } satisfies Localized,
    outcome: { en: 'Outcome', bn: 'ফলাফল' } satisfies Localized,
    gallery: { en: 'Gallery', bn: 'গ্যালারি' } satisfies Localized,
    comingSoon: { en: 'Coming Soon', bn: 'শীঘ্রই আসছে' } satisfies Localized,
    comingSoonBody: {
      en: 'Two more real projects are being written up.',
      bn: 'আরও দুটি বাস্তব প্রজেক্ট লেখা হচ্ছে।',
    } satisfies Localized,
  },
  workFiller: {
    heading: {
      en: 'Open to new projects.',
      bn: 'নতুন প্রজেক্টের জন্য উন্মুক্ত।',
    } satisfies Localized,
    cta: { en: 'Get in touch', bn: 'যোগাযোগ করুন' } satisfies Localized,
  },
  services: {
    eyebrow: {
      en: 'Additional Services',
      bn: 'অতিরিক্ত সার্ভিস',
    } satisfies Localized,
    title: {
      en: 'Beyond Development',
      bn: 'ডেভেলপমেন্টের বাইরেও',
    } satisfies Localized,
    intro: {
      en: 'Design and creative work alongside engineering, for clients who need more than just code.',
      bn: 'ইঞ্জিনিয়ারিংয়ের পাশাপাশি ডিজাইন ও ক্রিয়েটিভ কাজ — যে ক্লায়েন্টদের শুধু কোডের বেশি কিছু দরকার, তাদের জন্য।',
    } satisfies Localized,
    canvasLabel: {
      en: 'moodboard — services',
      bn: 'মুডবোর্ড — সার্ভিস',
    } satisfies Localized,
  },
  projects: {
    eyebrow: {
      en: 'Independent Projects',
      bn: 'স্বাধীন প্রজেক্ট',
    } satisfies Localized,
    title: { en: "What I've Built", bn: 'যা তৈরি করেছি' } satisfies Localized,
    intro: {
      en: 'A short list on purpose — every entry gets its full architecture discussion instead of padding the count.',
      bn: 'ইচ্ছাকৃতভাবে ছোট একটি তালিকা — সংখ্যা বাড়ানোর বদলে প্রতিটি এন্ট্রি তার সম্পূর্ণ আর্কিটেকচার আলোচনা পায়।',
    } satisfies Localized,
    liveDemo: { en: 'Live Demo', bn: 'লাইভ ডেমো' } satisfies Localized,
    github: { en: 'GitHub', bn: 'গিটহাব' } satisfies Localized,
    privateRepo: {
      en: 'Private Repo',
      bn: 'প্রাইভেট রেপো',
    } satisfies Localized,
    theApproach: { en: 'The Approach', bn: 'পদ্ধতি' } satisfies Localized,
    mechanism: { en: 'Mechanism', bn: 'মেকানিজম' } satisfies Localized,
    stack: { en: 'Stack', bn: 'স্ট্যাক' } satisfies Localized,
  },
  sideProjects: {
    eyebrow: { en: 'Small Builds', bn: 'ছোট প্রজেক্ট' } satisfies Localized,
    title: { en: 'Fun Tools', bn: 'মজার টুল' } satisfies Localized,
    intro: {
      en: 'Small utilities built for fun — no case study, just things that work.',
      bn: 'মজার জন্য তৈরি ছোট ছোট টুল — কোনো কেস স্টাডি নয়, শুধু কাজের জিনিস।',
    } satisfies Localized,
    tryIt: { en: 'Try It', bn: 'ব্যবহার করুন' } satisfies Localized,
  },
  skills: {
    eyebrow: { en: 'Capabilities', bn: 'দক্ষতা' } satisfies Localized,
    // Section h2, not the Navbar link (nav.ts keeps its own short "Stack"
    // label — a 3-word nav item would look out of place next to WORK/
    // EXPERIENCE/CONTACT). "Tech I Use" is plainer for a non-technical
    // visitor without losing anything a technical one needs.
    title: { en: 'Tech I Use', bn: 'যে টেক ব্যবহার করি' } satisfies Localized,
    intro: {
      en: 'Four+ years across three roles — from early WordPress builds to the production SaaS above.',
      bn: 'তিনটি ভূমিকায় চার+ বছর — শুরুর দিকের WordPress বিল্ড থেকে উপরের প্রোডাকশন SaaS পর্যন্ত।',
    } satisfies Localized,
    boldNote: {
      en: 'marks what recurs in that real work, in Projects and Experience — not a self-rated list.',
      bn: 'মানে সেটা প্রজেক্ট ও অভিজ্ঞতার বাস্তব কাজে বারবার এসেছে — এটা নিজে-রেট-করা তালিকা নয়।',
    } satisfies Localized,
    boldWord: { en: 'Bold', bn: 'বোল্ড' } satisfies Localized,
    terminalTitle: {
      en: 'rafi@portfolio — zsh',
      bn: 'রাফি@পোর্টফোলিও — zsh',
    } satisfies Localized,
    // "rafi" stays Latin (a proper noun/brand name, same as tech names
    // elsewhere) — only the flag transliterates, matching the group
    // flags right below it and the section's own title ("স্ট্যাক").
    prompt: { en: 'rafi --stack', bn: 'rafi --স্ট্যাক' } satisfies Localized,
    // Command *names* (what you actually type) are scoped to the active
    // language — see COMMAND_NAMES in Skills.tsx — unlike the "rafi" in
    // the prompt above, which never translates at all. The difference:
    // that prompt is fixed decoration nobody types, this is real user
    // input, and a Bengali-mode visitor should only ever see and type
    // the Bengali command names, an English-mode one only the English
    // ones — never both mixed in the same output.
    terminalInputLabel: { en: 'Terminal input', bn: 'টার্মিনাল ইনপুট' } satisfies Localized,
    // Just the lead-in word — Skills.tsx's buildHelpList appends the
    // actual (language-scoped) command list after it, so the two can
    // never drift out of sync with what's really accepted.
    terminalHelp: { en: 'available:', bn: 'উপলব্ধ:' } satisfies Localized,
    terminalWhoami: {
      en: 'Full Stack Developer (4+ yrs) — Next.js, TypeScript, production systems. Open to new work — see Contact below.',
      bn: 'ফুল স্ট্যাক ডেভেলপার (৪+ বছর) — Next.js, TypeScript, প্রোডাকশন সিস্টেম। নতুন কাজের জন্য উন্মুক্ত — নিচের Contact দেখুন।',
    } satisfies Localized,
    terminalNotFound: {
      en: 'command not found',
      bn: 'কমান্ড পাওয়া যায়নি',
    } satisfies Localized,
    // {count} is replaced with a real, live count (clientProjects.length)
    // in Skills.tsx, never hardcoded here — it can't drift out of sync
    // with the actual Work section as entries are added.
    terminalWorkCount: {
      en: '{count} real client projects — see Work above.',
      bn: '{count}টি বাস্তব ক্লায়েন্ট প্রজেক্ট — উপরে Work দেখুন।',
    } satisfies Localized,
    terminalPrivate: { en: 'private', bn: 'প্রাইভেট' } satisfies Localized,
  },
  experience: {
    eyebrow: { en: 'Track Record', bn: 'ট্র্যাক রেকর্ড' } satisfies Localized,
    title: { en: 'Experience', bn: 'অভিজ্ঞতা' } satisfies Localized,
    education: { en: 'Education', bn: 'শিক্ষা' } satisfies Localized,
    year: { en: 'yr', bn: 'বছর' } satisfies Localized,
    years: { en: 'yrs', bn: 'বছর' } satisfies Localized,
    month: { en: 'mo', bn: 'মাস' } satisfies Localized,
    months: { en: 'mos', bn: 'মাস' } satisfies Localized,
    present: { en: 'Present', bn: 'বর্তমান' } satisfies Localized,
  },
  howIBuild: {
    eyebrow: { en: 'Philosophy', bn: 'দর্শন' } satisfies Localized,
    title: { en: 'How I Build', bn: 'যেভাবে আমি তৈরি করি' } satisfies Localized,
    intro: {
      en: 'A few things that stay true no matter what the project is.',
      bn: 'প্রজেক্ট যাই হোক না কেন, কিছু জিনিস সবসময় সত্য থাকে।',
    } satisfies Localized,
    ctaHeading: {
      en: 'Open to new projects.',
      bn: 'নতুন প্রজেক্টের জন্য উন্মুক্ত।',
    } satisfies Localized,
    cta: { en: 'Get in touch', bn: 'যোগাযোগ করুন' } satisfies Localized,
  },
  contact: {
    eyebrow: { en: 'Get in Touch', bn: 'যোগাযোগ করুন' } satisfies Localized,
    title: { en: 'Contact', bn: 'যোগাযোগ' } satisfies Localized,
    // No trailing "."/"।" — Contact.tsx appends three animated dots after
    // this instead of a static full stop, so the punctuation itself isn't
    // baked into the translated string.
    headline: {
      en: "Let's build something that scales",
      bn: 'এমন কিছু বানানো যাক যা স্কেল করে',
    } satisfies Localized,
    profiles: { en: 'Profiles', bn: 'প্রোফাইল' } satisfies Localized,
    copyEmail: {
      en: 'Copy email address',
      bn: 'ইমেইল ঠিকানা কপি করুন',
    } satisfies Localized,
    copied: { en: 'Copied', bn: 'কপি হয়েছে' } satisfies Localized,
    saveContact: { en: 'Save Contact', bn: 'কন্টাক্ট সেভ করুন' } satisfies Localized,
  },
  contactForm: {
    name: { en: 'Name', bn: 'নাম' } satisfies Localized,
    email: { en: 'Email', bn: 'ইমেইল' } satisfies Localized,
    message: { en: 'Message', bn: 'বার্তা' } satisfies Localized,
    sending: { en: 'Sending…', bn: 'পাঠানো হচ্ছে…' } satisfies Localized,
    send: { en: 'Send Message', bn: 'বার্তা পাঠান' } satisfies Localized,
    sentTitle: {
      en: 'Message sent.',
      bn: 'বার্তা পাঠানো হয়েছে।',
    } satisfies Localized,
    sentBody: {
      en: "Thanks for reaching out — I'll get back to you soon.",
      bn: 'যোগাযোগ করার জন্য ধন্যবাদ — শীঘ্রই উত্তর দেব।',
    } satisfies Localized,
  },
  hero: {
    viewWork: { en: 'View My Work', bn: 'আমার কাজ দেখুন' } satisfies Localized,
    getInTouch: { en: 'Get in Touch', bn: 'যোগাযোগ করুন' } satisfies Localized,
    scroll: { en: 'Scroll', bn: 'স্ক্রল' } satisfies Localized,
    scrollToWork: {
      en: 'Scroll to work',
      bn: 'কাজে স্ক্রল করুন',
    } satisfies Localized,
    // City name only (not "Kolkata, India" — contact.ts's fuller form is
    // right for a contact-details row, too long for a compact time badge
    // next to the status pill).
    kolkata: { en: 'Kolkata', bn: 'কলকাতা' } satisfies Localized,
  },
  footer: {
    backToTop: { en: 'Back to top', bn: 'উপরে ফিরে যান' } satisfies Localized,
  },
  floatingActions: {
    whatsapp: { en: 'Message on WhatsApp', bn: 'হোয়াটসঅ্যাপে বার্তা পাঠান' } satisfies Localized,
  },
  // Phonetic transliteration, not translation — spells the same brand/
  // tech name in Bengali script by sound (the way Bengali tech writing
  // normally handles a foreign product name) rather than keeping it in
  // Latin or inventing a Bengali equivalent meaning. Consumed by
  // BrowserChrome (ClientWork.tsx) and TechChip.tsx, so this covers
  // every value that appears in any tech[] array across projects.ts,
  // clientWork.ts, and experience.ts — same spelling already used for
  // the matching entries in skills.ts, kept in sync with those rather
  // than invented separately. Unlisted names fall back to their own
  // spelling (see the `?? label`/`?? tech` call sites) so a new
  // project's data never silently renders blank.
  techSounds: {
    'Next.js': 'নেক্সট.জেএস',
    WordPress: 'ওয়ার্ডপ্রেস',
    TypeScript: 'টাইপস্ক্রিপ্ট',
    JavaScript: 'জাভাস্ক্রিপ্ট',
    Prisma: 'প্রিজমা',
    PostgreSQL: 'পোস্টগ্রেএসকিউএল',
    MongoDB: 'মঙ্গোডিবি',
    Tailwind: 'টেইলউইন্ড',
    'Tailwind CSS': 'টেইলউইন্ড সিএসএস',
    'Neon Auth': 'নিয়ন অথ',
    React: 'রিয়েক্ট',
    'React.js': 'রিয়েক্ট.জেএস',
    Firebase: 'ফায়ারবেস',
    TipTap: 'টিপট্যাপ',
    Shopify: 'শপিফাই',
    Stripe: 'স্ট্রাইপ',
    'Framer Motion': 'ফ্রেমার মোশন',
    ACF: 'এসিএফ',
    MySQL: 'মাইএসকিউএল',
    Vercel: 'ভার্সেল',
    'Sanity CMS': 'স্যানিটি সিএমএস',
    Mapbox: 'ম্যাপবক্স',
    HTML: 'এইচটিএমএল',
    CSS: 'সিএসএস',
    Hostinger: 'হোস্টিংগার',
    PHP: 'পিএইচপি',
    'Coming Soon': 'শীঘ্রই আসছে',
  } as Record<string, string>,
  nav: {
    openMenu: { en: 'Open menu', bn: 'মেনু খুলুন' } satisfies Localized,
    closeMenu: { en: 'Close menu', bn: 'মেনু বন্ধ করুন' } satisfies Localized,
    switchToDark: {
      en: 'Switch to dark mode',
      bn: 'ডার্ক মোডে যান',
    } satisfies Localized,
    switchToLight: {
      en: 'Switch to light mode',
      bn: 'লাইট মোডে যান',
    } satisfies Localized,
    switchToBengali: {
      en: 'Switch to Bengali',
      bn: 'ইংরেজিতে যান',
    } satisfies Localized,
  },
  commandPalette: {
    openLabel: {
      en: 'Open command palette',
      bn: 'কমান্ড প্যালেট খুলুন',
    } satisfies Localized,
    placeholder: {
      en: 'Jump to a section…',
      bn: 'একটি সেকশনে যান…',
    } satisfies Localized,
    noResults: { en: 'No matches', bn: 'কোনো ফলাফল নেই' } satisfies Localized,
    // Typing this exact string is the one query that isn't really a
    // search — a dev-humor easter egg for the same audience segment the
    // console log rewards, just found through the palette instead of
    // devtools. Checked case-insensitively against the raw query in
    // CommandPalette.tsx, not treated as a real command with a real id.
    sudoQuery: 'sudo',
    sudoJoke: {
      en: 'Permission denied. This incident will be reported to nobody.',
      bn: 'অনুমতি নেই। এই ঘটনার রিপোর্ট কাউকে করা হবে না।',
    } satisfies Localized,
    hint: {
      en: 'navigate · select · close · ? for shortcuts',
      bn: 'নেভিগেট · নির্বাচন · বন্ধ · শর্টকাটের জন্য ?',
    } satisfies Localized,
  },
  shortcuts: {
    title: { en: 'Keyboard Shortcuts', bn: 'কীবোর্ড শর্টকাট' } satisfies Localized,
    home: { en: 'Home', bn: 'হোম' } satisfies Localized,
    openPalette: {
      en: 'Open command palette',
      bn: 'কমান্ড প্যালেট খুলুন',
    } satisfies Localized,
    openThis: { en: 'Show this menu', bn: 'এই মেনু দেখান' } satisfies Localized,
  },
  skipToContent: { en: 'Skip to content', bn: 'কনটেন্টে যান' } satisfies Localized,
  tabAttention: {
    comeBack: { en: 'Come back! 👋', bn: 'ফিরে আসুন! 👋' } satisfies Localized,
  },
  notFound: {
    heading: { en: 'Page not found', bn: 'পেজ পাওয়া যায়নি' } satisfies Localized,
    body: {
      en: "This page doesn't exist — might've been moved, or never existed in the first place.",
      bn: 'এই পেজটি নেই — সরিয়ে ফেলা হয়েছে, অথবা কখনোই ছিল না।',
    } satisfies Localized,
    cta: { en: 'Back to Home', bn: 'হোমে ফিরে যান' } satisfies Localized,
  },
  underConstruction: {
    heading: { en: 'Under Construction', bn: 'নির্মাণাধীন' } satisfies Localized,
    body: {
      en: "This isn't live yet — check back soon, or head back to what's already shipped.",
      bn: 'এটি এখনও লাইভ নয় — শীঘ্রই আবার দেখুন, অথবা যা ইতিমধ্যে ডেলিভার হয়েছে সেখানে ফিরে যান।',
    } satisfies Localized,
  },
  // The giant faint "// TAG" watermark each Section renders top-right
  // (Section.tsx) — previously a plain string, deliberately left
  // untranslated on the theory that it's a fixed code-comment stamp like
  // a tech name. That reasoning didn't hold up: unlike an actual tech
  // name, this is prose-adjacent section identity, not a proper noun,
  // and a Bengali-mode visitor seeing English watermarks on an otherwise
  // fully-Bengali page read as a real gap, not a deliberate accent.
  // Reuses the same Bengali word other strings already settled on for
  // the same concept where one exists (WORK/STACK/CONTACT match nav.ts's
  // own translations; APPROACH matches projects.theApproach's "পদ্ধতি")
  // rather than inventing a second translation for the same idea.
  sectionTags: {
    work: { en: 'WORK', bn: 'কাজ' } satisfies Localized,
    stack: { en: 'STACK', bn: 'স্ট্যাক' } satisfies Localized,
    exp: { en: 'EXP', bn: 'অভিজ্ঞতা' } satisfies Localized,
    services: { en: 'SERVICES', bn: 'সার্ভিস' } satisfies Localized,
    builds: { en: 'BUILDS', bn: 'টুলস' } satisfies Localized,
    built: { en: 'BUILT', bn: 'তৈরি' } satisfies Localized,
    approach: { en: 'APPROACH', bn: 'পদ্ধতি' } satisfies Localized,
    contact: { en: 'CONTACT', bn: 'যোগাযোগ' } satisfies Localized,
  },
};
