"use client";

import { useEffect, useState } from 'react';
import type { Experience } from '@/lib/content-store';

interface BookingFormProps {
  onCreated?: () => void;
}

export default function BookingForm({ onCreated }: BookingFormProps) {
  const [travelerName, setTravelerName] = useState('');
  const [travelerEmail, setTravelerEmail] = useState('');
  const [travelerPhone, setTravelerPhone] = useState('');
  const [experienceId, setExperienceId] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [guestCount, setGuestCount] = useState('1');
  const [specialRequests, setSpecialRequests] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<'Paid' | 'Pending' | 'Failed' | 'Confirmed'>('Pending');
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch('/api/experiences').then((response) => response.json()).then(setExperiences);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);

    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ travelerName, travelerEmail, travelerPhone, experienceId, date, amount, paymentMethod, guestCount, specialRequests, note, status }),
    });

    if (response.ok) {
      setTravelerName('');
      setTravelerEmail('');
      setTravelerPhone('');
      setExperienceId('');
      setDate('');
      setAmount('');
      setPaymentMethod('Card');
      setGuestCount('1');
      setSpecialRequests('');
      setNote('');
      setStatus('Pending');
      onCreated?.();
    }

    setIsSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="mb-lg rounded-xl border border-outline-variant bg-surface-container-lowest p-md shadow-sm">
      <div>
        <h3 className="font-title-lg text-title-lg text-primary">Create booking</h3>
        <p className="font-body-md text-body-md text-on-surface-variant">Record a reservation and it will show in the booking ledger and traveler insights.</p>
      </div>

      <div className="mt-sm grid gap-sm md:grid-cols-2">
        <label className="block">
          <span className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Traveler name</span>
          <input value={travelerName} onChange={(event) => setTravelerName(event.target.value)} required className="w-full rounded-lg border border-outline-variant bg-surface px-sm py-sm" />
        </label>
        <label className="block">
          <span className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Email</span>
          <input value={travelerEmail} onChange={(event) => setTravelerEmail(event.target.value)} type="email" required className="w-full rounded-lg border border-outline-variant bg-surface px-sm py-sm" />
        </label>
        <label className="block">
          <span className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Phone</span>
          <input value={travelerPhone} onChange={(event) => setTravelerPhone(event.target.value)} className="w-full rounded-lg border border-outline-variant bg-surface px-sm py-sm" />
        </label>
        <label className="block">
          <span className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Experience</span>
          <select value={experienceId} onChange={(event) => setExperienceId(event.target.value)} required className="w-full rounded-lg border border-outline-variant bg-surface px-sm py-sm">
            <option value="">Select an experience</option>
            {experiences.map((experience) => (
              <option key={experience.id} value={experience.id}>{experience.title}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Travel date</span>
          <input value={date} onChange={(event) => setDate(event.target.value)} type="date" className="w-full rounded-lg border border-outline-variant bg-surface px-sm py-sm" />
        </label>
        <label className="block">
          <span className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Guests</span>
          <input value={guestCount} onChange={(event) => setGuestCount(event.target.value)} type="number" min="1" className="w-full rounded-lg border border-outline-variant bg-surface px-sm py-sm" />
        </label>
        <label className="block">
          <span className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Amount</span>
          <input value={amount} onChange={(event) => setAmount(event.target.value)} className="w-full rounded-lg border border-outline-variant bg-surface px-sm py-sm" />
        </label>
        <label className="block">
          <span className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Payment method</span>
          <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)} className="w-full rounded-lg border border-outline-variant bg-surface px-sm py-sm">
            <option value="Card">Card</option>
            <option value="M-Pesa">M-Pesa</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </label>
        <label className="block md:col-span-2">
          <span className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Special requests</span>
          <input value={specialRequests} onChange={(event) => setSpecialRequests(event.target.value)} className="w-full rounded-lg border border-outline-variant bg-surface px-sm py-sm" />
        </label>
        <label className="block md:col-span-2">
          <span className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Booking notes</span>
          <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={3} className="w-full rounded-lg border border-outline-variant bg-surface px-sm py-sm" />
        </label>
        <label className="block">
          <span className="block font-label-sm text-label-sm text-on-surface-variant mb-xs">Status</span>
          <select value={status} onChange={(event) => setStatus(event.target.value as any)} className="w-full rounded-lg border border-outline-variant bg-surface px-sm py-sm">
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Paid">Paid</option>
            <option value="Failed">Failed</option>
          </select>
        </label>
      </div>

      <button type="submit" disabled={isSaving} className="mt-sm rounded-lg bg-secondary px-md py-sm text-on-secondary hover:bg-secondary/90 disabled:opacity-70">
        {isSaving ? 'Saving…' : 'Create booking'}
      </button>
    </form>
  );
}
