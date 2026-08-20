<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENT.md — Rafi Ahmed Laskar Portfolio

This file holds the rules that must not be silently violated: facts, brand tokens, content constraints, scope boundaries. It's meant to stay short and rarely change. For how the site is currently built — page structure, component map, the contact form's architecture, motion/engineering detail — see `docs/architecture.md`, which is a snapshot updated at natural checkpoints, not on every experiment. Try things in code first; write it down once it's settled.

## Objective
A single-page, futuristic portfolio for Rafi Ahmed Laskar, a Full Stack Developer **and Designer** (4+ yrs), targeting Tier 1 product companies (Freshworks, Zoho, BrowserStack, Postman) and project inquiries. Never label Rafi "a freelancer" in on-page copy. Read as engineered, not templated.

## Source of Truth
- Biographical/work facts (roles, dates, employers, project details, links) come from `docs/Rafi_Ahmed_Laskar_CV_OnePage.docx`. Canonical fact source — don't invent or soften what it states; re-check it rather than relying on a prior session's paraphrase.
- Code standards: `docs/Production_Code_Standards.md`, imported into `CLAUDE.md`, auto-loads every session — apply it without being asked.
- Verified public links (use exactly these, no invented URLs):
  - Email: `therafiniac@gmail.com`
  - GitHub: `github.com/therafiniac`
  - LinkedIn: `linkedin.com/in/therafiniac`
  - Domain: `rafiera.com`
  - Reddit Clone live demo: `reddit-clone-five-chi.vercel.app`
  - Blog Manager & CMS Dashboard is a **private Semigon repo** — no public link, description only.

## Design Tokens
Catppuccin, both flavors (dark = Mocha, light = Latte), same semantic roles in both — but deliberately **not** the teal/peach pairing Catppuccin's own marketing showcases everywhere. Blue/maroon instead: same coherent family, far less instantly recognizable as "a Catppuccin site" to anyone who's seen it in a terminal theme. This table is the part that must not drift:

| Token | Mocha (dark) | Latte (light) | Role |
|---|---|---|---|
| `--bg` | `#11111B` (`crust`) | `#DCE0E8` (`crust`) | page background |
| `--surface` | `#181825` (`mantle`) | `#E6E9EF` (`mantle`) | glass panel base |
| `--line` | `#45475A` (`surface1`) | `#BCC0CC` (`surface1`) | hairline borders |
| `--text-primary` | `#CDD6F4` (`text`) | `#4C4F69` (`text`) | body/heading text |
| `--text-muted` | `#A6ADC8` (`subtext0`) | `#6C6F85` (`subtext0`) | secondary text |
| `--accent` | `#89B4FA` (`blue`) | `#1E66F5` (`blue`) | interactive only |
| `--accent-secondary` | `#EBA0AC` (`maroon`) | `#E64553` (`maroon`) | non-interactive emphasis |
| `--status-live` | `#A6E3A1` (`green`) | `#40A02B` (`green`) | literal live/online status only |
| `--danger` | `#F38BA8` (`red`) | `#D20F39` (`red`) | form/validation errors only |

Blue/maroon/green/red each have exactly one job in the *UI* — don't repurpose one for another's role. `--gradient-signature` (`linear-gradient(135deg, var(--accent), var(--accent-secondary))`) is Rafi's mark: use it deliberately and repeatedly (brand mark, key headlines, primary CTA) so it reads as a signature, not a one-off. Decorative-only moments (project cover art, background blobs) may pull wider Catppuccin hues (mauve, sapphire, teal, lavender) for variety — the one place the palette opens up beyond the semantic pair + signature gradient. Type: mono (JetBrains Mono / IBM Plex Mono) for display/headlines and data labels, Inter for body — not locked in if it becomes a barrier to a specific design move, but don't swap it casually either.

## Content Rules
- The CV is reference material for facts, not a script for copy — condense, reword, or omit freely to serve the design. Never fabricate a fact it doesn't support (no invented metrics, fabricated client names, or fake testimonials).
- Bias toward less text, not more — if a section reads like a resume printout, cut it down.
- Copy reads from a hiring engineer's perspective: specific, technical, no marketing fluff ("passionate," "synergy," etc. are banned).
- Every project claim must be interview-defensible.
- Placeholder content (client project names/links/images not yet real) must stay honest: `href="#"` never a fake domain, generic names never invented brand names, verified-working stock images never guessed URLs.

## Explicitly Out of Scope
- Blog/CMS integration, multi-page routing, analytics dashboard, persistent rate-limiting infra (would need Redis/KV).
- Footer, About panel, Education panel.
- A custom cursor (replacing the OS pointer icon) — the cursor-reactive ambient glow is a background light layer, not a cursor replacement.
- Any framing of Rafi as "a freelancer."
- A standalone algorithm-visualization section — shipped, reviewed, cut. Don't re-add without being asked again.
