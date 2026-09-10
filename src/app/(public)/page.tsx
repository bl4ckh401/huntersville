// src/app/page.tsx

import HomeScrollExperience from '@/components/HomeScrollExperience';
import GlobalReach from '@/components/GlobalReach';
import FeaturedScrollExperience from '@/components/FeaturedScrollExperience';
import Testimonials from '@/components/Testimonials';
import Philosophy from '@/components/Philosophy';
import CompanyShowcase from '@/components/CompanyShowcase';
import { getExperiences, getReviews } from '@/lib/content-store';

export default async function Home() {
  const allExperiences = await getExperiences();
  const reviews = await getReviews();

  const featuredExperiences = allExperiences.slice(0, 3);

  return (
    <main>
      <HomeScrollExperience />

      <div className="bg-surface">
        <Philosophy />

        <CompanyShowcase />

        <div className="h-6 w-full bg-background md:h-12" />
        
        <FeaturedScrollExperience experiences={featuredExperiences} />

        <GlobalReach experiences={allExperiences} />

        <div className="h-8 w-full bg-background md:h-16" />

        <Testimonials reviews={reviews} />
      </div>
    </main>
  );
}