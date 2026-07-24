'use client';

import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import type { Experience } from '@/lib/content-store';

gsap.registerPlugin(ScrollTrigger);

interface GlobalReachProps {
  experiences?: Experience[];
}

// Fallback dictionary for dynamic destination styling
const DESTINATION_META: Record<string, { color: string; desc: string }> = {
  'Kenya': { color: '#10b981', desc: 'The land of endless savannahs, towering mountains, and unforgettable wildlife.' },
  'Tanzania': { color: '#fbbf24', desc: 'Where the great migration echoes across the Serengeti plains.' },
  'Uganda': { color: '#ea580c', desc: 'The pearl of Africa, home to mist-shrouded forests and mountain gorillas.' },
  'Rwanda': { color: '#38bdf8', desc: 'A breathtaking tapestry of rolling hills and profound resilience.' },
};

/**
 * Deterministic scene selection — same result on the server render and the
 * client hydration pass. The old code used `.sort(() => 0.5 - Math.random())`,
 * which produces a DIFFERENT order every render, causing a React hydration
 * mismatch (server HTML != client HTML) and a forced remount of this
 * component right as the page loads — which was retriggering the whole
 * GSAP/ScrollTrigger setup at an unpredictable moment.
 */
function pickStableScenes<T extends { id: string | number }>(items: T[], count: number): T[] {
  return [...items].sort((a, b) => String(a.id).localeCompare(String(b.id))).slice(0, count);
}

