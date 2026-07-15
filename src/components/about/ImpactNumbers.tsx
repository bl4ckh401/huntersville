import { getExperienceStats } from '@/lib/content-store';

export default async function ImpactNumbers() {
  const statsResult = await getExperienceStats();
  const stats = [
    { value: `${statsResult.totalExperiences}`, label: 'Curated Experiences' },
    { value: `${statsResult.activeExperiences}`, label: 'Active Trips' },
    { value: `${statsResult.totalBookings}`, label: 'Bookings Managed' },
    { value: statsResult.latestExperience?.category ?? '—', label: 'Newest Category' },
  ];

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
