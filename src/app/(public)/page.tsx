// src/app/page.tsx

import HomeScrollExperience from '@/components/HomeScrollExperience';
import GlobalReach from '@/components/GlobalReach';
import FeaturedScrollExperience from '@/components/FeaturedScrollExperience';
import Testimonials from '@/components/Testimonials';
import Philosophy from '@/components/Philosophy';
import { getExperiences } from '@/lib/content-store';

export default async function Home() {
  const allExperiences = await getExperiences();
  
  // Only restrict the featured section
  const featuredExperiences = allExperiences.slice(0, 3);

  return (
    <main>
      <HomeScrollExperience />

      <div className="bg-surface">
        <Philosophy />
        
        {/* Pass the restricted array here */}
        <FeaturedScrollExperience experiences={featuredExperiences} />
        
        {/* A tiny physical spacer prevents GSAP pin thresholds from touching and colliding */}
        <div className="h-32 w-full bg-background" />

        {/* Pass the FULL array here so the cinematic chapters actually work */}
        <GlobalReach experiences={allExperiences} />
        
        <Testimonials />
      </div>
    </main>
  );
}