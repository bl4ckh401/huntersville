'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export default function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get('sort') ?? 'recommended';

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'recommended') params.delete('sort');
    else params.set('sort', value);
    params.delete('page');
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="font-label-sm text-label-sm text-on-surface-variant">
        Sort by
      </label>
      <select
        id="sort"
        value={current}
        onChange={(event) => handleChange(event.target.value)}
        className="cursor-pointer rounded-lg border-none bg-transparent font-label-md text-label-md text-on-background outline-none focus:ring-0"
      >
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}