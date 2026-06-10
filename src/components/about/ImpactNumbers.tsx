const stats = [
  { value: '30k+', label: 'Acres Protected' },
  { value: '15', label: 'Partner Communities' },
  { value: '500+', label: 'Wildlife Rescues' },
  { value: '25', label: 'Years Excellence' },
];

export default function ImpactNumbers() {
  return (
    <section className="py-xl px-gutter bg-primary text-on-primary">
      <div className="max-w-container-max mx-auto text-center scroll-reveal">
        <h2 className="font-headline-md text-headline-md text-on-primary mb-lg">Impact in Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
          {stats.map((stat) => (
            <div key={stat.label} className="p-md">
              <span className="font-display-lg text-display-lg-mobile md:text-display-lg block text-inverse-primary mb-xs">{stat.value}</span>
              <span className="font-label-md text-label-md uppercase tracking-wider text-on-primary/80">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
