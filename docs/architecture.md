# Architecture & Current Build State

A snapshot of how the portfolio is actually built right now. This is a reference, not a rulebook — `AGENTS.md` holds the rules that must not be silently violated (tokens, facts, scope boundaries); this file describes the current implementation and gets updated at natural checkpoints (a finished feature, a settled design direction), not synchronously with every in-session experiment.

## Tech Stack
- Next.js (App Router) + TypeScript, single route (`/`)
- Tailwind CSS v4
- Framer Motion — scroll reveals, hero load sequence, mobile menu transitions
- `three` / `@react-three/fiber` — the hero's ambient particle field only
- Zod — contact form server-side validation
- No CMS, static content, deployed to Vercel — the one backend exception is the contact form's Server Action

## Design Direction
"Kinetic glass futurism": bold oversized display type, glassmorphic surfaces (translucent panels + backdrop-blur + soft glow borders), gradient/glow accents, a cursor-reactive ambient light, generous negative space. See `AGENTS.md` for the token table.

**Direction history** (so future changes don't re-propose something already tried and rejected):
1. **HUD/systems-console look** — flat bordered panels, monospace coordinate labels, hairline grid. Rejected: "doesn't look like a developer website," read as an internal dashboard.
2. **Interactive comment-tree algorithm diagram** — an SVG visualization of the Reddit Clone's O(N) linear-list-to-tree resolution, built as the original signature centerpiece. Rejected outright, removed entirely — don't re-add a diagram/visualization centerpiece without being asked again.
3. **Client Work promoted over flagship Case Studies** — "the work I deliver to the client should be actual highlights." Client Work is the lead "Work" section (nav → `#work`), Case Studies (the two flagship technical projects) is a secondary "Technical Deep Dive" after it.

## Page Structure (single scroll)
1. **Hero** (`Hero.tsx`) — name, dual "Full Stack Developer" / "Designer" role badges (no specific tech-stack naming here — that's clutter this high up), status line, two stats (years experience, sites shipped), ambient particle field + orbit rings + aurora blobs behind it, scroll cue at the bottom. Orchestrated staggered load-in, <600ms, no bounce.
2. **Client Work** (`ClientWork.tsx`, id `work`) — lead work section. 3-column grid, cover image + category tag + name + one-line description per card. Data in `src/lib/data.ts` → `clientProjects`, typed via `ClientProject`. **Placeholder on purpose**: generic names ("Client Project 01"), `href="#"`, temporary Unsplash stock covers (verified working via `curl` before use — never guess an image URL). Swap in real name/description/href/screenshot per entry as Rafi provides them; adding more is just appending to the array, no component changes.
3. **Case Studies** (`Projects.tsx`, id `case-studies`) — the two flagship, interview-defensible projects (Reddit Clone, Blog Manager & CMS). One glass card each: tagline + one sharp technical highlight line (not a bullet breakdown) + tech chips + gradient cover (code-generated, cycling the decorative palette). Reddit Clone links live demo + GitHub; Blog Manager is description-only (private repo).
4. **Experience** (`Experience.tsx`, id `experience`) — vertical timeline, glowing gradient line + pulsing node markers, three CV entries, two condensed highlight lines each max.
5. **Stack** (`Skills.tsx`, id `stack`) — grouped capability grid (Languages / Frontend / Backend & Data / Cloud, Auth & Tools / AI-Assisted Workflow) as glowing pill chips.
6. **Contact** (`Contact.tsx`, id `contact`) — bold gradient closing headline, direct email/GitHub/LinkedIn links, plus the contact form (see below).

## Navigation
`Navbar.tsx`, sticky glass pill at the top. Desktop: inline anchor links + scroll-spy active-state highlighting (`IntersectionObserver` over the section ids above), with a shared-layout (`layoutId`) pill sliding smoothly between whichever link is active. Chrome itself is scroll-reactive — padding shrinks continuously as you scroll (`framer-motion` `useScroll`/`useTransform` on `scrollY`, not a binary class-toggle snap). Mobile: collapses into a hamburger → dropdown (links must never just disappear with no way to reach them, which is what the first mobile pass did wrong). Theme toggle lives here too. Logo mark ("RAL" + dot) scales the dot on hover.

## Theming
Dark (Mocha) / light (Latte), same semantic token roles, real toggle. Default follows system `prefers-color-scheme`; explicit choice persists to `localStorage` and sets `data-theme` on `<html>` via a pre-hydration inline script in `layout.tsx` (no flash of the wrong theme). `ThemeToggle.tsx` reads the attribute for its initial state — a one-render hydration mismatch is expected and covered by `suppressHydrationWarning`, the standard pattern for client-only-knowable UI like this.

## Contact Form
`ContactForm.tsx` (client) + `src/lib/actions/contact.ts` (Server Action `"use server"`) + `src/lib/validation/contact.ts` (shared Zod schema, imported by both — one set of rules, not two copies that can drift):
- Validated both ends, with `noValidate` on the `<form>` so native browser tooltips never show — validation UI is fully custom, matching the app's visual language. Client: on-blur + on-submit checks against the same Zod schema, shown inline per field. Server: the same schema is the actual gate (per `Production_Code_Standards.md` — never trust the client alone).
- Delivery via Resend's REST API (plain `fetch`, no SDK dependency) — reads `RESEND_API_KEY` from env (`.env.example` documents it, never hardcoded). Missing key → logs server-side, returns a generic safe error to the visitor, never leaks "misconfigured."
- Honeypot field (`company`, visually hidden + `tabIndex={-1}` + `aria-hidden`) — filled means bot, silently returns a fake success.
- All four UI states: idle/typing, pending (`useActionState`'s `pending`), success (replaces the form), error (inline per-field + a generic form-level message).
- No persistent rate-limiting — would need Redis/KV this static-first site doesn't have. Accepted tradeoff, not an oversight.
- Sender is Resend's shared test address (`onboarding@resend.dev`) until a `rafiera.com` address is verified in the Resend dashboard.

## Motion Rules
- Hero: one orchestrated staggered load sequence, fast, no bounce.
- Every section: scroll-triggered reveal (fade + rise, `whileInView`, `once: true`).
- Hover: glow-border intensify + slight lift on cards — box-shadow is *not* animated directly (repaints every frame under `backdrop-filter`, causes jank); the glow is a `::after` pseudo-element opacity fade instead, which is compositor-cheap. Lifted elements get `will-change: transform`.
- Cursor-reactive ambient glow: direct `style.setProperty` on a ref in `CursorGlow.tsx`, not React state per mousemove. Desktop only (`pointer: coarse` check).
- `prefers-reduced-motion` respected globally via `<MotionConfig reducedMotion="user">` in the root layout, plus manual checks for the two things Framer Motion's config doesn't cover (the CSS aurora-blob keyframe animation, the cursor glow).

## Engineering Requirements
- All editable content lives in `src/lib/data.ts`, typed via `src/types/index.ts` — never hardcoded in a component.
- Responsive down to mobile; project/client grids reflow for any N.
- Visible keyboard focus states throughout, including navbar and theme toggle.
- Lighthouse target: 90+ performance/accessibility (not yet formally audited — see open items below).

## Known Open Items
- Formal Lighthouse/accessibility audit not yet run.
- `npm audit` flags 8 vulnerabilities (7 high), mostly transitive; a `next 16.2.1 → 16.3.1` bump (patch-level) resolves the Next.js-side ones. Not applied yet — flagged for Rafi's call since it touches the core framework version.
- SEO basics (Open Graph/Twitter image, real favicon, structured data, sitemap) not done.
- `rafiera.com` DNS/deployment wiring not verified from this session.
- Contact form: on a server-side error, submitted field values aren't preserved (uncontrolled inputs reset) — minor UX rough edge, not a functional bug.
