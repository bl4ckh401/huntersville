"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const locations = ['Kenya', 'Tanzania', 'Uganda'];

export default function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') ?? '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') ?? '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') ?? '');
  const [search, setSearch] = useState(searchParams.get('search') ?? '');

  function applyFilters() {
    const params = new URLSearchParams(searchParams.toString());

    if (search) params.set('search', search); else params.delete('search');
    if (selectedLocation) params.set('location', selectedLocation); else params.delete('location');
    if (minPrice) params.set('minPrice', minPrice); else params.delete('minPrice');
    if (maxPrice) params.set('maxPrice', maxPrice); else params.delete('maxPrice');

    router.push(`${pathname}?${params.toString()}`);
  }

  function clearFilters() {
    setSelectedLocation('');
    setMinPrice('');
    setMaxPrice('');
    setSearch('');
    router.push(pathname);
  }

  return (
    <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 bg-surface-container rounded-xl p-md h-fit sticky top-[120px] shadow-sm">
      <div className="flex items-center justify-between mb-md">
        <h2 className="font-title-lg text-title-lg text-on-surface">Filters</h2>
        <button onClick={clearFilters} className="text-on-surface-variant text-label-sm font-label-sm hover:text-primary">Clear all</button>
      </div>

      <div className="mb-sm border-b border-outline-variant pb-sm">
        <h3 className="font-label-md text-label-md text-on-surface-variant mb-sm uppercase tracking-widest">Search</h3>
        <input value={search} onChange={(event) => setSearch(event.target.value)} className="w-full bg-surface border border-outline-variant rounded p-2 text-body-md focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/50 transition-all outline-none" placeholder="Search journeys" />
      </div>

      {/* Location */}
      <div className="mb-sm border-b border-outline-variant pb-sm">
        <h3 className="font-label-md text-label-md text-on-surface-variant mb-sm uppercase tracking-widest">Location</h3>
        <div className="space-y-2">
          {locations.map((location) => (
            <label key={location} className="flex items-center gap-2 cursor-pointer group">
              <input checked={selectedLocation === location} onChange={() => setSelectedLocation(location)} className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4 bg-surface" type="radio" name="location" />
              <span className="font-body-md text-body-md text-on-surface group-hover:text-primary transition-colors">{location}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-sm border-b border-outline-variant pb-sm">
        <h3 className="font-label-md text-label-md text-on-surface-variant mb-sm uppercase tracking-widest">Price Range</h3>
        <div className="flex items-center gap-2">
          <input value={minPrice} onChange={(event) => setMinPrice(event.target.value)} className="w-full bg-surface border border-outline-variant rounded p-2 text-body-md focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/50 transition-all outline-none" placeholder="Min" type="number" />
          <span className="text-on-surface-variant">-</span>
          <input value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} className="w-full bg-surface border border-outline-variant rounded p-2 text-body-md focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/50 transition-all outline-none" placeholder="Max" type="number" />
        </div>
      </div>

      <button onClick={applyFilters} className="mt-lg w-full bg-primary text-on-primary font-label-md text-label-md py-3 rounded-lg shadow-sm hover:shadow-md hover:scale-101 active:scale-95 transition-all duration-200">
        Apply Filters
      </button>
    </aside>
  );
}
