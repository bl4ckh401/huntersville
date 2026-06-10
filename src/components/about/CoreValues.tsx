const values = [
  {
    icon: 'eco',
    title: 'Sustainability',
    description: 'We operate with absolute minimal environmental impact, prioritizing the health of the ecosystems we visit.',
  },
  {
    icon: 'workspace_premium',
    title: 'Excellence',
    description: 'Uncompromising quality in service, accommodations, and guiding — delivering a premium experience at every touchpoint.',
  },
  {
    icon: 'group',
    title: 'Community',
    description: 'Deeply invested in local empowerment, ensuring tourism revenues directly benefit the people of East Africa.',
  },
];

export default function CoreValues() {
  return (
    <section className="py-xl px-gutter max-w-container-max mx-auto">
      <div className="text-center mb-lg scroll-reveal">
        <h2 className="font-headline-md text-headline-md text-primary">Core Values</h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto mt-sm">
          The principles that guide every journey we curate.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
        {values.map((v, i) => (
          <div
            key={v.title}
            className="bg-surface-container p-md rounded-xl text-center hover:bg-surface-container-high transition-colors scroll-reveal"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <span className="material-symbols-outlined text-[40px] text-primary mb-sm block">{v.icon}</span>
            <h3 className="font-title-lg text-title-lg text-primary mb-xs">{v.title}</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">{v.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
