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
              To create meaningful travel experiences that connect people to Kenya&apos;s landscapes, wildlife, and culture in a genuine and unforgettable way.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 scroll-reveal border border-outline-variant/30" style={{ transitionDelay: '100ms' }}>
            <div className="w-16 h-16 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center mb-md">
              <span className="material-symbols-outlined text-[28px]">visibility</span>
            </div>
            <h3 className="font-title-lg text-title-lg text-primary mb-sm">Our Vision</h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              To become a trusted gateway to authentic African travel, where every journey inspires connection, respect, and wonder.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
