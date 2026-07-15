import React from 'react';
import KPIs from '@/components/admin/KPIs';
import RevenueChart from '@/components/admin/RevenueChart';
import DeparturesWidget from '@/components/admin/DeparturesWidget';
import RecentBookings from '@/components/admin/RecentBookings';
import { getBookings, getExperienceStats, getExperiences, getTravelers } from '@/lib/content-store';

function parseAmount(value: string) {
  const parsed = Number(value.replace(/[^0-9.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
}

function buildRevenueSeries(bookings: Awaited<ReturnType<typeof getBookings>>) {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const now = new Date();
  const series = Array.from({ length: 6 }, (_, index) => {
    const month = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    return { label: monthNames[month.getMonth()], value: 0 };
  });

  bookings.forEach((booking) => {
    const bookingDate = new Date(booking.date || booking.createdAt);
    if (Number.isNaN(bookingDate.getTime())) return;

    const monthIndex = series.findIndex((item) => item.label === monthNames[bookingDate.getMonth()]);
    if (monthIndex >= 0) {
      series[monthIndex].value += parseAmount(booking.amount);
    }
  });

  return series;
}

export default async function AdminPage() {
  const [bookings, experiences, travelers, stats] = await Promise.all([
    getBookings(),
    getExperiences({ status: 'Active' }),
    getTravelers(),
    getExperienceStats(),
  ]);

  const totalRevenue = bookings.reduce((sum, booking) => sum + parseAmount(booking.amount), 0);
  const activeBookings = bookings.filter((booking) => ['Pending', 'Confirmed', 'Paid'].includes(booking.status)).length;
  const revenueSeries = buildRevenueSeries(bookings);

  return (
    <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest shadow-[0px_4px_20px_rgba(0,0,0,0.02)] p-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-lg gap-md">
        <div>
          <h1 className="font-headline-md text-headline-md text-primary mb-xs">Insights &amp; Analytics</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Live performance overview for HuntersVilleTours</p>
        </div>
        <div className="flex flex-wrap gap-sm">
          <button className="px-md py-sm bg-surface-container-lowest border border-outline-variant rounded-xl font-label-md text-label-md flex items-center gap-xs hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined">calendar_month</span>
            Live Data
          </button>
          <button className="px-md py-sm bg-primary text-on-primary rounded-xl font-label-md text-label-md flex items-center gap-xs shadow-sm hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined">download</span>
            Export
          </button>
        </div>
      </div>

      <KPIs
        totalRevenue={totalRevenue}
        activeBookings={activeBookings}
        travelersCount={travelers.length}
        activeExperiences={stats.activeExperiences}
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-md mb-lg">
        <RevenueChart series={revenueSeries} />
        <DeparturesWidget experiences={experiences.slice(0, 3)} />
      </div>

      <RecentBookings bookings={bookings.slice(0, 8)} />
    </div>
  );
}