export default function GlobalReach({ experiences = [] }: GlobalReachProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  // 1. Dynamically Derive Chapters from Real Data
  const journeyChapters = useMemo(() => {
    const destMap = new Map<string, Experience[]>();

    experiences.forEach(exp => {
      if (!exp) return;
      const dest = exp.destination?.trim() || 'East Africa';
      if (!destMap.has(dest)) destMap.set(dest, []);
      destMap.get(dest)!.push(exp);
    });

    const chapters = Array.from(destMap.entries()).map(([dest, exps]) => {
      const selectedScenes = pickStableScenes(exps, 3);
      const meta = DESTINATION_META[dest] || {
        color: '#a8a29e',
        desc: 'Discover breathtaking landscapes and untamed wilderness.'
      };

      return {
        name: dest,
        ...meta,
        scenes: selectedScenes,
      };
    });

    // Limit to 4 dynamic chapters for pacing
    return chapters.slice(0, 4);
  }, [experiences]);

  useEffect(() => {
    if (!sectionRef.current || !pinRef.current || journeyChapters.length === 0) return;

    const ctx = gsap.context(() => {
      // Scope every query to this section — avoids ever touching another
      // instance's `.scene-text` / `.nav-pill` / etc, and keeps cleanup
      // automatic when ctx.revert() runs.
      const q = gsap.utils.selector(sectionRef);

      // Build the timeline UNATTACHED to any ScrollTrigger first. Once it's
      // fully built we can ask it its real duration and size the pinned
      // scroll distance off of THAT — instead of a hand-maintained estimate
      // that silently drifts out of sync with the timeline (which is what
      // was causing the "frozen" dead-scroll patches at the start and end).
      const masterTimeline = gsap.timeline({ paused: true });

      // UI Selectors
      const navPills = q('.nav-pill');
      const progressFills = q('.progress-fill');
      const mapDot = q('.map-active-dot')[0] as HTMLDivElement;
      const mapChecks = q('.nav-check');

      // Rest States
      gsap.set(q('.chapter-intro'), { opacity: 0 });
      gsap.set(q('.scene-layer'), { opacity: 0 });
      gsap.set(q('.scene-text'), { opacity: 0, y: 30 });
      gsap.set(q('.interlude-screen'), { opacity: 0 });
      gsap.set(q('.outro-screen'), { opacity: 0 });
      gsap.set(progressFills, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(navPills, { width: '90px', padding: '4px 12px', opacity: 0.4 });
      gsap.set(mapChecks, { opacity: 0, scale: 0 });

      // First intro screen visibly ready
      gsap.set(q('.chapter-intro-0'), { opacity: 1 });

      let currentTime = 0;

      journeyChapters.forEach((chapter, cIdx) => {
        const chapterStart = currentTime;

        // 1. Dynamic Map & Pill Morphing
        const dotY = cIdx * (100 / Math.max(journeyChapters.length - 1, 1));
        masterTimeline.to(mapDot, { top: `${dotY}%`, duration: 1.5, ease: 'power2.inOut' }, currentTime);

        // Shrink previous, Checkmark on
        if (cIdx > 0) {
          masterTimeline.to(navPills[cIdx - 1], { width: '90px', padding: '4px 12px', opacity: 0.6, duration: 1.5, ease: 'power2.inOut' }, currentTime);
          masterTimeline.to(mapChecks[cIdx - 1], { opacity: 1, scale: 1, duration: 1, ease: 'back.out' }, currentTime);
        }

        // Expand current active pill
        masterTimeline.to(navPills[cIdx], { width: '240px', padding: '4px 24px', opacity: 1, duration: 1.5, ease: 'power2.inOut' }, currentTime);
        masterTimeline.to(q(`.nav-text-${cIdx}`), { letterSpacing: '0.2em', fontWeight: 700, duration: 1.5 }, currentTime);

        // 2. Chapter Cinematic Intro (Dissolves)
        if (cIdx > 0) {
          masterTimeline.to(q(`.chapter-intro-${cIdx}`), { opacity: 1, duration: 1.5 }, currentTime);
          currentTime += 1.5;
        }
        currentTime += 1.5; // Hold intro
        masterTimeline.to(q(`.chapter-intro-${cIdx}`), { opacity: 0, duration: 1.5 }, currentTime);

        // Dissolve into first scene edge-to-edge
        masterTimeline.to(q(`.scene-r${cIdx}-s0`), { opacity: 1, duration: 1.5 }, currentTime);
        currentTime += 1.5;

        // 3. Journey Scenes (Based on Image Counts)
        chapter.scenes.forEach((scene, sIdx) => {
          const panelClass = `.scene-r${cIdx}-s${sIdx}`;
          const images = q(`${panelClass} .scene-img`);
          const textGroup = q(`${panelClass} .scene-text`)[0];

          // Text Fades In Over Active Image
          masterTimeline.to(textGroup, { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }, currentTime);

          images.forEach((img, imgIdx) => {
            // Ambient Scale across exactly 4 seconds
            masterTimeline.to(img, { scale: 1.15, duration: 4, ease: 'none' }, currentTime);

            if (imgIdx < images.length - 1) {
              // Crossfade to next image in gallery
              masterTimeline.to(img, { opacity: 0, duration: 1.5 }, currentTime + 2.5);
              masterTimeline.to(images[imgIdx + 1], { opacity: 1, duration: 1.5 }, currentTime + 2.5);
              currentTime += 4;
            } else {
              currentTime += 4;
            }
          });

          // Text Fades Out
          masterTimeline.to(textGroup, { opacity: 0, y: -20, duration: 1.5 }, currentTime - 1.5);

          // Crossfade to Next Scene OR hide this scene if moving to interlude
          if (sIdx < chapter.scenes.length - 1) {
            masterTimeline.to(q(`.scene-r${cIdx}-s${sIdx + 1}`), { opacity: 1, duration: 1.5 }, currentTime - 1.5);
          }
          masterTimeline.to(q(panelClass), { opacity: 0, duration: 1.5 }, currentTime - 1.5);
        });

        // 4. Interlude Scene (Border Crossing)
        if (cIdx < journeyChapters.length - 1) {
          masterTimeline.to(q(`.interlude-${cIdx}`), { opacity: 1, duration: 1 }, currentTime);
          currentTime += 1;
          currentTime += 1; // Hold interlude
          masterTimeline.to(q(`.interlude-${cIdx}`), { opacity: 0, duration: 1 }, currentTime);
          currentTime += 1;
        }

        // 5. Tie exact chapter duration to the Pill Progress Fill
        masterTimeline.to(progressFills[cIdx], { scaleX: 1, duration: (currentTime - chapterStart), ease: 'none' }, chapterStart);
      });

      // 6. Earned Grand Outro
      masterTimeline.to(q('.outro-screen'), { opacity: 1, duration: 2, ease: 'power2.out' }, currentTime);

      // Now that the timeline is fully built, its .duration() is the real,
      // ground-truth length — no more manual estimate to drift out of sync.
      const PX_PER_UNIT = 240; // tune this single number to taste
      const scrollDistance = Math.max(masterTimeline.duration() * PX_PER_UNIT, 3000);

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${scrollDistance}`,
        scrub: 1.2,
        pin: pinRef.current,
        refreshPriority: 5,
        animation: masterTimeline,
      });

    }, sectionRef);

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeout);
      ctx.revert();
    };
  }, [journeyChapters]);

  if (journeyChapters.length === 0) return null;

  return (
    <section ref={sectionRef} className="relative w-full bg-background">
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden text-foreground font-sans bg-background">

        {/* Apple-Style Morphing Progress UI */}
        <div className="absolute top-[80px] left-1/2 -translate-x-1/2 z-50 flex gap-2 sm:gap-4 mix-blend-difference select-none">
          {journeyChapters.map((chapter, idx) => (
            <div key={chapter.name} className="nav-pill flex flex-col items-start justify-center overflow-hidden h-10 border border-white/20 rounded-full bg-white/5 backdrop-blur-md relative">
              <div className="flex items-center gap-2 px-1 relative z-10 w-full">
                <span className={`nav-text-${idx} font-mono text-[9px] sm:text-[11px] uppercase text-foreground whitespace-nowrap tracking-widest`}>
                  {chapter.name}
                </span>
                <span className="nav-check material-symbols-outlined text-[12px] text-foreground/80 absolute right-1">check</span>
              </div>
              {/* Progress Tracker Layer */}
              <div className="absolute inset-0 z-0 bg-white/10" />
              <div
                className="progress-fill absolute inset-0 z-0"
                style={{ backgroundColor: chapter.color, opacity: 0.3 }}
              />
            </div>
          ))}
        </div>

        {/* Cinematic Map Guide */}
        <div className="absolute top-1/2 -translate-y-1/2 left-8 md:left-12 z-50 h-[30vh] w-6 flex flex-col items-center mix-blend-difference opacity-80 hidden sm:flex">
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-foreground/50 mb-4 -rotate-90 origin-center absolute -top-16">
            Africa
          </span>
          <div className="relative h-full w-[1px] bg-white/20 flex flex-col justify-between items-center">
            <div
              className="map-active-dot absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] z-20"
              style={{ top: '0%' }}
            />
            {journeyChapters.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/40 z-10" />
            ))}
          </div>
        </div>

        {/* The Master Layer Stack */}
        <div className="absolute inset-0 w-full h-full">
          {journeyChapters.map((chapter, cIdx) => (
            <div key={chapter.name} className="absolute inset-0 w-full h-full pointer-events-none">

              {/* Cinematic Intro */}
              <div className={`chapter-intro chapter-intro-${cIdx} absolute inset-0 z-40 flex flex-col items-center justify-center text-center px-6 bg-background`}>
                <div className="w-full max-w-sm h-[1px] bg-white/20 mb-10" />
                <h2 className="font-serif text-5xl md:text-8xl font-bold tracking-tight mb-6 uppercase" style={{ color: chapter.color }}>
                  {chapter.name}
                </h2>
                <p className="font-serif text-xl md:text-3xl text-foreground max-w-2xl leading-relaxed font-light">
                  {chapter.desc}
                </p>
                <div className="mt-12 flex flex-col items-center gap-4">
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/40">Scroll to Explore</span>
                  <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
                </div>
                <div className="w-full max-w-sm h-[1px] bg-white/20 mt-10" />
              </div>

              {/* Edge-to-Edge Scenes */}
              {chapter.scenes.map((scene, sIdx) => {
                const displayImages = [
                  scene.coverPhoto || scene.image,
                  ...(scene.galleryImages || [])
                ].filter(Boolean);
                if (displayImages.length === 0) displayImages.push('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80');

                return (
                  <div key={scene.id} className={`scene-layer scene-r${cIdx}-s${sIdx} absolute inset-0 w-full h-full pointer-events-auto bg-black`}>

                    {/* Immersive Viewport Imagery */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      {displayImages.map((src, imgIdx) => (
                        <div
                          key={imgIdx}
                          className="scene-img absolute inset-0 bg-cover bg-center opacity-0 transform-gpu"
                          style={{ backgroundImage: `url('${src}')`, opacity: imgIdx === 0 ? 1 : 0 }}
                        />
                      ))}
                    </div>

                    {/* Minimalist Legibility Masks */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/10 z-10 mix-blend-multiply" />

                    {/* Scene Typography */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-end pb-24 md:pb-32 px-6 sm:px-24 max-w-[1800px] mx-auto w-full">
                      <div className="scene-text max-w-5xl">

                        <div className="flex items-center gap-4 mb-8">
                          <span className="w-12 h-[2px]" style={{ backgroundColor: chapter.color }} />
                          <span className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-white/90 font-bold drop-shadow-md">
                            {scene.location || scene.destination}
                          </span>
                        </div>

                        <h3 className="font-serif text-5xl sm:text-6xl md:text-8xl font-bold leading-[1.05] mb-8 text-white drop-shadow-2xl">
                          {scene.title}
                        </h3>

                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
                          <p className="font-sans text-base md:text-xl text-white/80 max-w-2xl leading-relaxed font-light drop-shadow-md">
                            {scene.summary || scene.description}
                          </p>

                          <Link
                            href={`/explore/${scene.id}`}
                            className="group flex flex-col gap-2 items-start sm:items-end text-white hover:text-white/70 transition-colors"
                          >
                            <span className="font-mono text-xs uppercase tracking-[0.2em] opacity-60">View Itinerary</span>
                            <div className="flex items-center gap-3">
                              <span className="font-serif text-2xl italic tracking-tight">Step Inside</span>
                              <span className="material-symbols-outlined text-[24px] font-light transition-transform group-hover:translate-x-2">trending_flat</span>
                            </div>
                          </Link>
                        </div>

                      </div>
                    </div>

                  </div>
                );
              })}

              {/* The Border Crossing Interlude */}
              {cIdx < journeyChapters.length - 1 && (
                <div className={`interlude-screen interlude-${cIdx} absolute inset-0 z-50 flex items-center justify-center bg-black`}>
                  <div className="flex items-center gap-6 md:gap-12 opacity-70">
                    <span className="font-serif text-3xl md:text-5xl uppercase tracking-widest text-foreground/40">
                      {chapter.name}
                    </span>
                    <span className="w-16 md:w-32 h-[1px] bg-white/30" />
                    <span className="font-serif text-3xl md:text-5xl uppercase tracking-widest text-foreground">
                      {journeyChapters[cIdx + 1].name}
                    </span>
                  </div>
                </div>
              )}

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}