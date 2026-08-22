# SEO Audit Standard (Generic, Portable)

A comprehensive, project-agnostic SEO checklist aligned to current search
engine guidance — Google Search Central's documented ranking factors and
best practices, Core Web Vitals thresholds, schema.org structured data,
and standard technical-SEO practice. Contains no project-specific content
— copy this single file into any codebase's `docs/` folder and use it
as-is, the same way `Security_Audit_Standard.md` works.

**Intent**: the same as the security standard — if a site is built and
*maintained* against every item here, a later audit should find close to
nothing. Re-run whenever site structure changes (new content type, new
route pattern, a redesign) and periodically regardless (e.g. quarterly).

## How to use this

1. Point an audit at this file and go through every section against the
   real site — citing actual URLs/files/values, never a generic "looks
   fine."
2. Mark each item **Pass**, **Fail**, **N/A** (with a one-line reason), or
   **Needs manual verification** (things that need a live tool — Search
   Console, PageSpeed Insights, a real crawl — not just a code read).
3. Log findings in §11, same living-log convention as the security doc.
4. Severity: **Critical** (blocks indexing/ranking entirely — e.g. an
   accidental sitewide `noindex`) / **High** (meaningfully hurts
   visibility — broken structured data, missing canonical on duplicate
   content) / **Medium** (real but limited impact) / **Low**
   (best-practice polish).

---

## 1. Crawlability & Indexability

- [ ] `robots.txt` exists, is reachable at `/robots.txt`, and doesn't
      accidentally block content that should be indexed (a common
      mistake: a staging-environment `Disallow: /` left in place after
      launch).
- [ ] `sitemap.xml` exists, is referenced in `robots.txt`, is submitted to
      Search Console/Bing Webmaster Tools, and is kept current
      automatically (generated from the actual content source, not
      hand-maintained and prone to going stale).
- [ ] No page that should be indexable has an accidental `noindex` meta
      tag or `X-Robots-Tag` header — check both the rendered HTML and
      response headers, not just source code, since some frameworks set
      this dynamically.
- [ ] Every canonical URL (`<link rel="canonical">`) points to the one
      true version of that content — critical for any content reachable
      through more than one URL path (filtered/sorted list views, a
      tracking-parameter'd link, http vs https, www vs non-www,
      trailing-slash variants).
- [ ] No orphan pages — every real page is reachable via internal links
      from somewhere a crawler would find it, not only via direct URL or
      a client-side-only navigation crawlers can't follow.
- [ ] Pagination (if any) uses real, crawlable links (`<a href>`), not
      only JS-driven "load more" with no URL state — or if infinite
      scroll is used, a crawlable paginated fallback exists.
- [ ] HTTP status codes are correct: real content returns 200, missing
      content returns a real 404 (not a 200 with "not found" text — a
      "soft 404"), permanent moves use 301 not 302, and no redirect chains
      longer than one hop.

## 2. Metadata (Title, Description, Robots Directives)

- [ ] Every indexable page has a unique, descriptive `<title>` — no
      site-wide duplicate title, no title that's just the site name
      repeated on every page.
- [ ] Every indexable page has a unique meta description — written for
      humans (a compelling summary), not keyword-stuffed; understand it's
      a click-through-rate lever, not a ranking factor itself.
