"use client";

import { useEffect, useState } from 'react';

export default function BookingSidebar({ experienceId, price }: { experienceId: string; price: string }) {
  const [travelerName, setTravelerName] = useState('');
  const [travelerEmail, setTravelerEmail] = useState('');
  const [travelerPhone, setTravelerPhone] = useState('');
  const [date, setDate] = useState('');
  const [guestCount, setGuestCount] = useState('1');
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();
        if (data.user) {
          setTravelerName(data.user.name || '');
          setTravelerEmail(data.user.email || '');
        }
      } catch {
        // ignore and let the guest fill the form
      }
    }

    loadProfile();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage('');

    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        travelerName,
        travelerEmail,
        travelerPhone,
        experienceId,
        date,
        amount: price,
        guestCount,
        paymentMethod,
        status: 'Pending',
      }),
    });

    if (response.ok) {
      setTravelerName('');
      setTravelerEmail('');
      setTravelerPhone('');
      setDate('');
      setGuestCount('1');
      setPaymentMethod('Card');
      setMessage('✓ Booking submitted! We\'ll send confirmation to your email.');
    } else {
      setMessage('Could not save the booking right now.');
    }

    setIsSaving(false);
  }

  return (
    <div className="sticky top-[100px] rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-6 sm:p-lg custom-shadow-card">
      <div className="mb-md">
        <p className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-xs">Starting from</p>
        <div className="flex items-end gap-xs">
          <span className="font-headline-md text-headline-md text-primary">{price}</span>
          <span className="font-body-md text-body-md text-on-surface-variant pb-1">/ person</span>
        </div>
      </div>

      <hr className="border-outline-variant/30 mb-md" />

      <form onSubmit={handleSubmit} className="mb-md space-y-sm">
        <div>
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Full name</label>
          <input value={travelerName} onChange={(event) => setTravelerName(event.target.value)} required className="w-full rounded-lg border border-outline-variant/50 bg-surface px-sm py-sm text-sm" placeholder="Your name" />
        </div>

        <div>
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Email</label>
          <input value={travelerEmail} onChange={(event) => setTravelerEmail(event.target.value)} type="email" required className="w-full rounded-lg border border-outline-variant/50 bg-surface px-sm py-sm text-sm" placeholder="your@email.com" />
        </div>

        <div>
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Phone</label>
          <input value={travelerPhone} onChange={(event) => setTravelerPhone(event.target.value)} className="w-full rounded-lg border border-outline-variant/50 bg-surface px-sm py-sm text-sm" placeholder="+255..." />
        </div>

        <div>
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Preferred date</label>
          <input value={date} onChange={(event) => setDate(event.target.value)} type="date" className="w-full rounded-lg border border-outline-variant/50 bg-surface px-sm py-sm text-sm" />
        </div>

        <div>
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Guests</label>
          <input value={guestCount} onChange={(event) => setGuestCount(event.target.value)} type="number" min="1" className="w-full rounded-lg border border-outline-variant/50 bg-surface px-sm py-sm text-sm" />
        </div>

        <div>
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Payment method</label>
          <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)} className="w-full rounded-lg border border-outline-variant/50 bg-surface px-sm py-sm text-sm">
            <option value="Card">Credit Card</option>
            <option value="M-Pesa">M-Pesa</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        <button type="submit" disabled={isSaving} className="flex w-full items-center justify-center gap-xs rounded-lg bg-[#F97316] py-3 font-label-md text-label-md text-white shadow-[0_2px_0_0_rgba(154,52,18,1)] transition-all hover:-translate-y-[1px] hover:bg-[#EA580C] active:translate-y-[2px] active:shadow-none disabled:opacity-70">
          {isSaving ? 'Saving...' : 'Confirm Booking'}
        </button>
        {message && <p className={`text-sm ${message.includes('✓') ? 'text-primary' : 'text-error'}`}>{message}</p>}
      </form>

      <div className="mb-md space-y-sm">
        <button className="flex w-full items-center justify-center gap-xs rounded-lg border border-primary/30 bg-surface py-3 font-label-md text-label-md text-primary transition-colors hover:bg-primary-container/10">
          <span className="material-symbols-outlined text-[18px]">add_circle</span> Add to Journey
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-sm gap-y-1 text-center font-label-sm text-label-sm text-on-surface-variant">
        <span className="flex items-center gap-xs">
          <span className="material-symbols-outlined text-[16px]">verified_user</span> Secure Payment
        </span>
        <span className="hidden h-1 w-1 rounded-full bg-outline-variant sm:block" />
        <span className="flex items-center gap-xs">
          <span className="material-symbols-outlined text-[16px]">event_busy</span> Free Cancellation (48h)
        </span>
      </div>
    </div>
  );
}
