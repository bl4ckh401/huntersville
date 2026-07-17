interface MetaItem {
  icon: string;
  value: string;
}

interface TourHeaderProps {
  title: string;
  category: string;
  location: string;
  rating: string;
  reviewsCount: number;
  meta?: MetaItem[];
  tags?: string[];
  tagline?: string;
}

export default function TourHeader({ title, category, location, rating, reviewsCount, meta = [], tags = [], tagline }: TourHeaderProps) {
  const visibleMeta = meta.filter((item) => item.value && item.value.trim().length > 0);

  return (
    <div className="mb-lg">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-primary-fixed px-sm py-xs font-label-sm text-label-sm text-on-primary-fixed-variant">{category}</span>
        {location ? (
          <span className="flex items-center gap-1 rounded-full bg-surface-container-low px-sm py-xs font-label-sm text-label-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[14px]">location_on</span> {location}
          </span>
        ) : null}
      </div>

      <h1 className="mb-3 font-headline-md text-[26px] leading-tight text-on-surface sm:text-[30px] md:text-[34px]">{title}</h1>

      {tagline ? <p className="mb-4 max-w-3xl font-body-md text-body-md leading-relaxed text-on-surface-variant">{tagline}</p> : null}

      <div className="flex flex-wrap items-center gap-x-md gap-y-2 font-label-md text-label-md text-on-surface-variant">
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[18px] text-[#F59E0B] icon-fill">star</span>
          <span className="font-semibold text-on-surface">{rating}</span>
          <span>({reviewsCount} reviews)</span>
        </div>
        {visibleMeta.map((item) => (
          <div key={`${item.icon}-${item.value}`} className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>

      {tags.length ? (
        <div className="mt-4 flex flex-wrap gap-xs">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full bg-surface-container px-sm py-xs font-label-sm text-label-sm text-on-surface-variant">
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
