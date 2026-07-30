'use client';

import { useLayoutEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Experience } from '@/lib/content-store';

gsap.registerPlugin(ScrollTrigger);

interface GlobalReachProps {
  experiences?: Experience[];
}

type Chapter = {
  name: string;
  color: string;
  desc: string;
  scenes: Experience[];
};

const DESTINATION_META: Record<string, { color: string; desc: string }> = {
  Kenya: {
    color: '#10b981',
    desc: 'The land of endless savannahs, towering mountains, and unforgettable wildlife.',
  },
  Tanzania: {
    color: '#fbbf24',
    desc: 'Where the great migration echoes across the Serengeti plains.',
  },
  Uganda: {
    color: '#ea580c',
    desc: 'The pearl of Africa, home to mist-shrouded forests and mountain gorillas.',
  },
  Rwanda: {
    color: '#38bdf8',
    desc: 'A breathtaking tapestry of rolling hills and profound resilience.',
  },
};

function pickStableScenes<T extends { id: string | number }>(items: T[], count: number): T[] {
  return [...items]
    .sort((a, b) => String(a.id).localeCompare(String(b.id)))
    .slice(0, count);
}

export default function GlobalReach({ experiences = [] }: GlobalReachProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const journeyChapters = useMemo<Chapter[]>(() => {
    const destMap = new Map<string, Experience[]>();

    experiences.forEach((exp) => {
      if (!exp) return;
      const dest = exp.destination?.trim() || 'East Africa';
      if (!destMap.has(dest)) destMap.set(dest, []);
      destMap.get(dest)!.push(exp);
    });

    const chapters = Array.from(destMap.entries()).map(([dest, exps]) => {
      const selectedScenes = pickStableScenes(exps, 3);
      const meta = DESTINATION_META[dest] || {
        color: '#a8a29e',
        desc: 'Discover breathtaking landscapes and untamed wilderness.',
      };

      return {
        name: dest,
        ...meta,
        scenes: selectedScenes,
      };
    });

    return chapters.filter((chapter) => chapter.scenes.length > 0).slice(0, 4);
  }, [experiences]);

  useLayoutEffect(() => {
    if (!sectionRef.current || !pinRef.current || journeyChapters.length === 0) return;

    ScrollTrigger.config({ ignoreMobileResize: true });
    gsap.ticker.lagSmoothing(0);

    const TRIGGER_ID = 'global-reach-scroll';
    ScrollTrigger.getById(TRIGGER_ID)?.kill(true);

    let trigger: ScrollTrigger | null = null;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef);

      const masterTimeline = gsap.timeline({
        paused: true,
        defaults: { ease: 'power2.out' },
      });

      const navPills = q('.nav-pill');
      const progressFills = q('.progress-fill');
      const mapDot = q('.map-active-dot')[0] as HTMLDivElement | undefined;
      const mapChecks = q('.nav-check');
      const chapterIntros = q('.chapter-intro');
      const sceneLayers = q('.scene-layer');
      const sceneImgs = q('.scene-img');
      const sceneTexts = q('.scene-text');
      const interludes = q('.interlude-screen');

      gsap.set([...chapterIntros, ...sceneLayers, ...interludes], { opacity: 0 });
      gsap.set(sceneImgs, {
        scale: 1,
        force3D: true,
        willChange: 'transform, opacity',
      });
      gsap.set(sceneTexts, {
        opacity: 0,
        y: 24,
        willChange: 'transform, opacity',
      });
      gsap.set(progressFills, {
        scaleX: 0,
        transformOrigin: 'left center',
        willChange: 'transform',
      });
      gsap.set(navPills, {
        width: '90px',
        padding: '4px 12px',
        opacity: 0.42,
        willChange: 'width, padding, opacity, transform',
      });
      gsap.set(mapChecks, { opacity: 0, scale: 0, transformOrigin: '50% 50%' });
      if (mapDot) gsap.set(mapDot, { top: '0%' });

      const firstIntro = q('.chapter-intro-0');
      if (firstIntro.length) gsap.set(firstIntro, { opacity: 1 });

      const IMAGE_MOTION = 3.2;
      const IMAGE_CROSSFADE = 0.72;
      const SCENE_TEXT_IN = 0.85;
      const SCENE_TEXT_OUT = 0.65;
      const INTRO_HOLD = 0.9;
      const INTRO_FADE = 0.8;
      const INTERLUDE_FADE = 0.7;
      const INTERLUDE_HOLD = 0.6;
      const CHAPTER_OVERLAP = 0.45;
      const IMAGE_FADE_START = 2.0;

      let currentTime = 0;

      journeyChapters.forEach((chapter, cIdx) => {
        const chapterStart = currentTime;
        const chapterScenes = chapter.scenes;

        const dotY = cIdx * (100 / Math.max(journeyChapters.length - 1, 1));
        if (mapDot) {
          masterTimeline.to(mapDot, { top: `${dotY}%`, duration: 1.05, ease: 'power2.inOut' }, currentTime);
        }

        if (cIdx > 0) {
          masterTimeline.to(
            navPills[cIdx - 1],
            { width: '90px', padding: '4px 12px', opacity: 0.58, duration: 1, ease: 'power2.inOut' },
            currentTime
          );
          masterTimeline.to(
            mapChecks[cIdx - 1],
            { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.8)' },
            currentTime + 0.05
          );
        }

        masterTimeline.to(
          navPills[cIdx],
          { width: '240px', padding: '4px 24px', opacity: 1, duration: 1, ease: 'power2.inOut' },
          currentTime
        );
        masterTimeline.to(
          q(`.nav-text-${cIdx}`),
          { letterSpacing: '0.2em', fontWeight: 700, duration: 1, ease: 'power2.out' },
          currentTime
        );

        if (cIdx > 0) {
          masterTimeline.to(q(`.chapter-intro-${cIdx}`), { opacity: 1, duration: INTRO_FADE }, currentTime);
          currentTime += INTRO_FADE;
        }

        currentTime += INTRO_HOLD;
        masterTimeline.to(q(`.chapter-intro-${cIdx}`), { opacity: 0, duration: INTRO_FADE }, currentTime);

        if (q(`.scene-r${cIdx}-s0`).length) {
          masterTimeline.to(q(`.scene-r${cIdx}-s0`), { opacity: 1, duration: INTRO_FADE }, currentTime);
        }
        currentTime += INTRO_FADE;

        chapterScenes.forEach((scene, sIdx) => {
          const panelClass = `.scene-r${cIdx}-s${sIdx}`;
          const panel = q(panelClass)[0] as HTMLElement | undefined;
          const images = q(`${panelClass} .scene-img`);
          const textGroup = q(`${panelClass} .scene-text`)[0] as HTMLElement | undefined;

          if (textGroup) {
            masterTimeline.to(
              textGroup,
              { opacity: 1, y: 0, duration: SCENE_TEXT_IN, ease: 'power3.out' },
              currentTime
            );
          }

          images.forEach((img, imgIdx) => {
            masterTimeline.to(
              img,
              { scale: 1.12, duration: IMAGE_MOTION, ease: 'power1.out' },
              currentTime
            );

            if (imgIdx < images.length - 1) {
              const nextImg = images[imgIdx + 1];
              masterTimeline.to(img, { opacity: 0, duration: IMAGE_CROSSFADE, ease: 'power1.out' }, currentTime + IMAGE_FADE_START);
              masterTimeline.to(nextImg, { opacity: 1, duration: IMAGE_CROSSFADE, ease: 'power1.out' }, currentTime + IMAGE_FADE_START);
              currentTime += IMAGE_MOTION;
            } else {
              currentTime += IMAGE_MOTION;
            }
          });

          // Check if this is the absolute final scene of the entire scroll block
          const isAbsoluteLastScene = (cIdx === journeyChapters.length - 1) && (sIdx === chapterScenes.length - 1);

          // ONLY fade out the text and panel if it's NOT the last scene
          if (!isAbsoluteLastScene) {
            if (textGroup) {
              masterTimeline.to(
                textGroup,
                { opacity: 0, y: -18, duration: SCENE_TEXT_OUT, ease: 'power2.inOut' },
                Math.max(currentTime - SCENE_TEXT_OUT, chapterStart)
              );
            }

            if (panel) {
              masterTimeline.to(
                panel,
                { opacity: 0, duration: SCENE_TEXT_OUT, ease: 'power2.inOut' },
                Math.max(currentTime - CHAPTER_OVERLAP, chapterStart)
              );
            }
          }

          if (sIdx < chapterScenes.length - 1) {
            masterTimeline.to(
              q(`.scene-r${cIdx}-s${sIdx + 1}`),
              { opacity: 1, duration: SCENE_TEXT_OUT, ease: 'power2.out' },
              Math.max(currentTime - CHAPTER_OVERLAP, chapterStart)
            );
          }
        });

        if (cIdx < journeyChapters.length - 1) {
          masterTimeline.to(q(`.interlude-${cIdx}`), { opacity: 1, duration: INTERLUDE_FADE, ease: 'power2.out' }, currentTime);
          currentTime += INTERLUDE_FADE;
          currentTime += INTERLUDE_HOLD;
          masterTimeline.to(q(`.interlude-${cIdx}`), { opacity: 0, duration: INTERLUDE_FADE, ease: 'power2.inOut' }, currentTime);
          currentTime += INTERLUDE_FADE;
        }

        masterTimeline.to(
          progressFills[cIdx],
          { scaleX: 1, duration: Math.max(currentTime - chapterStart, 0.1), ease: 'none' },
          chapterStart
        );
      });

      const totalDuration = masterTimeline.duration();
      const scrollDistance = Math.max(
        totalDuration * window.innerHeight * 0.35,
        window.innerHeight * 1.2
      );

      trigger = ScrollTrigger.create({
        id: TRIGGER_ID,
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${Math.round(scrollDistance)}`,
        scrub: 0.6,
        pin: pinRef.current,
        pinSpacing: false,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        refreshPriority: 5,
        animation: masterTimeline,
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, sectionRef);

    return () => {
      trigger?.kill(true);
      ScrollTrigger.getById(TRIGGER_ID)?.kill(true);
      ctx.revert();
    };
  }, [journeyChapters]);

  if (journeyChapters.length === 0) return null;

  return (
    <section ref={sectionRef} className="relative z-20 w-full overflow-x-hidden bg-background text-foreground">
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden bg-background font-sans text-foreground">
        <div className="absolute left-1/2 top-[80px] z-50 flex -translate-x-1/2 select-none gap-2 sm:gap-4 mix-blend-difference">
          {journeyChapters.map((chapter, idx) => (
            <div
              key={chapter.name}
              className="nav-pill relative flex h-10 flex-col items-start justify-center overflow-hidden rounded-full border border-white/20 bg-white/5 backdrop-blur-md"
            >
              <div className="relative z-10 flex w-full items-center gap-2 px-1">
                <span className={`nav-text-${idx} whitespace-nowrap font-mono text-[9px] uppercase tracking-widest text-foreground sm:text-[11px]`}>
                  {chapter.name}
                </span>
                <span className="nav-check material-symbols-outlined absolute right-1 text-[12px] text-foreground/80">
                  check
                </span>
              </div>
              <div className="absolute inset-0 z-0 bg-white/10" />
              <div
                className="progress-fill absolute inset-0 z-0"
                style={{ backgroundColor: chapter.color, opacity: 0.3 }}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 h-full w-full">
          {journeyChapters.map((chapter, cIdx) => (
            <div key={chapter.name} className="pointer-events-none absolute inset-0 h-full w-full">
              <div
                className={`chapter-intro chapter-intro-${cIdx} absolute inset-0 z-40 flex flex-col items-center justify-center bg-background px-6 text-center`}
              >
                <div className="mb-10 h-[1px] w-full max-w-sm bg-white/20" />
                <h2 className="mb-6 font-serif text-5xl font-bold uppercase tracking-tight md:text-8xl" style={{ color: chapter.color }}>
                  {chapter.name}
                </h2>
                <p className="max-w-2xl font-serif text-xl font-light leading-relaxed text-foreground md:text-3xl">
                  {chapter.desc}
                </p>
                <div className="mt-12 flex flex-col items-center gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
                    Scroll to Explore
                  </span>
                  <div className="h-12 w-[1px] bg-gradient-to-b from-white/40 to-transparent" />
                </div>
                <div className="mt-10 h-[1px] w-full max-w-sm bg-white/20" />
              </div>

              {chapter.scenes.map((scene, sIdx) => {
                const displayImages = [scene.coverPhoto || scene.image, ...(scene.galleryImages || [])].filter(Boolean).slice(0, 5) as string[];

                if (displayImages.length === 0) {
                  displayImages.push('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80');
                }

                return (
                  <div
                    key={scene.id}
                    className={`scene-layer scene-r${cIdx}-s${sIdx} absolute inset-0 h-full w-full bg-black pointer-events-auto`}
                  >
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      {displayImages.map((src, imgIdx) => (
                        <div
                          key={imgIdx}
                          className="scene-img absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0 transform-gpu"
                          style={{ backgroundImage: `url('${src}')`, opacity: imgIdx === 0 ? 1 : 0 }}
                        />
                      ))}
                    </div>

                    <div className="absolute inset-0 z-10 mix-blend-multiply bg-gradient-to-t from-black/95 via-black/20 to-black/10" />

                    <div className="absolute inset-0 z-20 mx-auto flex w-full max-w-[1800px] flex-col justify-end px-6 pb-24 sm:px-24 md:pb-32">
                      <div className="scene-text max-w-5xl">
                        <div className="mb-8 flex items-center gap-4">
                          <span className="h-[2px] w-12" style={{ backgroundColor: chapter.color }} />
                          <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-white/90 drop-shadow-md md:text-sm">
                            {scene.location || scene.destination}
                          </span>
                        </div>

                        <h3 className="mb-8 font-serif text-5xl font-bold leading-[1.05] text-white drop-shadow-2xl sm:text-6xl md:text-8xl">
                          {scene.title}
                        </h3>

                        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
                          <p
                            className="max-w-2xl font-sans text-base font-light leading-relaxed text-white/80 drop-shadow-md md:text-xl"
                            dangerouslySetInnerHTML={{ __html: scene.summary || scene.description }}
                          />

                          <Link
                            href={`/explore/${scene.id}`}
                            className="group flex flex-col items-start gap-2 text-white transition-colors hover:text-white/70 sm:items-end"
                          >
                            <span className="font-mono text-xs uppercase tracking-[0.2em] opacity-60">
                              View Itinerary
                            </span>
                            <div className="flex items-center gap-3">
                              <span className="font-serif text-2xl italic tracking-tight">Step Inside</span>
                              <span className="material-symbols-outlined text-[24px] font-light transition-transform group-hover:translate-x-2">
                                trending_flat
                              </span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {cIdx < journeyChapters.length - 1 && (
                <div className={`interlude-screen interlude-${cIdx} absolute inset-0 z-50 flex items-center justify-center bg-black`}>
                  <div className="flex items-center gap-6 opacity-70 md:gap-12">
                    <span className="font-serif text-3xl uppercase tracking-widest text-foreground/40 md:text-5xl">
                      {chapter.name}
                    </span>
                    <span className="h-[1px] w-16 bg-white/30 md:w-32" />
                    <span className="font-serif text-3xl uppercase tracking-widest text-foreground md:text-5xl">
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