const values = [
  {
    icon: 'explore',
    title: 'Beyond the typical routes',
    description: 'We take you beyond the typical routes into authentic, meaningful experiences that connect you to Kenya in a deeper way.',
  },
  {
    icon: 'support_agent',
    title: 'Seamless from start to finish',
    description: 'From the moment you arrive to the moment you leave, every detail is handled seamlessly so you can focus on the experience.',
  },
  {
    icon: 'language',
    title: 'Local expertise',
    description: 'Our local expertise ensures you get the best routes, the best guides, and the moments that truly matter.',
  },
  {
    icon: 'health_and_safety',
    title: 'Comfort and safety first',
    description: 'Your comfort and safety are always our priority, no compromises.',
  },
  {
    icon: 'tune',
    title: 'Built around you',
    description: 'We listen first, then design. Your journey is built around you, not the other way around.',
  },
];

export default function CoreValues() {
  return (
    <section className="py-xl px-gutter bg-surface text-body-md">
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-xl scroll-reveal">
          <span className="font-label-md text-label-md text- uppercase tracking-widest mb-4 block">
            Why Choose Us
          </span>
          <h2 className="font-headline-md text-headline-md text-body-md mb-4">The HuntersVille difference</h2>
          <p className="font-body-lg text-body-lg text-body-md max-w-2xl mx-auto leading-relaxed">
            We take you beyond the typical routes into authentic, meaningful experiences that connect you to Kenya in a deeper way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-xl">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="group relative rounded-2xl border border-on-primary/10 bg-on-primary/5 p-8 transition-all duration-500 hover:border-amber-500/40 hover:bg-on-primary/10 hover:-translate-y-1 scroll-reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500 text-body-md mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <span className="material-symbols-outlined text-[32px]">{v.icon}</span>
              </div>

              <h3 className="font-title-lg text-title-lg text-body-md mb-3 group-hover:text-amber-400 transition-colors duration-300">{v.title}</h3>
              <p className="font-body-md text-body-md text-body-md leading-relaxed">{v.description}</p>

              <div className="absolute top-6 right-6 font-display-lg text-display-lg text-body-md/10 group-hover:text-amber-500/20 transition-colors duration-500">
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-8 md:p-12 scroll-reveal">
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-amber-500 text-body-md">
              <span className="material-symbols-outlined text-[40px]">verified</span>
            </div>
            <div className="flex-1">
              <h3 className="font-title-lg text-title-lg text-amber-400 mb-3">Our Commitment</h3>
              <p className="font-body-lg text-body-lg text-body-md leading-relaxed mb-4">
                We believe travel should give back. That&apos;s why we work closely with local communities, support conservation efforts, and promote responsible tourism practices that protect Kenya&apos;s natural beauty for generations to come.
              </p>
              <p className="font-body-md text-body-md text-body-md leading-relaxed">
                Every journey you take with us contributes to preserving wildlife, empowering local guides, and supporting the communities that make these experiences possible. Travel with us, and be part of something bigger.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
