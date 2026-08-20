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
- `three` / `@react-three/fiber` / `@react-three/drei` — reserved **only** for the subtle ambient hero background particle field. Remove the dependency if it ends up unused rather than leaving dead weight.
- No CMS, no backend — static content, deploy to Vercel

## Design Direction (do not default to generic AI aesthetics)
Avoid: cream+serif+terracotta, black+single-neon-accent, broadsheet-newspaper layouts, and — as of this revision — the flat HUD/spreadsheet-panel look this project shipped with first. That version read as an internal dashboard, not a personal portfolio, and got explicitly rejected for it. The brief now is **kinetic glass futurism**: bold oversized display type, glassmorphic surfaces (translucent panels + backdrop-blur + soft glow borders), gradient/glow accents, a cursor-reactive ambient light, and generous negative space. It should feel cinematic and alive — a portfolio someone opens and immediately wants to scroll through — not a console someone operates.

### Token System
- **Color — Catppuccin, both flavors (dark = Mocha, light = Latte), same semantic roles in both:**
  - `--bg`: Mocha `crust` `#11111B` (dark) / Latte `crust` `#DCE0E8` (light)
  - `--surface`: Mocha `mantle` `#181825` (dark) / Latte `mantle` `#E6E9EF` (light) — glass panel base, used with alpha + backdrop-blur, not a flat opaque fill
  - `--line`: Mocha `surface1` `#45475A` (dark) / Latte `surface1` `#BCC0CC` (light) — hairline borders at low opacity, a whisper not a grid
  - `--text-primary`: Mocha `text` `#CDD6F4` (dark) / Latte `text` `#4C4F69` (light)
  - `--text-muted`: Mocha `subtext0` `#A6ADC8` (dark) / Latte `subtext0` `#6C6F85` (light)
  - `--accent`: Mocha/Latte `teal` `#94E2D5` / `#179299` — interactive only: links, hover/focus states, focus rings, glow borders on hover
  - `--accent-dim`: `--accent` at ~10% opacity (background wash / glow)
  - `--accent-secondary`: Mocha/Latte `peach` `#FAB387` / `#FE640B` — non-interactive emphasis: numbers/metrics, key data points. Never clickable — that's teal's job.
  - `--status-live`: Mocha/Latte `green` `#A6E3A1` / `#40A02B` — reserved strictly for the literal live/online status indicator, never general accenting.
  - Teal and peach are the disciplined semantic pair everywhere (cyan = interactive, amber = data/emphasis, green = status). For purely decorative moments only — project card cover gradients, background blobs — pull additional Catppuccin hues (mauve, sapphire, blue, lavender) for variety; this is the one place the palette opens up beyond the three semantic accents, since the CV content (and the project list) will keep growing and each new card benefits from its own identity. Never use a decorative hue for an interactive or status element.
- **Theming:** both flavors ship together with a light/dark toggle in the navbar. Default follows system `prefers-color-scheme`; an explicit user choice is persisted (e.g. `localStorage`) and overrides it via a `data-theme` attribute on `<html>`, set by a pre-hydration inline script so there's no flash of the wrong theme.
- **Type:**
  - Display: `JetBrains Mono` or `IBM Plex Mono` at large, bold, tight-tracking sizes for headlines — used for scale and character now, not just "system" flavor. Headlines should be oversized (clamp to viewport), not conservatively sized body-adjacent text.
  - Body: `Inter` — neutral, legible at small sizes
  - Data/labels: mono, uppercase, letter-spaced, small — survives only as a light accent (a pill badge, an eyebrow tag), not as the primary structural device the way it was in the HUD version.
- **Layout:** Generous asymmetric negative space, not a full-bleed hairline grid. Sections are glass panels with soft glow borders that intensify on hover/focus, not bordered boxes with coordinate labels. Scale and contrast (huge hero type against small data labels) carry the hierarchy, not ruled-off panels.
- **Ambient light:** a soft radial glow that follows the cursor (desktop only, disabled on touch and `prefers-reduced-motion`) reinforces the "alive" feel across the whole page, implemented cheaply (direct style mutation on a fixed layer, not React state per mousemove).
- **Imagery:** no real project screenshots yet — use code-generated abstract visuals (gradient mesh covers, pattern fills) drawn from the decorative palette above, e.g. a unique gradient cover per project card. Swap in real screenshots later without restructuring — treat the gradient cover as an `<img>`-shaped slot in the layout.

## Navigation
A sticky glass navbar (backdrop-blur, top of viewport) is in scope: name/mark on the left, anchor links to each section on the right, plus the light/dark theme toggle. Keep it minimal — this is still a single-route site, the nav just jumps between in-page anchors, it doesn't introduce routing.

