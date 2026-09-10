import Image from 'next/image';
import Link from 'next/link';

export default function HuntersVilleWay() {
  return (
    <section id="our-story" className="py-20 md:py-28 px-gutter bg-surface">
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Story Text Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">local_florist</span>
            Our Heritage &amp; Philosophy
          </div>
          
          <h2 className="font-display-lg text-3xl sm:text-4xl md:text-5xl text-on-surface font-bold leading-tight">
            Every Great Safari Starts with Passion and Local Wisdom
          </h2>
          
          <p className="font-body-lg text-base sm:text-lg text-on-surface-variant leading-relaxed font-light">
            Founded in Nairobi, HuntersVille Tours &amp; Safaris was born from a singular conviction: travel across the African continent should be profoundly transformative, not merely transactional.
          </p>
          
          <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed">
            We move away from crowded minibuses and rigid tourist circuits. Instead, our expeditions place you in the hands of seasoned Kenyan naturalists who grew up alongside these wilderness reserves. You don&apos;t just observe the Great Migration or track mountain gorillas—you understand the intricate ecosystem that sustains them.
          </p>

          {/* Three Core Commitments */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-outline-variant/30">
            <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
              <span className="material-symbols-outlined text-primary text-[24px] mb-1 block">airline_seat_recline_extra</span>
              <h4 className="font-title-md text-xs font-bold text-on-surface">Guaranteed Window</h4>
              <p className="text-[11px] text-on-surface-variant mt-0.5">Max 6 guests per 4x4 Land Cruiser</p>
            </div>
            <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
              <span className="material-symbols-outlined text-primary text-[24px] mb-1 block">volunteer_activism</span>
              <h4 className="font-title-md text-xs font-bold text-on-surface">15% Give-Back</h4>
              <p className="text-[11px] text-on-surface-variant mt-0.5">To Maasai conservancy scouts</p>
            </div>
            <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30">
              <span className="material-symbols-outlined text-primary text-[24px] mb-1 block">security</span>
              <h4 className="font-title-md text-xs font-bold text-on-surface">24/7 Field Safety</h4>
              <p className="text-[11px] text-on-surface-variant mt-0.5">AMREF Flying Doctors coverage</p>
            </div>
          </div>

          <div className="pt-2">
            <Link 
              href="/explore" 
              className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-full font-label-md text-sm font-semibold hover:bg-primary-container hover:text-on-primary-container transition-all shadow-md hover:shadow-lg"
            >
              Explore Our Expeditions
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Dynamic Image Collage Column */}
        <div className="lg:col-span-6 relative">
          {/* Main Large Image: CEO Welcoming Guests */}
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/30 group">
            <Image
              fill
              alt="HuntersVille CEO welcoming international travelers at the lodge"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              src="/ceo-welcoming.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] uppercase font-mono tracking-widest text-primary-fixed bg-black/40 px-2 py-0.5 rounded backdrop-blur-md">
                Arrival Experience
              </span>
              <p className="text-sm font-semibold mt-1">Personal Greeting &amp; Handcrafted Briefing</p>
            </div>
          </div>

          {/* Floating Secondary Inset Image: CEO Guiding Travelers */}
          <div className="hidden sm:block absolute -bottom-8 -left-8 w-60 aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-surface group z-20">
            <Image
              fill
              alt="CEO Jimmy Lee guiding guests in the field"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="240px"
              src="/ceo-guiding.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-2 left-2 text-white">
              <p className="text-[11px] font-medium leading-tight">Master Guide in the Savanna</p>
            </div>
          </div>

          {/* Floating Trust Badge */}
          <div className="absolute -top-6 -right-4 sm:-right-6 bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-4 shadow-xl flex items-center gap-3 backdrop-blur-md z-20">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center font-bold text-lg">
              10+
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface">Years of Excellence</p>
              <p className="text-[10px] text-on-surface-variant">5,000+ Happy Explorers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
