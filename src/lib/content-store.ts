import 'server-only';
import Database from 'better-sqlite3';
import { promises as fs } from 'fs';
import path from 'path';

export type ExperienceStatus = 'Active' | 'Draft' | 'Archived';
export type BookingStatus = 'Paid' | 'Pending' | 'Failed' | 'Confirmed';

export interface ExperienceItineraryItem {
  day: string;
  title: string;
  description: string;
  time?: string;
  location?: string;
}

export interface Experience {
  id: string;
  title: string;
  tagline: string;
  category: string;
  experienceType: string;
  destination: string;
  region: string;
  city: string;
  meetingPoint: string;
  endingPoint: string;
  coordinates: string;
  languages: string[];
  timeZone: string;
  summary: string;
  description: string;
  uniqueSellingPoint: string;
  highlights: string[];
  guestExpectations: string[];
  targetAudience: string;
  bestTimeToVisit: string;
  coverPhoto: string;
  galleryImages: string[];
  videos: string[];
  itinerary: ExperienceItineraryItem[];
  durationDetails: {
    totalDuration: string;
    startTime: string;
    endTime: string;
    numberOfDays: string;
    numberOfNights: string;
  };
  pricing: {
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
  };
  groupDetails: {
    minimumGuests: string;
    maximumGuests: string;
    ageRestrictions: string;
    childrenAllowed: string;
    petsAllowed: string;
  };
  availability: {
    availableDates: string;
    recurringSchedule: string;
    blackoutDates: string;
    bookingDeadline: string;
    cutOffTime: string;
  };
  pickup: {
    pickupAvailable: string;
    pickupLocations: string;
    dropOffLocations: string;
    transportType: string;
    accessibility: string;
  };
  accommodation: {
    included: string;
    name: string;
    type: string;
    starRating: string;
    roomType: string;
    sharingOptions: string;
    checkInTime: string;
    checkOutTime: string;
  };
  meals: {
    breakfastIncluded: string;
    lunchIncluded: string;
    dinnerIncluded: string;
    snacksIncluded: string;
    drinksIncluded: string;
    dietaryAccommodations: string;
  };
  included: string[];
  notIncluded: string[];
  requirements: string[];
  whatToBring: string[];
  safety: string[];
  accessibility: string[];
  tourGuide: {
    guideName: string;
    profilePhoto: string;
    biography: string;
    yearsOfExperience: string;
    languagesSpoken: string;
    certifications: string;
    licenses: string;
    contactInfo: string;
  };
  cancellationPolicy: {
    terms: string;
    refund: string;
    rescheduling: string;
    noShow: string;
  };
  contactInfo: {
    businessName: string;
    businessAddress: string;
    phone: string;
    email: string;
    website: string;
    socialMedia: string;
  };
  legal: {
    businessRegistration: string;
    tourOperatorLicense: string;
    taxInfo: string;
    liabilityInsurance: string;
    termsAndConditions: string;
  };
  bookingNotes: string;
  interests: string[];
  seasonalTags: string[];
  categoryTags: string[];
  bookingInfo: {
    instantBooking: string;
    manualApproval: string;
    confirmationProcess: string;
  };
  locationInfo: {
    meetingInstructions: string;
    googleMapsLink: string;
    nearbyLandmarks: string;
  };
  faqs: Array<{ question: string; answer: string }>;
  tags: string[];
  location: string;
  duration: string;
  image: string;
  descriptionText: string;
  price: string;
  capacity: number | null;
  status: ExperienceStatus;
  bookings: number;
  createdAt: string;
}

export interface Booking {
  id: string;
  travelerName: string;
  travelerEmail: string;
  travelerPhone?: string;
  experienceId: string;
  experienceTitle: string;
  date: string;
  amount: string;
  paymentMethod: string;
  guestCount?: number;
  specialRequests?: string;
  note?: string;
  status: BookingStatus;
  userId?: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'traveler';
  createdAt: string;
}

