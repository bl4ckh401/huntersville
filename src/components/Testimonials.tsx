export default function Testimonials() {
  return (
    <section className="mx-auto px-gutter pt-lg pb-md scroll-reveal bg-surface-container-low rounded-3xl shadow-sm">
      <div className="text-center max-w-3xl mx-auto px-4 py-12">
        <span className="material-symbols-outlined text-[56px] text-primary/20 mb-8">format_quote</span>
        <p className="font-display-lg-mobile text-primary italic mb-10 leading-tight">
          &quot;An absolutely breathtaking experience. The attention to detail and profound respect for the local environment made this the trip of a lifetime.&quot;
        </p>
        <div className="flex flex-col items-center">
          <p className="font-title-lg text-on-surface font-bold mb-1">Eleanor Vance</p>
          <p className="font-body-md text-on-surface-variant">Kenya Safari Explorer, 2023</p>
        </div>
        <div className="flex justify-center gap-3 mt-10">
          <div className="w-2.5 h-2.5 rounded-full bg-primary cursor-pointer hover:scale-125 transition-transform" />
          <div className="w-2.5 h-2.5 rounded-full bg-primary/20 cursor-pointer hover:scale-125 transition-transform" />
          <div className="w-2.5 h-2.5 rounded-full bg-primary/20 cursor-pointer hover:scale-125 transition-transform" />
        </div>
      </div>
    </section>
  );
}
