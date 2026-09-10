export default function Philosophy() {
  return (
    <section className="max-w-container-max mx-auto px-gutter py-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
        <div>
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md">Our Philosophy</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 leading-relaxed">
            We believe that travel should be transformative, not just transactional. Our commitment is to curate sustainable, profound experiences that connect you deeply with the landscapes, wildlife, and cultures of East Africa.
          </p>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Every journey we craft is a testament to our respect for the environment and local communities, ensuring your adventure leaves a positive legacy.
          </p>
          <button className="mt-8 border-b-2 border-primary text-primary font-label-md text-label-md pb-1 hover:text-primary-container hover:border-primary-container transition-colors">
            Discover Our Impact
          </button>
        </div>
        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/LeeTour.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <p className="font-label-sm text-label-sm uppercase tracking-wider text-primary-fixed-dim">Profound experiences</p>
            <p className="font-headline-sm text-headline-sm font-semibold">Experience Africa with the Best</p>
          </div>
        </div>
      </div>
    </section>
  );
}
