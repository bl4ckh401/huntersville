import FilterSidebar from '@/components/explore/FilterSidebar';
import TourGrid from '@/components/explore/TourGrid';
import Pagination from '@/components/explore/Pagination';
import EmptyState from '@/components/EmptyState';
import { getExperiences } from '@/lib/content-store';

export const metadata = {
  title: 'Explore - HuntersVilleTours',
  description: 'Discover curated adventures across East Africa.',
};

export default async function ExplorePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const filters = {
    search: typeof params.search === 'string' ? params.search : undefined,
    location: typeof params.location === 'string' ? params.location : undefined,
    minPrice: typeof params.minPrice === 'string' ? Number(params.minPrice) : undefined,
    maxPrice: typeof params.maxPrice === 'string' ? Number(params.maxPrice) : undefined,
  };

  const tours = (await getExperiences(filters)).map((experience) => ({
    id: experience.id,
    image: experience.coverPhoto || experience.image,
    alt: experience.summary || experience.description,
    rating: '4.9',
    category: experience.category,
    duration: experience.duration,
    location: experience.location,
    title: experience.title,
    description: experience.summary || experience.description,
    price: experience.price,
  }));

  return (
    <div className="flex flex-1 mb-16 pt-[120px] max-w-container-max mx-auto w-full px-gutter md:px-lg gap-lg">
      <FilterSidebar />

      <main className="flex-1 pb-xl">
        <div className="mb-md flex justify-between items-end">
          <div>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-xs">Explore Experiences</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Discover curated adventures across East Africa.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-on-surface-variant">
            <span className="font-label-sm text-label-sm">Sort by:</span>
            <select className="bg-transparent border-none text-on-background font-label-md text-label-md focus:ring-0 cursor-pointer outline-none">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Rating: High to Low</option>
            </select>
          </div>
        </div>

        {tours.length === 0 ? (
          <EmptyState
            icon="flight_takeoff"
            title="No adventures found"
            description="We're currently curating experiences for your next journey. Check back soon or explore our featured destinations."
            actionLabel="Back to home"
            actionHref="/"
          />
        ) : (
          <>
            <TourGrid tours={tours} />
            <Pagination />
          </>
        )}
      </main>
    </div>
  );
}
