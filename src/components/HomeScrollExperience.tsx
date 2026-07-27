'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SavannahTimeline from '@/components/SavannahTimeline';
import CoastalTimeline from '@/components/CoastalTimeline';

gsap.registerPlugin(ScrollTrigger);

function HeroContent() {
  return (
    <div className="hero-content absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-8">
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-gutter max-w-container-max mx-auto w-full pt-20">
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-white mb-md drop-shadow-md max-w-4xl animate-fade-in-up opacity-0">
          Crafting Unforgettable Journeys Across the Cradle of Humanity.
        </h1>
        <p className="font-body-lg text-body-lg text-white/90 mb-lg max-w-2xl drop-shadow animate-fade-in-up delay-100 opacity-0">
          Discover, customize, and book premium travel experiences across the globe. From coastal retreats to wildlife safaris.
        </p>
        {/* Search Bar */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-full p-1.5 md:p-2 flex items-center w-full max-w-2xl shadow-2xl transition-all duration-300 hover:bg-white/20 animate-fade-in-up delay-200 opacity-0">
          <span className="material-symbols-outlined text-white/70 pl-2 md:pl-4 pr-1 md:pr-2 shrink-0">location_on</span>
          <input
            className="flex-grow min-w-0 bg-transparent border-none focus:ring-0 text-white font-body-md text-body-md placeholder:text-white/70 py-2 md:py-3 outline-none"
            placeholder="Where to?"
            type="text"
          />
          <button className="shrink-0 bg-primary text-on-primary rounded-full px-4 py-2 md:px-8 md:py-3 font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-lg hover:scale-105 active:scale-95 flex items-center gap-1 md:gap-2">
            <span>Search</span>
            <span className="material-symbols-outlined text-[16px] md:text-[18px]">arrow_forward</span>
          </button>
        </div>

      </div>

      {/* Scroll cue */}
      <div className="hero-scroll-cue absolute bottom-10 flex flex-col items-center gap-2">
        <span className="font-label-sm uppercase tracking-[0.3em] text-white/50 text-[10px]">Scroll Down</span>
        <div className="w-px h-16 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
      </div>
    </div>
  );
}

export default function HomeScrollExperience() {
  useEffect(() => {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    const tl = gsap.timeline();
    tl.from(heroContent, {
      opacity: 0,
      y: 30,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.3,
    });
  }, []);

  return (
    <div className="relative bg-background">
      {/* Hero Section - Stunning, premium full-resolution image background, clean layout without the green shade */}
      <section className="relative h-screen w-full overflow-hidden bg-[#070b0e]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90 transition-all duration-700"
          style={{ backgroundImage: "url('/safarihouse.png')" }}
        />
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b0e]/40 via-[#070b0e]/30 to-[#070b0e] z-10" />
        <HeroContent />
      </section>

      {/* Timelines Container */}
      <div className="relative z-10">
        <SavannahTimeline />

        {/*
          Spacer between two adjacent PINNED sections. Without this, the
          CoastalTimeline's ScrollTrigger ('top top') sits flush against the
          bottom edge of SavannahTimeline's pinned area. GSAP can then fire
          Coastal's pin a moment early (fast scroll / rounding / a refresh
          mid-transition), and since the incoming pinned section becomes
          `position: fixed` and covers the full viewport, it visibly
          overlaps the outgoing one for a moment. Same class of bug as the
          Philosophy/FeaturedScrollExperience collision — always give
          adjacent pinned sections a breather.
        */}
        {/* <div className="h-32 w-full bg-[#010d18]" /> */}

        <CoastalTimeline />
      </div>

      {/*
        Trailing spacer: CoastalTimeline is the LAST pinned section inside
        this component, and whatever renders right after
        <HomeScrollExperience /> in page.tsx (Philosophy) needs the same
        breathing room. Keep this here so the boundary is guaranteed no
        matter what page.tsx does around this component.
      */}
      <div className="h-32 w-full bg-background" />
    </div>
  );
}