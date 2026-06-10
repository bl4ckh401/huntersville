export default function MissionVision() {
  return (
    <section className="py-xl px-gutter bg-surface-container-low">
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-lg scroll-reveal">
          <h2 className="font-headline-md text-headline-md text-primary">Purpose Driven</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {/* Mission */}
          <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 scroll-reveal border border-outline-variant/30">
            <div className="w-16 h-16 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center mb-md">
              <span className="material-symbols-outlined text-[28px]">public</span>
            </div>
            <h3 className="font-title-lg text-title-lg text-primary mb-sm">Our Mission</h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              To orchestrate seamless, awe-inspiring safaris that immerse our guests in the majestic landscapes of East Africa, while actively funding and supporting local wildlife conservation and community empowerment initiatives.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 scroll-reveal border border-outline-variant/30" style={{ transitionDelay: '100ms' }}>
            <div className="w-16 h-16 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center mb-md">
              <span className="material-symbols-outlined text-[28px]">visibility</span>
            </div>
            <h3 className="font-title-lg text-title-lg text-primary mb-sm">Our Vision</h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              To be the global benchmark for sustainable, luxury ecotourism in Africa, recognized for creating profound connections between discerning travelers and the untamed natural world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
