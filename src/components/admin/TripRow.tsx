"use client";

import React from 'react';
import type { Experience } from '@/lib/content-store';

interface TripRowProps {
  trip: Experience;
  isDraft: boolean;
  categoryBadgeColor: string;
  statusColor: string;
  statusText: string;
  onEdit: (trip: Experience) => void;
  onDelete: (id: string) => void;
}

const TripRow = React.memo(function TripRow({
  trip,
  isDraft,
  categoryBadgeColor,
  statusColor,
  statusText,
  onEdit,
  onDelete,
}: TripRowProps) {
  return (
    <tr className={`table-row-hover transition-all ${isDraft ? 'bg-surface-bright opacity-80' : 'bg-surface-container-lowest'}`}>
      <td className="py-md px-md">
        <div className="flex items-center gap-md">
          {trip.image ? (
            <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
              <img className="w-full h-full object-cover" src={trip.image} alt={trip.title} />
            </div>
          ) : (
            <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 shadow-sm bg-surface-container-high flex items-center justify-center">
              <span className="material-symbols-outlined text-outline">image</span>
            </div>
          )}
          <div>
            <div className={`font-title-lg text-title-lg mb-xs ${isDraft ? 'text-on-surface-variant' : 'text-primary'}`}>{trip.title}</div>
            <div className={`font-label-sm text-label-sm flex items-center gap-xs ${isDraft ? 'text-outline' : 'text-on-surface-variant'}`}>
              <span className="material-symbols-outlined text-[14px]">schedule</span> {trip.duration}
            </div>
          </div>
        </div>
      </td>
      <td className="py-md px-md">
        <span className={`inline-flex items-center gap-xs px-sm py-xs rounded-full font-label-sm text-label-sm border ${categoryBadgeColor}`}>
          <span className="material-symbols-outlined text-[14px]">public</span> {trip.category}
        </span>
      </td>
      <td className={`py-md px-md font-body-md text-body-md ${isDraft ? 'text-outline' : 'text-on-surface'}`}>{trip.price}</td>
      <td className="py-md px-md">
        <div className="flex items-center gap-sm">
          <span className={`font-title-lg text-title-lg ${isDraft ? 'text-outline' : 'text-primary'}`}>{trip.bookings}</span>
          <span className={`font-label-sm text-label-sm ${isDraft ? 'text-outline' : 'text-on-surface-variant'}`}>/ {trip.capacity ? `${trip.capacity} cap` : '--'}</span>
        </div>
      </td>
      <td className="py-md px-md">
        <span className={`inline-flex items-center gap-xs font-label-sm text-label-sm ${statusText}`}>
          <span className={`w-2 h-2 rounded-full ${statusColor}`}></span> {trip.status}
        </span>
      </td>
      <td className="py-md px-md text-right">
        <div className="flex justify-end gap-xs">
          <button
            onClick={() => onEdit(trip)}
            className="p-xs text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded transition-colors"
            title="Edit Experience"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
          <button
            onClick={() => onDelete(trip.id)}
            className="p-xs text-on-surface-variant hover:text-error hover:bg-error-container rounded transition-colors"
            title="Delete Experience"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
});

TripRow.displayName = 'TripRow';

export default TripRow;
