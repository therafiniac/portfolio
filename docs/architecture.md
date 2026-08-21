# Architecture & Current Build State

A snapshot of how the portfolio is actually built right now, detailed enough that a new conversation can pick up work with just this file — `AGENTS.md` (facts, tokens, scope) — and the code itself, no prior chat history required. This is a reference, not a rulebook — updated at natural checkpoints (a finished feature, a settled design direction), not synchronously with every in-session experiment.

## Tech Stack
- Next.js (App Router) + TypeScript, single route (`/`)
- Tailwind CSS v4
- Framer Motion — scroll reveals, hero load sequence, mobile menu transitions, the Projects section's line-draw flow diagram
- `three` / `@react-three/fiber` — the hero's ambient particle field only (`HeroCanvas.tsx`, lazy-mounted via `HeroCanvasLoader.tsx`)
- Zod — contact form server-side validation
- Live GitHub stat: `src/lib/github.ts` fetches `api.github.com/users/therafiniac` server-side (Next data cache, `revalidate: 3600`), fails silently to `null` on any error/rate-limit so a GitHub outage never breaks the page — consuming components (`Hero`, `HowIBuild`) just omit the stat when null
- No CMS, static content, deployed to Vercel — the one backend exception is the contact form's Server Action
- All content lives under `src/lib/data/` (one file per domain: `hero.ts`, `clientWork.ts`, `projects.ts`, `experience.ts`, `education.ts`, `skills.ts`, `approach.ts`, `contact.ts`, `nav.ts`), typed via `src/types/index.ts` — never hardcoded in a component

## Design Direction
"Kinetic glass futurism": bold oversized display type, glassmorphic surfaces (translucent panels + backdrop-blur + soft glow borders), gradient/glow accents, a cursor-reactive ambient light, generous negative space. See `AGENTS.md` for the token table.

