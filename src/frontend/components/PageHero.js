// Shared inner-page institutional banner.
export default function PageHero({ eyebrow, title, children }) {
  return (
    <section className="relative overflow-hidden border-b border-[#054235] bg-[#075544] text-white">
      <div className="container relative mx-auto px-4 py-12 md:py-16">
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-300">{eyebrow}</p>}
        <h1 className="mt-2 max-w-3xl font-heading text-3xl font-bold sm:text-4xl md:text-5xl">{title}</h1>
        <div aria-hidden="true" className="mt-4 h-0.5 w-12 bg-gold-400" />
        {children && <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">{children}</p>}
      </div>
    </section>
  );
}