export interface Traveler extends User {
  phone?: string;
  avatar?: string;
  totalTrips?: number;
  lastBookingDate?: string;
}

export interface Review {
  id: string;
  experienceId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
}

export interface ExperienceFilters {
  search?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: ExperienceStatus;
}

const STORE_DIR = path.join(process.cwd(), 'src', 'data');
const DB_FILE = path.join(STORE_DIR, 'app.sqlite');

let dbInstance: Database.Database | null = null;

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((entry): entry is string => typeof entry === 'string').map((entry) => entry.trim()).filter(Boolean);
  }
  if (typeof value === 'string') {
    return value
      .split(/\n|,/)
      .map((entry) => entry.trim())
      .filter(Boolean);
  }
  return [];
}

function toItinerary(value: unknown): ExperienceItineraryItem[] {
  if (Array.isArray(value)) {
    return value.filter((entry): entry is ExperienceItineraryItem => Boolean(entry && typeof entry === 'object')).map((entry) => ({
      day: typeof entry.day === 'string' ? entry.day : 'Day 1',
      title: typeof entry.title === 'string' ? entry.title : '',
      description: typeof entry.description === 'string' ? entry.description : '',
      time: typeof entry.time === 'string' ? entry.time : '',
      location: typeof entry.location === 'string' ? entry.location : '',
    }));
  }
  if (typeof value === 'string') {
    return value
      .split('\n')
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((entry, index) => ({ day: `Day ${index + 1}`, title: '', description: entry }));
  }
  return [];
}

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value.trim() : fallback;
}

function toCancellationPolicy(value: unknown): { terms: string; refund: string; rescheduling: string; noShow: string } {
  if (value && typeof value === 'object') {
    const entry = value as Record<string, unknown>;
    return {
      terms: asString(entry.terms),
      refund: asString(entry.refund),
      rescheduling: asString(entry.rescheduling),
      noShow: asString(entry.noShow),
    };
  }
  return { terms: asString(value), refund: '', rescheduling: '', noShow: '' };
}

function asNumber(value: unknown): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function ensureStoreDir() {
  return fs.mkdir(STORE_DIR, { recursive: true });
}

