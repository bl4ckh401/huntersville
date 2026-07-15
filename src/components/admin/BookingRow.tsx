"use client";

import React from 'react';
import type { Booking } from '@/lib/content-store';

interface BookingRowProps {
  booking: Booking;
}

const BookingRow = React.memo(function BookingRow({ booking }: BookingRowProps) {
  const statusClass =
    booking.status === 'Paid'
      ? 'bg-primary-fixed text-on-primary-fixed-variant'
      : booking.status === 'Pending'
        ? 'bg-surface-container-high text-on-surface-variant'
        : 'bg-error text-on-error';

  return (
    <tr className={`hover:bg-surface-container-lowest transition-colors group ${booking.status === 'Failed' ? 'bg-error-container/20' : ''}`}>
      <td className="p-sm font-label-md text-primary">{booking.id}</td>
      <td className="p-sm text-on-surface font-medium">{booking.travelerName}</td>
      <td className="p-sm text-on-surface-variant">{booking.experienceTitle}</td>
      <td className="p-sm text-on-surface-variant text-sm">{booking.date}</td>
      <td className="p-sm text-on-surface text-right font-medium">{booking.amount}</td>
      <td className="p-sm">
        <div className="flex items-center gap-xs text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px]">{booking.paymentMethod === 'M-Pesa' ? 'smartphone' : 'credit_card'}</span>
          {booking.paymentMethod}
        </div>
      </td>
      <td className="p-sm">
        <span className={`inline-flex items-center px-2 py-1 rounded-full font-label-sm text-[10px] tracking-wider uppercase ${statusClass}`}>
          {booking.status}
        </span>
      </td>
      <td className="p-sm text-right">
        <button className="text-on-surface-variant hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined text-[18px]">more_vert</span>
        </button>
      </td>
    </tr>
  );
});

BookingRow.displayName = 'BookingRow';

export default BookingRow;
