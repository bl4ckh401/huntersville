import React from 'react';
import type { Booking } from '@/lib/content-store';

interface RecentBookingsProps {
  bookings: Booking[];
}

function formatDate(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function statusClass(status: Booking['status']) {
  switch (status) {
    case 'Confirmed':
    case 'Paid':
      return 'bg-primary-fixed-dim bg-opacity-20 text-surface-tint';
    case 'Pending':
      return 'bg-surface-variant text-on-surface-variant';
    default:
      return 'bg-error-container text-error';
  }
}

export default function RecentBookings({ bookings }: RecentBookingsProps) {
  return (
    <div className="glass-card rounded-xl p-md overflow-hidden">
      <div className="flex justify-between items-center mb-md">
        <h3 className="font-title-lg text-title-lg text-primary">Recent Bookings</h3>
        <a href="/admin/bookings" className="text-sm text-primary hover:underline">View all</a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-outline-variant text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
              <th className="py-sm px-xs font-normal">Traveler</th>
              <th className="py-sm px-xs font-normal">Experience</th>
              <th className="py-sm px-xs font-normal">Date</th>
              <th className="py-sm px-xs font-normal">Amount</th>
              <th className="py-sm px-xs font-normal">Status</th>
            </tr>
          </thead>
          <tbody className="text-body-md font-body-md">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-md px-xs text-on-surface-variant">No bookings yet.</td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-surface-variant hover:bg-surface-container-lowest transition-colors">
                  <td className="py-sm px-xs">
                    <div className="flex items-center gap-sm">
                      <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-label-sm">
                        {booking.travelerName.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()}
                      </div>
                      <div>
                        <div className="font-label-md text-primary">{booking.travelerName}</div>
                        <div className="text-sm text-on-surface-variant">{booking.travelerEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-sm px-xs">{booking.experienceTitle}</td>
                  <td className="py-sm px-xs text-on-surface-variant">{formatDate(booking.date || booking.createdAt)}</td>
                  <td className="py-sm px-xs font-label-md">{booking.amount}</td>
                  <td className="py-sm px-xs">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full font-label-sm text-[11px] uppercase tracking-wide ${statusClass(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
