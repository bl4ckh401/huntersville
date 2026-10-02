import FilterSidebar from '@/components/explore/FilterSidebar';
import TourGrid from '@/components/explore/TourGrid';
import Pagination from '@/components/explore/Pagination';
import SortSelect from '@/components/explore/SortSelect';
import EmptyState from '@/components/EmptyState';
import { getExperiences } from '@/lib/content-store';

export const metadata = {
  title: 'Explore - HuntersVilleTours',
  description: 'Discover curated adventures across East Africa.',
};

const PAGE_SIZE = 9;

function parsePrice(value: string): number {
  const cleaned = value.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

function buildSearch(params: Record<string, string | string[] | undefined>, omit: string[] = []) {
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (omit.includes(key)) return;
    if (typeof value === 'string' && value) usp.set(key, value);
  });
  return usp;
}

export default async function ExplorePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const filters = {
    search: typeof params.search === 'string' ? params.search : undefined,
    location: typeof params.location === 'string' ? params.location : undefined,
    minPrice: typeof params.minPrice === 'string' ? Number(params.minPrice) : undefined,
    maxPrice: typeof params.maxPrice === 'string' ? Number(params.maxPrice) : undefined,
  };
  const sort = typeof params.sort === 'string' ? params.sort : 'recommended';
  const requestedPage = typeof params.page === 'string' ? Math.max(1, Number(params.page) || 1) : 1;

  const hasActiveFilters = Boolean(filters.search || filters.location || filters.minPrice || filters.maxPrice);

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

  const sortedTours = [...tours].sort((a, b) => {
    if (sort === 'price-asc') return parsePrice(a.price) - parsePrice(b.price);
    if (sort === 'price-desc') return parsePrice(b.price) - parsePrice(a.price);
    return 0; // "recommended" keeps the store's original ordering
  });

  const totalPages = Math.max(1, Math.ceil(sortedTours.length / PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);
  const paginatedTours = sortedTours.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const paginationQuery = buildSearch(params, ['page']).toString();

  const chips = [
    filters.search && { key: 'search', label: `"${filters.search}"` },
    filters.location && { key: 'location', label: filters.location },
    filters.minPrice !== undefined && { key: 'minPrice', label: `From $${filters.minPrice}` },
    filters.maxPrice !== undefined && { key: 'maxPrice', label: `Up to $${filters.maxPrice}` },
  ].filter(Boolean) as { key: string; label: string }[];

  return (
    <div className="flex flex-col lg:flex-row lg:items-start flex-1 mb-16 pt-[88px] max-w-container-max mx-auto w-full px-gutter md:px-lg gap-md">
      <FilterSidebar />

      <main className="flex-1 pb-xl">
        <div className="mb-md flex flex-wrap items-end justify-between gap-sm">
          <div>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-xs">Explore Experiences</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Curated safaris and adventures across Kenya, Tanzania and Uganda.
            </p>
          </div>
          <SortSelect />
        </div>

        <div className="mb-md flex flex-wrap items-center gap-x-sm gap-y-2">
          <p className="font-label-md text-label-md text-on-surface-variant">
            {sortedTours.length} {sortedTours.length === 1 ? 'experience' : 'experiences'}
          </p>
          {chips.map((chip) => (
            <a
              key={chip.key}
              href={`/explore?${buildSearch(params, [chip.key, 'page']).toString()}`}
              className="flex items-center gap-1 rounded-full bg-primary-container/40 px-3 py-1 font-label-sm text-label-sm text-on-primary-container hover:bg-primary-container/70"
            >
              {chip.label}
              <span className="material-symbols-outlined text-[14px]">close</span>
            </a>
          ))}
          {hasActiveFilters && (
            <a href="/explore" className="font-label-sm text-label-sm text-on-surface-variant underline hover:text-primary">
              Clear all
            </a>
          )}
        </div>

        {sortedTours.length === 0 ? (
          hasActiveFilters ? (
            <EmptyState
              icon="filter_alt_off"
              title="No experiences match your filters"
              description="Try widening your price range or choosing a different location."
              actionLabel="Clear filters"
              actionHref="/explore"
            />
          ) : (
            <EmptyState
              icon="flight_takeoff"
              title="No adventures found"
              description="We're currently curating experiences for your next journey. Check back soon or explore our featured destinations."
              actionLabel="Back to home"
              actionHref="/"
            />
          )
        ) : (
          <>
            <TourGrid tours={paginatedTours} />
            <Pagination currentPage={currentPage} totalPages={totalPages} queryString={paginationQuery} />
          </>
        )}
      </main>
    </div>
  );
}