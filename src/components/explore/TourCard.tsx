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
    <Link href={`/explore/${props.id}`} className="block h-full">
      <article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-[0px_10px_30px_rgba(0,0,0,0.08)] hover:scale-101 transition-all duration-300 group cursor-pointer border border-outline-variant/30 flex flex-col h-full">
        <div className="relative h-48 w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
            title={props.alt}
            style={{ backgroundImage: `url('${props.image}')` }}
          ></div>
          <div className="absolute top-2 right-2 bg-surface/90 backdrop-blur px-2 py-1 rounded font-label-sm text-label-sm text-primary flex items-center gap-1 shadow-sm">
            <span className="material-symbols-outlined text-[14px] icon-fill text-[#F59E0B]">star</span> {props.rating}
          </div>
          <div className="absolute bottom-2 left-2 flex gap-1">
            <span className="bg-primary-fixed/90 backdrop-blur text-on-primary-fixed-variant px-2 py-0.5 rounded font-label-sm text-label-sm">{props.category}</span>
            <span className="bg-surface/90 backdrop-blur text-on-surface-variant px-2 py-0.5 rounded font-label-sm text-label-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">schedule</span> {props.duration}
            </span>
          </div>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <div className="text-label-sm font-label-sm text-on-surface-variant mb-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">location_on</span> {props.location}
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 line-clamp-2 group-hover:text-primary transition-colors">{props.title}</h3>
          <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-4 flex-1">{props.description}</p>

          <div className="flex items-end justify-between mt-auto pt-4 border-t border-outline-variant/50">
            <div>
              <span className="text-label-sm font-label-sm text-on-surface-variant">From</span>
              <div className="font-title-lg text-title-lg text-primary font-bold">{props.price} <span className="text-body-md font-normal text-on-surface-variant">/pp</span></div>
            </div>
            <button className="bg-[#F97316] text-white px-4 py-2 rounded-lg font-label-md text-label-md shadow-[0_2px_0_0_rgba(154,52,18,1)] hover:bg-[#EA580C] active:translate-y-[2px] active:shadow-none transition-all">Book</button>
          </div>
        </div>
      </article>
    </Link>
  );
}
