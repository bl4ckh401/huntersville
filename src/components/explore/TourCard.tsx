import Link from 'next/link';

export interface TourCardProps {
  id: string;
  image: string;
  alt: string;
  rating: string;
  category: string;
  duration: string;
  location: string;
  title: string;
  description: string;
  price: string;
}

export default function TourCard(props: TourCardProps) {
  return (
    <Link
      href={`/explore/${props.id}`}
      className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
    >
      <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-outline-variant/40 bg-surface-container-lowest shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0px_16px_36px_rgba(0,0,0,0.1)]">
        <div className="relative h-52 w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            title={props.alt}
            style={{ backgroundImage: `url('${props.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />

          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-surface/95 px-2 py-1 font-label-sm text-label-sm text-on-surface shadow-sm backdrop-blur">
            <span className="material-symbols-outlined icon-fill text-[14px] text-amber-500">star</span>
            {props.rating}
          </div>

          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-primary-fixed px-2.5 py-1 font-label-sm text-label-sm text-on-primary-fixed-variant">
              {props.category}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-surface/90 px-2.5 py-1 font-label-sm text-label-sm text-on-surface-variant backdrop-blur">
              <span className="material-symbols-outlined text-[13px]">schedule</span>
              {props.duration}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="mb-1 flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[14px]">location_on</span>
            {props.location}
          </div>

          <h3 className="mb-2 font-headline-sm text-headline-sm text-on-surface transition-colors line-clamp-2 group-hover:text-primary">
            {props.title}
          </h3>

          <p className="mb-3 flex-1 font-body-md text-body-md text-on-surface-variant line-clamp-2">
            {props.description}
          </p>

          <div className="mt-auto flex items-end justify-between border-t border-outline-variant/50 pt-3">
            <div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">From</span>
              <div className="font-title-lg text-title-lg font-bold text-primary">
                {props.price} <span className="font-body-md text-body-md font-normal text-on-surface-variant">/pp</span>
              </div>
            </div>
            <span className="rounded-lg bg-primary px-4 py-2 font-label-md text-label-md text-on-primary shadow-sm transition-all group-hover:shadow-md group-active:translate-y-[1px]">
              Book
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}