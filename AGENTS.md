<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENT.md — Rafi Ahmed Laskar Portfolio

## Objective
Build a single-page, extremely futuristic developer portfolio for Rafi Ahmed Laskar, a Full Stack Developer (4+ yrs) targeting Tier 1 product companies (Freshworks, Zoho, BrowserStack, Postman). The page doubles as a project-inquiry channel — it must read credibly to both a hiring engineer and a prospective client — but never labels Rafi "a freelancer" anywhere in on-page copy. The page must read as engineered, not templated — precision over decoration.

## Source of Truth
- All biographical/work facts (roles, dates, employers, project details, links) come from `docs/Rafi_Ahmed_Laskar_CV_OnePage.docx`. Treat it as the canonical fact source — do not invent or soften anything it states, and re-check it before writing copy rather than relying on a prior session's paraphrase.
- Code standards: `docs/Production_Code_Standards.md`, imported into `CLAUDE.md` — it auto-loads every session, apply it to all code in this repo without being asked.
- Verified public links (use exactly these, no invented URLs):
  - Email: `therafiniac@gmail.com`
  - GitHub: `github.com/therafiniac`
  - LinkedIn: `linkedin.com/in/therafiniac`
  - Domain: `rafiera.com`
  - Reddit Clone live demo: `reddit-clone-five-chi.vercel.app`
  - Blog Manager & CMS Dashboard is a **private Semigon repo** — no public link. It gets a description panel only, no live/GitHub links.

## Tech Stack
- Next.js (App Router) + TypeScript, single route (`/`)
- Tailwind CSS
- Framer Motion for orchestrated motion (scroll reveals, load sequence)
- `three` / `@react-three/fiber` / `@react-three/drei` — reserved **only** for a subtle ambient hero background effect (see Signature element below), not for the comment-tree diagram itself. Remove the dependency if it ends up unused rather than leaving dead weight.
- No CMS, no backend — static content, deploy to Vercel

## Design Direction (do not default to generic AI aesthetics)
Avoid: cream+serif+terracotta, black+single-neon-accent, or broadsheet-newspaper layouts unless justified below. This brief calls for **HUD / systems-engineering futurism** — the page should feel like an internal tool or command console for a senior engineer, not a marketing site.

### Token System
- **Color — Catppuccin Mocha, three accents, each with one strict semantic role (no monochrome flatness, no rainbow sprawl):**
  - `--bg` `#11111B` (Mocha `crust`)
  - `--surface` `#181825` (Mocha `mantle`, panel backgrounds)
  - `--line` `#45475A` (Mocha `surface1`, hairline borders/grid)
  - `--text-primary` `#CDD6F4` (Mocha `text`)
  - `--text-muted` `#A6ADC8` (Mocha `subtext0`)
  - `--accent` `#94E2D5` (Mocha `teal` — interactive only: links, hover/focus states, focus rings)
  - `--accent-dim` `#94E2D5` at ~10% opacity (teal used as background wash)
  - `--accent-secondary` `#FAB387` (Mocha `peach` — non-interactive emphasis only: numbers/metrics, panel index labels, key data points. Never clickable, never used for interactive states — that's teal's job.)
  - `--status-live` `#A6E3A1` (Mocha `green` — reserved strictly for the literal live/online status indicator, never general accenting)
  - Teal and peach read as a classic instrument-panel pairing (cyan = interactive, amber = data/emphasis, green = status) — near-complements on the wheel, which is what keeps the page from reading flat. Do not introduce other Mocha hues (mauve/pink/etc.) beyond these three.
- **Type:**
  - Display/mono headers: `JetBrains Mono` or `IBM Plex Mono` — reinforces "system" feel
  - Body: `Inter` — neutral, legible at small sizes
  - Data/labels: `IBM Plex Mono`, uppercase, letter-spaced, small size (used for eyebrows, tags, timestamps)
