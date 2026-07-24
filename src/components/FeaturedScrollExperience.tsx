'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import type { Experience } from '@/lib/content-store';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedScrollExperience({ experiences }: { experiences: Experience[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const featured = experiences.slice(0, 3);

  useEffect(() => {
    if (!sectionRef.current || !pinRef.current || featured.length === 0) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLDivElement>('.exp-panel');
      const globalProgress = gsap.utils.toArray<HTMLSpanElement>('.global-prog-item');
      const scrollHint = document.querySelector('.scroll-hint');
      const sectionHeader = document.querySelector('.section-header');

      // 1. Calculate absolute total assets across the array to scale the timeline length dynamically
      const totalImagesCount = featured.reduce((acc, exp) => {
        const count = [exp.coverPhoto || exp.image, ...(exp.galleryImages || [])].filter(Boolean).length;
        return acc + (count > 0 ? count : 1);
      }, 0);

      // Allocating a massive 4,000px of physical vertical scroll height per asset
      const totalScrollDistance = totalImagesCount * 4000;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalScrollDistance}px`,
          scrub: 2.2,
          pin: pinRef.current,
          anticipatePin: 1,
          refreshPriority: 10, // <--- 1. TELLS GSAP TO CALCULATE THIS FIRST
          snap: {
            snapTo: 'labels',
            duration: { min: 0.8, max: 1.5 },
            delay: 0.02,
            ease: 'power3.inOut',
          },
        },
      });

      // Dissolve introductory elements instantly upon scroll initialization
      if (scrollHint) {
        tl.to(scrollHint, { opacity: 0, y: 20, duration: 0.5 }, 0);
      }
      if (sectionHeader) {
        tl.to(sectionHeader, { opacity: 0, y: -25, duration: 0.6, ease: 'power2.inOut' }, 0);
      }

      panels.forEach((panel, pIndex) => {
        const card = panel.querySelector('.exp-card');
        const images = gsap.utils.toArray<HTMLDivElement>(panel.querySelectorAll('.exp-img'));
        const dots = gsap.utils.toArray<HTMLDivElement>(panel.querySelectorAll('.gallery-dot'));
        const texts = gsap.utils.toArray<HTMLElement>(panel.querySelectorAll('.reveal-text'));

        gsap.set(panel, { zIndex: panels.length - pIndex });
        if (pIndex > 0) {
          gsap.set(panel, { opacity: 0 });
        }

        // Elegant floating frame boundaries (clears top/bottom header views perfectly)
        gsap.set(card, {
          width: '82vw',
          height: '58vh', // Adjusted to balance perfectly with the introduction text frame space
          borderRadius: '24px',
          transformOrigin: 'center center',
        });

        // Set initial asset rendering constraints
        gsap.set(images, { opacity: 0, scale: 1.04, filter: 'blur(8px)' });
        gsap.set(images[0], { opacity: 1, filter: 'blur(0px)' });
        gsap.set(texts, { opacity: 0, y: 40 });
        gsap.set(dots, { opacity: 0.2 });
        if (dots[0]) gsap.set(dots[0], { opacity: 1 });

        if (pIndex > 0) {
          tl.to(panel, { opacity: 1, duration: 2 });
        }

        tl.addLabel(`start-exp-${pIndex}`);

        tl.to(globalProgress, { opacity: 0.2, duration: 0.8 }, '<');
        tl.to(globalProgress[pIndex], { opacity: 1, duration: 0.8 }, '<');

        // 2. Slow Unhurried Card Expansion
        tl.to(card, {
          width: '94vw',
          height: '76vh',
          borderRadius: '24px',
          duration: 4, // Stretched expansion duration
          ease: 'power2.inOut',
        });

        // Typography glides in gracefully mid-way through expansion
        tl.to(texts, {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 2.5,
          ease: 'power3.out',
        }, '<+=1.5');

        tl.addLabel(`expanded-exp-${pIndex}`);

        // 3. Immersive Image & Story Cycle (Text stays visible over all images)
        images.forEach((img, iIndex) => {
          const isLastImg = iIndex === images.length - 1;

          // Extended duration for the Ken Burns scaling so it crawls imperceptibly
          tl.to(img, { scale: 1.15, duration: 8, ease: 'none' }, `img-${pIndex}-${iIndex}`);

          if (!isLastImg) {
            // Highly padded crossfade that allows the viewer to absorb the current frame
            tl.to(img, { opacity: 0, filter: 'blur(12px)', duration: 3 }, `img-${pIndex}-${iIndex}+=4.5`);
            tl.to(images[iIndex + 1], { opacity: 1, filter: 'blur(0px)', duration: 3 }, '<');

            if (dots[iIndex]) tl.to(dots[iIndex], { opacity: 0.2, duration: 0.8 }, '<');
            if (dots[iIndex + 1]) tl.to(dots[iIndex + 1], { opacity: 1, duration: 0.8 }, '<');
          } else {
            // Generous text-reading static duration buffer at the final image step
            tl.to({}, { duration: 4 });
          }
        });

        // 4. Slow Editorial Transition out back to Card State
        tl.addLabel(`exit-exp-${pIndex}`);

        tl.to(texts, {
          opacity: 0,
          y: -30,
          stagger: 0.1,
          duration: 2,
          ease: 'power2.in',
        });

        tl.to(card, {
          width: '82vw',
          height: '58vh',
          borderRadius: '24px',
          duration: 4,
          ease: 'power2.inOut',
        }, '<+=0.4');

        if (pIndex < featured.length - 1) {
          tl.to(panel, { opacity: 0, duration: 2 });
        }
      });

    }, sectionRef);

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeout);
      ctx.revert();
    };
  }, [featured]);

  return (
    <section ref={sectionRef} className="relative w-full bg-background">

      {/*
        FIX: this pinned viewport had NO opaque background. Once GSAP pins
        it, it becomes `position: fixed`, and fixed/positioned elements
        always paint ABOVE normal static-flow content in the same stacking
        context — regardless of DOM order. Since the only opaque pixels in
        here were the 82vw x 58vh `.exp-card`, every other pixel (the
        letterboxed margins around the card) was transparent for the
        ENTIRE time this section stayed pinned, letting whatever was
        actually scrolled to that screen position (Philosophy) show
        straight through underneath. `bg-background` matches the same
        pattern already used by GlobalReach's pinRef and by
        Coastal/SavannahTimeline's pinned <section> elements.
      */}
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden text-white pt-[72px] flex items-center justify-center bg-background">

        {/* Editorial Section context header — positioned under the navbar gap */}
        <div className="section-header absolute top-[100px] left-10 md:left-24 z-50 mix-blend-difference pointer-events-none">
          <h2 className=" tracking-[0.35em] font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-md">
            Featured Experiences
          </h2>
        </div>

        {/* Global Progress Indicators */}
        <div className="absolute left-6 md:left-10 top-[calc(52%+36px)] -translate-y-1/2 z-50 flex flex-col items-center gap-6 font-mono text-xs tracking-widest mix-blend-difference">
          {featured.map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-6">
              <span className="global-prog-item opacity-20 transition-opacity duration-500">0{i + 1}</span>
              {i < featured.length - 1 && <div className="w-[1px] h-12 bg-white/20" />}
            </div>
          ))}
        </div>

        {/* Action Call Scroll Tracker */}
        <div className="scroll-hint absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/50">
          <span className="material-symbols-outlined animate-bounce text-[16px]">arrow_downward</span>
          <span>Scroll to Explore</span>
        </div>

        {/* Render Layer Blocks */}
        <div className="absolute inset-0 w-full h-full pt-[72px] flex items-center justify-center">
          {featured.map((experience, index) => {
            const images = [
              experience.coverPhoto || experience.image,
              ...(experience.galleryImages || []),
            ].filter(Boolean);

            const fallback = 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80';
            const displayImages = images.length > 0 ? images : [fallback];

            return (
              <div key={experience.id} className="exp-panel absolute inset-0 w-full h-full pt-[72px] flex items-center justify-center bg-transparent">

                {/* The Morphing Card container wrapper */}
                <div className="exp-card relative shadow-2xl overflow-hidden bg-neutral-900">

                  {/* Dynamic Asset Views Stack */}
                  <div className="absolute inset-0 z-0">
                    {displayImages.map((src, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="exp-img absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${src}')` }}
                      />
                    ))}
                  </div>

                  {/* Contrast Gradients protecting layout accessibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 mix-blend-multiply z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-10" />

                  {/* Editorial Text Decks */}
                  <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12 md:pb-16 px-10 md:px-20 max-w-[1400px] mx-auto w-full">
                    <div className="max-w-3xl">

                      <div className="reveal-text flex items-center gap-2 text-white/70 font-mono text-xs uppercase tracking-widest mb-4">
                        <span className="material-symbols-outlined text-[16px] text-white/80">location_on</span>
                        {experience.location}
                        <span className="w-1 h-1 bg-white/30 rounded-full mx-1" />
                        <span className="material-symbols-outlined text-[16px] text-white/80">schedule</span>
                        {experience.duration}
                      </div>

                      <h3 className="reveal-text font-serif text-3xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5 text-white tracking-tight drop-shadow-md">
                        {experience.title}
                      </h3>

                      <p className="reveal-text font-normal text-sm sm:text-base md:text-lg text-white/75 mb-6 max-w-2xl leading-relaxed line-clamp-2">
                        {experience.summary || experience.description}
                      </p>

                      <div className="reveal-text flex flex-wrap items-center gap-4 sm:gap-6">
                        <span className="border border-white/20 bg-white/5 backdrop-blur-md text-white px-4 py-1.5 rounded-full font-mono text-[11px] tracking-wider uppercase">
                          {experience.category}
                        </span>
                        <span className="font-mono text-xl text-white font-semibold tracking-tight">
                          {experience.price}
                        </span>
                        <Link
                          href={`/explore/${experience.id}`}
                          className="ml-auto sm:ml-6 flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-neutral-200 transition-colors shadow-lg"
                        >
                          Explore
                          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </Link>
                      </div>

                    </div>
                  </div>

                  {/* Slide Bullet Array (Bottom Right) */}
                  {displayImages.length > 1 && (
                    <div className="absolute right-10 md:right-20 bottom-12 md:bottom-16 z-30 flex items-center gap-2.5 mix-blend-difference">
                      {displayImages.map((_, i) => (
                        <div key={i} className="gallery-dot w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                      ))}
                    </div>
                  )}

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}