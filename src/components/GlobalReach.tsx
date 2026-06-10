export default function GlobalReach() {
  const locations = [
    { name: 'Kenya', icon: 'public' },
    { name: 'Tanzania', icon: 'terrain' },
    { name: 'Uganda', icon: 'forest' },
    { name: 'Rwanda', icon: 'landscape' }
  ];

  return (
    <section className="w-full bg-primary py-xl my-xl scroll-reveal">
      <div className="max-w-container-max mx-auto px-gutter text-center">
        <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-white mb-4">
          Global Reach, Local Expertise
        </h2>
        <p className="font-body-lg text-body-lg text-primary-fixed-dim max-w-2xl mx-auto mb-lg">
          Operating across the most breathtaking landscapes of East Africa.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-md mt-8">
          {locations.map((loc, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border border-primary-fixed-dim/30 flex items-center justify-center mb-4 text-white hover:bg-white/10 transition-colors duration-300">
                <span className="material-symbols-outlined text-[32px]">{loc.icon}</span>
              </div>
              <h3 className="text-white font-title-lg">{loc.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
