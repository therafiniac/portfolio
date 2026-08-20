export function Hero() {
  return (
    <section className="flex min-h-screen flex-col justify-center border-t border-line px-6 md:px-12">
      <div className="mx-auto w-full max-w-5xl">
        <p className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
          <span
            className="h-1.5 w-1.5 rounded-full bg-status-live motion-safe:animate-pulse"
            aria-hidden="true"
          />
          STATUS: OPEN TO OPPORTUNITIES · KOLKATA, INDIA / REMOTE
        </p>
        <h1 className="font-mono text-4xl font-medium leading-tight text-text-primary sm:text-5xl md:text-6xl">
          Rafi Ahmed Laskar
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-text-muted md:text-xl">
          Full Stack Developer — Next.js / TypeScript / Systems that scale.
        </p>
        <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-[0.1em]">
          {[
            { value: "4+", label: "Years Experience" },
            { value: "150+", label: "Sites Shipped" },
            { value: "O(N)", label: "Comment-Tree Algorithm" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-accent-secondary">{stat.value}</dd>
              <span className="text-text-muted" aria-hidden="true">
                {stat.label}
              </span>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
