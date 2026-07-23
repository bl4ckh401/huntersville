import { Suspense } from 'react';
import BookingConfirmedClient from './BookingConfirmedClient';

export const metadata = {
  title: 'Booking Confirmed - HuntersVilleTours',
  description: 'Your booking has been confirmed. Get ready for an unforgettable adventure.',
};

export default function BookingConfirmedPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center px-gutter">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-outline-variant border-t-amber-500" />
        </div>
      }
    >
      <BookingConfirmedClient />
    </Suspense>
  );
}
