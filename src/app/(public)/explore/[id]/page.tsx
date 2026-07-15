import Breadcrumbs from '@/components/explore/details/Breadcrumbs';
import ImageGallery from '@/components/explore/details/ImageGallery';
import TourHeader from '@/components/explore/details/TourHeader';
import IncludedFeatures from '@/components/explore/details/IncludedFeatures';
import ItineraryTimeline from '@/components/explore/details/ItineraryTimeline';
import Reviews from '@/components/explore/details/Reviews';
import BookingSidebar from '@/components/explore/details/BookingSidebar';
import { getExperienceById, getReviewSummary, getReviewsForExperience } from '@/lib/content-store';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'HuntersVilleTours - Safari Expedition Details',
  description: 'Detailed view of our premium travel experiences.',
};

export default async function TourDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const experience = await getExperienceById(id);

  if (!experience) {
    notFound();
  }

  const [reviewSummary, reviews] = await Promise.all([getReviewSummary(id), getReviewsForExperience(id)]);

  const tour = {
    id: experience.id,
    title: experience.title,
    category: experience.category,
    location: experience.location,
    rating: reviewSummary.average ? reviewSummary.average.toFixed(1) : '5.0',
    reviewsCount: reviewSummary.count || Math.max(1, experience.bookings),
    duration: experience.duration,
    price: experience.price,
    overview: experience.summary || experience.description,
    tagline: experience.tagline || experience.summary || experience.description,
    description: experience.description,
    highlights: experience.highlights || [],
    included: experience.included || [],
    itinerary: experience.itinerary || [],
    requirements: experience.requirements || [],
    whatToBring: experience.whatToBring || [],
    safety: experience.safety || [],
    details: [
      { label: 'Experience type', value: experience.experienceType || 'Private' },
      { label: 'Destination', value: `${experience.destination || 'East Africa'} • ${experience.city || ''}`.trim() },
      { label: 'Languages', value: (experience.languages || []).join(', ') },
      { label: 'Best time', value: experience.bestTimeToVisit || 'Year-round' },
    ],
    images: [
      { src: experience.coverPhoto || experience.image || 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80', alt: experience.title },
      ...(experience.galleryImages || []).slice(0, 2).map((image) => ({ src: image, alt: experience.title })),
    ],
  };

  return (
    <main className="pt-[80px] pb-xl px-gutter mb-20 md:mb-0">
      <div className="py-4">
        <Breadcrumbs title={tour.title} />
      </div>

      <ImageGallery images={tour.images} />

      {/* On mobile: sidebar appears first as a compact strip, then details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">

        {/* Left Column: Full details */}
        <div className="lg:col-span-8 order-2 lg:order-1">
          <TourHeader
            title={tour.title}
            category={tour.category}
            location={tour.location}
            rating={tour.rating}
            reviewsCount={tour.reviewsCount}
            duration={tour.duration}
            overview={tour.overview}
            tagline={tour.tagline}
            details={tour.details}
          />
          <IncludedFeatures items={tour.included} />
          <ItineraryTimeline itinerary={tour.itinerary} />
          <Reviews reviewsCount={tour.reviewsCount} highlights={tour.highlights} reviews={reviews} experienceId={tour.id} />
        </div>

        {/* Right Column: Booking Sidebar */}
        <div className="lg:col-span-4 order-1 lg:order-2">
          <BookingSidebar experienceId={tour.id} price={tour.price} />
        </div>

      </div>
    </main>
  );
}
