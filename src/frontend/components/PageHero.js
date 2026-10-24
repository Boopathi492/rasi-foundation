// Shared inner-page banner: deep-green surface with layered circles and a thin gold rule.
export default function PageHero({ eyebrow, title, children }) {
  return (
    <section className="relative overflow-hidden bg-brand-900 text-white">
      <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-700/50" />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-28 right-32 h-56 w-56 rounded-full border border-white/10" />
      <span aria-hidden="true" className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-brand-800" />
      <div className="container relative mx-auto px-4 py-14 md:py-20">
        {eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-300">{eyebrow}</p>}
        <h1 className="mt-2 max-w-3xl font-heading text-4xl font-bold md:text-5xl">{title}</h1>
        <div aria-hidden="true" className="mt-4 flex items-center gap-2">
          <span className="h-0.5 w-12 rounded-full bg-gold-400" />
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
        </div>
        {children && <p className="mt-4 max-w-2xl text-lg text-white/85">{children}</p>}
      </div>
    </section>
  );
}
