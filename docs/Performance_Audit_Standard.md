# Performance Audit Standard (Generic, Portable)

A comprehensive, project-agnostic web performance checklist — Core Web
Vitals (Google), standard caching/asset-optimization practice, and
database/query performance principles. Framework-agnostic by design; copy
this single file into any codebase's `docs/` folder and use it as-is, same
pattern as `Security_Audit_Standard.md`/`SEO_Audit_Standard.md`. Framework-
specific implementation notes (e.g. Next.js's ISR, Server Components,
`next/image`) belong in a project-specific findings doc when this checklist
is actually run against a real codebase, not in this template.

**Intent**: the same as the other two standards — build and *maintain*
against every item here, and a later audit should find little. Re-run
whenever a new feature adds real data volume, a new third-party
dependency, or a new page pattern; periodically regardless.

## How to use this

1. Run each section against the real site — measure, don't guess. Several
   items require actual tooling (Lighthouse, WebPageTest, a real database
   `EXPLAIN`, browser DevTools' Performance/Network tabs), not a code read
   alone; mark those **Needs measurement** rather than assuming.
2. Mark each item **Pass**, **Fail**, **N/A** (one-line reason), or
   **Needs measurement**.
3. Log findings in §9, same living-log convention as the other standards.
4. Severity: **Critical** (site-breaking slowness, timeout, or a query
   that scales badly enough to eventually crash) / **High** (clearly
   outside target thresholds, real user impact) / **Medium** (measurable
   but limited impact) / **Low** (headroom/best-practice).
5. **Measure before optimizing, always.** Don't "fix" something that
   isn't shown to be slow — that's wasted effort and sometimes makes code
   worse for no real gain. Every fix in this checklist should trace back
   to an actual measurement.

---

## 1. Core Web Vitals & Page-Load Metrics

Same thresholds as `SEO_Audit_Standard.md` §4 (performance is a shared
concern between the two docs — don't duplicate that checklist here, just
cross-reference it):

- [ ] LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 — measured via real-user field data
      (Search Console's Core Web Vitals report, or an equivalent RUM tool),
      not lab data alone. Lab tools (Lighthouse) are useful for
      *debugging* a slow page, but field data is what actually reflects
      real visitors on real networks/devices.
- [ ] Time to First Byte (TTFB) is reasonable (~<600ms) — a slow TTFB
      usually points at server/database work happening before any HTML
      can start streaming, not a frontend problem.
- [ ] Total JS shipped to the client is proportionate to the page — check
      bundle size in DevTools' Network tab or a bundle analyzer; a simple
      content page shouldn't ship as much JS as a complex interactive one.

## 2. Rendering Strategy (Static vs. Dynamic vs. Streaming)

Framework-agnostic framing — every modern framework has some version of
each of these; the specific API differs, the principle doesn't:

- [ ] Content that's the same for every visitor and doesn't change often
      is pre-rendered/cached at build or deploy time (static generation),
      not recomputed on every single request.
- [ ] Content that changes per-request (personalized, real-time, or
      driven by request-specific filters/query params) is rendered
      dynamically — but even then, check whether a shorter-lived cache
      (seconds-to-minutes) is viable rather than zero caching at all.
- [ ] Content that's *mostly* static but needs to update periodically
      (a blog list, a product catalog) uses an incremental/revalidation
      strategy — regenerate on a timer or on-demand, rather than forcing
      either "fully static and staleness stays forever" or "fully dynamic
      and every request pays full render cost."
- [ ] Large pages stream/progressively render rather than blocking the
      entire response on the slowest piece of data — the above-the-fold
      content shouldn't wait on a slow below-the-fold data fetch.
- [ ] Client-side JavaScript is reserved for what's genuinely interactive;
      content that never changes after load doesn't need to be
      client-rendered.

## 3. Caching Strategy

- [ ] Every cache (HTTP cache headers, CDN edge cache, application-level
      cache, database query cache) has an explicit invalidation strategy —
      "cache it and hope it goes stale gracefully" is not a strategy.
      Know exactly what triggers a cache bust for each layer.
- [ ] Static assets (JS/CSS/images/fonts) are served with long
      `Cache-Control` (immutable, far-future expiry) plus content-hashed
      filenames, so a deploy safely busts the cache without needing a
      manual purge.
- [ ] HTML/API responses that are cacheable at all use appropriate
      `Cache-Control`/`stale-while-revalidate` semantics rather than
      either no caching or overly aggressive caching that serves stale
      data past when it matters.
- [ ] A CDN sits in front of static assets (and cacheable HTML, where
      applicable) — don't serve everything from a single origin server if
      a CDN is available and unused.
- [ ] Expensive, repeated computations (not just raw data fetches) are
      cached with a known invalidation trigger, not recomputed identically
      on every request.

## 4. Database & Query Performance

- [ ] Every query that filters, sorts, or joins on a column has an index
      on that column — check with the database's own query planner
      (`EXPLAIN`/`EXPLAIN ANALYZE` in Postgres/MySQL) rather than assuming.
- [ ] No N+1 query pattern — fetching a list, then issuing one additional
      query per item in a loop. Use a join, a batched `WHERE ... IN (...)`,
      or the ORM's own eager-loading mechanism instead.
- [ ] Every endpoint/query that can return an unbounded result set is
      paginated — no "fetch everything, filter in application code"
      pattern on a table that can grow.
- [ ] Connection pooling is configured appropriately for the deployment
      model — this matters especially for serverless functions, where a
      naive per-invocation connection can exhaust a database's connection
      limit under load; use a pooler (e.g. PgBouncer, or the database
      provider's own pooling layer) rather than raw per-request
      connections in that environment.
- [ ] Queries fetch only the columns/fields actually needed (`SELECT`
      specific columns, not `SELECT *` reflexively) for any table with
      wide rows or large text/blob columns.
- [ ] Slow-query logging/monitoring exists so a query that degrades as
      data grows gets caught before it becomes a production incident, not
      discovered by users first.

## 5. Asset Optimization

- [ ] Images are served in a modern format (WebP/AVIF) at the resolution
      actually needed per breakpoint/use — see any project-specific image
      guide for concrete target sizes; the general principle is "never
      ship more pixels than will ever be displayed."
- [ ] Images below the fold are lazy-loaded; the single largest
      above-the-fold image (usually the LCP element) is *not*
      lazy-loaded — it should load with priority instead.
- [ ] Fonts are subset to the actual character set used, self-hosted or
      loaded with `preconnect`/`preload` where a third-party font host is
      unavoidable, and use `font-display: swap` (or equivalent) so text
      renders immediately in a fallback font rather than staying invisible
      while the real font loads.
- [ ] CSS/JS are minified and compressed (gzip/brotli) in production —
      confirm this is actually happening (check response headers), not
      just assumed because "the framework probably does it."
- [ ] Unused CSS/JS is not shipped — check for dead code from removed
      features, unused dependencies, or a CSS framework's full stylesheet
      when only a fraction of its classes are ever used.
- [ ] Third-party scripts (analytics, chat widgets, ads) are loaded
      deferred/async and audited periodically — each one is a real,
      often-invisible cost to load time and main-thread availability.

## 6. JavaScript Bundle & Runtime Performance

- [ ] Code-splitting happens at a reasonable granularity — a route/page
      doesn't ship JavaScript for features unrelated to it (an admin-only
      rich-text editor's dependencies shouldn't load on a public content
      page, for example).
- [ ] Heavy, rarely-needed dependencies are lazy-loaded (dynamic
      `import()` or the framework's equivalent) rather than included in
      the initial bundle unconditionally.
- [ ] No unnecessary re-renders/re-computations on the frontend — check
      with the framework's own profiler (React DevTools Profiler, etc.)
      for components re-rendering without their actual inputs changing;
      memoize where profiling shows it matters, not everywhere
      preemptively (premature memoization has its own cost).
- [ ] Expensive client-side computation (parsing, transforming large
      data) is debounced/throttled where triggered by frequent events
      (scroll, resize, keystroke), or moved off the main thread (a Web
      Worker) if genuinely heavy.
- [ ] Long-lived client-side subscriptions/listeners/timers are cleaned
      up on unmount — a memory leak degrades performance over a long
      session even if each individual render is fast.

## 7. Server & Infrastructure

- [ ] The deployment target actually has a CDN/edge network for static
      content and (where supported) edge-rendered dynamic content close
      to users, rather than a single origin region serving a global
      audience.
- [ ] Server response compression (gzip/brotli) is enabled for
      text-based responses (HTML/CSS/JS/JSON).
- [ ] Cold-start latency is understood for serverless/function-based
      deployments — measure it, and know whether it materially affects
      real users (a rarely-hit admin route cold-starting is very
      different from a public homepage cold-starting).
- [ ] Health checks/monitoring exist for response time, not just uptime —
      a server that's "up" but responding slowly is still a real
      performance failure that should be visible.
- [ ] Auto-scaling (if applicable) is configured to actually respond to
      real traffic patterns, not left at a default that either
      over-provisions (wasted cost) or under-provisions (slow under load).

## 8. Perceived Performance (UX-Level)

- [ ] Loading states exist for anything that takes noticeable time —
      a skeleton/spinner beats a blank screen or a frozen-looking page.
- [ ] Optimistic UI updates are used where safe (the action almost always
      succeeds and failure can be rolled back cleanly) — the interface
      feels instant even when the actual server round-trip hasn't
      finished.
- [ ] Perceived load order is deliberate — the most important content
      (what the user came for) renders before secondary chrome
      (navigation, footer, unrelated widgets), not in arbitrary DOM order.
- [ ] Interactions provide immediate feedback (a button shows a pressed/
      loading state) even if the underlying operation takes a moment —
      users perceive unresponsive UI as broken, not just slow.

## 9. Findings Log (living document — update every audit)

| Date | Section | Finding | Severity | Status |
|---|---|---|---|---|
| _(example)_ 2026-01-01 | §4 Database | Missing index on `orders.user_id`, full table scan on every order-history page load | High | Fixed 2026-01-05 |

---

## Appendix: Standards Referenced

- **Core Web Vitals** (Google) — LCP/INP/CLS, shared reference point with
  `SEO_Audit_Standard.md` §4; thresholds are periodically revised, verify
  current ones rather than trusting this doc indefinitely.
- **HTTP Caching (RFC 9111)** — the underlying spec behind
  `Cache-Control`/`stale-while-revalidate` semantics referenced in §3.
- General database performance practice (query planning, indexing,
  connection pooling) — largely universal across relational databases;
  exact tooling (`EXPLAIN` syntax, pooler choice) differs by engine.