function getDb(): Database.Database {
  if (dbInstance) {
    return dbInstance;
  }

  ensureStoreDir().catch(() => undefined);
  dbInstance = new Database(DB_FILE);
  dbInstance.pragma('journal_mode = WAL');
  dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS experiences (
      id TEXT PRIMARY KEY,
      data TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      data TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      experienceId TEXT NOT NULL,
      userId TEXT NOT NULL,
      userName TEXT NOT NULL,
      rating INTEGER NOT NULL,
      title TEXT NOT NULL,
      comment TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_reviews_experience ON reviews (experienceId);
    CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews (userId);
  `);

  const existingAdmin = dbInstance.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
  if (!existingAdmin.count) {
    dbInstance.prepare('INSERT INTO users (id, email, password, name, role, createdAt) VALUES (?, ?, ?, ?, ?, ?)').run(
      'user-admin-1',
      'admin@huntersville.com',
      'password123',
      'Admin User',
      'admin',
      new Date('2026-01-01T00:00:00.000Z').toISOString(),
    );
  }

  return dbInstance;
}

function getExperienceRecord(id: string): Experience | null {
  const row = getDb().prepare('SELECT data FROM experiences WHERE id = ?').get(id) as { data: string } | undefined;
  return row ? JSON.parse(row.data) as Experience : null;
}

function listExperiences(): Experience[] {
  const rows = getDb().prepare('SELECT data FROM experiences ORDER BY id DESC').all() as Array<{ data: string }>;
  return rows.map((row) => JSON.parse(row.data) as Experience);
}

function listBookings(): Booking[] {
  const rows = getDb().prepare('SELECT data FROM bookings ORDER BY id DESC').all() as Array<{ data: string }>;
  return rows.map((row) => JSON.parse(row.data) as Booking);
}

function listUsers(): User[] {
  const rows = getDb().prepare('SELECT id, email, password, name, role, createdAt FROM users ORDER BY createdAt ASC').all() as Array<{
    id: string;
    email: string;
    password: string;
    name: string;
    role: 'admin' | 'traveler';
    createdAt: string;
  }>;
  return rows.map((row) => ({ ...row }));
}

function listReviewsForExperience(experienceId: string): Review[] {
  const rows = getDb().prepare('SELECT id, experienceId, userId, userName, rating, title, comment, createdAt FROM reviews WHERE experienceId = ? ORDER BY createdAt DESC').all(experienceId) as Array<Review>;
  return rows;
}

function buildExperience(input: Record<string, unknown>): Experience {
  const baseTitle = asString(input.title, 'New HuntersVille experience');
  const summary = asString(input.summary, asString(input.description, 'A bespoke HuntersVille experience crafted for curious travelers.'));
  const description = asString(input.description, summary);
  const coverPhoto = asString(input.coverPhoto, asString(input.image));
  const adultPrice = asString(input.adultPrice, asString(input.price, '$0'));
  const maxGuests = asNumber(input.maximumGuests);

  return {
    id: `exp-${Date.now()}`,
    title: baseTitle,
    tagline: asString(input.tagline),
    category: asString(input.category, 'General'),
    experienceType: asString(input.experienceType, 'Private'),
    destination: asString(input.destination, 'Tanzania'),
    region: asString(input.region),
    city: asString(input.city),
    meetingPoint: asString(input.meetingPoint),
    endingPoint: asString(input.endingPoint),
    coordinates: asString(input.coordinates),
    languages: toStringArray(input.languages),
    timeZone: asString(input.timeZone),
    summary,
    description,
    uniqueSellingPoint: asString(input.uniqueSellingPoint),
    highlights: toStringArray(input.highlights),
    guestExpectations: toStringArray(input.guestExpectations),
    targetAudience: asString(input.targetAudience),
    bestTimeToVisit: asString(input.bestTimeToVisit),
    coverPhoto,
    galleryImages: toStringArray(input.galleryImages),
    videos: toStringArray(input.videos),
    itinerary: toItinerary(input.itinerary ?? input.itineraryText),
    durationDetails: {
      totalDuration: asString(input.totalDuration, asString(input.duration)),
      startTime: asString(input.startTime),
      endTime: asString(input.endTime),
      numberOfDays: asString(input.numberOfDays),
      numberOfNights: asString(input.numberOfNights),
    },
    pricing: {
      adultPrice,
      childPrice: asString(input.childPrice),
      infantPrice: asString(input.infantPrice),
      seniorPrice: asString(input.seniorPrice),
      privateGroupPrice: asString(input.privateGroupPrice),
      currency: asString(input.currency, 'USD'),
      taxesIncluded: asString(input.taxesIncluded, 'Yes'),
      serviceFees: asString(input.serviceFees),
      discounts: asString(input.discounts),
      depositRequired: asString(input.depositRequired, 'No'),
      extraCharges: asString(input.extraCharges),
    },
    groupDetails: {
      minimumGuests: asString(input.minimumGuests),
      maximumGuests: asString(input.maximumGuests),
      ageRestrictions: asString(input.ageRestrictions),
      childrenAllowed: asString(input.childrenAllowed, 'Yes'),
      petsAllowed: asString(input.petsAllowed, 'No'),
    },
    availability: {
      availableDates: asString(input.availableDates),
      recurringSchedule: asString(input.recurringSchedule),
      blackoutDates: asString(input.blackoutDates),
      bookingDeadline: asString(input.bookingDeadline),
      cutOffTime: asString(input.cutOffTime),
    },
    pickup: {
      pickupAvailable: asString(input.pickupAvailable, 'Yes'),
      pickupLocations: asString(input.pickupLocations),
      dropOffLocations: asString(input.dropOffLocations),
      transportType: asString(input.transportType),
      accessibility: asString(input.pickupAccessibility),
    },
    accommodation: {
      included: asString(input.accommodationIncluded, 'No'),
      name: asString(input.accommodationName),
      type: asString(input.accommodationType),
      starRating: asString(input.starRating),
      roomType: asString(input.roomType),
      sharingOptions: asString(input.sharingOptions),
      checkInTime: asString(input.checkInTime),
      checkOutTime: asString(input.checkOutTime),
    },
    meals: {
      breakfastIncluded: asString(input.breakfastIncluded),
      lunchIncluded: asString(input.lunchIncluded),
      dinnerIncluded: asString(input.dinnerIncluded),
      snacksIncluded: asString(input.snacksIncluded),
      drinksIncluded: asString(input.drinksIncluded),
      dietaryAccommodations: asString(input.dietaryAccommodations),
    },
    included: toStringArray(input.included),
    notIncluded: toStringArray(input.notIncluded),
    requirements: toStringArray(input.requirements),
    whatToBring: toStringArray(input.whatToBring),
    safety: toStringArray(input.safety),
    accessibility: toStringArray(input.accessibility),
    tourGuide: {
      guideName: asString(input.guideName),
      profilePhoto: asString(input.guideProfilePhoto),
      biography: asString(input.guideBiography),
      yearsOfExperience: asString(input.yearsOfExperience),
      languagesSpoken: asString(input.languagesSpoken),
      certifications: asString(input.certifications),
      licenses: asString(input.guideLicenses),
      contactInfo: asString(input.guideContact),
    },
    cancellationPolicy: toCancellationPolicy(input.cancellationPolicy),
    contactInfo: {
      businessName: asString(input.businessName),
      businessAddress: asString(input.businessAddress),
      phone: asString(input.businessPhone),
      email: asString(input.businessEmail),
      website: asString(input.businessWebsite),
      socialMedia: asString(input.businessSocialMedia),
    },
    legal: {
      businessRegistration: asString(input.legalBusinessRegistration),
      tourOperatorLicense: asString(input.legalTourOperatorLicense),
      taxInfo: asString(input.legalTaxInfo),
      liabilityInsurance: asString(input.legalLiabilityInsurance),
      termsAndConditions: asString(input.legalTermsAndConditions),
    },
    bookingNotes: asString(input.bookingNotes),
    interests: toStringArray(input.interests),
    seasonalTags: toStringArray(input.seasonalTags),
    categoryTags: toStringArray(input.categoryTags),
    bookingInfo: {
      instantBooking: asString(input.instantBooking, 'Yes'),
      manualApproval: asString(input.manualApproval, 'No'),
      confirmationProcess: asString(input.confirmationProcess),
    },
    locationInfo: {
      meetingInstructions: asString(input.meetingInstructions),
      googleMapsLink: asString(input.googleMapsLink),
      nearbyLandmarks: asString(input.nearbyLandmarks),
    },
    faqs: Array.isArray(input.faqs) ? (input.faqs as Array<{ question: string; answer: string }>) : [],
    tags: Array.from(new Set([...toStringArray(input.tags), ...toStringArray(input.categoryTags), asString(input.category), asString(input.experienceType)].filter(Boolean))),
    location: asString(input.location, `${asString(input.city)}${asString(input.region) ? `, ${asString(input.region)}` : ''}`),
    duration: asString(input.duration, asString(input.totalDuration)),
    image: coverPhoto,
    descriptionText: asString(input.descriptionText, description),
    price: asString(input.price, adultPrice),
    capacity: maxGuests,
    status: (asString(input.status, 'Draft') as ExperienceStatus) || 'Draft',
    bookings: 0,
    createdAt: new Date().toISOString(),
  };
}

export async function getExperiences(filters: ExperienceFilters = {}): Promise<Experience[]> {
  const experiences = listExperiences();
  return filterExperiences(experiences, filters).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function filterExperiences(experiences: Experience[], filters: ExperienceFilters = {}): Experience[] {
  return experiences.filter((experience) => {
    const search = filters.search?.trim().toLowerCase();
    if (search) {
      const haystack = `${experience.title} ${experience.category} ${experience.location} ${experience.description}`.toLowerCase();
      if (!haystack.includes(search)) {
        return false;
      }
    }
    if (filters.status && experience.status !== filters.status) {
      return false;
    }
    if (filters.location) {
      const locationValue = filters.location.trim().toLowerCase();
      if (!experience.location.toLowerCase().includes(locationValue)) {
        return false;
      }
    }
    if (typeof filters.minPrice === 'number' && filters.minPrice > 0) {
      const numericPrice = Number(experience.price.replace(/[^0-9.]/g, ''));
      if (Number.isFinite(numericPrice) && numericPrice < filters.minPrice) {
        return false;
      }
    }
    if (typeof filters.maxPrice === 'number' && filters.maxPrice > 0) {
      const numericPrice = Number(experience.price.replace(/[^0-9.]/g, ''));
      if (Number.isFinite(numericPrice) && numericPrice > filters.maxPrice) {
        return false;
      }
    }
    return true;
  });
}

export async function getExperienceById(id: string): Promise<Experience | null> {
  return getExperienceRecord(id);
}

export async function createExperience(input: Record<string, unknown>): Promise<Experience> {
  const experience = buildExperience(input);
  getDb().prepare('INSERT INTO experiences (id, data) VALUES (?, ?)').run(experience.id, JSON.stringify(experience));
  return experience;
}

export async function updateExperience(id: string, updates: Partial<Omit<Experience, 'id' | 'createdAt'>>): Promise<Experience | null> {
  const current = getExperienceRecord(id);
  if (!current) {
    return null;
  }
  const merged = { ...current, ...updates };
  const rebuilt = buildExperience(merged);
  const updated: Experience = {
    ...rebuilt,
    id: current.id,
    createdAt: current.createdAt,
    bookings: typeof merged.bookings === 'number' ? merged.bookings : current.bookings,
  };
  getDb().prepare('UPDATE experiences SET data = ? WHERE id = ?').run(JSON.stringify(updated), id);
  return updated;
}

export async function deleteExperience(id: string): Promise<boolean> {
  const result = getDb().prepare('DELETE FROM experiences WHERE id = ?').run(id);
  return result.changes > 0;
}

export async function getBookings(): Promise<Booking[]> {
  return listBookings().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function createBooking(input: Record<string, unknown>): Promise<Booking> {
  const experience = getExperienceRecord(asString(input.experienceId));
  const booking: Booking = {
    id: `booking-${Date.now()}`,
    travelerName: asString(input.travelerName),
    travelerEmail: asString(input.travelerEmail),
    travelerPhone: asString(input.travelerPhone),
    experienceId: asString(input.experienceId),
    experienceTitle: experience?.title ?? 'Custom experience',
    date: asString(input.date, new Date().toISOString().slice(0, 10)),
    amount: asString(input.amount, experience?.price || '$0'),
    paymentMethod: asString(input.paymentMethod, 'Card'),
    guestCount: asNumber(input.guestCount) ?? undefined,
    specialRequests: asString(input.specialRequests),
    note: asString(input.note),
    status: (asString(input.status, 'Pending') as BookingStatus) || 'Pending',
    userId: asString(input.userId),
    createdAt: new Date().toISOString(),
  };

  getDb().prepare('INSERT INTO bookings (id, data) VALUES (?, ?)').run(booking.id, JSON.stringify(booking));

  if (experience) {
    const updated = { ...experience, bookings: experience.bookings + 1 };
    getDb().prepare('UPDATE experiences SET data = ? WHERE id = ?').run(JSON.stringify(updated), experience.id);
  }

  return booking;
}

export async function updateBooking(id: string, input: Partial<Omit<Booking, 'id' | 'createdAt'>>): Promise<Booking | null> {
  const current = listBookings().find((booking) => booking.id === id);
  if (!current) {
    return null;
  }
  const updated = { ...current, ...input };
  getDb().prepare('UPDATE bookings SET data = ? WHERE id = ?').run(JSON.stringify(updated), id);
  return updated;
}

export async function deleteBooking(id: string): Promise<boolean> {
  const result = getDb().prepare('DELETE FROM bookings WHERE id = ?').run(id);
  return result.changes > 0;
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const row = getDb().prepare('SELECT id, email, password, name, role, createdAt FROM users WHERE email = ? AND password = ?').get(email, password) as User | undefined;
  return row ?? null;
}

export async function createUser(input: { email: string; password: string; name: string; role: 'admin' | 'traveler' }): Promise<User> {
  const existing = getDb().prepare('SELECT id FROM users WHERE email = ?').get(input.email.trim()) as { id: string } | undefined;
  if (existing) {
    throw new Error('User with this email already exists');
  }

  const user: User = {
    id: `user-${Date.now()}`,
    email: input.email.trim(),
    password: input.password,
    name: input.name.trim(),
    role: input.role,
    createdAt: new Date().toISOString(),
  };

  getDb().prepare('INSERT INTO users (id, email, password, name, role, createdAt) VALUES (?, ?, ?, ?, ?, ?)').run(user.id, user.email, user.password, user.name, user.role, user.createdAt);
  return user;
}

export async function getUserById(id: string): Promise<User | null> {
  const row = getDb().prepare('SELECT id, email, password, name, role, createdAt FROM users WHERE id = ?').get(id) as User | undefined;
  return row ?? null;
}

export async function getTravelers(): Promise<Traveler[]> {
  const users = listUsers().filter((user) => user.role === 'traveler');
  const bookings = listBookings();
  return users.map((user) => {
    const travelerBookings = bookings.filter((booking) => booking.travelerEmail === user.email);
    return {
      ...user,
      totalTrips: travelerBookings.length,
      lastBookingDate: travelerBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]?.date,
    };
  });
}

export async function getExperienceStats() {
  const experiences = listExperiences();
  const bookings = listBookings();
  const activeExperiences = experiences.filter((experience) => experience.status === 'Active');
  const latestExperience = [...experiences].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

  return {
    totalExperiences: experiences.length,
    activeExperiences: activeExperiences.length,
    totalBookings: bookings.length,
    latestExperience,
  };
}

export async function createReview(input: Record<string, unknown>): Promise<Review> {
  const review: Review = {
    id: `review-${Date.now()}`,
    experienceId: asString(input.experienceId),
    userId: asString(input.userId),
    userName: asString(input.userName),
    rating: Math.max(1, Math.min(5, asNumber(input.rating) ?? 5)),
    title: asString(input.title),
    comment: asString(input.comment),
    createdAt: new Date().toISOString(),
  };

  getDb().prepare('INSERT INTO reviews (id, experienceId, userId, userName, rating, title, comment, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').run(
    review.id,
    review.experienceId,
    review.userId,
    review.userName,
    review.rating,
    review.title,
    review.comment,
    review.createdAt,
  );

  return review;
}

export async function getReviewsForExperience(experienceId: string): Promise<Review[]> {
  return listReviewsForExperience(experienceId);
}

export async function getReviewSummary(experienceId: string): Promise<{ count: number; average: number }> {
  const reviews = listReviewsForExperience(experienceId);
  if (!reviews.length) {
    return { count: 0, average: 0 };
  }
  const average = reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;
  return { count: reviews.length, average };
}

export async function canUserReviewExperience(userId: string, experienceId: string): Promise<boolean> {
  if (!userId || !experienceId) {
    return false;
  }

  const existing = getDb().prepare('SELECT id FROM reviews WHERE experienceId = ? AND userId = ?').get(experienceId, userId) as { id: string } | undefined;
  if (existing) {
    return false;
  }

  const booking = getDb().prepare('SELECT data FROM bookings WHERE experienceId = ?').all(experienceId) as Array<{ data: string }>;
  return booking.some((row) => {
    const parsed = JSON.parse(row.data) as Booking;
    return parsed.userId === userId && ['Confirmed', 'Paid'].includes(parsed.status);
  });
}
