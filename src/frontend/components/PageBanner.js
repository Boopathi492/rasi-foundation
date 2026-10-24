// Full-width module banner shared by the About, Colleges, Courses and Scholarships pages.
// Deep-green surface with a maroon accent shape and a gold rule; `aside` holds a page-specific visual.
export default function PageBanner({ eyebrow, title, children, actions, aside, stats, tone = 'green' }) {
  const surface =
    tone === 'maroon'
      ? 'bg-gradient-to-br from-[#7d0a1f] via-[#9c0f29] to-[#5c0817]'
      : 'bg-gradient-to-br from-forest-dark via-forest to-[#0a6a52]';
  return (
    <section className={`relative overflow-hidden text-white ${surface}`}>
      <span aria-hidden="true" className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-white/10" />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full border border-gold-300/30" />
      <span aria-hidden="true" className="pointer-events-none absolute -left-20 bottom-0 h-44 w-44 rounded-full bg-crimson/40" />
      <div className={`container relative mx-auto grid items-center gap-8 py-12 md:py-16 ${aside ? 'lg:grid-cols-[1.15fr_0.85fr]' : ''}`}>
        <div>
          {eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-300">{eyebrow}</p>}
          <h1 className="mt-2 max-w-3xl font-heading text-4xl font-bold leading-tight md:text-5xl">{title}</h1>
          <div aria-hidden="true" className="mt-4 flex items-center gap-2">
            <span className="h-0.5 w-14 rounded-full bg-gold-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
          </div>
          {children && <p className="mt-4 max-w-2xl text-base text-white/85 md:text-lg">{children}</p>}
          {actions && <div className="mt-6 flex flex-col gap-3 sm:flex-row">{actions}</div>}
          {stats && stats.length > 0 && (
            <dl className="mt-8 flex flex-wrap gap-3">
              {stats.map((s) => (
                <div key={s.label} className="min-w-[110px] rounded-2xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-sm">
                  <dd className="font-heading text-2xl font-bold text-gold-300">{s.value}</dd>
                  <dt className="text-xs text-white/80">{s.label}</dt>
                </div>
              ))}
            </dl>
          )}
        </div>
        {aside && <div className="relative mx-auto w-full max-w-md lg:max-w-none">{aside}</div>}
      </div>
      <svg aria-hidden="true" className="relative block h-6 w-full text-[#fbfaf6] md:h-8" viewBox="0 0 1440 40" preserveAspectRatio="none">
        <path d="M0 40V18C240 0 480 36 720 22C960 8 1200 34 1440 12V40Z" fill="currentColor" />
      </svg>
    </section>
  );
}
