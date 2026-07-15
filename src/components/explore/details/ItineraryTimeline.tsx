interface ItineraryTimelineProps {
  itinerary?: Array<{ day: string; title: string; description: string; time?: string; location?: string }>;
}

export default function ItineraryTimeline({ itinerary = [] }: ItineraryTimelineProps) {
  const items = itinerary.length ? itinerary : [{ day: 'Day 1', title: 'Arrival and welcome', description: 'Your journey begins with a warm welcome and a seamless transfer to your destination.' }];

  return (
    <>
      <hr className="mb-lg border-outline-variant/50" />
      <section className="mb-lg">
        <h2 className="mb-md font-title-lg text-title-lg text-on-surface">Journey Itinerary</h2>

        <div className="space-y-lg border-l-2 border-surface-variant pl-6">
          {items.map((item, index) => (
            <div key={`${item.day}-${index}`} className="relative">
              <div className={`absolute -left-[26px] top-1.5 h-3 w-3 rounded-full border-[3px] ${index === items.length - 1 ? 'border-outline' : 'border-primary'} bg-surface`} />
              <div className="rounded-lg border border-outline-variant/30 bg-surface-container-lowest p-4 sm:p-md custom-shadow-card">
                <div className="mb-xs flex flex-wrap items-center gap-2">
                  <h3 className="font-headline-sm text-[18px] text-on-surface sm:text-headline-sm">{item.day}: {item.title}</h3>
                  {item.time ? <span className="rounded-full bg-surface-container px-sm py-xs font-label-sm text-label-sm text-on-surface-variant">{item.time}</span> : null}
                </div>
                <p className="mb-sm font-body-md text-body-md text-on-surface-variant sm:text-base">{item.description}</p>
                {item.location ? (
                  <span className="inline-flex items-center gap-xs rounded-full bg-surface-container px-sm py-xs font-label-sm text-label-sm text-on-surface">
                    <span className="material-symbols-outlined text-[16px]">location_on</span> {item.location}
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
