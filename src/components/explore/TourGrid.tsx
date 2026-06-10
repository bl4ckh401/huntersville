import TourCard, { TourCardProps } from './TourCard';

export default function TourGrid({ tours }: { tours: TourCardProps[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-md">
      {tours.map((tour) => (
        <TourCard key={tour.id} {...tour} />
      ))}
    </div>
  );
}
