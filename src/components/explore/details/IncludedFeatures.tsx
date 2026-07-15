const iconMap: Record<string, string> = {
  guide: 'person',
  transport: 'directions_car',
  accommodation: 'hotel',
  meals: 'restaurant',
  fees: 'local_activity',
  water: 'water_drop',
  insurance: 'verified_user',
  default: 'check_circle',
};

export default function IncludedFeatures({ items = [] }: { items?: string[] }) {
  const features = items.length ? items : ['Guide services', 'Transportation', 'Accommodation', 'Meals'];

  return (
    <>
      <hr className="mb-lg border-outline-variant/50" />
      <section className="mb-lg">
        <h2 className="mb-md font-title-lg text-title-lg text-on-surface">What&apos;s Included</h2>
        <div className="grid grid-cols-1 gap-sm sm:grid-cols-2">
          {features.map((feature) => {
            const keyword = feature.toLowerCase();
            const icon = Object.keys(iconMap).find((key) => keyword.includes(key)) || 'default';
            return (
              <div key={feature} className="flex items-start gap-sm rounded-lg border border-outline-variant/30 bg-surface-container-lowest p-md custom-shadow-card transition-all duration-300 hover:scale-[1.01]">
                <div className="shrink-0 rounded-full bg-primary-container/10 p-sm text-primary">
                  <span className="material-symbols-outlined text-[22px]">{iconMap[icon]}</span>
                </div>
                <div>
                  <h3 className="font-label-md text-label-md font-semibold text-on-surface">{feature}</h3>
                  <p className="mt-xs font-body-md text-body-md text-on-surface-variant">Included in your experience booking.</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
