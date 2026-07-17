import type { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import HuntersVilleWay from '@/components/about/HuntersVilleWay';
import MissionVision from '@/components/about/MissionVision';
import MeetTheExplorers from '@/components/about/MeetTheExplorers';
import ImpactNumbers from '@/components/about/ImpactNumbers';
import CoreValues from '@/components/about/CoreValues';
import ReadyToExplore from '@/components/about/ReadyToExplore';

export const metadata: Metadata = {
  title: 'About Us - HuntersVilleTours',
  description: 'Learn about our legacy, philosophy, and commitment to sustainable luxury travel across East Africa.',
};

export default function AboutPage() {
  return (
    <div className="mb-16 md:mb-0">
      <AboutHero />
      <HuntersVilleWay />
      <MissionVision />
      <MeetTheExplorers />
      <ImpactNumbers />
      <CoreValues />
      <ReadyToExplore />
    </div>
  );
}
