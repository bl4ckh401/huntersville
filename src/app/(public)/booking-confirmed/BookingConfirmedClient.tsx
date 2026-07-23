"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(8);

  const bookingId = searchParams.get('bookingId');
  const amount = searchParams.get('amount');
  const guests = searchParams.get('guests');
  const date = searchParams.get('date');

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-1 items-center justify-center px-gutter">
      <div className="w-full max-w-lg">
        <div className="rounded-3xl border border-outline-variant/40 bg-surface-container-lowest p-8 shadow-[0px_8px_40px_rgba(0,0,0,0.06)] sm:p-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/10">
            <span className="material-symbols-outlined text-[40px] text-amber-500">check_circle</span>
          </div>

          <h1 className="font-headline-md text-headline-md text-on-surface mb-2 text-center">Booking Confirmed!</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8 text-center">
            Your adventure is all set. We have sent a confirmation email with all the details.
          </p>

          {bookingId ? (
            <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-low p-md mb-6">
              <div className="space-y-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Booking Reference</span>
                  <span className="font-label-md text-label-md font-semibold text-on-surface">{bookingId}</span>
                </div>
                {date ? (
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Travel Date</span>
                    <span className="font-label-md text-label-md font-medium text-on-surface">
                      {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                ) : null}
                {guests ? (
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Guests</span>
                    <span className="font-label-md text-label-md font-medium text-on-surface">{guests}</span>
                  </div>
                ) : null}
                {amount ? (
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Total Paid</span>
                    <span className="font-label-md text-label-md font-semibold text-amber-500">{amount}</span>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}

          <div className="mb-6 rounded-2xl border border-outline-variant/40 bg-surface-container-low p-md">
            <p className="font-label-sm text-label-sm text-on-surface-variant mb-sm">What happens next?</p>
            <ul className="space-y-sm">
              <li className="flex items-start gap-sm">
                <span className="material-symbols-outlined mt-0.5 text-[18px] text-primary">mark_email_read</span>
                <span className="font-body-sm text-body-sm text-on-surface">Check your email for the booking confirmation and receipt.</span>
              </li>
              <li className="flex items-start gap-sm">
                <span className="material-symbols-outlined mt-0.5 text-[18px] text-primary">support_agent</span>
                <span className="font-body-sm text-body-sm text-on-surface">Our team will reach out 24 hours before your experience.</span>
              </li>
              <li className="flex items-start gap-sm">
                <span className="material-symbols-outlined mt-0.5 text-[18px] text-primary">download</span>
                <span className="font-body-sm text-body-sm text-on-surface">Download your voucher from your account dashboard.</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-sm">
            <Link
              href="/"
              className="flex w-full items-center justify-center gap-xs rounded-xl bg-amber-500 py-3 font-label-md text-label-md text-white shadow-sm hover:bg-amber-600 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">home</span>
              Back to Home
            </Link>
            <Link
              href="/explore"
              className="flex w-full items-center justify-center gap-xs rounded-xl border border-outline-variant bg-surface py-3 font-label-md text-label-md text-on-surface transition-colors hover:bg-surface-container-low"
            >
              <span className="material-symbols-outlined text-[18px]">explore</span>
              Continue Exploring
            </Link>
          </div>

          <p className="mt-4 text-center font-label-sm text-label-sm text-on-surface-variant">
            Redirecting in <span className="font-semibold text-on-surface">{countdown}</span>s...
          </p>
        </div>
      </div>
    </div>
  );
}

export default function BookingConfirmedClient() {
  return <ConfirmationContent />;
}
