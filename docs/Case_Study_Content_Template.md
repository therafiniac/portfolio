# Case Study Content Template

A fill-in-the-blanks worksheet for real client project content — one copy of this block per project, filled out here first, then moved into `src/lib/data/clientWork.ts` (Claude does that move + the Bengali translation; you only need to write the English here).

Maps directly to the `ClientProject` fields in `src/types/index.ts`. Every field below is used somewhere on the site — either the card (`ClientWork.tsx`) or the project's own case-study page (`/work/[slug]`, built from `CaseStudy.tsx`).

**The one rule that overrides everything below**: never invent a fact. If you don't have a real answer for a field, leave it blank and skip it — a shorter, honest case study beats a padded, fabricated one. Every field except the first six is optional for exactly this reason.

---

## Ground rules before you start

- Write in plain English here — no need to translate to Bengali yourself.
- No marketing language ("passionate," "cutting-edge," "seamless," "revolutionary"). Write like you're briefing another engineer, not writing an ad.
- Every claim has to be something you could defend in an interview if asked "tell me more about that."
- Numbers/results only go in if they're real and you can stand behind them. "Improved performance" with no number is weaker than saying nothing.

---

## Card fields (always required — these show on the Work grid)

**Project name**
_The public-facing name. If under NDA, use a generic but real descriptor (e.g. "Regional Logistics Platform"), not a fake brand name._
→

**Category**
_One or two words. E.g. "E-Commerce", "SaaS Dashboard", "Restaurant & Hospitality"._
→

**Short description** (~80–90 characters, fits 2 lines on the card)
_What the site/app *does*, in one sentence. Not what problem it solved — that's the Challenge field below._
→

**Cover image**
_A real screenshot of the live site/app — the hero shot. 16:10 aspect ratio works best. If you can't share a screenshot (NDA), leave this as the placeholder stock photo and say so._
→ (file path or note)

**Live URL** (or leave blank / write "private")
_Only a real, working link. Never a guessed or fake domain._
→

**Tech stack**
_Comma-separated, e.g. "Next.js, Prisma, PostgreSQL, Tailwind CSS". Just the ones that actually mattered — not every library in package.json._
→

---

## Case-study fields (optional — only fill in what's real)

**The Challenge** (1–2 sentences)
_What the client actually needed or was struggling with. Specific, not generic — "they needed a website" tells nobody anything._
→

**Approach** (1 sentence, the single most important technical/strategic decision)
_This one renders as a pulled-out callout on the page, so it should be the one line that best proves you understood the actual problem — the "here's the clever part" line, same spirit as the O(N) algorithm claim on the Reddit Clone project._
→

**What Shipped** (2–4 short bullets)
_Concrete features/deliverables, not vague scope. "Real-time inventory sync across 3 warehouse locations" beats "inventory management."_
→ •
→ •
→ •

**Outcome** (1 sentence, only if genuinely real and specific)
_A real number, a real quote, a real "launched on time/under budget" fact. Skip this field entirely rather than write something vague — no outcome is better than a fake-sounding one._
→

**Gallery** (2–3 additional screenshots, optional)
_A different page, a mobile view, a key interaction — not more of the same shot. Quality over count; one project might only warrant one extra image, and that's fine._
→

---

## Copy-paste block (repeat per project)

```
### [Project Name]

Category:
Short description:
Cover image:
Live URL:
Tech stack:

Challenge:
Approach:
What Shipped:
-
-
-
Outcome:
Gallery:
```
