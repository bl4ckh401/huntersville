import Image from 'next/image';
import Link from 'next/link';

export default function CompanyShowcase() {
  return (
    <section className="bg-primary text-on-primary py-12 md:py-xl">
      <div className="max-w-container-max mx-auto px-gutter">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-lg">
          <span className="inline-block bg-primary-fixed/20 text-primary-fixed px-sm py-xs rounded-full font-label-sm text-label-sm uppercase tracking-wider mb-sm">
            Who We Are
          </span>
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-primary mb-3 md:mb-md">
            The HuntersVille Story
          </h2>
          <p className="font-body-lg text-body-lg text-on-primary/80 max-w-[700px] mx-auto leading-relaxed">
            Born in the heart of East Africa, HuntersVille Tours &amp; Safaris is a KATO-bonded, TRA-licensed expedition company committed to crafting life-changing wildlife encounters with zero compromise on safety, sustainability, or style.
          </p>
        </div>

        {/* CEO & Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-lg items-center mb-8 md:mb-xl">
          {/* CEO Image */}
          <div className="relative h-[280px] sm:h-[360px] md:h-[480px] rounded-2xl overflow-hidden shadow-2xl group">
            <Image 
              src="/HVLee.png" 
              alt="HuntersVille CEO welcoming international travelers at the lodge"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 md:bottom-md left-3 md:left-md right-3 md:right-md">
              <p className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-wider mb-1">Hospitality at it's Finest</p>
              <h3 className="font-headline-sm text-headline-sm text-white">Personal Welcome, Every Journey</h3>
            </div>
          </div>

          {/* Story Content */}
          <div className="space-y-3 md:space-y-md">
            <div className="flex items-start gap-2 md:gap-sm">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary-fixed/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary-fixed text-[20px] md:text-[24px]">diversity_3</span>
              </div>
              <div>
                <h3 className="font-title-lg text-title-lg text-on-primary mb-1 md:mb-xs">Locally Rooted, Globally Trusted</h3>
                <p className="font-body-md text-body-md text-on-primary/80 leading-relaxed">
                  With over a decade of operation across Kenya, Tanzania, Uganda, and Rwanda, our team of certified naturalists and hospitality professionals has guided thousands of travelers from 40+ countries through the most spectacular landscapes on earth.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 md:gap-sm">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary-fixed/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary-fixed text-[20px] md:text-[24px]">eco</span>
              </div>
              <div>
                <h3 className="font-title-lg text-title-lg text-on-primary mb-1 md:mb-xs">Conservation at Our Core</h3>
                <p className="font-body-md text-body-md text-on-primary/80 leading-relaxed">
                  Every booking directly funds community-led conservation initiatives. We partner with local Maasai communities, invest in anti-poaching units, and maintain carbon-neutral operations across all our expeditions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 md:gap-sm">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary-fixed/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary-fixed text-[20px] md:text-[24px]">workspace_premium</span>
              </div>
              <div>
                <h3 className="font-title-lg text-title-lg text-on-primary mb-1 md:mb-xs">Award-Winning Excellence</h3>
                <p className="font-body-md text-body-md text-on-primary/80 leading-relaxed">
                  Recognized by the Kenya Association of Tour Operators, bonded under the KATO protection scheme, and licensed by the Tourism Regulatory Authority (TRA/0491/2021). Your journey is fully protected.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-sm bg-primary-container/20 rounded-2xl p-3 md:p-md border border-primary-fixed/10 mb-6 md:mb-lg">
          {[
            { value: '10+', label: 'Years of Excellence', icon: 'calendar_month' },
            { value: '5,000+', label: 'Happy Travelers', icon: 'groups' },
            { value: '40+', label: 'Countries Served', icon: 'public' },
            { value: '4.9★', label: 'Average Rating', icon: 'star' },
          ].map((stat) => (
            <div key={stat.label} className="text-center py-2 md:py-sm">
              <span className="material-symbols-outlined text-primary-fixed text-[24px] md:text-[28px] mb-1 md:mb-xs block">
                {stat.icon}
              </span>
              <p className="font-headline-sm text-headline-sm text-on-primary">{stat.value}</p>
              <p className="font-label-sm text-label-sm text-on-primary/70 uppercase tracking-wider mt-1 md:mt-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Team & Luxury Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-sm">
          <div className="relative h-[240px] sm:h-[300px] md:h-[360px] rounded-2xl overflow-hidden shadow-xl group">
            <Image 
              src="/team-safari.jpg" 
              alt="The HuntersVille safari guide team"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-3 md:bottom-md left-3 md:left-md right-3 md:right-md">
              <p className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-wider mb-1">Our Expedition Team</p>
              <h3 className="font-title-lg text-title-lg text-white">Expert Guides, Lifelong Naturalists</h3>
              <p className="font-body-sm text-body-sm text-white/80 mt-1">
                Every guide holds FGASA or Silver-level certification with 5+ years of field experience.
              </p>
            </div>
          </div>

          <div className="relative h-[240px] sm:h-[300px] md:h-[360px] rounded-2xl overflow-hidden shadow-xl group">
            <Image 
              src="/luxury-dining.jpg" 
              alt="Luxury bush dining experience under the stars"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-3 md:bottom-md left-3 md:left-md right-3 md:right-md">
              <p className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-wider mb-1">Unmatched Hospitality</p>
              <h3 className="font-title-lg text-title-lg text-white">Bush Fine Dining Under the Stars</h3>
              <p className="font-body-sm text-body-sm text-white/80 mt-1">
                Private chef-prepared multi-course dinners in the wild — an unforgettable sensory experience.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-6 md:mt-lg">
          <Link 
            href="/about"
            className="inline-flex items-center gap-xs bg-[#000000] text-primary-dark px-lg py-sm rounded-full font-label-md text-label-md font-bold uppercase tracking-wider transition-colors shadow-lg"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
}
