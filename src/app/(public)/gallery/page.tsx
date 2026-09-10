import type { Metadata } from 'next';
import GalleryClient from '@/components/gallery/GalleryClient';

export const metadata: Metadata = {
  title: 'The Expedition Archives & Visual Gallery | HuntersVilleTours',
  description: 'Explore the raw majesty of our expeditions through uncompressed photography and field journals across the Mara, Amboseli, Samburu, and beyond.',
};

export default function GalleryPage() {
  return <GalleryClient />;
}
