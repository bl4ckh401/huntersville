import { getExperienceStats } from '@/lib/content-store';

export default async function ImpactNumbers() {
  const statsResult = await getExperienceStats();
  const stats = [
    { value: `${statsResult.totalExperiences}+`, label: 'Curated Experiences' },
    { value: `${statsResult.activeExperiences}+`, label: 'Active Trips' },
    { value: `${statsResult.totalBookings}+`, label: 'Bookings Managed' },
    { value: '30+', label: 'Years of Experience' },
  ];

  return (
    <section className="py-xl px-gutter bg-primary text-on-primary">
      <div className="max-w-container-max mx-auto text-center scroll-reveal">
        <h2 className="font-headline-md text-headline-md text-on-primary mb-lg">Our Experience</h2>
        <p className="font-body-md text-body-md text-on-primary/80 max-w-2xl mx-auto mb-12">
          Years of guiding travelers across Kenya&apos;s most breathtaking landscapes. Hundreds of unforgettable journeys crafted with care. Countless moments shared between travelers, wildlife, and culture. We measure success not by numbers, but by the stories our travelers take home.
        </p>
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