## Page Structure (single scroll, in order)
1. **Hero** — Name, role, one-line positioning ("Full Stack Developer — Next.js / TypeScript / Systems that scale"). Status-line style subtext: `STATUS: OPEN TO OPPORTUNITIES · KOLKATA, INDIA / REMOTE`. Positioning language must read naturally to both a hiring manager and a prospective client — never use the word "freelance"/"freelancer" as a self-label. Oversized kinetic type, ambient particle field + cursor glow behind it, not a stock gradient hero.
2. **Selected Work** — one glass card per project, glow-on-hover borders, each with an abstract gradient cover (see Imagery above), tagline + ONE sharp technical highlight line (not a bulleted breakdown) + tech tags as mono chips. **This list will grow over time** — new projects get appended to `src/lib/data.ts` only; the grid must reflow cleanly for any N (currently 2, expect 3+ soon), not assume a fixed 2-up layout. Reddit Clone links to its live demo and GitHub repo (see Source of Truth); Blog Manager & CMS is description-only (private repo, no link).
3. **Experience** — vertical timeline with a glowing accent line and animated node markers, three entries straight from the CV: Software Developer @ Semigon Consultancy Pvt. Ltd (Jul 2025–Present), Web Developer @ Digital Exposure Online Services (Jan 2022–Jun 2025), Freelance Web Developer @ Self-Employed (2020–2021). Two condensed highlight lines per entry, max — not a full bullet dump. The last entry is factual work history, not a positioning statement — present it as a dated timeline row like the other two, not as an identity claim. Terse, factual, no padding.
4. **Stack** — grouped capability grid mirroring the CV's own Technical Skills categories: Languages / Frontend / Backend & Data / Cloud, Auth & Tools / AI-Assisted Workflow. Glowing pill chips, not a skill-bar cliché.
5. **Contact** — a bold closing CTA moment (large gradient/glow headline), not a plain link list. Email, GitHub, LinkedIn as direct links (see Source of Truth for exact URLs). No contact form (unnecessary backend for a static portfolio).

## Content Rules
- The CV is reference material for facts, not a script for copy — condense, reword, or omit its content freely to serve the design. Never fabricate a fact it doesn't support (no invented metrics, no fabricated client names, no fake testimonials), but don't feel obliged to reproduce its bullets verbatim or in full.
- Bias toward less text, not more: this is a futuristic single-page site, not a document. If a section reads like a resume printout, cut it down before adding a panel for it.
- Copy is written from a hiring engineer's reading perspective: specific, technical, no marketing fluff ("passionate," "synergy," etc. are banned words).
- Every project claim must be something Rafi can defend in an interview (ties to existing interview-prep context: O(N) hash-map tree, Server Actions voting, RBAC).

## Motion Rules
- One orchestrated load sequence on hero (fast, <600ms, no bounce).
- Scroll-triggered reveals on every section entry (fade + rise, whileInView, once) — this is expected production value for the new direction, not optional polish.
- Hover micro-interactions on cards/links (glow intensify, slight lift) — tasteful, no gimmicks (no scroll-jacking, no parallax layers fighting each other).
- Cursor-reactive ambient glow follows the pointer at low cost (ref/style mutation, not per-frame React state); desktop only.
- Respect `prefers-reduced-motion` everywhere motion is added — this expands in scope with this revision (cursor glow, aurora drift, hover lift all need the reduced-motion fallback, not just the hero load sequence).

## Engineering Requirements
- Fully responsive to mobile (single column; project grid reflows for any N).
- Visible keyboard focus states throughout, including the navbar and theme toggle.
- Theme toggle has no flash-of-wrong-theme and is keyboard-operable with a clear pressed/current state.
- Lighthouse: 90+ performance/accessibility.
- No client-side data fetching needed — all content is static/local.

## Explicitly Out of Scope
- Blog/CMS integration, contact form backend, multi-page routing, analytics dashboard.
- Footer, About panel, Education panel — still not part of the page. The navbar (see Navigation above) is in scope now; these others aren't unless this doc is updated first.
- A custom cursor (replacing the OS pointer icon) is still out of scope. The cursor-reactive ambient glow under Motion Rules is a background lighting layer, not a cursor replacement — the native pointer stays untouched.
- Any framing of Rafi as "a freelancer" — the page serves both employment and project-inquiry audiences without that label.
- No standalone algorithm-visualization section. It shipped, was reviewed, and was cut — don't re-add a diagram/visualization centerpiece without being asked again.