- **Layout:** Full-bleed grid with visible hairline gutters (like a schematic). Sections are "panels" with monospace coordinate-style labels (e.g. `// 02 — PROJECTS`), justified because Rafi's content genuinely is sequential (career timeline, project architecture breakdown).
- **Signature element:** An interactive live "system diagram" of the Reddit Clone's O(N) comment-tree algorithm — a small animated visualization (nodes resolving from linear list → tree via hash map) that the user can hover/scrub. This is the single most technically distinctive artifact Rafi has and should anchor the page's identity, not be buried as a bullet point.
  - **Build with SVG/Canvas2D + Framer Motion**, not WebGL — it needs precise, deterministic hover/scrub interaction, which is simpler and more accessible outside a 3D scene.
  - The hero panel may separately carry a subtle ambient `react-three/fiber` background (e.g. a faint drifting grid/particle field) — low-key, decorative only, never competing with the comment-tree diagram for attention. Must stay cheap enough not to jeopardize the Lighthouse performance budget, and must fully respect `prefers-reduced-motion`.

## Page Structure (single scroll, in order)
1. **Hero** — Name, role, one-line positioning ("Full Stack Developer — Next.js / TypeScript / Systems that scale"). Status-line style subtext: `STATUS: OPEN TO OPPORTUNITIES · KOLKATA, INDIA / REMOTE`. Positioning language must read naturally to both a hiring manager and a prospective client — never use the word "freelance"/"freelancer" as a self-label. No stock gradient hero.
2. **Signature visualization** — the comment-tree algorithm demo (see above). This is the "wow" moment, placed early.
3. **Selected Work** — Reddit Clone and Blog Manager & CMS Dashboard as detailed panels: problem → architecture decision → outcome. Include tech tags as mono chips. Reddit Clone links to its live demo and GitHub repo (see Source of Truth); Blog Manager & CMS is description-only (private repo, no link).
4. **Experience** — compact timeline, three entries straight from the CV: Software Developer @ Semigon Consultancy Pvt. Ltd (Jul 2025–Present), Web Developer @ Digital Exposure Online Services (Jan 2022–Jun 2025), Freelance Web Developer @ Self-Employed (2020–2021). The last entry is factual work history, not a positioning statement — present it as a dated timeline row like the other two, not as an identity claim. Terse, factual, no padding.
5. **Stack** — grouped capability grid mirroring the CV's own Technical Skills categories: Languages / Frontend / Backend & Data / Cloud, Auth & Tools / AI-Assisted Workflow. Not a skill-bar cliché.
6. **Contact** — email, GitHub, LinkedIn as direct links (see Source of Truth for exact URLs). No contact form (unnecessary backend for a static portfolio).

## Content Rules
- Use only verified facts: no invented metrics, no fabricated client names, no fake testimonials.
- Copy is written from a hiring engineer's reading perspective: specific, technical, no marketing fluff ("passionate," "synergy," etc. are banned words).
- Every project claim must be something Rafi can defend in an interview (ties to existing interview-prep context: O(N) hash-map tree, Server Actions voting, RBAC).

## Motion Rules
- One orchestrated load sequence on hero (fast, <600ms, no bounce).
- Scroll-triggered reveals on panel entry — subtle, no parallax gimmicks.
- Respect `prefers-reduced-motion`.

## Engineering Requirements
- Fully responsive to mobile (single column, diagram simplifies gracefully or becomes static on small screens).
- Visible keyboard focus states throughout.
- Lighthouse: 90+ performance/accessibility.
- No client-side data fetching needed — all content is static/local.

## Explicitly Out of Scope
- Blog/CMS integration, contact form backend, dark/light mode toggle, multi-page routing, analytics dashboard.
- Persistent navbar, footer, custom cursor, About panel, Education panel — not part of the 6-panel structure above. Build exactly those 6 sections; don't reintroduce scaffolding beyond them without updating this doc first.
- Any framing of Rafi as "a freelancer" — the page serves both employment and project-inquiry audiences without that label.
