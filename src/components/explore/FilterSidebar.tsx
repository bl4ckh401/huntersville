"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const locations = ['Kenya', 'Tanzania', 'Uganda'];

export default function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') ?? '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') ?? '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') ?? '');
  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const appliedCount = ['search', 'location', 'minPrice', 'maxPrice'].filter((key) => searchParams.get(key)).length;

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    if (!isDrawerOpen) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsDrawerOpen(false);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isDrawerOpen]);

  function applyFilters() {
    const params = new URLSearchParams(searchParams.toString());

    if (search) params.set('search', search); else params.delete('search');
    if (selectedLocation) params.set('location', selectedLocation); else params.delete('location');
    if (minPrice) params.set('minPrice', minPrice); else params.delete('minPrice');
    if (maxPrice) params.set('maxPrice', maxPrice); else params.delete('maxPrice');
    params.delete('page');

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
    setIsDrawerOpen(false);
  }

  function clearFilters() {
    setSelectedLocation('');
    setMinPrice('');
    setMaxPrice('');
    setSearch('');
    router.push(pathname);
    setIsDrawerOpen(false);
  }

  const fields = (
    <>
      <div className="mb-sm border-b border-outline-variant pb-sm">
        <h3 className="mb-sm font-label-md text-label-md tracking-widest text-on-surface-variant uppercase">Search</h3>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant">
            search
          </span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-lg border border-outline-variant bg-surface p-2 pl-9 text-body-md outline-none transition-all focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/50"
            placeholder="Search journeys"
          />
        </div>
      </div>

      <div className="mb-sm border-b border-outline-variant pb-sm">
        <h3 className="mb-sm font-label-md text-label-md tracking-widest text-on-surface-variant uppercase">Location</h3>
        <div className="flex flex-wrap gap-2">
          {locations.map((location) => {
            const checked = selectedLocation === location;
            return (
              <label key={location} className="cursor-pointer">
                <input
                  checked={checked}
                  onChange={() => setSelectedLocation(checked ? '' : location)}
                  className="peer sr-only"
                  type="radio"
                  name="location"
                />
                <span className="inline-block rounded-full border border-outline-variant px-3 py-1.5 font-body-md text-body-md text-on-surface transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-on-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary/50">
                  {location}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="mb-sm border-b border-outline-variant pb-sm">
        <h3 className="mb-sm font-label-md text-label-md tracking-widest text-on-surface-variant uppercase">Price Range</h3>
        <div className="flex items-center gap-2">
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-body-md text-on-surface-variant">$</span>
            <input
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
              className="w-full rounded-lg border border-outline-variant bg-surface p-2 pl-6 text-body-md outline-none transition-all focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/50"
              placeholder="Min"
              type="number"
              min={0}
            />
          </div>
          <span className="shrink-0 text-on-surface-variant">–</span>
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-body-md text-on-surface-variant">$</span>
            <input
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              className="w-full rounded-lg border border-outline-variant bg-surface p-2 pl-6 text-body-md outline-none transition-all focus:border-secondary-container focus:ring-2 focus:ring-secondary-container/50"
              placeholder="Max"
              type="number"
              min={0}
            />
          </div>
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="hover:scale-101 mt-lg w-full rounded-lg bg-primary py-3 font-label-md text-label-md text-on-primary shadow-sm transition-all duration-200 hover:shadow-md active:scale-95"
      >
        Apply Filters
      </button>
    </>
  );

  return (
    <>
      {/* Mobile trigger */}
      <div className="mb-md flex lg:hidden">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container px-4 py-2 font-label-md text-label-md text-on-surface shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
          Filters
          {appliedCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary font-label-sm text-[11px] text-on-primary">
              {appliedCount}
            </span>
          )}
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="sticky top-[120px] hidden h-fit w-60 flex-shrink-0 flex-col rounded-xl bg-surface-container p-md shadow-sm lg:flex">
        <div className="mb-md flex items-center justify-between">
          <h2 className="font-title-lg text-title-lg text-on-surface">Filters</h2>
          <button onClick={clearFilters} className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary">
            Clear all
          </button>
        </div>
        {fields}
      </aside>

      {/* Mobile drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 right-0 flex w-[85%] max-w-sm flex-col overflow-y-auto bg-surface p-md shadow-2xl">
            <div className="mb-md flex items-center justify-between">
              <h2 className="font-title-lg text-title-lg text-on-surface">Filters</h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close filters"
                className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            {fields}
            <button
              onClick={clearFilters}
              className="mt-sm w-full py-2 font-label-md text-label-md text-on-surface-variant hover:text-primary"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </>
  );
}