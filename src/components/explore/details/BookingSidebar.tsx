export default function BookingSidebar({ price }: { price: string }) {
  return (
    <div className="sticky top-[100px] bg-surface-container-lowest p-6 sm:p-lg rounded-xl border border-outline-variant/20 custom-shadow-card">
      {/* Pricing Header */}
      <div className="mb-md">
        <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-xs">Starting from</p>
        <div className="flex items-end gap-xs">
          <span className="font-headline-md text-headline-md text-primary">{price}</span>
          <span className="font-body-md text-body-md text-on-surface-variant pb-1">/ person</span>
        </div>
      </div>

      <hr className="border-outline-variant/30 mb-md"/>

      {/* Booking Form */}
      <form className="space-y-sm mb-md">
        <div>
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Select Dates</label>
          <div className="flex items-center bg-surface border border-outline-variant/50 rounded-lg px-sm py-sm focus-within:border-secondary-container focus-within:ring-2 focus-within:ring-secondary-container/20 transition-all">
            <span className="material-symbols-outlined text-outline-variant mr-xs text-[20px]">calendar_today</span>
            <input
              className="bg-transparent border-none focus:ring-0 text-body-md p-0 w-full text-on-surface placeholder:text-outline-variant outline-none text-sm"
              placeholder="Check availability"
              type="text"
            />
          </div>
        </div>

        <div>
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Travelers</label>
          <div className="flex items-center justify-between bg-surface border border-outline-variant/50 rounded-lg px-sm py-sm cursor-pointer hover:border-secondary-container transition-all">
            <div className="flex items-center text-on-surface gap-xs">
              <span className="material-symbols-outlined text-outline-variant text-[20px]">group</span>
              <span className="font-body-md text-body-md text-sm sm:text-base">2 Adults</span>
            </div>
            <span className="material-symbols-outlined text-outline-variant">expand_more</span>
          </div>
        </div>
      </form>

      {/* CTAs */}
      <div className="space-y-sm mb-md">
        <button className="w-full bg-[#F97316] text-white font-label-md text-label-md py-3 rounded-lg shadow-[0_2px_0_0_rgba(154,52,18,1)] hover:bg-[#EA580C] hover:-translate-y-[1px] transition-all active:translate-y-[2px] active:shadow-none flex justify-center items-center gap-xs">
          Reserve Now
        </button>
        <button className="w-full bg-surface text-primary border border-primary/30 font-label-md text-label-md py-3 rounded-lg hover:bg-primary-container/10 transition-colors flex justify-center items-center gap-xs">
          <span className="material-symbols-outlined text-[18px]">add_circle</span> Add to Journey
        </button>
      </div>

      {/* Trust Signals */}
      <div className="flex flex-wrap items-center justify-center gap-x-sm gap-y-1 text-on-surface-variant font-label-sm text-label-sm text-center">
        <span className="flex items-center gap-xs">
          <span className="material-symbols-outlined text-[16px]">verified_user</span> Secure Payment
        </span>
        <span className="w-1 h-1 bg-outline-variant rounded-full hidden sm:block" />
        <span className="flex items-center gap-xs">
          <span className="material-symbols-outlined text-[16px]">event_busy</span> Free Cancellation (48h)
        </span>
      </div>
    </div>
  );
}
