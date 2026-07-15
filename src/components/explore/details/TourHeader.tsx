interface TourHeaderProps {
  title: string;
  category: string;
  location: string;
  rating: string;
  reviewsCount: number;
  duration: string;
  overview: string;
  tagline?: string;
  details?: Array<{ label: string; value: string }>;
}

export default function TourHeader({ title, category, location, rating, reviewsCount, duration, overview, tagline, details = [] }: TourHeaderProps) {
  return (
    <>
      <div className="mb-lg">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary-fixed px-sm py-xs font-label-sm text-label-sm text-on-primary-fixed-variant">{category}</span>
          <span className="flex items-center gap-1 rounded-full bg-surface-container-low px-sm py-xs font-label-sm text-label-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[14px]">location_on</span> {location}
          </span>
        </div>

        <h1 className="mb-3 font-headline-md text-[24px] leading-tight text-on-surface sm:text-[28px] md:text-[32px]">{title}</h1>

        {tagline ? <p className="mb-4 max-w-3xl font-body-md text-body-md leading-relaxed text-on-surface-variant">{tagline}</p> : null}

        <div className="flex flex-wrap items-center gap-md font-label-md text-label-md text-on-surface-variant">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px] text-[#F59E0B] icon-fill">star</span>
            <span className="font-semibold text-on-surface">{rating}</span>
            <span>({reviewsCount} reviews)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">schedule</span>
            <span>{duration}</span>
          </div>
        </div>
      </div>

      {details.length ? (
        <div className="mb-lg grid gap-sm rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-md sm:grid-cols-2">
          {details.map((detail) => (
            <div key={detail.label} className="rounded-xl border border-outline-variant/30 bg-surface px-sm py-sm">
              <p className="font-label-sm text-label-sm text-on-surface-variant">{detail.label}</p>
              <p className="mt-1 font-body-md text-body-md text-on-surface">{detail.value}</p>
            </div>
          ))}
        </div>
      ) : null}

      <hr className="mb-lg border-outline-variant/50" />

      <section className="mb-lg">
        <h2 className="mb-sm font-title-lg text-title-lg text-on-surface">Experience Overview</h2>
        <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">{overview}</p>
      </section>
    </>
  );
}
