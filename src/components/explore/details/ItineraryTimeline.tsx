export default function ItineraryTimeline() {
  return (
    <>
      <hr className="border-outline-variant/50 mb-lg"/>
      <section className="mb-lg">
        <h2 className="font-title-lg text-title-lg text-on-surface mb-md">Journey Itinerary</h2>

        <div className="relative pl-6 border-l-2 border-surface-variant space-y-lg">

          {/* Day 1 */}
          <div className="relative">
            <div className="absolute -left-[26px] top-1.5 w-3 h-3 bg-surface border-[3px] border-primary rounded-full" />
            <div className="bg-surface-container-lowest p-4 sm:p-md rounded-lg border border-outline-variant/30 custom-shadow-card">
              <h3 className="font-headline-sm text-[18px] sm:text-headline-sm text-on-surface mb-xs">Day 1: Arrival in Arusha</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-sm text-sm sm:text-base">
                Touch down at Kilimanjaro International Airport. Our ground team will transfer you to your boutique lodge in Arusha. Relax, acclimatize, and enjoy a pre-safari briefing over a welcome dinner.
              </p>
              <div className="flex flex-wrap gap-sm">
                <span className="inline-flex items-center gap-xs bg-surface-container px-sm py-xs rounded-DEFAULT font-label-sm text-label-sm text-on-surface">
                  <span className="material-symbols-outlined text-[16px]">bed</span> Arusha Coffee Lodge
                </span>
              </div>
            </div>
          </div>

          {/* Day 2-3 */}
          <div className="relative">
            <div className="absolute -left-[26px] top-1.5 w-3 h-3 bg-surface border-[3px] border-primary rounded-full" />
            <div className="bg-surface-container-lowest p-4 sm:p-md rounded-lg border border-outline-variant/30 custom-shadow-card">
              <h3 className="font-headline-sm text-[18px] sm:text-headline-sm text-on-surface mb-xs">Day 2-3: Into the Serengeti</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-sm text-sm sm:text-base">
                A scenic flight takes you deep into the Central Serengeti. Spend two full days on extensive game drives tracking the Big Five. The vast plains offer spectacular photographic opportunities in the golden light.
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Serengeti Plains"
                className="w-full h-40 sm:h-48 object-cover rounded-DEFAULT"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIfv-rRS_KKt2nc_Rv9C8eXa5e8xt4WmmQWsHJm0ptiI-HedRV-JQWv04iyy_MRElzhGdMJJ-iWTyMC2OXXphFdd3cQqOcg1l0PxNNRBWQtou5dqeAfKE7ZqttB3yDocmfhHJ4wYDPxFT-DCipA8hm-CSzpfYvurIasgLEW8qfthiCFV-ssA3top9N9_94f1NEUXb72W_b4LMz79b7d874B8pe83yINC6x8-Y83bmQ1aSwfYsHTI1ub8ZHZUMi-dA83LjNCfDk"
              />
            </div>
          </div>

          {/* Day 4-7 */}
          <div className="relative">
            <div className="absolute -left-[26px] top-1.5 w-3 h-3 bg-surface border-[3px] border-outline rounded-full" />
            <div className="bg-surface-container-lowest p-4 sm:p-md rounded-lg border border-outline-variant/30 border-dashed opacity-80 cursor-pointer hover:opacity-100 transition-opacity">
              <h3 className="font-headline-sm text-[18px] sm:text-headline-sm text-on-surface mb-xs flex justify-between items-center">
                <span>Day 4-7: Ngorongoro &amp; Departure</span>
                <span className="material-symbols-outlined text-outline ml-2 shrink-0">expand_more</span>
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm sm:text-base">
                Expand to view full details of the crater descent and return journey.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
