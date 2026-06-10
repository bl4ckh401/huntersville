interface TourHeaderProps {
  title: string;
  category: string;
  location: string;
  rating: string;
  reviewsCount: number;
  duration: string;
  overview: string;
}

export default function TourHeader({ title, category, location, rating, reviewsCount, duration, overview }: TourHeaderProps) {
  return (
    <>
      <div className="mb-lg">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="bg-primary-fixed text-on-primary-fixed-variant px-sm py-xs rounded-full font-label-sm text-label-sm">{category}</span>
          <span className="bg-surface-container-low text-on-surface-variant px-sm py-xs rounded-full font-label-sm text-label-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">location_on</span> {location}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-headline-md text-[24px] sm:text-[28px] md:text-[32px] text-on-surface mb-3 leading-tight">{title}</h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-md text-on-surface-variant font-label-md text-label-md">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px] icon-fill text-[#F59E0B]">star</span>
            <span className="text-on-surface font-semibold">{rating}</span>
            <span className="text-on-surface-variant">({reviewsCount} Reviews)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">schedule</span>
            <span>{duration}</span>
          </div>
        </div>
      </div>

      <hr className="border-outline-variant/50 mb-lg"/>

      <section className="mb-lg">
        <h2 className="font-title-lg text-title-lg text-on-surface mb-sm">Experience Overview</h2>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          {overview}
        </p>
      </section>
    </>
  );
}
