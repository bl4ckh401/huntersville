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
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState('');
  const [paymentTab, setPaymentTab] = useState<'wire' | 'card'>('wire');
  const [copiedLabel, setCopiedLabel] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedLabel(label);
      setTimeout(() => setCopiedLabel(''), 2500);
    }
  };

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
        amount: `$${total.toFixed(2)}`,
        guestCount,
        paymentMethod: 'WhatsApp',
        status: 'Pending',
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.whatsappUrl) {
        window.location.href = data.whatsappUrl;
      } else {
        setMessage('Could not initiate WhatsApp booking.');
        setIsSaving(false);
      }
    } else {
      setMessage('Could not save the booking right now.');
      setIsSaving(false);
    }
  }

  const adultPrice = parsePrice(pricing?.adultPrice || price);
  const serviceFee = pricing?.serviceFees ? parsePrice(pricing.serviceFees) : 0;
  const taxRate = pricing?.taxesIncluded?.toLowerCase() === 'yes' ? 0 : 0.15;
  const baseTotal = guestCount * adultPrice;
  const taxAmount = baseTotal * taxRate;
  const discount = pricing?.discounts ? parsePrice(pricing.discounts) : 0;
  const total = Math.max(0, baseTotal + serviceFee + taxAmount - discount);

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

      <form onSubmit={handleSubmit} className="space-y-sm">
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

        <div className="grid grid-cols-2 gap-sm">
          <div>
            <label className="mb-xs block font-label-sm text-label-sm text-on-surface-variant">Preferred date</label>
            <input value={date} onChange={(event) => setDate(event.target.value)} type="date" required className="w-full rounded-lg border border-outline-variant/50 bg-surface px-sm py-sm text-sm" />
          </div>
          <div>
            <label className="mb-xs block font-label-sm text-label-sm text-on-surface-variant">Guests</label>
            <input value={guestCount} onChange={(event) => setGuestCount(Math.max(1, parseInt(event.target.value) || 1))} type="number" min="1" className="w-full rounded-lg border border-outline-variant/50 bg-surface px-sm py-sm text-sm" />
          </div>
        </div>

        <div className="rounded-xl border border-outline-variant/40 bg-surface-container-low p-sm">
          <div className="flex items-center justify-between font-body-sm text-body-sm">
            <span className="text-on-surface-variant">Subtotal ({guestCount} guest{guestCount === 1 ? '' : 's'})</span>
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

        <button type="submit" disabled={isSaving} className="flex w-full items-center justify-center gap-xs rounded-lg bg-amber-500 py-3 font-label-md text-label-md text-white shadow-sm hover:bg-amber-600 active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-70">
          {isSaving ? 'Saving...' : `Confirm Booking — $${total.toFixed(2)}`}
        </button>
        {message && <p className={`text-sm ${message.includes('✓') ? 'text-primary' : 'text-error'}`}>{message}</p>}
      </form>

      {/* Payment Methods & Wire Incentive Badge */}
      <div className="mt-md pt-sm border-t border-outline-variant/30 space-y-xs text-center">
        <div className="flex items-center justify-center gap-1.5 text-label-sm font-label-sm text-on-surface font-medium flex-wrap">
          <span className="inline-flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded text-[11px] text-on-surface font-medium">
            <span className="material-symbols-outlined text-[13px] text-primary">account_balance</span> Bank Wire (USD/KES)
          </span>
          <span className="inline-flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded text-[11px] text-on-surface font-medium">
            <span className="material-symbols-outlined text-[13px] text-primary">phone_iphone</span> M-Pesa
          </span>
          <span className="inline-flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded text-[11px] text-on-surface font-medium">
            <span className="material-symbols-outlined text-[13px] text-primary">credit_card</span> Visa/Mastercard
          </span>
        </div>
        <p className="text-[11px] text-primary font-semibold flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-[14px]">verified</span> Direct bank transfers eligible for 3% conservation fee waiver
        </p>
      </div>

      <div className="mt-md pt-md border-t border-outline-variant/30 space-y-sm">
        <div className="flex items-center justify-between mb-xs">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold flex items-center gap-xs">
            <span className="material-symbols-outlined text-[16px] text-primary">account_balance</span> Payment Method
          </span>
          <span className="bg-primary-fixed text-on-primary-fixed-variant px-xs py-0.5 rounded text-[11px] font-semibold">0% Fee on Wire</span>
        </div>
        
        <div className="grid grid-cols-2 gap-xs p-0.5 bg-surface-container rounded-DEFAULT text-[12px] font-medium">
          <button 
            type="button" 
            onClick={() => setPaymentTab('wire')}
            className={`py-1.5 px-sm rounded-DEFAULT text-center flex items-center justify-center gap-1 transition-colors ${paymentTab === 'wire' ? 'bg-surface text-primary font-semibold shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            <span className="material-symbols-outlined text-[14px]">account_balance</span> Direct Bank Wire
          </button>
          <button 
            type="button" 
            onClick={() => setPaymentTab('card')}
            className={`py-1.5 px-sm rounded-DEFAULT text-center flex items-center justify-center gap-1 transition-colors ${paymentTab === 'card' ? 'bg-surface text-primary font-semibold shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            <span className="material-symbols-outlined text-[14px]">credit_card</span> Card / M-Pesa
          </button>
        </div>
        
        {paymentTab === 'wire' ? (
          <>
            <div className="p-sm bg-surface-container-low rounded-lg border border-outline-variant/40 text-[12px] space-y-xs">
              <div className="flex justify-between items-center pb-1 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Bank:</span>
                <span className="font-semibold text-on-surface">Standard Chartered Bank</span>
              </div>
              <div className="flex justify-between items-center pb-1 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Account Name:</span>
                <span className="font-semibold text-on-surface text-right">HuntersVille Tours Ltd</span>
              </div>
              <div className="flex justify-between items-center pb-1 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Account No:</span>
                <span className="font-mono font-bold text-primary tracking-wide">0102049281001</span>
              </div>
              <div className="flex justify-between items-center pb-1 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">SWIFT / BIC:</span>
                <span className="font-mono font-bold text-on-surface">SCBLKENX</span>
              </div>
              <div className="flex justify-between items-center pb-1 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Branch:</span>
                <span className="text-on-surface">Westlands Premier, Nairobi</span>
              </div>
              <div className="pt-1 text-[11px] text-on-surface-variant leading-tight flex items-start gap-1">
                <span className="material-symbols-outlined text-[14px] text-primary mt-0.5">info</span>
                <span>Use your <strong>Booking Ref</strong> or Full Name as reference. Confirmation verified within 12–24h.</span>
              </div>
            </div>
            
            <div className="flex gap-xs">
              <button 
                type="button" 
                onClick={() => copyToClipboard('Bank: Standard Chartered Bank\nAccount Name: HuntersVille Tours Ltd\nAccount No: 0102049281001\nSWIFT: SCBLKENX\nBranch: Westlands Premier, Nairobi', 'Wire')}
                className="flex-1 bg-surface border border-outline-variant/40 hover:bg-surface-container py-1.5 px-2 rounded-DEFAULT text-[11px] font-label-md text-on-surface flex items-center justify-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">{copiedLabel === 'Wire' ? 'check' : 'content_copy'}</span> 
                {copiedLabel === 'Wire' ? 'Copied!' : 'Copy Wire Details'}
              </button>
              <a 
                href="https://wa.me/254723388905?text=Hello%20HuntersVille%2C%20I%20would%20like%20to%20request%20the%20Wire%20PDF%20Guide"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-surface border border-outline-variant/40 hover:bg-surface-container py-1.5 px-2 rounded-DEFAULT text-[11px] font-label-md text-primary flex items-center justify-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">download</span> Wire PDF Guide
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="p-sm bg-surface-container-low rounded-lg border border-outline-variant/40 text-[12px] space-y-xs">
              <div className="flex justify-between items-center pb-1 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Merchant:</span>
                <span className="font-semibold text-on-surface">HuntersVille Tours Ltd</span>
              </div>
              <div className="flex justify-between items-center pb-1 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">M-Pesa Paybill:</span>
                <span className="font-mono font-bold text-green-700 dark:text-green-400">329329</span>
              </div>
              <div className="flex justify-between items-center pb-1 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Account No:</span>
                <span className="font-mono font-bold text-primary tracking-wide">0102049281001</span>
              </div>
              <div className="flex justify-between items-center pb-1 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Buy Goods (Till):</span>
                <span className="font-mono font-bold text-green-700 dark:text-green-400">5428901</span>
              </div>
              <div className="flex justify-between items-center pb-1 border-b border-outline-variant/20">
                <span className="text-on-surface-variant">Agent Phone:</span>
                <span className="font-mono text-on-surface">+254 723 388 905</span>
              </div>
              <div className="pt-1 text-[11px] text-on-surface-variant leading-tight flex items-start gap-1">
                <span className="material-symbols-outlined text-[14px] text-green-600 mt-0.5">verified</span>
                <span>Enter Amount in KES. Send M-Pesa SMS confirmation to <strong>+254 723 388 905</strong> for instant verification.</span>
              </div>
            </div>

            <div className="flex gap-xs">
              <button 
                type="button" 
                onClick={() => copyToClipboard('Lipa na M-Pesa\nPaybill: 329329\nAccount No: 0102049281001\nOr Buy Goods Till: 5428901\nName: HuntersVille Tours Ltd\nPhone: +254 723 388 905', 'M-Pesa')}
                className="flex-1 bg-surface border border-outline-variant/40 hover:bg-surface-container py-1.5 px-2 rounded-DEFAULT text-[11px] font-label-md text-on-surface flex items-center justify-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">{copiedLabel === 'M-Pesa' ? 'check' : 'content_copy'}</span> 
                {copiedLabel === 'M-Pesa' ? 'Copied!' : 'Copy M-Pesa Info'}
              </button>
              <a 
                href="https://wa.me/254723388905?text=Hello%20HuntersVille%2C%20I%20have%20sent%20an%20M-Pesa%20payment%20for%20my%20safari%20booking"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-surface border border-outline-variant/40 hover:bg-surface-container py-1.5 px-2 rounded-DEFAULT text-[11px] font-label-md text-green-700 dark:text-green-400 flex items-center justify-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">send</span> WhatsApp Confirm
              </a>
            </div>

            <div className="pt-1 flex items-center justify-between text-[11px] text-on-surface-variant border-t border-outline-variant/20">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-primary">credit_card</span>
                Visa / Mastercard / Amex link sent upon request
              </span>
              <span className="font-semibold text-green-600">Instant</span>
            </div>
          </>
        )}
      </div>

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
