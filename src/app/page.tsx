'use client';

import { useEffect } from 'react';
import Hero from '@/components/Hero';
import Philosophy from '@/components/Philosophy';
import Categories from '@/components/Categories';
import GlobalReach from '@/components/GlobalReach';
import FeaturedExperiences from '@/components/FeaturedExperiences';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.scroll-reveal');

    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      const elementVisible = 150;

      reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
          reveal.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Initial trigger
    revealOnScroll();

    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);

  return (
    <main>
      <Hero />
      <Philosophy />
      <Categories />
      <GlobalReach />
      <FeaturedExperiences />
      <Testimonials />
    </main>
  );
}
