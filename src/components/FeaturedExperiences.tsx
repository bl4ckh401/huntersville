export default function FeaturedExperiences() {
  return (
    <section className="max-w-container-max mx-auto px-gutter mb-xl py-xl scroll-reveal">
      <div className="text-left mb-lg flex flex-col md:flex-row justify-between items-end border-b border-surface-variant pb-8">
        <div>
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-2">Featured Experiences</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Handpicked journeys crafted by our expert operators.</p>
        </div>
        <button className="mt-4 md:mt-0 text-primary font-label-md text-label-md hover:text-primary-container transition-colors flex items-center gap-2 group">
          <span className="border-b border-primary pb-1">Explore Collection</span>
          <span className="material-symbols-outlined transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start">
        {/* Main Featured Card */}
        <div className="lg:col-span-8 group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700">
          <div className="h-[500px] md:h-[650px] w-full relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA6lLi4mnPytVloD7ZYGUdheTKDMbuXsz-3Ehj4DASGXIouB6jiR__tMOlMtMOFQ7jn_p1p1hA7QEDbxtgPyliAAXaWHtL_eu248BS9N6I0Y9tft2zmSD4ctVQiwMYeDmLOgnTa5pPEbrdPHTfteU7z03JyS6MfSE_JHsoHWBApB42q4a8lAAEuVDyP3JeP7yjU6v94_7CIu5FQCbbOvV1cIb9h3SHQkI2Szg8TyD26Th56GZ8OSlJQ2RcE0U4mKUFzLF92ShDb')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute top-8 right-8 bg-surface/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full font-label-sm text-label-sm tracking-wider uppercase">Bestseller</div>
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-6">
                <div>
                  <div className="flex items-center gap-3 text-white/80 font-label-md text-label-md mb-3">
                    <span className="material-symbols-outlined text-[20px] text-primary-fixed">location_on</span>
                    <span>Great Rift Valley, Kenya</span>
                    <span className="mx-1">•</span>
                    <span className="material-symbols-outlined text-[20px] text-primary-fixed">schedule</span>
                    <span>5 Days</span>
                  </div>
                  <h3 className="font-display-lg-mobile md:text-display-lg text-white leading-tight">Great Rift Valley Sunset Expedition</h3>
                </div>
                <div className="text-left md:text-right shrink-0">
                  <span className="font-body-md text-white/60 line-through block mb-1">From $1,250</span>
                  <span className="font-display-lg-mobile text-white font-bold">$980</span>
                </div>
              </div>
              <p className="font-body-lg text-white/90 mb-8 leading-relaxed max-w-2xl">
                Experience the awe-inspiring beauty of the dramatic escarpments with expert local guides. Includes luxury tented camps and private sunset safaris away from the crowds in profound comfort.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full font-label-sm text-label-sm">Safari</span>
                <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full font-label-sm text-label-sm">Photography</span>
                <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full font-label-sm text-label-sm">Luxury</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Feature Cards */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          {/* Small Feature Card 1 */}
          <div className="group bg-surface rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border border-surface-variant flex flex-col">
            <div className="h-[240px] w-full relative overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDvWOthBA2qPBEczyn2vqbkuEE0qXEf4-wjM8vcmjsMWksjM-cWgiQoC0mlh4QD8sQUDGzfQsj-oGdp_3tsG_vjAourRHgUPv2iQxUZERfjvgA45Wva15r4K8wpAK_l0b76K6acnqt_ADGrYRR_BCVW4TkoMZ4OMQhMW3kxCBUO6JmSM0DDYJxmQMu0SdW68lqWJ5-tj661DJ0j5LmzlM_4RvaYLGjz3wVdYileIPf0JWsvZ6d7K49yBlMb21kI9BZVjNsWKqGF')" }}
              />
            </div>
            <div className="p-8 flex-grow flex flex-col justify-between bg-surface">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-3">Tokyo Neon Nights</h3>
                <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md mb-6">
                  <span className="material-symbols-outlined text-[18px] text-secondary">location_on</span>
                  <span>Tokyo, Japan</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2 pt-6 border-t border-surface-variant">
                <span className="font-headline-sm text-headline-sm text-primary font-bold">$450</span>
                <button className="text-secondary font-label-md text-label-md hover:text-secondary-container transition-colors flex items-center gap-1 group-hover:translate-x-2 duration-300">
                  View Details <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Small Feature Card 2 */}
          <div className="group bg-surface rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border border-surface-variant flex flex-col">
            <div className="h-[240px] w-full relative overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCj53h91HUNpS5AvA6oF5Z0SSGwuHDueFdHHjop1VOh-1vY9nRM-LSxuyJYajvRNRhIZEH0oiuBhwIK8PQrBpd-TO8GIMpntgVNokCctvYneDvt_nLF5MpfVSO3P-NrWb6_EqSiK0XLrIDXYCGxKnMV6TprU03BT5ywli-oMbmnqVr8Q9iF-VGIpG5paEHxvbIvqnseJoA8f6TmBsZ7htaD1jXHzPI6HR0dbJw_mOsiiIE3yn7VD43r640ohRm_X1d5LIapZyKs')" }}
              />
            </div>
            <div className="p-8 flex-grow flex flex-col justify-between bg-surface">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-3">Tuscan Culinary Tour</h3>
                <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md mb-6">
                  <span className="material-symbols-outlined text-[18px] text-secondary">location_on</span>
                  <span>Tuscany, Italy</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2 pt-6 border-t border-surface-variant">
                <span className="font-headline-sm text-headline-sm text-primary font-bold">$580</span>
                <button className="text-secondary font-label-md text-label-md hover:text-secondary-container transition-colors flex items-center gap-1 group-hover:translate-x-2 duration-300">
                  View Details <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