- [ ] Title length stays roughly within what search engines render
      without truncation (~50–60 characters is the safe target, engines
      don't hard-cut at an exact number); description similarly
      (~150–160 characters).
- [ ] Metadata is generated dynamically from actual content for anything
      programmatic (a list of products/articles/profiles) — never a
      single static title/description reused across every instance of
      a dynamic route.
- [ ] Open Graph (`og:title`, `og:description`, `og:image`, `og:url`,
      `og:type`) and Twitter Card tags are set on every shareable page, so
      social previews render correctly instead of falling back to
      whatever the platform guesses.
- [ ] `og:image` (and Twitter's image) point to a real, correctly-sized
      image (typically ~1200×630px) — a missing/broken share image is a
      common and easy-to-miss gap.

## 3. Structured Data (Schema.org / JSON-LD)

- [ ] Structured data uses JSON-LD (Google's recommended format over
      microdata/RDFa) and validates against schema.org's spec — test with
      Google's Rich Results Test or Schema Markup Validator, not just "it
      parses as JSON."
- [ ] The schema type actually matches the content (`Article`, `Product`,
      `Recipe`, `Person`, `Organization`, `BreadcrumbList`, `FAQPage`,
      etc.) — using a mismatched or overly generic type forfeits eligible
      rich-result features.
- [ ] Required properties for each schema type are present (e.g.
      `Article` needs `headline`, `image`, `datePublished`, `author`) —
      missing required fields disqualifies rich results even if the type
      itself is correct.
- [ ] Structured data values match what's actually visible on the page —
      Google's guidelines explicitly prohibit marking up content that
      isn't shown to users; mismatches can trigger a manual action.
- [ ] `BreadcrumbList` schema mirrors the site's real, visible breadcrumb
      trail if one exists.
- [ ] `Organization`/`WebSite` schema (sitewide identity, logo, search
      action) is present at the site root where applicable.

## 4. Performance & Core Web Vitals

Google uses these as a direct (if modest-weight) ranking signal, and they
correlate strongly with user experience regardless.

- [ ] **LCP (Largest Contentful Paint)** — target ≤2.5s. Usually the
      hero image or largest text block; optimize by preloading/priority-
      loading the LCP element, using a properly-sized (not oversized)
      image, and avoiding render-blocking resources above it.
- [ ] **INP (Interaction to Next Paint)** — target ≤200ms (replaced FID as
      the responsiveness metric). Avoid long JS tasks blocking the main
      thread on user interaction; break up heavy work, defer non-critical
      JS.
- [ ] **CLS (Cumulative Layout Shift)** — target ≤0.1. Every image/video/
      embed reserves its layout space (explicit width/height or aspect-
      ratio) before it loads, so nothing jumps once content arrives; same
      for web fonts (use `font-display: swap` deliberately, and size
      fallback fonts close to the real font to minimize the swap-in
      shift) and any dynamically-injected content (ads, banners) above
      existing content.
- [ ] Measure with real tooling, not guesswork: PageSpeed Insights /
      Lighthouse for lab data, Search Console's Core Web Vitals report for
      real-user field data (the one that actually affects ranking) — the
      two can disagree, field data is authoritative.
- [ ] Images use a modern format (WebP/AVIF) and are served at the
      resolution actually needed per breakpoint, not one oversized master
      file — see any project-specific image guide for the concrete
      target sizes.
- [ ] Above-the-fold content doesn't wait on unnecessary JS — prefer
      server-rendered/static HTML for anything that should be visible and
      indexable immediately.
- [ ] Fonts are subset to the scripts/characters actually used, and
      critical fonts are preloaded.

## 5. Mobile & Accessibility (overlapping SEO signals)

- [ ] The site is genuinely mobile-friendly, not just "doesn't break" —
      test with Google's Mobile-Friendly Test or real device emulation.
      Google indexes mobile-first, so the mobile rendering is what
      actually gets crawled and evaluated.
- [ ] Tap targets are large enough (≥44×44px) and spaced apart — both a
      usability and an accessibility requirement Google's mobile
      guidelines explicitly check for.
- [ ] Semantic HTML is used correctly (`<nav>`, `<main>`, `<article>`,
      proper heading hierarchy `h1`→`h2`→`h3` with no skipped levels) —
      helps both accessibility tools and search engines understand page
      structure.
- [ ] Every meaningful image has real, descriptive `alt` text — not just
      present-to-satisfy-a-linter, actually descriptive of the image's
      content/purpose; purely decorative images use `alt=""` deliberately
      rather than a meaningless filler string.
- [ ] Sufficient color contrast, keyboard navigability — both
      accessibility requirements that Google's guidelines increasingly
      treat as part of overall page-quality signals, not unrelated to SEO.

## 6. URL Structure

- [ ] URLs are human-readable and descriptive (words, not IDs/hashes
      alone) — `/blog/how-to-x` over `/blog/p?id=48291`.
- [ ] URLs are stable — changing a URL loses any accumulated ranking
      signal unless a proper 301 redirect is put in place from the old
      URL to the new one, permanently (not a temporary fix removed later).
- [ ] URL structure reflects real site hierarchy/taxonomy where it makes
      sense (category/subcategory nesting), without going so deep it
      becomes unwieldy.
- [ ] No duplicate content reachable via multiple distinct URLs without a
      canonical tag resolving them to one (tracking parameters, session
      IDs, sort/filter combinations that don't change the actual content
      meaningfully).
- [ ] HTTPS everywhere, HTTP redirects to HTTPS (301, sitewide) — a
      confirmed ranking factor, not just a security best practice.

## 7. Internal Linking & Site Architecture

- [ ] Important pages are reachable within a few clicks from the
      homepage — content buried many levels deep gets crawled/ranked
      less.
- [ ] Internal links use descriptive anchor text (what the linked page is
      about), not generic "click here"/"read more" everywhere.
- [ ] A logical content hierarchy exists (hub/category pages linking out
      to detail pages, detail pages linking back and to related content)
      rather than a flat pile of disconnected pages.
- [ ] No broken internal links (404s) — run a periodic crawl (Screaming
      Frog or equivalent) rather than assuming links stay valid as
      content changes.
- [ ] External links to genuinely untrusted/user-generated destinations
      use `rel="nofollow"` or `rel="ugc"` as appropriate; `rel="sponsored"`
      for paid/affiliate links — required by Google's guidelines to avoid
      passing unearned ranking signal.

## 8. Content Quality & E-E-A-T

(Experience, Expertise, Authoritativeness, Trustworthiness — Google's own
framing for what separates content worth ranking well from content that
technically checks every box but isn't actually useful.)

- [ ] Content is genuinely original and substantive — not thin,
      auto-generated, or scraped/duplicated from elsewhere without
      significant added value.
- [ ] Author identity is clear where relevant (byline, author bio/profile
      page) — especially important for anything that could be considered
      YMYL (Your Money or Your Life: health, finance, safety, legal)
      content, where Google's guidelines weight trust signals heavily.
- [ ] Content is kept current — outdated information (especially
      time-sensitive facts) is updated or clearly dated, not left stale
      indefinitely with no indication of when it was last accurate.
- [ ] No manipulative practices: no keyword stuffing, no hidden text/
      links, no cloaking (showing different content to crawlers than to
      users), no doorway pages built solely to funnel search traffic —
      all explicit violations of Google's spam policies that risk a
      manual action/ranking penalty, not just "suboptimal."
- [ ] Duplicate content across the same site (or syndicated elsewhere
      without a canonical pointing back) is minimized or properly
      canonicalized.

## 9. Internationalization (if applicable)

- [ ] If the site serves multiple languages/regions, `hreflang` tags
      correctly cross-reference every language/region variant of a page,
      including a self-referencing hreflang on each version — a common
      and high-impact mistake is an incomplete or asymmetric hreflang set.
- [ ] `lang` attribute is set correctly on `<html>` per page/locale.
- [ ] Each locale has genuinely translated/localized content, not just a
      machine-translated wrapper around the same URLs with a language
      switcher that doesn't change indexable content.

## 10. Monitoring & Ongoing Signals

- [ ] Google Search Console (and Bing Webmaster Tools) is set up and
      actually checked periodically — not just installed once. It's the
      only source of real crawl errors, manual actions, and search-query
      performance data.
- [ ] Analytics (privacy-respecting, and disclosed per applicable
      regulation) is in place to actually measure organic traffic trends,
      not just assumed to be fine.
- [ ] A process exists for noticing and responding to a ranking/traffic
      drop (algorithm update, technical regression, manual action) rather
      than discovering it much later by accident.
- [ ] 404 monitoring exists (Search Console's Coverage report, or log
      analysis) so broken pages that used to rank get caught and either
      fixed or properly redirected.

## 11. Findings Log (living document — update every audit)

| Date | Section | Finding | Severity | Status |
|---|---|---|---|---|
| _(example)_ 2026-01-01 | §4 Performance | LCP hero image not preloaded, measured 3.8s | High | Fixed 2026-01-05 |
| 2026-08-22 | §1 Crawlability | No `robots.txt` | High | Fixed — `src/app/robots.ts` |
| 2026-08-22 | §1 Crawlability | No `sitemap.xml` | High | Fixed — `src/app/sitemap.ts` (single URL, single-page site) |
| 2026-08-22 | §1 Crawlability | No canonical URL declared | High | Fixed — `alternates.canonical` in `layout.tsx` metadata |
| 2026-08-22 | §2 Metadata | No Open Graph tags (title/description/url/image/type/locale) | High | Fixed — `openGraph` in `layout.tsx` metadata |
| 2026-08-22 | §2 Metadata | No Twitter Card tags | High | Fixed — `twitter` in `layout.tsx` metadata |
| 2026-08-22 | §2 Metadata | No `og:image`/Twitter image | High | Fixed — `src/app/opengraph-image.tsx` (1200×630, matches BrandMark/icon.tsx visual language) |
| 2026-08-22 | §2 Metadata | No `metadataBase` — relative URLs (og:image, canonical) would resolve against localhost in some deploy contexts | Medium | Fixed — `metadataBase: new URL(SITE_URL)` |
| 2026-08-22 | §3 Structured Data | No JSON-LD anywhere | High | Fixed — `Person` + `WebSite` JSON-LD in `layout.tsx`, values match visible page content (name, role, verified profile links) |
| 2026-08-22 | §4 Performance | LCP element (Hero name, server-rendered text) already unblocked by JS — the r3f canvas/3D mark are separately `dynamic(..., { ssr: false })`-loaded | — | Pass, no action needed |
| 2026-08-22 | §5 Accessibility | Heading hierarchy (`h1` → `h2` → `h3`) has no skipped levels; real `alt` text on the one real content image (Client Work covers) | — | Pass |
| 2026-08-22 | §5 Accessibility | Navbar icon buttons (theme/language toggle, mobile menu) are 36×36px, under the 44×44px tap-target guideline | Low | **Not fixed** — would require changing button dimensions (layout/design), out of scope for this pass per explicit instruction. Flagging for a future design-inclusive pass. |
| 2026-08-22 | §7 Internal Linking | Navbar anchor hrefs (#work/#stack/#experience/#contact) verified against actual section `id`s — no broken internal links | — | Pass |
| 2026-08-22 | §9 i18n | Bengali content is a client-side `data-lang` toggle, not separate crawlable URLs — `hreflang` doesn't apply, and Bengali content isn't independently indexable by search engines | Medium | **Not fixed** — this is the deliberate single-page architecture (AGENTS.md: no multi-page routing/locale paths). A real fix (per-locale URLs) directly conflicts with that constraint; noting the tradeoff rather than silently working around it. |
| 2026-08-22 | §10 Monitoring | Search Console/Bing Webmaster setup, Core Web Vitals field data, color contrast | — | Needs manual verification — requires live accounts/tools, not a code-level check. |

---

## Appendix: Standards Referenced

- **Google Search Central Documentation** — the authoritative source for
  what Google's crawlers/ranking systems actually expect; this checklist
  summarizes its most load-bearing, testable points.
- **Core Web Vitals** (Google) — LCP/INP/CLS thresholds as defined above;
  thresholds are periodically revised (INP replaced FID in 2024) — verify
  current thresholds/metrics rather than trusting this doc indefinitely.
- **schema.org** — the vocabulary structured data (JSON-LD) is built
  against.
- **Google Search Essentials / Spam Policies** — the manipulative-practice
  prohibitions referenced in §8.
- Accessibility overlap (§5) tracks WCAG-adjacent practices where they
  double as SEO signals — for a full accessibility audit, use a dedicated
  WCAG checklist rather than relying on this section alone.
