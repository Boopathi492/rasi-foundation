// Full-width institutional module banner shared by the About, Colleges, Courses and Scholarships pages.
export default function PageBanner({ eyebrow, title, children, actions, aside, stats, tone = 'green' }) {
  const surface =
    tone === 'maroon'
      ? 'bg-[#8f0b24] border-b border-[#6e081c]'
      : 'bg-[#075544] border-b border-[#054235]';
  return (
    <section className={`relative overflow-hidden text-white ${surface}`}>
      <div className={`container relative mx-auto grid items-center gap-8 px-4 py-12 md:py-16 ${aside ? 'lg:grid-cols-[1.15fr_0.85fr]' : ''}`}>
        <div>
          {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-300">{eyebrow}</p>}
          <h1 className="mt-2 max-w-3xl font-heading text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">{title}</h1>
          <div aria-hidden="true" className="mt-4 h-0.5 w-12 bg-gold-400" />
          {children && <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">{children}</p>}
          {actions && <div className="mt-6 flex flex-col gap-3 sm:flex-row">{actions}</div>}
          {stats && stats.length > 0 && (
            <dl className="mt-8 flex flex-wrap gap-3">
              {stats.map((s) => (
                <div key={s.label} className="min-w-[110px] rounded-xl border border-white/15 bg-white/[0.08] px-5 py-3">
                  <dd className="font-heading text-2xl font-bold text-gold-300">{s.value}</dd>
                  <dt className="text-xs text-white/80">{s.label}</dt>
                </div>
              ))}
            </dl>
          )}
        </div>
        {aside && <div className="relative mx-auto w-full max-w-md lg:max-w-none">{aside}</div>}
      </div>
    </section>
  );
}
