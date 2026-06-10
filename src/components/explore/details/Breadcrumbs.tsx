import Link from 'next/link';

export default function Breadcrumbs({ title }: { title: string }) {
  return (
    <nav className="flex items-center space-x-xs text-label-sm font-label-sm text-on-surface-variant mb-md">
      <Link className="hover:text-primary transition-colors" href="/explore">Explore</Link>
      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
      <Link className="hover:text-primary transition-colors" href="/explore?location=Africa">Africa</Link>
      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
      <span className="text-on-surface truncate">{title}</span>
    </nav>
  );
}
