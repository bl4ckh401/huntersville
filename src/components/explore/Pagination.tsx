import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  /** Existing query string (filters, sort, etc.) WITHOUT the `page` key. */
  queryString?: string;
}

function pageHref(page: number, queryString?: string) {
  const params = new URLSearchParams(queryString);
  if (page > 1) params.set('page', String(page));
  else params.delete('page');
  const qs = params.toString();
  return qs ? `/explore?${qs}` : '/explore';
}

/** Builds a compact page list with ellipses, e.g. 1 … 4 5 [6] 7 8 … 12 */
function getPageList(current: number, total: number): (number | 'ellipsis')[] {
  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b);

  const result: (number | 'ellipsis')[] = [];
  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) result.push('ellipsis');
    result.push(page);
  });
  return result;
}

export default function Pagination({ currentPage, totalPages, queryString }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageList(currentPage, totalPages);

  return (
    <nav aria-label="Pagination" className="mt-lg flex items-center justify-center gap-2">
      <Link
        href={pageHref(currentPage - 1, queryString)}
        aria-disabled={currentPage === 1}
        aria-label="Previous page"
        className={`flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant transition-colors ${
          currentPage === 1
            ? 'pointer-events-none opacity-40'
            : 'text-on-surface-variant hover:border-primary hover:text-primary'
        }`}
      >
        <span className="material-symbols-outlined text-[20px]">chevron_left</span>
      </Link>

      {pages.map((page, index) =>
        page === 'ellipsis' ? (
          <span key={`ellipsis-${index}`} className="px-1 font-label-md text-label-md text-on-surface-variant">
            …
          </span>
        ) : (
          <Link
            key={page}
            href={pageHref(page, queryString)}
            aria-current={page === currentPage ? 'page' : undefined}
            className={`flex h-10 w-10 items-center justify-center rounded-full font-label-md text-label-md transition-colors ${
              page === currentPage
                ? 'bg-primary text-on-primary shadow-sm'
                : 'border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'
            }`}
          >
            {page}
          </Link>
        ),
      )}

      <Link
        href={pageHref(currentPage + 1, queryString)}
        aria-disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant transition-colors ${
          currentPage === totalPages
            ? 'pointer-events-none opacity-40'
            : 'text-on-surface-variant hover:border-primary hover:text-primary'
        }`}
      >
        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
      </Link>
    </nav>
  );
}