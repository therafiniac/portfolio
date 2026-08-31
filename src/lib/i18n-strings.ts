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
  writing: {
    eyebrow: { en: 'Writing', bn: 'লেখালেখি' } satisfies Localized,
    title: { en: 'Also Written', bn: 'যা লিখেছি' } satisfies Localized,
    intro: {
      en: "A few explainer posts, written elsewhere for now — new ones land here directly as they're written.",
      bn: 'আপাতত অন্য জায়গায় লেখা কিছু ব্যাখ্যামূলক পোস্ট — নতুন লেখাগুলো এখন থেকে সরাসরি এখানেই যোগ হবে।',
    } satisfies Localized,
    prev: { en: 'Scroll to previous post', bn: 'আগের পোস্টে যান' } satisfies Localized,
    next: { en: 'Scroll to next post', bn: 'পরের পোস্টে যান' } satisfies Localized,
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
    // "ping" is a real, documented command (COMMAND_NAMES), unlike
    // reboot/matrix/debug — the joke is just in what it prints back.
    terminalPing: { en: 'pong. (that’s the whole command.)', bn: 'pong। (পুরো কমান্ডটাই এটা।)' } satisfies Localized,
    // Output for the two hidden commands that aren't in COMMAND_NAMES/
    // buildHelpList (see HIDDEN_COMMANDS in Skills.tsx) — same "sudo"
    // exception as COMMAND_NAMES above: fixed English references, not a
    // translatable concept, so bn repeats en rather than transliterating.
    terminalMatrix: { en: 'there is no spoon.', bn: 'there is no spoon.' } satisfies Localized,
    terminalDebug: { en: 'debug overlay: toggled.', bn: 'debug overlay: toggled.' } satisfies Localized,
    // A fourth hidden command (see HIDDEN_COMMANDS in Skills.tsx) — the
    // one AGENTS.md's "out of scope: About panel" rule doesn't cover,
    // since it's a discovery, not a persistent section. Real, localized
    // prose (not a fixed technical reference like the three above), so it
    // does translate — and built entirely from facts already stated
    // elsewhere on this site (Kolkata, full stack + design, 4+ years,
    // Contact), never a new claim invented just for this line.
    terminalAbout: {
      en: 'full stack dev + designer, based in Kolkata, 4+ years in. still figuring out the rest — see Contact if you want to talk.',
      bn: 'ফুল স্ট্যাক ডেভেলপার + ডিজাইনার, কলকাতা থেকে, ৪+ বছরের অভিজ্ঞতা। বাকিটা এখনও বোঝার চেষ্টা করছি — কথা বলতে চাইলে Contact দেখুন।',
    } satisfies Localized,
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
    // Shown once, briefly, if the message field's value ever contains
    // the literal phrase "sudo hire me" (checked in English regardless of
    // active site language — the phrase itself is a fixed callback to the
    // command palette's own sudoJoke, not something meant to be typed in
    // Bengali). A real reply to that joke's "permission denied," not a
    // new one — see sudoJoke above.
    sudoEasterEgg: {
      en: 'permission granted, for once.',
      bn: 'অনুমতি মঞ্জুর হলো, এবারের মতো।',
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
  lightbox: {
    close: { en: 'Close', bn: 'বন্ধ করুন' } satisfies Localized,
    previousImage: { en: 'Previous image', bn: 'আগের ছবি' } satisfies Localized,
    nextImage: { en: 'Next image', bn: 'পরের ছবি' } satisfies Localized,
  },
  commandPalette: {
    openLabel: {
      en: 'Open command palette',
      bn: 'কমান্ড প্যালেট খুলুন',
    } satisfies Localized,
    // "Jump to a section…" undersold it once search actually covered
    // projects/skills/experience/side-projects/services too, not just
    // the 7 section anchors.
    placeholder: {
      en: 'Search anything…',
      bn: 'যেকোনো কিছু খুঁজুন…',
    } satisfies Localized,
    clearLabel: { en: 'Clear search', bn: 'সার্চ মুছুন' } satisfies Localized,
    noResults: { en: 'No matches', bn: 'কোনো ফলাফল নেই' } satisfies Localized,
    // Shown instead of noResults once there's an actual query with zero
    // curated section matches — Enter at that point falls back to
    // window.find() (see CommandPalette.tsx), so this tells the visitor
    // that typing something specific and hitting Enter still does
    // something instead of reading as a dead end.
    findOnPage: {
      en: 'Press Enter to find it on this page',
      bn: 'এই পাতায় খুঁজতে Enter চাপুন',
    } satisfies Localized,
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
    // A second line shown only under the sudo joke — for whoever already
    // found one hidden layer, a dry nudge that there are others (the
    // console log, the Konami code, "g" then a letter) without spelling
    // any of them out. A pointer to a trail, not a spoiler.
    sudoHint: {
      en: "this isn't the only one, if you keep looking.",
      bn: 'খুঁজতে থাকলে আরও পাবেন।',
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
    // Shown as a small, non-blocking toast (not a modal — nothing here
    // needs confirming) if this tab was hidden long enough that "you
    // stepped away" is a safe guess, not "you alt-tabbed for two
    // seconds." A gesture no other hidden layer on this site has: every
    // other one rewards clicking/typing/scrolling *at* the page, this
    // one rewards leaving it alone.
    welcomeBack: {
      en: 'welcome back. the page waited.',
      bn: 'ফিরে আসার জন্য স্বাগতম। পাতাটা অপেক্ষা করছিল।',
    } satisfies Localized,
  },
  // Shown by RapidToggleWarning.tsx once LanguageToggle sees enough
  // clicks in quick succession — that button already does its real job
  // on every single click (language actually flips each time), this is
  // purely a banner layered on top, never blocking or altering that.
  // Styled to look like a real system alert; the words are the joke, not
  // the presentation — classic dry-alarm humor, same voice as the
  // command palette's own sudoJoke.
  rapidToggle: {
    headline: {
      en: '🚨 mental alert',
      bn: '🚨 মানসিক অ্যালার্ট',
    } satisfies Localized,
    subline: {
      en: 'five clicks on a button in one second. blink twice if you need help.',
      bn: 'এক সেকেন্ডে একটা বাটনে পাঁচবার ক্লিক। সাহায্য লাগলে দুবার চোখ টিপুন।',
    } satisfies Localized,
    // A second, smaller line under subline — the aside that lands the
    // joke the user asked for ("should I come slap you") without saying
    // it that literally.
    tertiary: {
      en: "we'd come slap some sense into you, but there's an ocean in the way. so — breathe.",
      bn: 'গিয়ে একটু বুদ্ধি ফেরানোর চেষ্টা করতাম, কিন্তু মাঝে একটা সমুদ্র পড়ে আছে। যাই হোক — শ্বাস নিন।',
    } satisfies Localized,
  },
  // Picked at random by ContextMenu.tsx's "surprise me" row (see
  // SurpriseFact.tsx). Considered a real joke API for this instead of a
  // local pool — rejected: this site's CSP sets connect-src 'self'
  // (middleware.ts), a deliberate lockdown that a third-party fetch would
  // have to punch a hole in, plus generic external jokes wouldn't share
  // this site's own dry, specific voice, and would depend on a service
  // this repo doesn't control ever staying up. Every line here is a real,
  // true fact about this actual site's own build, same "no fabricated
  // claim" rule as everything else on it — the joke is the delivery, not
  // an invented statistic.
  // Rewritten toward broad, non-technical fun rather than implementation
  // trivia — most visitors right-clicking around a portfolio aren't
  // developers, and the first pass leaned hard on code-internals jokes
  // (view-transition workarounds, px/ms² units) that only landed for the
  // narrow slice of people who'd already read this source. A couple of
  // plain-language "try this" nudges toward other hidden layers stay, on
  // the theory that a nudge in the surprise pool is still a discovery,
  // not a spoiler — it just doesn't explain *how* anything works.
  // ContextMenu.tsx's own rows — "rafi@portfolio" transliterates fully
  // (রাফি@পোর্টফোলিও), same choice Skills.tsx's terminalTitle already
  // made for the same kind of header/chrome label; contrast with the
  // typed --stack prompt just above it, which keeps "rafi" in Latin
  // since that one is real user-facing command syntax, not prose.
  contextMenu: {
    header: { en: 'rafi@portfolio', bn: 'রাফি@পোর্টফোলিও' } satisfies Localized,
    sayHi: { en: 'say hi', bn: 'হাই বলুন' } satisfies Localized,
    copyEmail: { en: 'copy email', bn: 'ইমেইল কপি করুন' } satisfies Localized,
    copiedLabel: { en: 'copied.', bn: 'কপি হয়েছে।' } satisfies Localized,
    copyLink: { en: 'copy page link', bn: 'পেজ লিংক কপি করুন' } satisfies Localized,
    backToTop: { en: 'back to top', bn: 'উপরে ফিরে যান' } satisfies Localized,
    toggleTheme: { en: 'toggle theme', bn: 'থিম পাল্টান' } satisfies Localized,
    toggleLanguage: { en: 'toggle language', bn: 'ভাষা পাল্টান' } satisfies Localized,
    shortcuts: { en: 'keyboard shortcuts', bn: 'কীবোর্ড শর্টকাট' } satisfies Localized,
    surpriseMe: { en: 'surprise me', bn: 'চমকে দিন' } satisfies Localized,
  },
  surprise: {
    facts: [
      {
        en: 'you have impeccable taste in clicking random things on a stranger\'s website.',
        bn: 'অচেনা একটা ওয়েবসাইটে এলোমেলো জিনিসে ক্লিক করার আপনার রুচি প্রশংসনীয়।',
      },
      {
        en: "if it's very late where you're reading this, it's also very late in Kolkata. we're both making questionable choices right now.",
        bn: 'আপনার ওখানে যদি অনেক রাত হয়, কলকাতাতেও তাই। দুজনেই তাহলে এখন একটু বাজে সিদ্ধান্ত নিচ্ছি।',
      },
      {
        en: 'there are more hidden things on this site than there are menu items pointing to them.',
        bn: 'এই সাইটে যত মেনু আইটেম আছে, তার চেয়ে বেশি জিনিস লুকিয়ে আছে।',
      },
      {
        en: 'somewhere on this page, a small button is quietly hoping you click it five times in a row.',
        bn: 'এই পাতার কোথাও একটা ছোট বাটন চুপচাপ আশা করছে আপনি সেটায় পরপর পাঁচবার ক্লিক করবেন।',
      },
      {
        en: "you've now spent longer on this popup than most recruiters spend reading a resume. no pressure.",
        bn: 'একজন রিক্রুটার একটা রিজিউমে যতক্ষণ সময় দেন, তার চেয়ে বেশি সময় আপনি এই পপআপে দিয়ে ফেলেছেন। চাপ নেই অবশ্য।',
      },
      {
        en: 'there is no spoon. there is, however, a terminal — it\'s hiding in the Stack section.',
        bn: 'কোনো চামচ নেই। তবে একটা টার্মিনাল আছে — সেটা লুকিয়ে আছে Stack সেকশনে।',
      },
      {
        en: 'this site has a favorite gradient. it shows up more than is strictly necessary, on purpose.',
        bn: 'এই সাইটের একটা প্রিয় গ্র্যাডিয়েন্ট আছে। ইচ্ছাকৃতভাবেই এটা দরকারের চেয়ে বেশি জায়গায় দেখা যায়।',
      },
      {
        en: 'try typing "sudo hire me" into the contact form\'s message box. see what happens.',
        bn: 'কন্টাক্ট ফর্মের মেসেজ বক্সে "sudo hire me" টাইপ করে দেখুন। কী হয় দেখুন।',
      },
      {
        en: 'right-clicking things is apparently a personality trait now. respect.',
        bn: 'যেকোনো কিছুতে রাইট-ক্লিক করা এখন সম্ভবত একটা স্বভাব। শ্রদ্ধা রইল।',
      },
    ] satisfies Localized[],
    // Kept separate from the array above, not just another entry in it —
    // SurpriseFact.tsx only mixes this into the pool on April 1st itself,
    // the one calendar date safe to build a joke around without
    // inventing anything about Rafi specifically (an actual anniversary/
    // birthday isn't in AGENTS.md's verified fact list, so this stays the
    // one universally-true special date rather than a guessed one).
    aprilFools: {
      en: "it's april 1st. every other fact in here is true. this one's making no promises.",
      bn: 'আজ ১লা এপ্রিল। এখানের বাকি সব তথ্য সত্যি। এইটার ব্যাপারে কোনো নিশ্চয়তা নেই।',
    } satisfies Localized,
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
    writing: { en: 'WRITING', bn: 'লেখা' } satisfies Localized,
    built: { en: 'BUILT', bn: 'তৈরি' } satisfies Localized,
    approach: { en: 'APPROACH', bn: 'পদ্ধতি' } satisfies Localized,
    contact: { en: 'CONTACT', bn: 'যোগাযোগ' } satisfies Localized,
  },
};
