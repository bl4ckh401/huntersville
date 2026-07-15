import React from 'react';

interface KPIsProps {
  totalRevenue: number;
  activeBookings: number;
  travelersCount: number;
  activeExperiences: number;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function KPIs({ totalRevenue, activeBookings, travelersCount, activeExperiences }: KPIsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-md mb-lg">
      <div className="glass-card rounded-xl p-md hover-lift flex flex-col justify-between">
        <div className="flex justify-between items-start mb-md">
          <div className="p-sm bg-primary-container text-on-primary-container rounded-lg">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <span className="font-label-sm text-label-sm text-surface-tint bg-primary-fixed-dim bg-opacity-20 px-xs py-1 rounded flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span> Live
          </span>
        </div>
        <div>
          <p className="font-label-md text-label-md text-on-surface-variant mb-xs">Total Revenue</p>
          <h3 className="font-headline-md text-headline-md text-primary">{formatCurrency(totalRevenue)}</h3>
        </div>
      </div>

      <div className="glass-card rounded-xl p-md hover-lift flex flex-col justify-between">
        <div className="flex justify-between items-start mb-md">
          <div className="p-sm bg-secondary-container text-on-secondary-container rounded-lg">
            <span className="material-symbols-outlined">book_online</span>
          </div>
          <span className="font-label-sm text-label-sm text-surface-tint bg-primary-fixed-dim bg-opacity-20 px-xs py-1 rounded flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span> Open
          </span>
        </div>
        <div>
          <p className="font-label-md text-label-md text-on-surface-variant mb-xs">Active Bookings</p>
          <h3 className="font-headline-md text-headline-md text-primary">{activeBookings}</h3>
        </div>
      </div>

      <div className="glass-card rounded-xl p-md hover-lift flex flex-col justify-between">
        <div className="flex justify-between items-start mb-md">
          <div className="p-sm bg-tertiary-container text-on-tertiary-container rounded-lg">
            <span className="material-symbols-outlined">person_add</span>
          </div>
          <span className="font-label-sm text-label-sm text-error bg-error-container bg-opacity-50 px-xs py-1 rounded flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">groups</span> Travelers
          </span>
        </div>
        <div>
          <p className="font-label-md text-label-md text-on-surface-variant mb-xs">Registered Travelers</p>
          <h3 className="font-headline-md text-headline-md text-primary">{travelersCount}</h3>
        </div>
      </div>

      <div className="glass-card rounded-xl p-md hover-lift flex flex-col justify-between">
        <div className="flex justify-between items-start mb-md">
          <div className="p-sm bg-surface-variant text-on-surface-variant rounded-lg">
            <span className="material-symbols-outlined">explore</span>
          </div>
          <span className="font-label-sm text-label-sm text-surface-tint bg-primary-fixed-dim bg-opacity-20 px-xs py-1 rounded flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">travel_explore</span> Live
          </span>
        </div>
        <div>
          <p className="font-label-md text-label-md text-on-surface-variant mb-xs">Active Experiences</p>
          <h3 className="font-headline-md text-headline-md text-primary">{activeExperiences}</h3>
        </div>
      </div>
    </div>
  );
}
