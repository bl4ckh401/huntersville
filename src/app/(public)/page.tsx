// src/app/page.tsx

import HomeScrollExperience from '@/components/HomeScrollExperience';
import GlobalReach from '@/components/GlobalReach';
import FeaturedScrollExperience from '@/components/FeaturedScrollExperience';
import Testimonials from '@/components/Testimonials';
import Philosophy from '@/components/Philosophy';
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

        <div className="h-32 w-full bg-background" />
        
        <FeaturedScrollExperience experiences={featuredExperiences} />

        <GlobalReach experiences={allExperiences} />

        <div className="h-16 w-full bg-background" />

        <Testimonials reviews={reviews} />
      </div>
    </main>
  );
}