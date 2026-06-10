import Breadcrumbs from '@/components/explore/details/Breadcrumbs';
import ImageGallery from '@/components/explore/details/ImageGallery';
import TourHeader from '@/components/explore/details/TourHeader';
import IncludedFeatures from '@/components/explore/details/IncludedFeatures';
import ItineraryTimeline from '@/components/explore/details/ItineraryTimeline';
import Reviews from '@/components/explore/details/Reviews';
import BookingSidebar from '@/components/explore/details/BookingSidebar';
import React from 'react';

export const metadata = {
  title: 'HuntersVilleTours - Safari Expedition Details',
  description: 'Detailed view of our premium travel experiences.',
};

export default function TourDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  const tour = {
    id,
    title: 'The Great Serengeti Migration & Crater Explorer',
    category: 'Wildlife Expedition',
    location: 'Tanzania, East Africa',
    rating: '4.8',
    reviewsCount: 124,
    duration: '7 Days',
    price: '$3,450',
    overview: "Embark on a curated, high-end expedition tracking the legendary Great Migration across the sweeping plains of the Serengeti. This modular journey is designed for the adventurous traveler seeking unparalleled wildlife encounters without compromising on comfort. From guided game drives led by expert naturalists to evenings spent in premium, eco-conscious canvas lodges under the African stars, every detail is engineered to inspire.",
    images: [
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfVoneE1SUfVj2ZpIjp63EVTkGFUmCxNZduUk1uAtx2CLADzo0XuWaT3ah6e59hCmzKp6sSlG5PMtLJLAQHej6ltd4cqL9hCbkQ29oFs2LFq4DTDOiizVpW9OI8KAHD4KIq1tnvNXXzDHKAFY1bz6d52F_B7LqH5YonXm1HYcvaSdkpdPBjWs4b01g13_Q2Q05pg1mjE1oZ9D4aQbdT1kjyDd7lV8FpQzqzg_hCKOTDQVi40IMsX3ChqRqP5Efgr80PD0_K4-y', alt: 'African savanna at golden hour with elephants' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD34ECo2PoBBpMuGl6cAV3QrsTahdcUaxETir_Bt6KUrlUMfhoUvNgTceruvbZNS0ywmjlnXuBsuP9bYdgfWlRDVCg-_zu9Xg74X5N_fnMMm3gBE1OBqWr_ehZ2dwL_FQKHMkPn3Wmz8FT_U6Zmx4epnAPzv5dIbsP11e8Z_JsoDWPGv2GTm9n36LGtCeiuErwoZd3pPEQrtc5Nk2IZOD1lDLuFmndC7y1JhVM4KWartVDIoWtW2McoHYsCkFYwjch98Jltw_hs', alt: 'Luxury safari tented camp interior' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPd6bQ1KPuxeu-rGQu2w7f7asa8RfFjbLOvWq1P7tFhADeBUD-19fiHdNE5kk-9ABLo-lZOUfasA-_aHWatXrTCyuPjoLMXD4jYHfU6N6DWm_A3wMzfXxpTXtlgKuH-5oaGVSg6m8fUVtNg5JppwbeOdXNppdWABTOcabL4AxYJE5IkEbUZ5IJ8O0FrUYHxbK7-1ouhd43dp5hUkZrMQ7gLBm1c8lUuFeVE_VD4zeMVt5RcpofJ6KG6Tk2xonxFEAU_AAnksms', alt: 'Safari 4x4 vehicle on dusty trail' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIfv-rRS_KKt2nc_Rv9C8eXa5e8xt4WmmQWsHJm0ptiI-HedRV-JQWv04iyy_MRElzhGdMJJ-iWTyMC2OXXphFdd3cQqOcg1l0PxNNRBWQtou5dqeAfKE7ZqttB3yDocmfhHJ4wYDPxFT-DCipA8hm-CSzpfYvurIasgLEW8qfthiCFV-ssA3top9N9_94f1NEUXb72W_b4LMz79b7d874B8pe83yINC6x8-Y83bmQ1aSwfYsHTI1ub8ZHZUMi-dA83LjNCfDk', alt: 'Serengeti plains under clear blue sky' }
    ]
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
          />
          <IncludedFeatures />
          <ItineraryTimeline />
          <Reviews reviewsCount={tour.reviewsCount} />
        </div>

        {/* Right Column: Booking Sidebar */}
        <div className="lg:col-span-4 order-1 lg:order-2">
          <BookingSidebar price={tour.price} />
        </div>

      </div>
    </main>
  );
}
