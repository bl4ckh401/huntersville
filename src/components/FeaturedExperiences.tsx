import Link from 'next/link';
import Image from 'next/image';

export default function FeaturedExperiences() {
  return (
    <section className="max-w-container-max mx-auto px-gutter py-lg scroll-reveal">
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-surface-variant pb-8 mb-16">
        <div>
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-2">Featured Experiences</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Handpicked journeys crafted by our expert operators.</p>
        </div>
        <Link href="/explore" className="mt-4 md:mt-0 text-primary font-label-md text-label-md hover:text-primary-container transition-colors flex items-center gap-2 group">
          <span className="border-b border-primary pb-1 uppercase tracking-widest text-xs font-semibold">Explore Collection</span>
          <span className="material-symbols-outlined transform group-hover:translate-x-2 transition-transform duration-300">arrow_forward</span>
        </Link>
      </div>

      <div className="relative w-full">
        {/* Masterpiece Featured Card */}
        <Link href="/explore/1" className="block relative w-full lg:w-[75%] lg:ml-auto group rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 z-10">
          <div className="h-[300px] md:h-[450px] hover:z-999 w-full relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida/AP1WRLt12jIc-22TOxbJzsAOrvnhTtZxGFwNzEZaiWQuq9x3xt_754JPhwF4ZmOxU2fGNfUsvdC8wiUZ4ir_ZYjrAZ7TvosKe8ZhARL8tIrYvpWj5VUtIdeB6q0fDpsQoDsg2jNRBlGDp0fGx80MyfE1WfCYhuCO1Vxmg27kNVaEAoTKZPlJPo6YZH1OtqHhpTzc2r2_8erxmLL-ogsCL5EYEG9RUXVdOn9_Dycu39uADeE2WzxojwWDvGxO')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="absolute top-8 right-8 md:top-12 md:right-12">
              <span className="bg-black/30 backdrop-blur-md border border-white/30 text-white px-6 py-2 rounded-full font-label-sm text-xs tracking-[0.2em] uppercase font-semibold shadow-lg">Bestseller</span>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col justify-end h-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-white/80 font-label-sm uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span> Great Rift Valley, Kenya</span>
                    <span className="hidden sm:block w-1 h-1 bg-white/50 rounded-full"></span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span> 5 Days</span>
                  </div>
                  <h3 className="font-display-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4 font-bold drop-shadow-lg">Great Rift Valley Sunset Expedition</h3>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    <span className="border border-white/30 text-white/90 px-3 md:px-4 py-1.5 rounded-full font-label-sm text-[10px] md:text-xs tracking-wider uppercase backdrop-blur-sm">Maasai Mara Sunrise</span>
                    <span className="border border-white/30 text-white/90 px-3 md:px-4 py-1.5 rounded-full font-label-sm text-[10px] md:text-xs tracking-wider uppercase backdrop-blur-sm">Safari</span>
                    <span className="border border-white/30 text-white/90 px-3 md:px-4 py-1.5 rounded-full font-label-sm text-[10px] md:text-xs tracking-wider uppercase backdrop-blur-sm">Luxury</span>
                  </div>
                </div>

                <div className="text-left md:text-right shrink-0 bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                  <span className="font-label-sm text-white/60 tracking-widest uppercase block mb-1">Starting From</span>
                  <span className="font-body-md text-white/60 line-through block mb-1">$1,250</span>
                  <span className="font-display-lg text-white text-4xl font-bold">$980</span>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Secondary Image Overlap (Luxury Safari Camp) */}
        <div className="hidden lg:block absolute top-[20%] left-0 w-[35%] h-[450px] rounded-2xl overflow-hidden shadow-2xl group transform -translate-y-12">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida/AP1WRLu_5daMgS25zlowIDjJRxJT6i9iT27-IMDPgB-wwQbcD0lnQr7X1IfMXLCAwcHHIKMStXKbNURcBraEjaFRzNmdmO_nqaze2ELIFsIyTtoJ_ldox7i8aHas9dzxjp122cOCKSQmB_H6vp8AbHOkHso4Fit4I12Kd0G31e6j411jlrlpE6Hi4lXY7YMA6vzys534O6s93CxRQ6nBF0CkpunB_EBBM6ZYZ3euDG5Lymjf6yBqbFeGzcGV')" }}
          ></div>
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
          <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded text-white font-label-sm text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Luxury Safari Camp</div>
        </div>

        {/* Refined Secondary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mt-8 lg:-mt-16 relative z-30 lg:ml-[10%] lg:w-[85%]">

          {/* Card 1 */}
          <Link href="/explore/2" className="group flex flex-col bg-surface border border-surface-variant hover:border-outline-variant p-8 rounded-2xl transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
            <div className="h-48 w-full rounded-xl overflow-hidden mb-6 relative group-hover:shadow-lg transition-shadow">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9G35-DTlbhwu7fWAYKN6XzxgqI5ev4XeRlb1IstiwZEzjsfQI8L6yXcLW-DsVkS4_aZuUsEBSTVlSEI1nJLMx3o8ua4ZYrPw2GL78HEA4frRWcqkH8LtUbuA6h55dWbpVMQKSM8bqOuN78usE6HHgxYEfUbFQyeOddXBSBfCvkJ5Z79zf98qjdMCGA-VPI1xne72sK39T5TN7WuX9vcRSzqO38mobWdq43c-CDyxjT5PIN9yuGiVlspO0Xj4amIKxvzR2lDwp"
                alt="Tokyo Cityscape"
                width={800} height={600}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm px-2 py-1 rounded text-primary font-label-sm text-[10px] uppercase tracking-widest">Tokyo Cityscape</div>
            </div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2 text-on-surface-variant font-label-sm uppercase tracking-widest mb-2">
                  <span className="material-symbols-outlined text-[16px] text-secondary">location_on</span>
                  <span>Tokyo, Japan</span>
                </div>
                <h3 className="font-headline-md text-2xl text-primary font-semibold">Tokyo Neon Nights</h3>
              </div>
              <span className="font-headline-sm text-xl text-primary font-bold bg-surface-container-low px-3 py-1 rounded-lg">$450</span>
            </div>
            <div className="mt-auto flex justify-end">
              <span className="text-secondary font-label-md text-sm uppercase tracking-widest hover:text-secondary-container transition-colors flex items-center gap-2 group-hover:translate-x-2 duration-300">
                View Details <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:translate-x-1">arrow_right_alt</span>
              </span>
            </div>
          </Link>

          {/* Card 2 */}
          <Link href="/explore/3" className="group flex flex-col bg-surface border border-surface-variant hover:border-outline-variant p-8 rounded-2xl transition-all duration-500 hover:shadow-xl hover:-translate-y-2 lg:mt-16">
            <div className="h-48 w-full rounded-xl overflow-hidden mb-6 relative group-hover:shadow-lg transition-shadow">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4gl9-ZbLd_93NbKa9IivxZJkOb-a7hKU2Z1S6XnAsWb8_RBBUyC-t53IYwDMz82J_XFEp_6PFFU0z73XmdyA68BJVtex-TLyjVl4eaR-qa1r-QKeSuafj66j1tfSzuNLcFDeefmfSWcjSSRhCwrmxJ7Q6PPQth2yE_CUCwiJBx9SWsVwJlwjX6NVlqSH5q9qTMQby7sHR_lssLVNfbpLwtC4-PmB9ytoMU924zBk_5q9Ry-aE-iGfGwtOJw033Z9xHDHY_LNu"
                alt="Tuscan Vineyards"
                width={800} height={600}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm px-2 py-1 rounded text-primary font-label-sm text-[10px] uppercase tracking-widest">Tuscan Vineyards</div>
            </div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2 text-on-surface-variant font-label-sm uppercase tracking-widest mb-2">
                  <span className="material-symbols-outlined text-[16px] text-secondary">location_on</span>
                  <span>Tuscany, Italy</span>
                </div>
                <h3 className="font-headline-md text-2xl text-primary font-semibold">Tuscan Culinary Tour</h3>
              </div>
              <span className="font-headline-sm text-xl text-primary font-bold bg-surface-container-low px-3 py-1 rounded-lg">$580</span>
            </div>
            <div className="mt-auto flex justify-end">
              <span className="text-secondary font-label-md text-sm uppercase tracking-widest hover:text-secondary-container transition-colors flex items-center gap-2 group-hover:translate-x-2 duration-300">
                View Details <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:translate-x-1">arrow_right_alt</span>
              </span>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
