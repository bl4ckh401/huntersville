import TourCard, { TourCardProps } from './TourCard';

export default function TourGrid({ tours }: { tours: TourCardProps[] }) {
  return (
    <div className="grid grid-cols-1 gap-md sm:grid-cols-2 xl:grid-cols-3">
      <style>{`
        @keyframes tourCardIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tour-card-in { animation: tourCardIn 0.5s ease both; }
        @media (prefers-reduced-motion: reduce) {
          .tour-card-in { animation: none; }
        }
      `}</style>
      {tours.map((tour, index) => (
        <div key={tour.id} className="tour-card-in" style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}>
          <TourCard {...tour} />
        </div>
      ))}
    </div>
  );
}