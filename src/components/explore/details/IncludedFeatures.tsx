const features = [
  { icon: 'directions_car', title: 'Private 4x4 Transport', desc: 'Exclusive use of a customized pop-roof safari vehicle.' },
  { icon: 'hotel', title: 'Premium Accommodation', desc: '6 nights in luxury tented camps and lodges.' },
  { icon: 'restaurant', title: 'All Meals Included', desc: 'Breakfast, lunch, and dinner, including bush picnics.' },
  { icon: 'local_activity', title: 'Park Fees & Permits', desc: 'All conservation and entry fees are covered.' },
];

export default function IncludedFeatures() {
  return (
    <>
      <hr className="border-outline-variant/50 mb-lg"/>
      <section className="mb-lg">
        <h2 className="font-title-lg text-title-lg text-on-surface mb-md">What's Included</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex items-start gap-sm bg-surface-container-lowest p-md rounded-lg border border-outline-variant/30 custom-shadow-card transition-all duration-300 hover:scale-[1.01]"
            >
              <div className="bg-primary-container/10 p-sm rounded-full text-primary shrink-0">
                <span className="material-symbols-outlined text-[22px]">{f.icon}</span>
              </div>
              <div>
                <h3 className="font-label-md text-label-md font-semibold text-on-surface">{f.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-xs">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
