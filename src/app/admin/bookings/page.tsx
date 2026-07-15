"use client";

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import AdminPagination from '@/components/admin/AdminPagination';
import EmptyState from '@/components/EmptyState';
import BookingRow from '@/components/admin/BookingRow';
import { useAdminContext } from '@/contexts/AdminContext';
import type { Booking } from '@/lib/content-store';

export default function BookingsPage() {
  const { refreshKey, refresh, isRefreshing } = useAdminContext();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetch('/api/bookings')
      .then((response) => response.json())
      .then(setBookings);
  }, [refreshKey]);

  const statusCounts = useMemo(() => {
    return bookings.reduce(
      (acc, booking) => {
        acc[booking.status] = (acc[booking.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
  }, [bookings]);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-lg gap-md">
        <div>
          <h1 className="font-headline-md text-headline-md text-primary mb-xs">Booking Ledger</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Comprehensive transaction records and trip bookings.</p>
        </div>
        <button className="flex items-center gap-sm px-md py-sm bg-surface-container-highest text-on-surface rounded-xl font-label-md text-label-md hover:bg-outline-variant transition-colors shadow-sm">
          <span className="material-symbols-outlined text-[18px]">download</span>
          Export to CSV
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-md mb-lg">
        {[
          { label: 'Total Bookings', value: bookings.length.toString(), icon: 'receipt_long' },
          { label: 'Confirmed', value: (statusCounts['Confirmed'] || 0).toString(), icon: 'check_circle' },
          { label: 'Pending', value: (statusCounts['Pending'] || 0).toString(), icon: 'pending' },
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

      <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest shadow-[0px_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
        {bookings.length === 0 ? (
          <div className="p-lg">
            <EmptyState
              icon="event_note"
              title="No bookings yet"
              description="When travelers book experiences, their reservations will appear here. Share your experiences to start receiving bookings."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-surface-variant bg-surface-container-low/50">
                  <th className="p-sm font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">Booking ID</th>
                  <th className="p-sm font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">Traveler Name</th>
                  <th className="p-sm font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">Experience</th>
                  <th className="p-sm font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">Date</th>
                  <th className="p-sm font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap text-right">Amount</th>
                  <th className="p-sm font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">Method</th>
                  <th className="p-sm font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant font-body-md text-body-md">
                {bookings.map((booking) => (
                  <BookingRow key={booking.id} booking={booking} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
