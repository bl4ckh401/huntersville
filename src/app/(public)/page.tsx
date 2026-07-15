import HomeScrollExperience from '@/components/HomeScrollExperience';
import GlobalReach from '@/components/GlobalReach';
import FeaturedExperiences from '@/components/FeaturedExperiences';
import Testimonials from '@/components/Testimonials';
import Philosophy from '@/components/Philosophy';
import { getExperiences } from '@/lib/content-store';

export default async function Home() {
  const experiences = (await getExperiences()).slice(0, 3);

  return (
    <main>
      <HomeScrollExperience />

      {/* Sections that appear after the immersive journey */}
      <div className="bg-surface">
        <Philosophy />
        <FeaturedExperiences experiences={experiences} />
        <GlobalReach />
        <Testimonials />
      </div>
    </main>
  );
}
