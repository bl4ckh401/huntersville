"use client";

import { useEffect, useState } from 'react';

interface PricingInfo {
  adultPrice?: string;
  childPrice?: string;
  infantPrice?: string;
  seniorPrice?: string;
  privateGroupPrice?: string;
  currency?: string;
  taxesIncluded?: string;
  serviceFees?: string;
  discounts?: string;
  depositRequired?: string;
}

interface QuickFact {
  icon: string;
  label: string;
  value: string;
}

interface TravelerInfo {
  name: string;
  age: string;
  type: 'adult' | 'child' | 'senior' | 'infant';
}

interface BookingSidebarProps {
  experienceId: string;
  price: string;
  pricing?: PricingInfo;
  quickFacts?: QuickFact[];
  instantBooking?: boolean;
  freeCancellation?: boolean;
}

function parsePrice(value?: string): number {
  if (!value) return 0;
  const cleaned = value.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function BookingSidebar({
  experienceId,
  price,
  pricing,
  quickFacts = [],
  instantBooking = false,
  freeCancellation = true,
}: BookingSidebarProps) {
  const [travelerName, setTravelerName] = useState('');
  const [travelerEmail, setTravelerEmail] = useState('');
  const [travelerPhone, setTravelerPhone] = useState('');
  const [date, setDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [seniors, setSeniors] = useState(0);
  const [infants, setInfants] = useState(0);

  const [travelers, setTravelers] = useState<TravelerInfo[]>([]);

  useEffect(() => {
    setTravelers((prev) => {
      const next: TravelerInfo[] = [];
      let prevIndex = 0;

      const addTravelers = (count: number, type: TravelerInfo['type']) => {
        for (let i = 0; i < count; i++) {
          if (prev[prevIndex]?.type === type) {
            next.push(prev[prevIndex]);
          } else {
            next.push({ name: '', age: '', type });
          }
          prevIndex++;
        }
      };

      addTravelers(adults, 'adult');
      addTravelers(children, 'child');
      addTravelers(seniors, 'senior');
      addTravelers(infants, 'infant');

      return next;
    });
  }, [adults, children, seniors, infants]);

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

  function updateTraveler(index: number, field: keyof TravelerInfo, value: string) {
    setTravelers((current) => {
      const next = [...current];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

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
        amount: `$${total.toFixed(2)}`,
        guestCount: totalGuests,
        travelers,
        paymentMethod,
        status: 'Pending',
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const params = new URLSearchParams({
        bookingId: data.id || 'N/A',
        amount: `$${total.toFixed(2)}`,
        guests: String(totalGuests),
        date: date || '',
      });
      window.location.href = `/booking-confirmed?${params.toString()}`;
    } else {
      setMessage('Could not save the booking right now.');
      setIsSaving(false);
    }
  }

  const priceRows = [
    { label: 'Adult', value: pricing?.adultPrice },
    { label: 'Child', value: pricing?.childPrice },
    { label: 'Senior', value: pricing?.seniorPrice },
    { label: 'Infant', value: pricing?.infantPrice },
    { label: 'Private group', value: pricing?.privateGroupPrice },
  ].filter((row) => row.value && row.value.trim());

  const adultPrice = parsePrice(pricing?.adultPrice);
  const childPrice = parsePrice(pricing?.childPrice);
  const seniorPrice = parsePrice(pricing?.seniorPrice);
  const infantPrice = parsePrice(pricing?.infantPrice);

  const baseTotal = adults * adultPrice + children * childPrice + seniors * seniorPrice + infants * infantPrice;
  const serviceFee = pricing?.serviceFees ? parsePrice(pricing.serviceFees) : 0;
  const taxRate = pricing?.taxesIncluded?.toLowerCase() === 'yes' ? 0 : 0.15;
  const taxAmount = baseTotal * taxRate;
  const discount = pricing?.discounts ? parsePrice(pricing.discounts) : 0;
  const total = Math.max(0, baseTotal + serviceFee + taxAmount - discount);

  const totalGuests = adults + children + seniors + infants;

  return (
    <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-5 custom-shadow-card sm:p-6 lg:sticky lg:top-[100px]">
      <div className="mb-md flex items-end justify-between gap-sm">
        <div>
          <p className="mb-xs font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Starting from</p>
          <div className="flex items-end gap-xs">
            <span className="font-headline-md text-headline-md text-primary">{price}</span>
            <span className="pb-1 font-body-sm text-body-sm text-on-surface-variant">/ person</span>
          </div>
          {pricing?.currency ? (
            <p className="mt-xs font-body-sm text-body-sm text-on-surface-variant">
              {pricing.currency}
              {pricing.taxesIncluded && pricing.taxesIncluded.toLowerCase() === 'yes' ? ' • taxes included' : ''}
            </p>
          ) : null}
        </div>
        {instantBooking ? (
          <span className="inline-flex items-center gap-xs rounded-full px-sm py-xs font-label-sm text-label-sm text-amber-500">
            <span className="material-symbols-outlined text-[14px]">bolt</span> Instant
          </span>
        ) : null}
      </div>

      {priceRows.length ? (
        <div className="mb-md space-y-1 rounded-xl bg-surface-container-low px-sm py-sm">
          {priceRows.map((row) => (
            <div key={row.label} className="flex items-center justify-between font-body-sm text-body-sm">
              <span className="text-on-surface-variant">{row.label}</span>
              <span className="font-medium text-on-surface">{row.value}</span>
            </div>
          ))}
          {pricing?.discounts ? (
            <div className="flex items-center justify-between font-body-sm text-body-sm text-primary">
              <span>Discount</span>
              <span className="font-medium">{pricing.discounts}</span>
            </div>
          ) : null}
        </div>
      ) : null}

      {quickFacts.length ? (
        <div className="mb-md grid grid-cols-2 gap-sm">
          {quickFacts.map((fact) => (
            <div key={fact.label} className="rounded-xl border border-outline-variant/40 px-sm py-sm">
              <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">{fact.icon}</span>
                {fact.label}
              </div>
              <p className="mt-0.5 break-words font-body-sm text-body-sm font-medium text-on-surface">{fact.value}</p>
            </div>
          ))}
        </div>
      ) : null}

      <hr className="mb-md border-outline-variant/30" />

      <form onSubmit={handleSubmit} className="mb-md space-y-sm">
        <div>
          <label className="mb-xs block font-label-sm text-label-sm text-on-surface-variant">Full name</label>
          <input value={travelerName} onChange={(event) => setTravelerName(event.target.value)} required className="w-full rounded-lg border border-outline-variant/50 bg-surface px-sm py-sm text-sm" placeholder="Your name" />
        </div>

        <div>
          <label className="mb-xs block font-label-sm text-label-sm text-on-surface-variant">Email</label>
          <input value={travelerEmail} onChange={(event) => setTravelerEmail(event.target.value)} type="email" required className="w-full rounded-lg border border-outline-variant/50 bg-surface px-sm py-sm text-sm" placeholder="your@email.com" />
        </div>

        <div>
          <label className="mb-xs block font-label-sm text-label-sm text-on-surface-variant">Phone</label>
          <input value={travelerPhone} onChange={(event) => setTravelerPhone(event.target.value)} className="w-full rounded-lg border border-outline-variant/50 bg-surface px-sm py-sm text-sm" placeholder="+255..." />
        </div>

        <div>
          <label className="mb-xs block font-label-sm text-label-sm text-on-surface-variant">Preferred date</label>
          <input value={date} onChange={(event) => setDate(event.target.value)} type="date" required className="w-full rounded-lg border border-outline-variant/50 bg-surface px-sm py-sm text-sm" />
        </div>

        <div className="grid grid-cols-2 gap-sm">
          <div>
            <label className="mb-xs block font-label-sm text-label-sm text-on-surface-variant">Adults</label>
            <input value={adults} onChange={(event) => setAdults(Math.max(0, parseInt(event.target.value) || 0))} type="number" min="0" className="w-full rounded-lg border border-outline-variant/50 bg-surface px-sm py-sm text-sm" />
          </div>
          <div>
            <label className="mb-xs block font-label-sm text-label-sm text-on-surface-variant">Children</label>
            <input value={children} onChange={(event) => setChildren(Math.max(0, parseInt(event.target.value) || 0))} type="number" min="0" className="w-full rounded-lg border border-outline-variant/50 bg-surface px-sm py-sm text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-sm">
          <div>
            <label className="mb-xs block font-label-sm text-label-sm text-on-surface-variant">Seniors</label>
            <input value={seniors} onChange={(event) => setSeniors(Math.max(0, parseInt(event.target.value) || 0))} type="number" min="0" className="w-full rounded-lg border border-outline-variant/50 bg-surface px-sm py-sm text-sm" />
          </div>
          <div>
            <label className="mb-xs block font-label-sm text-label-sm text-on-surface-variant">Infants</label>
            <input value={infants} onChange={(event) => setInfants(Math.max(0, parseInt(event.target.value) || 0))} type="number" min="0" className="w-full rounded-lg border border-outline-variant/50 bg-surface px-sm py-sm text-sm" />
          </div>
        </div>

        {totalGuests > 0 && travelers.length > 0 ? (
          <div className="space-y-sm">
            <p className="font-label-sm text-label-sm text-on-surface-variant">Traveler details</p>
            {travelers.map((traveler, index) => (
              <div key={index} className="grid grid-cols-[1fr_100px] gap-sm">
                <div>
                  <label className="mb-xs block font-label-sm text-label-sm text-on-surface-variant">Name {index + 1}</label>
                  <input
                    value={traveler.name}
                    onChange={(event) => updateTraveler(index, 'name', event.target.value)}
                    required
                    className="w-full rounded-lg border border-outline-variant/50 bg-surface px-sm py-sm text-sm"
                    placeholder={`Traveler ${index + 1} name`}
                  />
                </div>
                <div>
                  <label className="mb-xs block font-label-sm text-label-sm text-on-surface-variant">Age</label>
                  <input
                    value={traveler.age}
                    onChange={(event) => updateTraveler(index, 'age', event.target.value)}
                    required
                    type="number"
                    min="0"
                    className="w-full rounded-lg border border-outline-variant/50 bg-surface px-sm py-sm text-sm"
                    placeholder="Age"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : null}

        <div className="rounded-xl border border-outline-variant/40 bg-surface-container-low p-sm">
          <div className="flex items-center justify-between font-body-sm text-body-sm">
            <span className="text-on-surface-variant">Subtotal ({totalGuests} guest{totalGuests === 1 ? '' : 's'})</span>
            <span className="font-medium text-on-surface">${baseTotal.toFixed(2)}</span>
          </div>
          {serviceFee > 0 ? (
            <div className="flex items-center justify-between font-body-sm text-body-sm">
              <span className="text-on-surface-variant">Service fee</span>
              <span className="font-medium text-on-surface">${serviceFee.toFixed(2)}</span>
            </div>
          ) : null}
          {taxAmount > 0 ? (
            <div className="flex items-center justify-between font-body-sm text-body-sm">
              <span className="text-on-surface-variant">Taxes (15%)</span>
              <span className="font-medium text-on-surface">${taxAmount.toFixed(2)}</span>
            </div>
          ) : null}
          {discount > 0 ? (
            <div className="flex items-center justify-between font-body-sm text-body-sm text-primary">
              <span>Discount</span>
              <span className="font-medium">-${discount.toFixed(2)}</span>
            </div>
          ) : null}
          <div className="mt-sm flex items-center justify-between border-t border-outline-variant/30 pt-sm">
            <span className="font-label-md text-label-md font-semibold text-on-surface">Total</span>
            <span className="font-title-lg text-title-lg text-amber-500 font-bold">${total.toFixed(2)}</span>
          </div>
        </div>

        <div>
          <label className="mb-xs block font-label-sm text-label-sm text-on-surface-variant">Payment method</label>
          <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)} className="w-full rounded-lg border border-outline-variant/50 bg-surface px-sm py-sm text-sm">
            <option value="Card">Credit Card</option>
            <option value="M-Pesa">M-Pesa</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        <button type="submit" disabled={isSaving || totalGuests === 0} className="flex w-full items-center justify-center gap-xs rounded-lg bg-amber-500 py-3 font-label-md text-label-md text-white shadow-sm hover:bg-amber-600 active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-70">
          {isSaving ? 'Saving...' : `Confirm Booking — $${total.toFixed(2)}`}
        </button>
        {message && <p className={`text-sm ${message.includes('✓') ? 'text-primary' : 'text-error'}`}>{message}</p>}
      </form>

      <button className="mb-md flex w-full items-center justify-center gap-xs rounded-lg border border-primary/30 bg-surface py-3 font-label-md text-label-md text-primary transition-colors hover:bg-primary-container/10">
        <span className="material-symbols-outlined text-[18px]">add_circle</span> Add to Journey
      </button>

      <div className="flex flex-wrap items-center justify-center gap-x-sm gap-y-1 text-center font-label-sm text-label-sm text-on-surface-variant">
        <span className="flex items-center gap-xs">
          <span className="material-symbols-outlined text-[16px]">verified_user</span> Secure Payment
        </span>
        {freeCancellation ? (
          <>
            <span className="hidden h-1 w-1 rounded-full bg-outline-variant sm:block" />
            <span className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">event_busy</span> Free Cancellation (48h)
            </span>
          </>
        ) : null}
      </div>
    </div>
  );
}
