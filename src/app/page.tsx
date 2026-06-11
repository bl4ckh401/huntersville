'use client';

import HomeScrollExperience from '@/components/HomeScrollExperience';
import GlobalReach from '@/components/GlobalReach';
import FeaturedExperiences from '@/components/FeaturedExperiences';
import Testimonials from '@/components/Testimonials';
import Philosophy from '@/components/Philosophy';

export default function Home() {
  return (
    <main>
      <HomeScrollExperience />

      {/* Sections that appear after the immersive journey */}
      <div className="bg-surface">
        <Philosophy />
        <FeaturedExperiences />
        <GlobalReach />
        <Testimonials />
      </div>
    </main>
  );
}
