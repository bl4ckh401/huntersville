'use client';

import { useEffect, useState, useMemo } from 'react';
import TravelerCard, { TravelerCardProps } from '@/components/admin/TravelerCard';
import AdminPagination from '@/components/admin/AdminPagination';
import EmptyState from '@/components/EmptyState';
import { useAdminContext } from '@/contexts/AdminContext';
import type { Traveler } from '@/lib/content-store';

export default function TravelersPage() {
  const { refreshKey } = useAdminContext();
  const [travelers, setTravelers] = useState<TravelerCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTravelers() {
      try {
        const response = await fetch('/api/travelers');
        const data: Traveler[] = await response.json();
        const formatted: TravelerCardProps[] = data.map((t) => {
          const totalTrips = 'totalTrips' in t ? (t as any).totalTrips : 0;
          const lastBookingDate = 'lastBookingDate' in t ? (t as any).lastBookingDate : '';
          let status: 'Premium' | 'Explorer' | 'New' = 'New';
          if (totalTrips > 5) status = 'Premium';
          else if (totalTrips > 1) status = 'Explorer';

          return {
            id: t.id,
            name: t.name,
            email: t.email,
            status,
            totalTrips,
            lastBookingDate: lastBookingDate || 'No bookings yet',
          };
        });
        setTravelers(formatted);
      } catch (error) {
        console.error('Failed to load travelers:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadTravelers();
  }, [refreshKey]);

  const stats = useMemo(() => {
    return travelers.reduce(
      (acc, traveler) => {
        acc.total += 1;
        if (traveler.status === 'Premium') acc.premium += 1;
        if (traveler.status === 'Explorer') acc.explorer += 1;
        return acc;
      },
      { total: 0, premium: 0, explorer: 0 },
    );
  }, [travelers]);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-lg gap-4">
        <div>
          <h2 className="font-headline-md text-headline-md text-primary mb-1">Traveler Directory</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Manage and view details for all registered explorers.</p>
        </div>
        <div className="flex gap-sm w-full sm:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant bg-surface-container-lowest text-on-surface font-label-md text-label-md rounded-xl hover:bg-surface-container-low transition-colors flex-1 sm:flex-none justify-center">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant bg-surface-container-lowest text-on-surface font-label-md text-label-md rounded-xl hover:bg-surface-container-low transition-colors flex-1 sm:flex-none justify-center">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-md mb-lg">
        {[
          { label: 'Total Travelers', value: stats.total.toString(), icon: 'group' },
          { label: 'Premium', value: stats.premium.toString(), icon: 'star' },
          { label: 'Explorers', value: stats.explorer.toString(), icon: 'explore' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-md shadow-[0px_4px_20px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-sm mb-sm">
              <span className="material-symbols-outlined text-primary text-[20px]">{stat.icon}</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">{stat.label}</span>
            </div>
            <p className="font-title-lg text-title-lg text-primary">{stat.value}</p>
          </div>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center py-lg">
          <p className="font-body-md text-body-md text-on-surface-variant">Loading travelers...</p>
        </div>
      ) : travelers.length === 0 ? (
        <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-lg shadow-[0px_4px_20px_rgba(0,0,0,0.02)]">
          <EmptyState
            icon="group"
            title="No travelers yet"
            description="Travelers who sign up and book experiences will appear here. Share your experiences to start building your community."
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md mb-lg">
          {travelers.map((traveler) => (
            <TravelerCard key={traveler.id} {...traveler} />
          ))}
        </div>
      )}

      {travelers.length > 0 && (
        <AdminPagination currentPage={1} totalPages={1} onPageChange={() => {}} />
      )}
    </>
  );
}
