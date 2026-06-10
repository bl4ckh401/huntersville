export default function FilterSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 bg-surface-container rounded-xl p-md h-fit sticky top-[120px] shadow-sm">
      <div className="flex items-center justify-between mb-md">
        <h2 className="font-title-lg text-title-lg text-on-surface">Filters</h2>
        <button className="text-on-surface-variant text-label-sm font-label-sm hover:text-primary">Clear all</button>
      </div>

      {/* Location */}
      <div className="mb-sm border-b border-outline-variant pb-sm">
        <h3 className="font-label-md text-label-md text-on-surface-variant mb-sm uppercase tracking-widest">Location</h3>
        <div className="space-y-2">
          {['Kenya', 'Tanzania', 'Uganda'].map((location) => (
            <label key={location} className="flex items-center gap-2 cursor-pointer group">
              <input className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4 bg-surface" type="checkbox" />
              <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">{location}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-sm border-b border-outline-variant pb-sm">
        <h3 className="font-label-md text-label-md text-on-surface-variant mb-sm uppercase tracking-widest">Price Range</h3>
        <div className="flex items-center gap-2">
          <input className="w-full bg-surface border border-outline-variant rounded p-2 text-body-md focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/50 transition-all outline-none" placeholder="Min" type="number" />
          <span className="text-on-surface-variant">-</span>
          <input className="w-full bg-surface border border-outline-variant rounded p-2 text-body-md focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/50 transition-all outline-none" placeholder="Max" type="number" />
        </div>
      </div>

      <button className="mt-lg w-full bg-primary text-on-primary font-label-md text-label-md py-3 rounded-lg shadow-sm hover:shadow-md hover:scale-101 active:scale-95 transition-all duration-200">
        Apply Filters
      </button>
    </aside>
  );
}
