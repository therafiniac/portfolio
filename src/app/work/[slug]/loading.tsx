// Next's App Router shows this automatically while a case-study segment
// is loading — most of the time that's near-instant (every slug is
// prerendered, see generateStaticParams in page.tsx), but a slow
// connection or the first navigation after a deploy can still show a
// blank frame without this. Mirrors CaseStudy.tsx's actual layout
// (back-link, category/name, cover box) as pulsing bars/boxes rather
// than a generic spinner, so the page doesn't visibly reflow once the
// real content replaces it.
export default function CaseStudyLoading() {
  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-32 md:px-12 md:pt-40">
      <div className="h-4 w-24 motion-safe:animate-pulse rounded bg-line/40" />

      <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="h-3 w-28 motion-safe:animate-pulse rounded bg-line/40" />
          <div className="mt-3 h-10 w-64 motion-safe:animate-pulse rounded bg-line/40" />
        </div>
      </div>

      <div className="mt-8 aspect-[16/10] w-full motion-safe:animate-pulse rounded-2xl border border-line/60 bg-line/20" />

      <div className="mt-8 h-4 w-full max-w-2xl motion-safe:animate-pulse rounded bg-line/40" />
      <div className="mt-2 h-4 w-2/3 max-w-2xl motion-safe:animate-pulse rounded bg-line/40" />
    </div>
  );
}