**Direction history** (so future changes don't re-propose something already tried and rejected):
1. **HUD/systems-console look** — flat bordered panels, monospace coordinate labels, hairline grid. Rejected: "doesn't look like a developer website," read as an internal dashboard.
2. **Interactive comment-tree algorithm diagram** — an SVG visualization of the Reddit Clone's O(N) linear-list-to-tree resolution, built as the original signature centerpiece. Rejected outright, removed entirely — don't re-add a diagram/visualization centerpiece without being asked again.
3. **Client Work promoted over flagship projects** — "the work I deliver to the client should be actual highlights." Client Work leads (`#work`, index 01), the two flagship independent projects ("What I've Built", formerly "Case Studies") follow it (`#built`, index 02).
4. **Chamfer (cut-corner) shape retired entirely, in favor of rounded corners everywhere.** Originally the signature shape for fixed-size elements (Hero photo frame, `BrandMark`, `HowIBuild` bento tiles, favicon) with variable-height cards (Work, Projects) using plain rounded corners as an explicit exception. Retired once its footprint shrank to almost nothing: the navbar mark moved to a circle (an angular mark inside a true `rounded-full` pill read as mismatched), Contact's photo was cut, and Hero's own photo/frame was on its way out too — leaving `HowIBuild` as the only place still using it, which read as "one section that missed the redesign" rather than a deliberate signature. Don't re-add clip-path chamfer without being asked again; round is now the only corner language site-wide, including the favicon (`icon.tsx`).
5. **Work section cards were already rounded before the retirement, on purpose.** `WorkCard` uses a fake browser-chrome bar (dots + label) above each screenshot, plain rectangular/rounded corners — a diagonal-cut corner would've read as a design contradiction on something meant to look like a literal browser window. This is no longer an "exception" now that chamfer is gone everywhere else too, just how the card looks.
6. **Projects section deliberately avoids the Work section's visual language.** No chrome bar, no abstract cover graphic (`ProjectGraphic.tsx` was built, then deleted) — instead a real typographic stat per project (e.g. `O(N)`, `3`) and a project-specific mechanism `flow` (see FlowSteps below), so the two sections read as different, not palette-swapped copies of each other.

## Page Structure (single scroll, `src/app/page.tsx`)
Order: `Hero` → `ClientWork` → `Projects` → `Experience` → `Skills` → `HowIBuild` → `Contact`. `githubStats` is fetched once in `page.tsx` (server) and passed down to `Hero` and `HowIBuild`.

Each section (except Hero) is wrapped in `Section.tsx`, which centrally provides: the scroll-triggered fade+rise reveal, the giant faint background index numeral, the eyebrow pill + title, and optional `tint` (alternating `bg-surface/40` band) — sections don't each re-implement this.

1. **Hero** (`Hero.tsx`, id `top`) — name, dual role badges ("Full Stack Developer" in accent blue / "Designer" in accent-secondary maroon — the only place role is styled per-word, not a pill), pulsing `--status-live` status line, CTA row (`View My Work` primary button wrapped in `Magnetic.tsx`, `Get in Touch` text link), stats row (`heroStats`: years experience, sites shipped, via `CountUp`) plus a live GitHub public-repo stat when `githubStats` is non-null. Background: two `aurora-blob` blurred gradients, `HeroSchematic.tsx` (decorative static SVG diagram), `HeroCanvas` particle field (three.js, client-only, lazy-loaded). Portrait: `FramedImage` inside `TiltCard`. Orchestrated staggered load-in via Framer Motion `container`/`item` variants, <600ms, no bounce.
2. **Client Work** (`ClientWork.tsx`, id `work`, index `01`, eyebrow "Client Work", title "Work I've Delivered") — see Work Section below.
3. **Projects** (`Projects.tsx`, id `built`, index `02`, eyebrow "Independent Projects", title "What I've Built") — see Projects Section below.
4. **Experience** (`Experience.tsx`, id `experience`, index `03`, eyebrow "Track Record", title "Experience") — see Experience & Education below.
5. **Stack** (`Skills.tsx`, id `stack`, index `04`, eyebrow "Capabilities", title "Stack") — grouped skill chips, each group rendered as an infinite horizontal `Marquee.tsx` (alternating scroll direction per group, speed scaled by item count, pauses on hover), data from `skills.ts`.
6. **How I Build** (`HowIBuild.tsx`, id `approach`, index `05`, eyebrow "Philosophy", title "How I Build") — **not in the nav** (`navLinks` only has Work/Experience/Stack/Contact; this section is a deliberate closing beat right before the CTA, not a primary nav destination). See Bento Tiles below.
7. **Contact** (`Contact.tsx`, id `contact`) — gradient closing headline, direct email/GitHub/LinkedIn links, plus `ContactForm.tsx` (see Contact Form below).

## Work Section (`ClientWork.tsx`)
Uniform 3-column grid (`sm:grid-cols-2 lg:grid-cols-3`), every cell the same shape/weight — no spotlight card, since placeholder data has no real "best one" to justify singling out.

- `WorkCard`: `hover-glow-panel` class for the hover-glow mechanic (plain rounded corners + border), `BrowserChrome` fake dots+label bar, fixed `16/10`-aspect screenshot (`next/image`, `object-cover`), fixed-height (`h-36`) text block (category, name + `ArrowUpRight` hover reveal, 2-line-clamped description, first 2 tech chips pinned to the bottom via `mt-auto`). Fixed aspect + fixed text height is what keeps every row even regardless of description length — real screenshots can drop straight in later without layout math.
- Two curated non-project tiles, placed by hand in `buildGridItems()` (**not** algorithmic — re-pick positions by hand if the project count changes, a generic interval formula isn't worth the complexity for a small curated set): `StatShowcase` at grid slot 5 (dead center of the 3×3 grid) — a quiet neutral card, no icon, just a huge `--gradient-signature`-clipped number (`CountUp`) sourced from `heroStats`'s "Sites Shipped" entry so it never drifts from the Hero's own claim; and `WorkFillerTile type="cta"` closing the grid at the last slot — full `--gradient-signature` fill, oversized bleeding `Send` icon, "Open to new projects" / "Get in touch" linking `#contact`.
- Data: `clientWork.ts`, 7 `ClientProject` placeholder entries. **Placeholder on purpose**: generic names ("Client Project 0N"), `href="#"`, stock Unsplash covers (verified reachable via `curl` before use — never guess an image URL). Swap in real name/description/href/screenshot per entry as Rafi provides them; adding/removing entries is just editing the array, then re-checking the hand-curated stat/CTA slot positions above still land somewhere sensible.

## Projects Section (`Projects.tsx`)
Full-width editorial rows, one per project, **not** a card grid. Each row: a bordered rounded container, inner flex row alternating direction by index (`index % 2 === 1` reverses via `md:flex-row-reverse`) so left/right positioning varies down the page.

- Left/right zone (2/5 width): a soft diagonal gradient wash (`135deg`/`225deg` depending on `reversed`, so the wash always points the same visual direction relative to reading order) behind one big `--gradient-signature`-clipped typographic stat (e.g. `O(N)`, `3`) + a short label — the actual technical claim rendered large, not a decorative graphic standing in for one.
- Content zone (3/5 width): project name + link badges (`LinkBadge`: Live Demo / GitHub / "Private Repo" — only rendered per project when the corresponding field is set), tagline, a bordered `//`-prefixed code-comment-style callout panel holding the one sharp technical highlight line, `FlowSteps` (below), tech chips.
- **`FlowSteps.tsx`** — the only client component in this section (`"use client"`, kept minimal so `Projects.tsx` itself stays a server component). Renders `project.flow` (a short project-specific mechanism, e.g. `["Flat list", "Hash-map", "Tree"]`) as dot-and-label nodes connected by lines; each connecting line animates `scaleX: 0 → 1` with `transformOrigin: left` via Framer Motion `whileInView`, staggered `delay: i * 0.15` — a transform-only (cheap, no layout reflow) left-to-right draw-in per step. Uses `display: contents` per step to group dot+label+line without an extra layout div.
- Data: `projects.ts`, 2 `Project` entries — Reddit Clone (live demo linked, `githubUrl: "#"` placeholder — the real repo link hasn't been swapped in yet, intentionally honest per the placeholder-link rule rather than pointing at a profile URL) and Blog Manager & CMS Dashboard (`private: true`, description-only, no links, per AGENTS.md — it's a private Semigon repo).

## Experience & Education (`Experience.tsx`)
Single section, two visually distinct halves — deliberately not one bullet trail, per explicit request.

- **Timeline** (top half): vertical line at `left-[5px]`, a 4-stop gradient (`--status-live` → `--accent` at 20% → faded `--line` at 60% → transparent) so the top ("current") segment of the line visually echoes the pulsing current-role dot rather than being a flat single-color line. A `trail-light` element (CSS keyframe `trail-light-travel` in `globals.css`, `top`/`opacity` only — cheap, percentage-based so it works at any timeline height) loops a small glow top-to-bottom continuously; guarded by `prefers-reduced-motion` (`display: none` when reduced).
- Each entry (`experience.ts`, `ExperienceEntry[]`): a pulsing `--status-live` dot for the current role (`entry.end === "Present"`) vs. a plain accent dot for past roles; date range plus a computed duration badge (`formatDuration`/`parseEntryDate` helpers in `Experience.tsx` — parse `"MMM YYYY"` / bare `"YYYY"` / `"Present"`, so duration is derived, never hand-maintained and liable to drift from the dates); role/org/location; highlight bullets with arrow (`→`) markers, figures bolded via `renderHighlight()` (regex-wraps numbers like `150+` in an accent-secondary `<strong>` so scan-reading surfaces the concrete claim); tech chips per role.
- **Education** (bottom half): separated by a `border-t` divider, **no dots or connecting line** — a plain icon-badge + degree/institution row, so it reads as its own thing rather than another timeline entry. Data: `education.ts`, sourced from the CV docx (`docs/Rafi_Ahmed_Laskar_CV_OnePage.docx`, extracted via Python `zipfile`/regex since the file is binary) — Bachelor of Technology, CS&E, Adamas University, Kolkata. No graduation year is stated because the CV doesn't list one; none is invented.
- Compliance note: the independent-work entry is titled "Independent Web Developer," not "Freelance" — AGENTS.md explicitly forbids framing Rafi as "a freelancer" anywhere in on-page copy.

## Bento Tiles (`HowIBuild.tsx`)
Every tile has a fixed height (`h-80` tall / `h-48` short via `TileShell`) — plain rounded rectangle (`rounded-2xl border`), single DOM element per tile now (see Hover-Glow Panel below for why this used to be two layers). `TileShell` takes an `accent` flag: filler tiles (`CtaTile`, `StatTile`) get an accent-tinted border at rest so they read as a deliberate brand moment; content tiles (`PointCard`) stay neutral until hover.

- 5 `PointCard`s (data: `approachPoints` in `approach.ts`) — icon + a small custom SVG node/line diagram unique per point (`LayersGraphic`, `ConvergeGraphic`, `SchemaGraphic`, `DualRoleGraphic`, `PipelineGraphic` — same node/edge visual vocabulary as the Work section's `MiniSchematic`, different topology per concept) + heading + description. Mixed span/height (2-col tall, 1-col tall, 1-col short) for grid rhythm.
- `CtaTile` — short tile, "Open to new projects" / "Get in touch", links `#contact`.
- `StatTile` — short tile, live GitHub public-repo count via `CountUp`, only rendered when `githubStats` is non-null (fetched once in `page.tsx`, passed down).

## Hover-Glow Panel (`globals.css`, `.hover-glow-panel`)
A reusable "lit from within on hover" effect — inset top highlight plus a `::after` accent glow that fades in on `.group:hover`/`.group:focus-within`, not an animated box-shadow blur radius (repaints every frame under `backdrop-filter`, causing jank) and not a lift/translate (tried and rejected earlier — "too harsh"). Layer it onto a card you've already styled yourself (border, radius, background); it only owns the glow.

Used to need a two-real-DOM-element layered-border trick (a plain CSS `border` can't follow a `clip-path` chamfer cut corner — the cut edge gets clipped away with no border segment drawn along it, and a `::before` at `z-index:-1` can't paint behind its own parent's background either). That whole technique (plus the fixed-size-only constraint it required, since CSS Grid's `align-items: stretch` doesn't propagate to a child positioned via plain inset) is gone along with chamfer — every card is a plain rounded rectangle with one real `border` now, safe under any height, fixed or content-driven.

## Navigation
`Navbar.tsx`, sticky glass pill at the top. Desktop: inline anchor links (`navLinks` in `nav.ts` — Work/Experience/Stack/Contact only, `HowIBuild`'s `#approach` is deliberately not a nav destination) + scroll-spy active-state highlighting (`IntersectionObserver` over the section ids), with a shared-layout (`layoutId`) pill sliding smoothly between whichever link is active. Chrome itself is scroll-reactive — padding shrinks continuously as you scroll (`framer-motion` `useScroll`/`useTransform` on `scrollY`, not a binary class-toggle snap). Mobile: collapses into a hamburger → dropdown. Theme toggle lives here too. Logo mark (`BrandMark.tsx`, "RAL" + dot) scales the dot on hover.

## Theming
Dark (Mocha) / light (Latte), same semantic token roles, real toggle. Default follows system `prefers-color-scheme`; explicit choice persists to `localStorage` and sets `data-theme` on `<html>` via a pre-hydration inline script in `layout.tsx` (no flash of the wrong theme). `ThemeToggle.tsx` reads the attribute for its initial state — a one-render hydration mismatch is expected and covered by `suppressHydrationWarning`, the standard pattern for client-only-knowable UI like this.

## Contact Form
`ContactForm.tsx` (client) + `src/lib/actions/contact.ts` (Server Action `"use server"`) + `src/lib/validation/contact.ts` (shared Zod schema, imported by both — one set of rules, not two copies that can drift):
- Validated both ends, with `noValidate` on the `<form>` so native browser tooltips never show — validation UI is fully custom. Client: on-blur + on-submit checks against the same Zod schema, shown inline per field. Server: the same schema is the actual gate (per `Production_Code_Standards.md` — never trust the client alone).
- Delivery via Resend's REST API (plain `fetch`, no SDK dependency) — reads `RESEND_API_KEY` from env (`.env.example` documents it, never hardcoded). Missing key → logs server-side, returns a generic safe error to the visitor, never leaks "misconfigured."
- Honeypot field (`company`, visually hidden + `tabIndex={-1}` + `aria-hidden`) — filled means bot, silently returns a fake success.
- All four UI states: idle/typing, pending (`useActionState`'s `pending`), success (replaces the form), error (inline per-field + a generic form-level message).
- No persistent rate-limiting — would need Redis/KV this static-first site doesn't have. Accepted tradeoff, not an oversight.
- Sender is Resend's shared test address (`onboarding@resend.dev`) until a `rafiera.com` address is verified in the Resend dashboard.

## Motion Rules
- Hero: one orchestrated staggered load sequence, fast, no bounce.
- Every `Section`-wrapped section: scroll-triggered reveal (fade + rise, `whileInView`, `once: true`) — handled centrally by `Section.tsx`, not per-section.
- Hover on cards/tiles: glow-border intensify only, no lift/translate (tried, rejected as "too harsh"). Box-shadow blur radius is never animated directly (repaints every frame under `backdrop-filter`); the glow is a `::after` pseudo-element opacity fade instead, compositor-cheap.
- Projects section's `FlowSteps` connecting lines: `scaleX` + `transformOrigin: left`, staggered per index — transform-only, no layout reflow.
- Experience timeline's `trail-light`: CSS keyframe, `top`/`opacity` only, percentage-based so it's correct at any content-driven height.
- Cursor-reactive ambient glow: direct `style.setProperty` on a ref in `CursorGlow.tsx`, not React state per mousemove. Desktop only (`pointer: coarse` check).
- `prefers-reduced-motion` respected globally via `<MotionConfig reducedMotion="user">` in the root layout, plus manual `@media (prefers-reduced-motion: reduce)` guards for every CSS-keyframe animation Framer Motion's config doesn't cover (`aurora-blob`, `trail-light`, `marquee-track`, the cursor glow).

## Engineering Requirements
- All editable content lives under `src/lib/data/`, typed via `src/types/index.ts` — never hardcoded in a component.
- Responsive down to mobile; project/client grids and the Experience timeline reflow for any N.
- Visible keyboard focus states throughout, including navbar and theme toggle.
- Lighthouse target: 90+ performance/accessibility (not yet formally audited — see open items below).

## Verification Workflow
`next.config.ts` sets `distDir: process.env.BUILD_VERIFY_DIR || ".next"` — running `BUILD_VERIFY_DIR=.next-verify npm run build` (and serving it on a scratch port, e.g. `npx next start -p 3151`) produces a fully isolated production build that never touches or crashes the live `next dev` server's own `.next`. Always clean up afterward: kill the scratch server, `rm -rf .next-verify`. For visual/behavioral verification, Playwright (via the cached `playwright-core` module under `~/.npm/_npx/`, no direct project dependency) takes screenshots — but for anything positional or animated, prefer `page.evaluate(() => el.getBoundingClientRect())` / `getComputedStyle()` computed-geometry checks over trusting a screenshot diff; screenshots alone have proven visually inconclusive for thin/blurred/subtle elements (confirmed the `trail-light` animation this way after two screenshot comparisons looked identical — geometry showed it was genuinely animating).

## Known Open Items
- Formal Lighthouse/accessibility audit not yet run.
- `npm audit`/dependency freshness not reverified since the last pass that flagged transitive vulnerabilities and a possible Next.js patch bump — reverify before treating that status as current.
- SEO basics (Open Graph/Twitter image, real favicon beyond `icon.tsx`, structured data, sitemap) not done.
- `rafiera.com` DNS/deployment wiring not verified from this session.
- Contact form: on a server-side error, submitted field values aren't preserved (uncontrolled inputs reset) — minor UX rough edge, not a functional bug.
- Work section's `clientWork.ts` is still 7 placeholder entries (generic names, `href="#"`, stock covers) — swap for real client work as it becomes available, then re-check the hand-curated stat/CTA grid slot positions still land sensibly.
- Projects section's Reddit Clone entry has `githubUrl: "#"` — the real repo link hasn't been supplied yet.
