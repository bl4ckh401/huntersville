"use client";

import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { Experience } from '@/lib/content-store';

interface ItineraryItem {
  day: string;
  title: string;
  description: string;
  time: string;
  location: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface ExperienceFormProps {
  experience?: Experience | null;
  onSubmit: (input: Record<string, unknown>) => Promise<void>;
  onCancel: () => void;
  submitting?: boolean;
}

type FormState = {
  title: string;
  tagline: string;
  category: string;
  experienceType: string;
  destination: string;
  region: string;
  city: string;
  meetingPoint: string;
  endingPoint: string;
  languages: string;
  summary: string;
  description: string;
  uniqueSellingPoint: string;
  highlights: string;
  guestExpectations: string;
  targetAudience: string;
  bestTimeToVisit: string;
  coverPhoto: string;
  galleryImages: string;
  videos: string;
  numberOfDays: string;
  numberOfNights: string;
  totalDuration: string;
  startTime: string;
  endTime: string;
  adultPrice: string;
  childPrice: string;
  infantPrice: string;
  seniorPrice: string;
  privateGroupPrice: string;
  currency: string;
  taxesIncluded: string;
  serviceFees: string;
  discounts: string;
  depositRequired: string;
  extraCharges: string;
  minimumGuests: string;
  maximumGuests: string;
  ageRestrictions: string;
  childrenAllowed: string;
  petsAllowed: string;
  availableDates: string;
  recurringSchedule: string;
  blackoutDates: string;
  bookingDeadline: string;
  cutOffTime: string;
  pickupAvailable: string;
  pickupLocations: string;
  dropOffLocations: string;
  transportType: string;
  pickupAccessibility: string;
  accommodationIncluded: string;
  accommodationName: string;
  accommodationType: string;
  starRating: string;
  roomType: string;
  sharingOptions: string;
  checkInTime: string;
  checkOutTime: string;
  breakfastIncluded: string;
  lunchIncluded: string;
  dinnerIncluded: string;
  snacksIncluded: string;
  drinksIncluded: string;
  dietaryAccommodations: string;
  included: string;
  notIncluded: string;
  requirements: string;
  whatToBring: string;
  safety: string;
  accessibility: string;
  guideName: string;
  guideProfilePhoto: string;
  guideBiography: string;
  yearsOfExperience: string;
  languagesSpoken: string;
  certifications: string;
  guideLicenses: string;
  guideContact: string;
  cancellationTerms: string;
  refundPolicy: string;
  reschedulingPolicy: string;
  noShowPolicy: string;
  instantBooking: string;
  manualApproval: string;
  confirmationProcess: string;
  bookingNotes: string;
  meetingInstructions: string;
  googleMapsLink: string;
  nearbyLandmarks: string;
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  businessEmail: string;
  businessWebsite: string;
  businessSocialMedia: string;
  legalBusinessRegistration: string;
  legalTourOperatorLicense: string;
  legalTaxInfo: string;
  legalLiabilityInsurance: string;
  legalTermsAndConditions: string;
  interests: string;
  seasonalTags: string;
  categoryTags: string;
  status: string;
  itinerary: ItineraryItem[];
  faqs: FaqItem[];
};

type TextField = keyof Omit<FormState, 'itinerary' | 'faqs'>;

const initialForm: FormState = {
  title: '',
  tagline: '',
  category: 'Safari',
  experienceType: 'Private',
  destination: 'Kenya',
  region: '',
  city: '',
  meetingPoint: '',
  endingPoint: '',
  languages: '',
  summary: '',
  description: '',
  uniqueSellingPoint: '',
  highlights: '',
  guestExpectations: '',
  targetAudience: '',
  bestTimeToVisit: '',
  coverPhoto: '',
  galleryImages: '',
  videos: '',
  numberOfDays: '',
  numberOfNights: '',
  totalDuration: '',
  startTime: '',
  endTime: '',
  adultPrice: '',
  childPrice: '',
  infantPrice: '',
  seniorPrice: '',
  privateGroupPrice: '',
  currency: 'USD',
  taxesIncluded: 'Yes',
  serviceFees: '',
  discounts: '',
  depositRequired: 'No',
  extraCharges: '',
  minimumGuests: '',
  maximumGuests: '',
  ageRestrictions: '',
  childrenAllowed: 'Yes',
  petsAllowed: 'No',
  availableDates: '',
  recurringSchedule: '',
  blackoutDates: '',
  bookingDeadline: '',
  cutOffTime: '',
  pickupAvailable: 'Yes',
  pickupLocations: '',
  dropOffLocations: '',
  transportType: '',
  pickupAccessibility: '',
  accommodationIncluded: 'No',
  accommodationName: '',
  accommodationType: '',
  starRating: '',
  roomType: '',
  sharingOptions: '',
  checkInTime: '',
  checkOutTime: '',
  breakfastIncluded: '',
  lunchIncluded: '',
  dinnerIncluded: '',
  snacksIncluded: '',
  drinksIncluded: '',
  dietaryAccommodations: '',
  included: '',
  notIncluded: '',
  requirements: '',
  whatToBring: '',
  safety: '',
  accessibility: '',
  guideName: '',
  guideProfilePhoto: '',
  guideBiography: '',
  yearsOfExperience: '',
  languagesSpoken: '',
  certifications: '',
  guideLicenses: '',
  guideContact: '',
  cancellationTerms: '',
  refundPolicy: '',
  reschedulingPolicy: '',
  noShowPolicy: '',
  instantBooking: 'Yes',
  manualApproval: 'No',
  confirmationProcess: '',
  bookingNotes: '',
  meetingInstructions: '',
  googleMapsLink: '',
  nearbyLandmarks: '',
  businessName: '',
  businessAddress: '',
  businessPhone: '',
  businessEmail: '',
  businessWebsite: '',
  businessSocialMedia: '',
  legalBusinessRegistration: '',
  legalTourOperatorLicense: '',
  legalTaxInfo: '',
  legalLiabilityInsurance: '',
  legalTermsAndConditions: '',
  interests: '',
  seasonalTags: '',
  categoryTags: '',
  status: 'Draft',
  itinerary: [],
  faqs: [],
};

const CATEGORY_TAG_OPTIONS = [
  'Family-friendly',
  'Adventure',
  'Cultural experiences',
  'Outdoor activities',
  'Indoor activities',
  'Luxury',
  'Budget',
  'Eco-friendly',
  'Photography',
  'Wildlife',
  'Food',
  'History',
  'Nature',
  'Water activities',
  'Hiking',
  'Camping',
  'Safari',
  'City tours',
  'Nightlife',
  'Wellness',
  'Shopping',
  'Festivals',
  'Local experiences',
];

function joinLines(values: string[] | undefined): string {
  return (values ?? []).join('\n');
}

function joinCommas(values: string[] | undefined): string {
  return (values ?? []).join(', ');
}

function fromExperience(trip: Experience | null | undefined): FormState {
  if (!trip) {
    return { ...initialForm };
  }

  const cancellation = typeof trip.cancellationPolicy === 'object' && trip.cancellationPolicy
    ? trip.cancellationPolicy
    : { terms: '', refund: '', rescheduling: '', noShow: '' };

  return {
    ...initialForm,
    title: trip.title ?? '',
    tagline: trip.tagline ?? '',
    category: trip.category ?? 'Safari',
    experienceType: trip.experienceType ?? 'Private',
    destination: trip.destination ?? '',
    region: trip.region ?? '',
    city: trip.city ?? '',
    meetingPoint: trip.meetingPoint ?? '',
    endingPoint: trip.endingPoint ?? '',
    languages: joinCommas(trip.languages),
    summary: trip.summary ?? '',
    description: trip.description ?? '',
    uniqueSellingPoint: trip.uniqueSellingPoint ?? '',
    highlights: joinLines(trip.highlights),
    guestExpectations: joinLines(trip.guestExpectations),
    targetAudience: trip.targetAudience ?? '',
    bestTimeToVisit: trip.bestTimeToVisit ?? '',
    coverPhoto: trip.coverPhoto ?? '',
    galleryImages: joinLines(trip.galleryImages),
    videos: joinLines(trip.videos),
    numberOfDays: trip.durationDetails?.numberOfDays ?? '',
    numberOfNights: trip.durationDetails?.numberOfNights ?? '',
    totalDuration: trip.durationDetails?.totalDuration ?? '',
    startTime: trip.durationDetails?.startTime ?? '',
    endTime: trip.durationDetails?.endTime ?? '',
    adultPrice: trip.pricing?.adultPrice ?? '',
    childPrice: trip.pricing?.childPrice ?? '',
    infantPrice: trip.pricing?.infantPrice ?? '',
    seniorPrice: trip.pricing?.seniorPrice ?? '',
    privateGroupPrice: trip.pricing?.privateGroupPrice ?? '',
    currency: trip.pricing?.currency ?? 'USD',
    taxesIncluded: trip.pricing?.taxesIncluded ?? 'Yes',
    serviceFees: trip.pricing?.serviceFees ?? '',
    discounts: trip.pricing?.discounts ?? '',
    depositRequired: trip.pricing?.depositRequired ?? 'No',
    extraCharges: trip.pricing?.extraCharges ?? '',
    minimumGuests: trip.groupDetails?.minimumGuests ?? '',
    maximumGuests: trip.groupDetails?.maximumGuests ?? '',
    ageRestrictions: trip.groupDetails?.ageRestrictions ?? '',
    childrenAllowed: trip.groupDetails?.childrenAllowed ?? 'Yes',
    petsAllowed: trip.groupDetails?.petsAllowed ?? 'No',
    availableDates: trip.availability?.availableDates ?? '',
    recurringSchedule: trip.availability?.recurringSchedule ?? '',
    blackoutDates: trip.availability?.blackoutDates ?? '',
    bookingDeadline: trip.availability?.bookingDeadline ?? '',
    cutOffTime: trip.availability?.cutOffTime ?? '',
    pickupAvailable: trip.pickup?.pickupAvailable ?? 'Yes',
    pickupLocations: trip.pickup?.pickupLocations ?? '',
    dropOffLocations: trip.pickup?.dropOffLocations ?? '',
    transportType: trip.pickup?.transportType ?? '',
    pickupAccessibility: trip.pickup?.accessibility ?? '',
    accommodationIncluded: trip.accommodation?.included ?? 'No',
    accommodationName: trip.accommodation?.name ?? '',
    accommodationType: trip.accommodation?.type ?? '',
    starRating: trip.accommodation?.starRating ?? '',
    roomType: trip.accommodation?.roomType ?? '',
    sharingOptions: trip.accommodation?.sharingOptions ?? '',
    checkInTime: trip.accommodation?.checkInTime ?? '',
    checkOutTime: trip.accommodation?.checkOutTime ?? '',
    breakfastIncluded: trip.meals?.breakfastIncluded ?? '',
    lunchIncluded: trip.meals?.lunchIncluded ?? '',
    dinnerIncluded: trip.meals?.dinnerIncluded ?? '',
    snacksIncluded: trip.meals?.snacksIncluded ?? '',
    drinksIncluded: trip.meals?.drinksIncluded ?? '',
    dietaryAccommodations: trip.meals?.dietaryAccommodations ?? '',
    included: joinCommas(trip.included),
    notIncluded: joinCommas(trip.notIncluded),
    requirements: joinLines(trip.requirements),
    whatToBring: joinLines(trip.whatToBring),
    safety: joinLines(trip.safety),
    accessibility: joinLines(trip.accessibility),
    guideName: trip.tourGuide?.guideName ?? '',
    guideProfilePhoto: trip.tourGuide?.profilePhoto ?? '',
    guideBiography: trip.tourGuide?.biography ?? '',
    yearsOfExperience: trip.tourGuide?.yearsOfExperience ?? '',
    languagesSpoken: trip.tourGuide?.languagesSpoken ?? '',
    certifications: trip.tourGuide?.certifications ?? '',
    guideLicenses: trip.tourGuide?.licenses ?? '',
    guideContact: trip.tourGuide?.contactInfo ?? '',
    cancellationTerms: cancellation.terms ?? '',
    refundPolicy: cancellation.refund ?? '',
    reschedulingPolicy: cancellation.rescheduling ?? '',
    noShowPolicy: cancellation.noShow ?? '',
    instantBooking: trip.bookingInfo?.instantBooking ?? 'Yes',
    manualApproval: trip.bookingInfo?.manualApproval ?? 'No',
    confirmationProcess: trip.bookingInfo?.confirmationProcess ?? '',
    bookingNotes: trip.bookingNotes ?? '',
    meetingInstructions: trip.locationInfo?.meetingInstructions ?? '',
    googleMapsLink: trip.locationInfo?.googleMapsLink ?? '',
    nearbyLandmarks: trip.locationInfo?.nearbyLandmarks ?? '',
    businessName: trip.contactInfo?.businessName ?? '',
    businessAddress: trip.contactInfo?.businessAddress ?? '',
    businessPhone: trip.contactInfo?.phone ?? '',
    businessEmail: trip.contactInfo?.email ?? '',
    businessWebsite: trip.contactInfo?.website ?? '',
    businessSocialMedia: trip.contactInfo?.socialMedia ?? '',
    legalBusinessRegistration: trip.legal?.businessRegistration ?? '',
    legalTourOperatorLicense: trip.legal?.tourOperatorLicense ?? '',
    legalTaxInfo: trip.legal?.taxInfo ?? '',
    legalLiabilityInsurance: trip.legal?.liabilityInsurance ?? '',
    legalTermsAndConditions: trip.legal?.termsAndConditions ?? '',
    interests: joinCommas(trip.interests),
    seasonalTags: joinCommas(trip.seasonalTags),
    categoryTags: joinLines(trip.categoryTags),
    status: trip.status ?? 'Draft',
    itinerary: (trip.itinerary ?? []).map((item) => ({
      day: item.day ?? '',
      title: item.title ?? '',
      description: item.description ?? '',
      time: item.time ?? '',
      location: item.location ?? '',
    })),
    faqs: trip.faqs ?? [],
  };
}

async function uploadFiles(files: FileList | null) {
  if (!files?.length) {
    return [] as string[];
  }

  const formData = new FormData();
  Array.from(files).forEach((file) => formData.append('files', file));

  const response = await fetch('/api/uploads', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    return [] as string[];
  }

  const data = await response.json();
  return data.urls as string[];
}

function toLines(value: string): string[] {
  return value.split('\n').map((entry) => entry.trim()).filter(Boolean);
}

function toCommas(value: string): string[] {
  return value.split(',').map((entry) => entry.trim()).filter(Boolean);
}

/* ---------- Field primitives ---------- */

function Field({ label, htmlFor, hint, colSpan, children }: { label: string; htmlFor?: string; hint?: string; colSpan?: boolean; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className={`block ${colSpan ? 'md:col-span-2' : ''}`}>
      <span className="mb-xs block font-label-sm font-medium text-on-surface-variant">{label}</span>
      {children}
      {hint ? <span className="mt-xs block font-body-sm text-body-sm text-on-surface-variant/70">{hint}</span> : null}
    </label>
  );
}

const inputClass =
  'w-full rounded-xl border border-outline-variant bg-surface px-md py-sm text-on-surface text-body-md transition-colors outline-none placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-2 focus:ring-primary/30';

function Text({ name, label, value, onChange, placeholder, required, colSpan, hint, type = 'text' }: {
  name?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  colSpan?: boolean;
  hint?: string;
  type?: string;
}) {
  return (
    <Field label={label} htmlFor={name} hint={hint} colSpan={colSpan}>
      <input
        id={name}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
    </Field>
  );
}

function Area({ name, label, value, onChange, rows = 3, placeholder, colSpan, hint }: {
  name?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  colSpan?: boolean;
  hint?: string;
}) {
  return (
    <Field label={label} htmlFor={name} hint={hint} colSpan={colSpan}>
      <textarea
        id={name}
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputClass} resize-y min-h-[5.5rem]`}
      />
    </Field>
  );
}

function Select({ name, label, value, onChange, options, colSpan }: {
  name?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  colSpan?: boolean;
}) {
  return (
    <Field label={label} htmlFor={name} colSpan={colSpan}>
      <select id={name} value={value} onChange={(event) => onChange(event.target.value)} className={`${inputClass} cursor-pointer`}>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </Field>
  );
}

const SECTION_ICONS: Record<string, string> = {
  'Basic Information': 'info',
  Media: 'photo_library',
  'Itinerary & Schedule': 'route',
  Pricing: 'sell',
  'Group Details': 'group',
  Availability: 'event_available',
  'Pickup & Transportation': 'directions_car',
  Accommodation: 'hotel',
  Meals: 'restaurant',
  "What's Included / Not Included": 'checklist',
  'Requirements, What to Bring, Safety & Accessibility': 'health_and_safety',
  'Tour Guide Information': 'badge',
  'Cancellation Policy': 'cancel',
  'Booking Information': 'confirmation_number',
  'Location Information': 'place',
  FAQs: 'quiz',
  'Contact Information': 'contact_mail',
  'Legal & Verification': 'gavel',
  'Tags & Categories': 'sell',
  Publishing: 'publish',
};

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  const icon = SECTION_ICONS[title];
  return (
    <section className="rounded-2xl border border-outline-variant/60 bg-surface-container-low shadow-[0_1px_2px_rgba(0,0,0,0.04)] p-md">
      <div className="mb-md flex items-start gap-sm">
        {icon ? (
          <span className="material-symbols-outlined flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-container text-on-primary-container">
            {icon}
          </span>
        ) : null}
        <div>
          <h4 className="font-title-md text-title-md text-primary">{title}</h4>
          {description ? <p className="font-body-sm text-body-sm text-on-surface-variant">{description}</p> : null}
        </div>
      </div>
      <div className="grid gap-sm md:grid-cols-2">{children}</div>
    </section>
  );
}

/* ---------- Rich text (WYSIWYG) editor ---------- */

function RichTextEditor({ value, onChange, placeholder, rows = 4 }: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== (value || '')) {
      ref.current.innerHTML = value || '';
    }
  }, [value]);

  function exec(command: string, arg?: string) {
    document.execCommand(command, false, arg);
    if (ref.current) {
      onChange(ref.current.innerHTML);
    }
  }

  function makeLink() {
    const url = window.prompt('Enter link URL', 'https://');
    if (url) {
      exec('createLink', url);
    }
  }

  const toolbarButton = 'flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary';

  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface">
      <div className="flex flex-wrap items-center gap-xs border-b border-outline-variant/60 bg-surface-container-lowest px-xs py-xs">
        <button type="button" className={toolbarButton} title="Bold" onClick={() => exec('bold')}><span className="material-symbols-outlined text-[18px]">format_bold</span></button>
        <button type="button" className={toolbarButton} title="Italic" onClick={() => exec('italic')}><span className="material-symbols-outlined text-[18px]">format_italic</span></button>
        <button type="button" className={toolbarButton} title="Underline" onClick={() => exec('underline')}><span className="material-symbols-outlined text-[18px]">format_underlined</span></button>
        <button type="button" className={toolbarButton} title="Heading" onClick={() => exec('formatBlock', 'H3')}><span className="material-symbols-outlined text-[18px]">title</span></button>
        <span className="mx-1 h-5 w-px bg-outline-variant" />
        <button type="button" className={toolbarButton} title="Bullet list" onClick={() => exec('insertUnorderedList')}><span className="material-symbols-outlined text-[18px]">format_list_bulleted</span></button>
        <button type="button" className={toolbarButton} title="Numbered list" onClick={() => exec('insertOrderedList')}><span className="material-symbols-outlined text-[18px]">format_list_numbered</span></button>
        <button type="button" className={toolbarButton} title="Link" onClick={makeLink}><span className="material-symbols-outlined text-[18px]">link</span></button>
        <button type="button" className={toolbarButton} title="Clear formatting" onClick={() => exec('removeFormat')}><span className="material-symbols-outlined text-[18px]">format_clear</span></button>
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        style={{ minHeight: `${rows * 1.75}rem` }}
        className="rich-editor max-w-none space-y-2 px-md py-sm text-body-md leading-relaxed text-on-surface outline-none focus:ring-2 focus:ring-primary/30 [&:empty:before]:text-on-surface-variant/50 [&:empty:before]:content-[attr(data-placeholder)]"
        onInput={(event) => onChange((event.target as HTMLDivElement).innerHTML)}
      />
    </div>
  );
}

/* ---------- End primitives ---------- */

export default function ExperienceForm({ experience, onSubmit, onCancel, submitting = false }: ExperienceFormProps) {
  const isEditing = Boolean(experience?.id);
  const [form, setForm] = useState<FormState>(() => fromExperience(experience));
  const [coverFiles, setCoverFiles] = useState<FileList | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<FileList | null>(null);
  const [videoFiles, setVideoFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [step, setStep] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  const steps = ['Basics', 'Itinerary', 'Pricing & Logistics', 'Details & Policies', 'FAQs & Legal'];
  const lastStep = steps.length - 1;

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = 0;
    }
  }, [step]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  function updateField(field: TextField, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function updateItinerary(items: ItineraryItem[]) {
    setForm((current) => ({ ...current, itinerary: items }));
  }

  function updateFaqs(items: FaqItem[]) {
    setForm((current) => ({ ...current, faqs: items }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsUploading(true);

    try {
      const [uploadedCover, uploadedGallery, uploadedVideos] = await Promise.all([
        uploadFiles(coverFiles),
        uploadFiles(galleryFiles),
        uploadFiles(videoFiles),
      ]);

      const coverPhoto = uploadedCover[0] || form.coverPhoto.trim();
      const location = `${form.city}, ${form.region}, ${form.destination}`
        .replace(/,\s*,/g, ',')
        .replace(/^,\s*/, '')
        .trim();

      const payload: Record<string, unknown> = {
        ...form,
        title: form.title.trim(),
        tagline: form.tagline.trim(),
        location,
        duration: form.totalDuration || 'Flexible',
        coverPhoto,
        image: coverPhoto,
        descriptionText: form.description || form.summary,
        price: form.adultPrice || form.privateGroupPrice,
        capacity: form.maximumGuests ? Number(form.maximumGuests) : null,
        languages: toCommas(form.languages),
        highlights: toLines(form.highlights),
        guestExpectations: toLines(form.guestExpectations),
        galleryImages: [...uploadedGallery, ...toLines(form.galleryImages)],
        videos: [...uploadedVideos, ...toLines(form.videos)],
        included: toCommas(form.included),
        notIncluded: toCommas(form.notIncluded),
        requirements: toLines(form.requirements),
        whatToBring: toLines(form.whatToBring),
        safety: toLines(form.safety),
        accessibility: toLines(form.accessibility),
        interests: toCommas(form.interests),
        seasonalTags: toCommas(form.seasonalTags),
        categoryTags: toLines(form.categoryTags),
        itinerary: form.itinerary,
        faqs: form.faqs,
        cancellationPolicy: {
          terms: form.cancellationTerms,
          refund: form.refundPolicy,
          rescheduling: form.reschedulingPolicy,
          noShow: form.noShowPolicy,
        },
        bookings: experience?.bookings ?? 0,
        createdAt: experience?.createdAt,
        status: form.status,
      };

      await onSubmit(payload);
    } catch {
      alert('Failed to upload media or save the experience');
    } finally {
      setIsUploading(false);
    }
  }

  const selectedTags = toLines(form.categoryTags);

  function toggleTag(option: string) {
    const next = selectedTags.includes(option)
      ? selectedTags.filter((entry) => entry !== option)
      : [...selectedTags, option];
    updateField('categoryTags', next.join('\n'));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-inverse-surface/60 p-4 backdrop-blur-sm sm:items-center">
      <div className="fixed inset-0" role="button" tabIndex={-1} aria-label="Close" onClick={onCancel} />
      <form
        onSubmit={handleSubmit}
        onClick={(event) => event.stopPropagation()}
        className="relative z-10 my-auto flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
      >
        <header className="border-b border-outline-variant/70 bg-gradient-to-r from-primary/10 via-surface-container-lowest to-secondary/10 p-md">
          <div className="flex items-start justify-between gap-sm">
          <div>
            <p className="font-label-md text-label-md uppercase tracking-[0.2em] text-primary">Experience builder</p>
            <h3 className="font-title-lg text-title-lg text-primary">{isEditing ? 'Edit experience' : 'Build a complete experience'}</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {isEditing ? 'Update every detail of this experience.' : 'Capture itinerary, logistics, pricing, media, and policies in one place.'}
            </p>
          </div>
          <button type="button" onClick={onCancel} aria-label="Close" className="rounded-full p-xs text-on-surface-variant transition-colors hover:bg-surface-container-low">
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <div className="mt-md">
          <div className="flex items-center">
            {steps.map((label, index) => {
              const isDone = index < step;
              const isCurrent = index === step;
              return (
                <div key={label} className="flex flex-1 items-center last:flex-none">
                  <button
                    type="button"
                    onClick={() => setStep(index)}
                    className="flex flex-col items-center gap-xs"
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-label-md font-semibold transition-colors ${
                        isDone
                          ? 'border-primary bg-primary text-on-primary'
                          : isCurrent
                            ? 'border-primary bg-primary-container text-on-primary-container'
                            : 'border-outline-variant bg-surface text-on-surface-variant'
                      }`}
                    >
                      {isDone ? <span className="material-symbols-outlined text-[18px]">check</span> : index + 1}
                    </span>
                    <span className={`max-w-[5.5rem] text-center text-[11px] font-medium leading-tight ${isCurrent ? 'text-primary' : 'text-on-surface-variant'}`}>{label}</span>
                  </button>
                  {index < lastStep && (
                    <div className={`mx-1 h-1 flex-1 rounded-full ${index < step ? 'bg-primary' : 'bg-outline-variant'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        </header>

        <div ref={bodyRef} className="flex-1 min-h-0 space-y-md overflow-y-auto p-md">
          {step === 0 && (
          <>
          <Section title="Basic Information" description="Core details travelers see first.">
            <Text name="title" label="Experience title" value={form.title} onChange={(v) => updateField('title', v)} required colSpan placeholder="Serengeti Sunrise Expedition" />
            <Text name="tagline" label="Short tagline" value={form.tagline} onChange={(v) => updateField('tagline', v)} colSpan placeholder="A luxury sunrise safari" />
            <Text name="category" label="Category" value={form.category} onChange={(v) => updateField('category', v)} placeholder="Safari" />
            <Select name="experienceType" label="Experience type" value={form.experienceType} onChange={(v) => updateField('experienceType', v)} options={['Private', 'Shared', 'Small Group']} />
            <Text name="destination" label="Destination country" value={form.destination} onChange={(v) => updateField('destination', v)} placeholder="Kenya" />
            <Text name="region" label="Region / state" value={form.region} onChange={(v) => updateField('region', v)} placeholder="Maasai Mara" />
            <Text name="city" label="City / town" value={form.city} onChange={(v) => updateField('city', v)} placeholder="Nairobi" />
            <Text name="meetingPoint" label="Exact meeting point" value={form.meetingPoint} onChange={(v) => updateField('meetingPoint', v)} placeholder="Jomo Kenyatta Airport arrivals" />
            <Text name="endingPoint" label="Ending point" value={form.endingPoint} onChange={(v) => updateField('endingPoint', v)} placeholder="Hotel lobby" />
            <Text name="languages" label="Languages offered" value={form.languages} onChange={(v) => updateField('languages', v)} placeholder="English, Swahili" hint="Comma separated" />
            <Field label="Short summary" colSpan>
              <RichTextEditor value={form.summary} onChange={(v) => updateField('summary', v)} placeholder="A captivating one-paragraph summary…" rows={3} />
            </Field>
            <Field label="Full description" colSpan>
              <RichTextEditor value={form.description} onChange={(v) => updateField('description', v)} placeholder="Tell the story of this experience…" rows={5} />
            </Field>
            <Field label="What makes this unique" colSpan>
              <RichTextEditor value={form.uniqueSellingPoint} onChange={(v) => updateField('uniqueSellingPoint', v)} placeholder="Your signature differentiators…" rows={3} />
            </Field>
            <Area name="highlights" label="Experience highlights" value={form.highlights} onChange={(v) => updateField('highlights', v)} colSpan rows={4} hint="One highlight per line" />
            <Area name="guestExpectations" label="What guests can expect" value={form.guestExpectations} onChange={(v) => updateField('guestExpectations', v)} colSpan rows={4} hint="One expectation per line" />
            <Text name="targetAudience" label="Target audience" value={form.targetAudience} onChange={(v) => updateField('targetAudience', v)} placeholder="Couples, photographers" />
            <Text name="bestTimeToVisit" label="Best time to visit" value={form.bestTimeToVisit} onChange={(v) => updateField('bestTimeToVisit', v)} placeholder="Jun–Oct" />
          </Section>

          <Section title="Media" description="Cover photo, gallery, and videos.">
            <Field label="Cover photo upload" hint="Uploaded file overrides the URL below">
              <input type="file" accept="image/*" onChange={(event) => setCoverFiles(event.target.files)} className={`${inputClass} cursor-pointer`} />
            </Field>
            <Text name="coverPhoto" label="Cover photo URL" value={form.coverPhoto} onChange={(v) => updateField('coverPhoto', v)} placeholder="https://…" />
            <Field label="Gallery image upload" hint="Multiple images allowed">
              <input type="file" accept="image/*" multiple onChange={(event) => setGalleryFiles(event.target.files)} className={`${inputClass} cursor-pointer`} />
            </Field>
            <Area name="galleryImages" label="Gallery image URLs" value={form.galleryImages} onChange={(v) => updateField('galleryImages', v)} rows={3} hint="One URL per line" />
            <Field label="Video upload" hint="Multiple videos allowed">
              <input type="file" accept="video/*" multiple onChange={(event) => setVideoFiles(event.target.files)} className={`${inputClass} cursor-pointer`} />
            </Field>
            <Area name="videos" label="Video URLs" value={form.videos} onChange={(v) => updateField('videos', v)} rows={3} hint="One URL per line" />
          </Section>
          </>
          )}

          {step === 1 && (
          <Section title="Itinerary & Schedule" description="Day-by-day plan and timing.">
            <div className="col-span-2">
              <ItineraryEditor value={form.itinerary} onChange={updateItinerary} />
            </div>
            <Text name="numberOfDays" label="Number of days" value={form.numberOfDays} onChange={(v) => updateField('numberOfDays', v)} placeholder="5" />
            <Text name="numberOfNights" label="Number of nights" value={form.numberOfNights} onChange={(v) => updateField('numberOfNights', v)} placeholder="4" />
            <Text name="totalDuration" label="Total duration" value={form.totalDuration} onChange={(v) => updateField('totalDuration', v)} placeholder="5 Days" />
            <Text name="startTime" label="Start time" value={form.startTime} onChange={(v) => updateField('startTime', v)} placeholder="07:00" />
            <Text name="endTime" label="End time" value={form.endTime} onChange={(v) => updateField('endTime', v)} placeholder="18:00" />
          </Section>
          )}

          {step === 2 && (
          <>
          <Section title="Pricing" description="Rates, fees, and deposits.">
            <Text name="adultPrice" label="Adult price" value={form.adultPrice} onChange={(v) => updateField('adultPrice', v)} placeholder="$2,450" />
            <Text name="childPrice" label="Child price" value={form.childPrice} onChange={(v) => updateField('childPrice', v)} placeholder="$1,200" />
            <Text name="infantPrice" label="Infant price" value={form.infantPrice} onChange={(v) => updateField('infantPrice', v)} placeholder="$0" />
            <Text name="seniorPrice" label="Senior price" value={form.seniorPrice} onChange={(v) => updateField('seniorPrice', v)} placeholder="$2,100" />
            <Text name="privateGroupPrice" label="Private group price" value={form.privateGroupPrice} onChange={(v) => updateField('privateGroupPrice', v)} placeholder="$9,800" />
            <Text name="currency" label="Currency" value={form.currency} onChange={(v) => updateField('currency', v)} placeholder="USD" />
            <Select name="taxesIncluded" label="Taxes included" value={form.taxesIncluded} onChange={(v) => updateField('taxesIncluded', v)} options={['Yes', 'No']} />
            <Text name="serviceFees" label="Service fees" value={form.serviceFees} onChange={(v) => updateField('serviceFees', v)} placeholder="$50" />
            <Text name="discounts" label="Discounts" value={form.discounts} onChange={(v) => updateField('discounts', v)} placeholder="Early bird 10%" />
            <Select name="depositRequired" label="Deposit required" value={form.depositRequired} onChange={(v) => updateField('depositRequired', v)} options={['Yes', 'No']} />
            <Text name="extraCharges" label="Extra charges" value={form.extraCharges} onChange={(v) => updateField('extraCharges', v)} placeholder="$30 park fee" />
          </Section>
          <Section title="Group Details" description="Guest sizes and restrictions.">
            <Text name="minimumGuests" label="Minimum guests" value={form.minimumGuests} onChange={(v) => updateField('minimumGuests', v)} placeholder="2" />
            <Text name="maximumGuests" label="Maximum guests" value={form.maximumGuests} onChange={(v) => updateField('maximumGuests', v)} placeholder="12" />
            <Text name="ageRestrictions" label="Age restrictions" value={form.ageRestrictions} onChange={(v) => updateField('ageRestrictions', v)} placeholder="12+ for walking safaris" />
            <Select name="childrenAllowed" label="Children allowed" value={form.childrenAllowed} onChange={(v) => updateField('childrenAllowed', v)} options={['Yes', 'No']} />
            <Select name="petsAllowed" label="Pets allowed" value={form.petsAllowed} onChange={(v) => updateField('petsAllowed', v)} options={['Yes', 'No']} />
          </Section>
          <Section title="Availability" description="When the trip runs.">
            <Text name="availableDates" label="Available dates" value={form.availableDates} onChange={(v) => updateField('availableDates', v)} placeholder="Jul 1 – Oct 31" />
            <Text name="recurringSchedule" label="Recurring schedule" value={form.recurringSchedule} onChange={(v) => updateField('recurringSchedule', v)} placeholder="Weekly, Mondays" />
            <Text name="blackoutDates" label="Blackout dates" value={form.blackoutDates} onChange={(v) => updateField('blackoutDates', v)} placeholder="Dec 24 – Jan 1" />
            <Text name="bookingDeadline" label="Booking deadline" value={form.bookingDeadline} onChange={(v) => updateField('bookingDeadline', v)} placeholder="48 hours before" />
            <Text name="cutOffTime" label="Cut-off time before departure" value={form.cutOffTime} onChange={(v) => updateField('cutOffTime', v)} placeholder="6 hours" />
          </Section>
          <Section title="Pickup & Transportation" description="Transfers and transport.">
            <Select name="pickupAvailable" label="Pickup available" value={form.pickupAvailable} onChange={(v) => updateField('pickupAvailable', v)} options={['Yes', 'No']} />
            <Text name="transportType" label="Transport type" value={form.transportType} onChange={(v) => updateField('transportType', v)} placeholder="4x4 Land Cruiser" />
            <Text name="pickupLocations" label="Pickup locations" value={form.pickupLocations} onChange={(v) => updateField('pickupLocations', v)} colSpan placeholder="Airport, city hotels" />
            <Text name="dropOffLocations" label="Drop-off locations" value={form.dropOffLocations} onChange={(v) => updateField('dropOffLocations', v)} colSpan placeholder="Airport, city hotels" />
            <Text name="pickupAccessibility" label="Accessibility notes" value={form.pickupAccessibility} onChange={(v) => updateField('pickupAccessibility', v)} colSpan placeholder="Wheelchair ramp available" />
          </Section>
          <Section title="Accommodation" description="Lodging details if included.">
            <Select name="accommodationIncluded" label="Accommodation included" value={form.accommodationIncluded} onChange={(v) => updateField('accommodationIncluded', v)} options={['Yes', 'No']} />
            <Text name="accommodationName" label="Accommodation name" value={form.accommodationName} onChange={(v) => updateField('accommodationName', v)} placeholder="Mara Serena Lodge" />
            <Text name="accommodationType" label="Hotel / lodge / camp type" value={form.accommodationType} onChange={(v) => updateField('accommodationType', v)} placeholder="Luxury tented camp" />
            <Text name="starRating" label="Star rating" value={form.starRating} onChange={(v) => updateField('starRating', v)} placeholder="5" />
            <Text name="roomType" label="Room type" value={form.roomType} onChange={(v) => updateField('roomType', v)} placeholder="Deluxe suite" />
            <Text name="sharingOptions" label="Room sharing options" value={form.sharingOptions} onChange={(v) => updateField('sharingOptions', v)} placeholder="Twin / double" />
            <Text name="checkInTime" label="Check-in time" value={form.checkInTime} onChange={(v) => updateField('checkInTime', v)} placeholder="14:00" />
            <Text name="checkOutTime" label="Check-out time" value={form.checkOutTime} onChange={(v) => updateField('checkOutTime', v)} placeholder="11:00" />
          </Section>
          <Section title="Meals" description="Included food and dietary options.">
            <Text name="breakfastIncluded" label="Breakfast included" value={form.breakfastIncluded} onChange={(v) => updateField('breakfastIncluded', v)} placeholder="Yes / Buffet" />
            <Text name="lunchIncluded" label="Lunch included" value={form.lunchIncluded} onChange={(v) => updateField('lunchIncluded', v)} placeholder="Yes / Boxed" />
            <Text name="dinnerIncluded" label="Dinner included" value={form.dinnerIncluded} onChange={(v) => updateField('dinnerIncluded', v)} placeholder="Yes / Set menu" />
            <Text name="snacksIncluded" label="Snacks included" value={form.snacksIncluded} onChange={(v) => updateField('snacksIncluded', v)} placeholder="Yes" />
            <Text name="drinksIncluded" label="Drinks included" value={form.drinksIncluded} onChange={(v) => updateField('drinksIncluded', v)} placeholder="Water, coffee" />
            <Text name="dietaryAccommodations" label="Dietary accommodations" value={form.dietaryAccommodations} onChange={(v) => updateField('dietaryAccommodations', v)} colSpan placeholder="Vegetarian, vegan, halal" />
          </Section>
          </>
          )}

          {step === 3 && (
          <>
          <Section title="What's Included / Not Included">
            <Area name="included" label="What's included" value={form.included} onChange={(v) => updateField('included', v)} rows={4} colSpan hint="Comma separated" />
            <Area name="notIncluded" label="What's not included" value={form.notIncluded} onChange={(v) => updateField('notIncluded', v)} rows={4} colSpan hint="Comma separated" />
          </Section>

          <Section title="Requirements, What to Bring, Safety & Accessibility">
            <Area name="requirements" label="Requirements" value={form.requirements} onChange={(v) => updateField('requirements', v)} rows={3} colSpan hint="One per line (fitness, documents, etc.)" />
            <Area name="whatToBring" label="What to bring" value={form.whatToBring} onChange={(v) => updateField('whatToBring', v)} rows={3} colSpan hint="One per line" />
            <Area name="safety" label="Safety guidelines" value={form.safety} onChange={(v) => updateField('safety', v)} rows={3} colSpan hint="One per line" />
            <Area name="accessibility" label="Accessibility" value={form.accessibility} onChange={(v) => updateField('accessibility', v)} rows={3} colSpan hint="One per line" />
          </Section>
          <Section title="Tour Guide Information">
            <Text name="guideName" label="Guide name" value={form.guideName} onChange={(v) => updateField('guideName', v)} placeholder="John Kamau" />
            <Text name="guideProfilePhoto" label="Guide profile photo URL" value={form.guideProfilePhoto} onChange={(v) => updateField('guideProfilePhoto', v)} placeholder="https://…" />
            <Text name="yearsOfExperience" label="Years of experience" value={form.yearsOfExperience} onChange={(v) => updateField('yearsOfExperience', v)} placeholder="12" />
            <Text name="languagesSpoken" label="Languages spoken" value={form.languagesSpoken} onChange={(v) => updateField('languagesSpoken', v)} placeholder="English, Swahili, French" />
            <Text name="certifications" label="Certifications" value={form.certifications} onChange={(v) => updateField('certifications', v)} placeholder="Wilderness First Responder" />
            <Text name="guideLicenses" label="Licenses" value={form.guideLicenses} onChange={(v) => updateField('guideLicenses', v)} placeholder="Tour operator license #123" />
            <Text name="guideContact" label="Contact information" value={form.guideContact} onChange={(v) => updateField('guideContact', v)} placeholder="guide@email.com" />
            <Field label="Biography" colSpan>
              <RichTextEditor value={form.guideBiography} onChange={(v) => updateField('guideBiography', v)} placeholder="Meet your guide…" rows={3} />
            </Field>
          </Section>

          <Section title="Cancellation Policy">
            <Field label="Cancellation terms" colSpan>
              <RichTextEditor value={form.cancellationTerms} onChange={(v) => updateField('cancellationTerms', v)} placeholder="When and how guests can cancel…" rows={3} />
            </Field>
            <Field label="Refund policy" colSpan>
              <RichTextEditor value={form.refundPolicy} onChange={(v) => updateField('refundPolicy', v)} placeholder="How refunds are calculated…" rows={3} />
            </Field>
            <Field label="Rescheduling policy" colSpan>
              <RichTextEditor value={form.reschedulingPolicy} onChange={(v) => updateField('reschedulingPolicy', v)} placeholder="How rescheduling works…" rows={3} />
            </Field>
            <Field label="No-show policy" colSpan>
              <RichTextEditor value={form.noShowPolicy} onChange={(v) => updateField('noShowPolicy', v)} placeholder="What happens if a guest doesn't show…" rows={3} />
            </Field>
          </Section>

          <Section title="Booking Information">
            <Select name="instantBooking" label="Instant booking available" value={form.instantBooking} onChange={(v) => updateField('instantBooking', v)} options={['Yes', 'No']} />
            <Select name="manualApproval" label="Manual approval required" value={form.manualApproval} onChange={(v) => updateField('manualApproval', v)} options={['Yes', 'No']} />
            <Field label="Confirmation process" colSpan>
              <RichTextEditor value={form.confirmationProcess} onChange={(v) => updateField('confirmationProcess', v)} placeholder="How and when bookings are confirmed…" rows={3} />
            </Field>
            <Field label="Booking notes" colSpan>
              <RichTextEditor value={form.bookingNotes} onChange={(v) => updateField('bookingNotes', v)} placeholder="Anything guests should know before booking…" rows={3} />
            </Field>
          </Section>

          <Section title="Location Information">
            <Field label="Meeting instructions" colSpan>
              <RichTextEditor value={form.meetingInstructions} onChange={(v) => updateField('meetingInstructions', v)} placeholder="Where and when to meet your guide…" rows={3} />
            </Field>
            <Text name="googleMapsLink" label="Google Maps location" value={form.googleMapsLink} onChange={(v) => updateField('googleMapsLink', v)} placeholder="https://maps.google.com/…" />
            <Text name="nearbyLandmarks" label="Nearby landmarks" value={form.nearbyLandmarks} onChange={(v) => updateField('nearbyLandmarks', v)} placeholder="Great Rift Valley" />
          </Section>
          </>
          )}

          {step === 4 && (
          <>
          <Section title="FAQs" description="Common questions and tips.">
            <div className="col-span-2">
              <FaqEditor value={form.faqs} onChange={updateFaqs} />
            </div>
          </Section>

          <Section title="Contact Information">
            <Text name="businessName" label="Business name" value={form.businessName} onChange={(v) => updateField('businessName', v)} placeholder="HuntersVille Safaris" />
            <Text name="businessPhone" label="Phone number" value={form.businessPhone} onChange={(v) => updateField('businessPhone', v)} placeholder="+254 700 000000" />
            <Text name="businessEmail" label="Email" value={form.businessEmail} onChange={(v) => updateField('businessEmail', v)} placeholder="hello@huntersville.com" />
            <Text name="businessWebsite" label="Website" value={form.businessWebsite} onChange={(v) => updateField('businessWebsite', v)} placeholder="https://…" />
            <Text name="businessAddress" label="Business address" value={form.businessAddress} onChange={(v) => updateField('businessAddress', v)} colSpan placeholder="Nairobi, Kenya" />
            <Area name="businessSocialMedia" label="Social media links" value={form.businessSocialMedia} onChange={(v) => updateField('businessSocialMedia', v)} rows={2} colSpan hint="One link per line" />
          </Section>

          <Section title="Legal & Verification">
            <Text name="legalBusinessRegistration" label="Business registration" value={form.legalBusinessRegistration} onChange={(v) => updateField('legalBusinessRegistration', v)} placeholder="REG-12345" />
            <Text name="legalTourOperatorLicense" label="Tour operator license" value={form.legalTourOperatorLicense} onChange={(v) => updateField('legalTourOperatorLicense', v)} placeholder="TOL-98765" />
            <Text name="legalTaxInfo" label="Tax information" value={form.legalTaxInfo} onChange={(v) => updateField('legalTaxInfo', v)} placeholder="VAT KE123" />
            <Text name="legalLiabilityInsurance" label="Liability insurance" value={form.legalLiabilityInsurance} onChange={(v) => updateField('legalLiabilityInsurance', v)} placeholder="Policy #LI-001" />
            <Field label="Terms and conditions" colSpan>
              <RichTextEditor value={form.legalTermsAndConditions} onChange={(v) => updateField('legalTermsAndConditions', v)} placeholder="Full terms and conditions…" rows={5} />
            </Field>
          </Section>

          <Section title="Tags & Categories">
            <div className="col-span-2">
              <Text name="interests" label="Interests" value={form.interests} onChange={(v) => updateField('interests', v)} colSpan hint="Comma separated" />
              <Text name="seasonalTags" label="Seasonal tags" value={form.seasonalTags} onChange={(v) => updateField('seasonalTags', v)} colSpan hint="Comma separated (e.g. Summer, Winter)" />
              <p className="mb-xs mt-md block font-label-sm text-label-sm text-on-surface-variant">Activity &amp; category tags</p>
              <div className="flex flex-wrap gap-xs">
                {CATEGORY_TAG_OPTIONS.map((option) => {
                  const active = selectedTags.includes(option);
                  return (
                    <button
                      type="button"
                      key={option}
                      onClick={() => toggleTag(option)}
                      className={`rounded-full border px-sm py-xs text-sm transition-colors ${
                        active
                          ? 'border-primary bg-primary text-on-primary'
                          : 'border-outline-variant bg-surface text-on-surface-variant hover:bg-surface-container-low'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </Section>

          <Section title="Publishing">
            <Select name="status" label="Status" value={form.status} onChange={(v) => updateField('status', v)} options={['Draft', 'Active', 'Archived']} />
          </Section>
          </>
          )}
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-sm border-t border-outline-variant/70 bg-surface-container-lowest p-md">
          <div className="flex gap-sm">
            <button type="button" onClick={onCancel} className="rounded-xl border border-outline-variant px-md py-sm text-on-surface-variant transition-colors hover:bg-surface-container-low">
              Cancel
            </button>
            {step > 0 && (
              <button type="button" onClick={() => setStep((current) => Math.max(0, current - 1))} className="rounded-xl border border-outline-variant px-md py-sm text-on-surface-variant transition-colors hover:bg-surface-container-low">
                <span className="material-symbols-outlined align-middle text-[18px]">arrow_back</span> Back
              </button>
            )}
          </div>
          <div className="flex items-center gap-sm">
            <span className="hidden font-label-sm text-label-sm text-on-surface-variant sm:inline">Step {step + 1} of {steps.length}</span>
            {step < lastStep ? (
              <button type="button" onClick={() => setStep((current) => Math.min(lastStep, current + 1))} className="flex items-center gap-xs rounded-xl bg-primary px-md py-sm font-label-md text-label-md text-on-primary shadow-sm transition-colors hover:bg-primary/90">
                Next: {steps[step + 1]} <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            ) : (
              <button type="submit" disabled={submitting || isUploading} className="flex items-center gap-xs rounded-xl bg-primary px-md py-sm font-label-md text-label-md text-on-primary shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-70">
                {(submitting || isUploading) ? 'Saving…' : isEditing ? 'Update experience' : 'Create experience'}
              </button>
            )}
          </div>
        </footer>
      </form>
    </div>
  );
}

/* ---------- Section content ---------- */

function ItineraryEditor({ value, onChange }: { value: ItineraryItem[]; onChange: (items: ItineraryItem[]) => void }) {
  function update(index: number, key: keyof ItineraryItem, fieldValue: string) {
    onChange(value.map((item, i) => (i === index ? { ...item, [key]: fieldValue } : item)));
  }

  function add() {
    onChange([...value, { day: `Day ${value.length + 1}`, title: '', description: '', time: '', location: '' }]);
  }

  function remove(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div className="rounded-2xl border border-outline-variant/60 bg-surface p-md shadow-sm">
      <p className="mb-sm font-label-sm text-label-sm text-on-surface-variant">Day-by-day itinerary</p>
      <div className="flex flex-col gap-sm">
        {value.map((item, index) => (
          <div key={index} className="grid gap-sm rounded-xl border border-outline-variant/60 bg-surface-container-low p-sm md:grid-cols-2">
            <label className="block">
              <span className="mb-xs block font-label-sm text-label-sm text-on-surface-variant">Day</span>
              <input value={item.day} onChange={(e) => update(index, 'day', e.target.value)} className={inputClass} />
            </label>
            <label className="block">
              <span className="mb-xs block font-label-sm text-label-sm text-on-surface-variant">Time</span>
              <input value={item.time} onChange={(e) => update(index, 'time', e.target.value)} className={inputClass} placeholder="08:00" />
            </label>
            <label className="block md:col-span-2">
              <span className="mb-xs block font-label-sm text-label-sm text-on-surface-variant">Stop / title</span>
              <input value={item.title} onChange={(e) => update(index, 'title', e.target.value)} className={inputClass} placeholder="Game drive at Maasai Mara" />
            </label>
            <label className="block md:col-span-2">
              <span className="mb-xs block font-label-sm text-label-sm text-on-surface-variant">Activity / itinerary description</span>
              <textarea value={item.description} onChange={(e) => update(index, 'description', e.target.value)} rows={2} className={`${inputClass} resize-y`} />
            </label>
            <label className="block md:col-span-2">
              <span className="mb-xs block font-label-sm text-label-sm text-on-surface-variant">Location</span>
              <input value={item.location} onChange={(e) => update(index, 'location', e.target.value)} className={inputClass} placeholder="Observation hill" />
            </label>
            <button type="button" onClick={() => remove(index)} className="md:col-span-2 justify-self-end rounded-md border border-outline-variant px-sm py-xs text-sm text-on-surface-variant hover:bg-surface-container-low">
              Remove day
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={add} className="mt-sm rounded-lg border border-primary px-md py-sm text-sm text-primary transition-colors hover:bg-primary/10">
        + Add day
      </button>
    </div>
  );
}

function FaqEditor({ value, onChange }: { value: FaqItem[]; onChange: (items: FaqItem[]) => void }) {
  function update(index: number, key: keyof FaqItem, fieldValue: string) {
    onChange(value.map((item, i) => (i === index ? { ...item, [key]: fieldValue } : item)));
  }

  function add() {
    onChange([...value, { question: '', answer: '' }]);
  }

  function remove(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div className="rounded-2xl border border-outline-variant/60 bg-surface p-md shadow-sm">
      <div className="flex flex-col gap-sm">
        {value.map((item, index) => (
          <div key={index} className="grid gap-sm rounded-xl border border-outline-variant/60 bg-surface-container-low p-sm">
            <label className="block">
              <span className="mb-xs block font-label-sm text-label-sm text-on-surface-variant">Question</span>
              <input value={item.question} onChange={(e) => update(index, 'question', e.target.value)} className={inputClass} placeholder="What should I pack?" />
            </label>
            <label className="block">
              <span className="mb-xs block font-label-sm text-label-sm text-on-surface-variant">Answer</span>
              <textarea value={item.answer} onChange={(e) => update(index, 'answer', e.target.value)} rows={2} className={`${inputClass} resize-y`} />
            </label>
            <button type="button" onClick={() => remove(index)} className="justify-self-end rounded-md border border-outline-variant px-sm py-xs text-sm text-on-surface-variant hover:bg-surface-container-low">
              Remove
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={add} className="mt-sm rounded-lg border border-primary px-md py-sm text-sm text-primary transition-colors hover:bg-primary/10">
        + Add FAQ
      </button>
    </div>
  );
}
