import Breadcrumbs from '@/components/explore/details/Breadcrumbs';
import ImageGallery from '@/components/explore/details/ImageGallery';
import ExperienceDetails from '@/components/explore/details/ExperienceDetails';
import BookingSidebar from '@/components/explore/details/BookingSidebar';
import { getExperienceById, getReviewSummary, getReviewsForExperience } from '@/lib/content-store';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const experience = await getExperienceById(id);

  if (!experience) {
    return { title: 'HuntersVilleTours - Experience' };
  }

  const stripped = (experience.summary || experience.description || '').replace(/<[^>]*>/g, '').trim();

  return {
    title: `HuntersVilleTours - ${experience.title}`,
    description: stripped.slice(0, 160) || 'Detailed view of our premium travel experiences.',
  };
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80';

export default async function TourDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const experience = await getExperienceById(id);

  if (!experience) {
    notFound();
  }

  const [reviewSummary, reviews] = await Promise.all([getReviewSummary(id), getReviewsForExperience(id)]);
  const reviewsCount = reviewSummary.count || Math.max(1, experience.bookings);

  const images = Array.from(
    new Set(
      [experience.coverPhoto || experience.image, ...(experience.galleryImages || [])]
        .map((src) => (src || '').trim())
        .filter(Boolean),
    ),
  ).map((src) => ({ src, alt: experience.title }));

  if (!images.length) {
    images.push({ src: FALLBACK_IMAGE, alt: experience.title });
  }

  const quickFacts = [
    { icon: 'schedule', label: 'Duration', value: experience.durationDetails.totalDuration || experience.duration },
    { icon: 'groups', label: 'Type', value: experience.experienceType },
    {
      icon: 'group',
      label: 'Group size',
      value: [experience.groupDetails.minimumGuests, experience.groupDetails.maximumGuests].filter(Boolean).join('–'),
    },
    { icon: 'translate', label: 'Languages', value: (experience.languages || []).join(', ') },
  ].filter((fact) => fact.value && fact.value.trim());

  return (
    <main className="pt-[80px] pb-xl px-gutter mb-20 md:mb-0">
      <div className="py-4">
        <Breadcrumbs title={experience.title} />
      </div>

      <ImageGallery images={images} />

      <div className="grid grid-cols-1 gap-lg lg:grid-cols-12 md:px-gutter">
        {/* Details: first on every screen */}
        <div className="min-w-0 lg:col-span-8">
          <ExperienceDetails
            experience={experience}
            reviews={reviews}
            average={reviewSummary.average}
            reviewsCount={reviewsCount}
          />
        </div>

        {/* Booking: last on mobile, sticky beside details on desktop */}
        <div className="lg:col-span-4">
          <BookingSidebar
            experienceId={experience.id}
            price={experience.price}
            pricing={experience.pricing}
            quickFacts={quickFacts}
            instantBooking={experience.bookingInfo.instantBooking?.toLowerCase() === 'yes'}
          />
        </div>
      </div>
    </main>
  );
}
