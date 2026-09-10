import Image from 'next/image';
import Link from 'next/link';

export default function ExpeditionFleet() {
  const vehicleFeatures = [
    {
      icon: 'photo_camera',
      title: '360° Photographic Pop-Up Roof',
      desc: 'Unobstructed game viewing and high-angle wildlife photography with padded beanbag rests.',
    },
    {
      icon: 'battery_charging_full',
      title: '220V/110V Inverter Power Bays',
      desc: 'Charge cameras, drone batteries, and laptops on the move during full-day game drives.',
    },
    {
      icon: 'ac_unit',
      title: 'Onboard Electric Fridge & Refreshments',
      desc: 'Chilled mineral water, fresh juices, and fine wines kept cool in the East African heat.',
    },
    {
      icon: 'satellite_alt',
      title: 'Garmin Satellite & HF Radio Link',
      desc: 'Real-time telemetry connected 24/7 to our Nairobi operations desk and AMREF emergency dispatch.',
    },
    {
      icon: 'visibility',
      title: 'High-Performance Swarovski Optics',
      desc: 'Pairs of high-definition binoculars and regional bird & mammal field guides in every cruiser.',
    },
    {
      icon: 'chair',
      title: 'Ergonomic Bucket Seats',
      desc: 'Heavy-duty suspension with individual armrests and large sliding windows for maximum comfort.',
    },
  ];

  return (
    <section className="py-20 md:py-28 px-gutter bg-primary text-on-primary relative overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-container-max mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed/20 text-primary-fixed text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="material-symbols-outlined text-[16px]">airport_shuttle</span>
            Custom Built for the Savanna
          </span>
          <h2 className="font-display-lg text-3xl sm:text-4xl md:text-5xl text-white font-bold leading-tight mb-4">
            The HuntersVille Safari Fleet
          </h2>
          <p className="font-body-lg text-base sm:text-lg text-on-primary/80 leading-relaxed font-light">
            Every journey relies on superior engineering. Our custom-stretched 4x4 Toyota Land Cruisers are modified specifically for photographic stability, rugged off-road reliability, and uncompromised guest comfort.
          </p>
        </div>

        {/* Featured Large Hero Photo of the Fleet */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl mb-16 border border-white/10 group">
          <Image
            src="/safari-fleet.jpg"
            alt="The HuntersVille custom safari Land Cruiser fleet in East Africa"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <span className="px-2.5 py-1 rounded bg-amber-500/90 text-primary-dark font-mono text-[11px] font-bold uppercase tracking-wider">
                Fleet Spec 2026
              </span>
              <h3 className="font-display-lg text-xl sm:text-2xl text-white font-bold mt-2">
                Custom Extended 4x4 Safari Land Cruisers
              </h3>
              <p className="text-xs text-white/80 max-w-xl mt-1">
                Equipped with reinforced suspension, heavy-duty winches, dual spare wheels, and pop-top roofs.
              </p>
            </div>
            <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15 text-right hidden sm:block">
              <span className="text-[10px] uppercase font-mono text-primary-fixed block">Passenger Policy</span>
              <span className="text-sm font-bold text-white">Guaranteed Window for Every Traveler</span>
            </div>
          </div>
        </div>

        {/* 6 Engineering Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicleFeatures.map((feat) => (
            <div
              key={feat.title}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-amber-400/40 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-fixed/20 text-primary-fixed flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[26px]">{feat.icon}</span>
              </div>
              <h4 className="font-title-lg text-lg font-semibold text-white mb-2 group-hover:text-primary-fixed transition-colors">
                {feat.title}
              </h4>
              <p className="font-body-sm text-xs sm:text-sm text-on-primary/75 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Secondary Banner with Bush Dining Image */}
        <div className="mt-16 rounded-3xl overflow-hidden bg-neutral-900 border border-white/15 grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
          <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full">
            <Image
              src="/luxury-dining.jpg"
              alt="Luxury bush fine dining under the stars"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-neutral-900/50 hidden lg:block" />
          </div>
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              The Bush Hospitality Standard
            </span>
            <h3 className="font-display-lg text-2xl sm:text-3xl text-white font-bold">
              Unrivaled Comfort in the Heart of the Wild
            </h3>
            <p className="text-sm text-white/80 leading-relaxed font-light">
              From gourmet candlelit dinners in the open savanna under the Southern Cross constellations to hand-pressed linens in our partner eco-tented suites, our hospitality merges raw adventure with five-star indulgence.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-white/90">
              <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-amber-400 text-[18px]">restaurant</span> Private Bush Chefs</span>
              <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-amber-400 text-[18px]">wine_bar</span> Cellar-Selected Wines</span>
              <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-amber-400 text-[18px]">fireplace</span> Nightly Campfire Storytelling</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
