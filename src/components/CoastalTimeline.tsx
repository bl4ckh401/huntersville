'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Yacht from '@/components/YachtJourney';

gsap.registerPlugin(ScrollTrigger);

const DESTINATIONS = [
  {
    id: 'diani',
    title: 'Diani Beach',
    subtitle: "Africa's Best Beach",
    description: "Voted Africa's top beach destination. Turquoise waters, powder-white sands, luxury eco-resorts, and world-class kite surfing.",
    tags: ['Luxury', 'Kite Surfing', 'Sands'],
    stop: 1,
  },
  {
    id: 'watamu',
    title: 'Watamu Marine Park',
    subtitle: 'Turtles, Reefs & Wonder',
    description: 'A protected marine reserve teeming with sea turtles and whale sharks. Snorkel through coral gardens and bio-luminescent bays.',
    tags: ['Marine Park', 'Snorkeling', 'Turtles'],
    stop: 2,
  },
  {
    id: 'lamu',
    title: 'Lamu Island',
    subtitle: 'A World Frozen in Time',
    description: 'No cars. No rush. Ancient alleyways, hand-carved Swahili doors, and the gentle creak of dhow masts at sunset.',
    tags: ['UNESCO', 'Dhow Sailing', 'Culture'],
    stop: 3,
  },
];

const PATH_D =
  'M 100,300 C 250,390 350,390 450,390 C 520,390 560,280 580,300 C 600,320 490,320 520,300 C 560,210 700,210 800,210 C 950,210 1050,390 1150,390 C 1220,390 1260,280 1280,300 C 1300,320 1190,320 1220,300 C 1260,390 1400,390 1500,300';

export default function CoastalTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const vehicleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const video = videoRef.current;
    const path = pathRef.current;
    const vehicle = vehicleRef.current;
    if (!section || !track) return;

    let mainAnimation: gsap.core.Tween | null = null;

    const init = () => {
      const dist = track.scrollWidth - window.innerWidth;
      if (dist <= 0) return;

      const scrollLength = dist * 1.8;

      mainAnimation = gsap.to(track, { x: -dist, ease: 'none' });

      ScrollTrigger.create({
        trigger: section,
        pin: true,
        scrub: 1.5,
        start: 'top top',
        end: () => `+=${scrollLength}`,
        invalidateOnRefresh: true,
        animation: mainAnimation,
        id: 'co-main',
      });

      const initVideo = () => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollLength}`,
          scrub: 0.4,
          invalidateOnRefresh: true,
          id: 'co-video',
          onUpdate: (self) => {
            if (video && video.duration) video.currentTime = self.progress * video.duration;
          },
        });
      };
      if (video) {
        if (video.readyState >= 1) initVideo();
        else video.addEventListener('loadedmetadata', initVideo, { once: true });
      }

      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDashoffset: len });
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollLength}`,
          scrub: 1,
          invalidateOnRefresh: true,
          id: 'co-path',
          onUpdate: (self) => {
            const p = self.progress;
            gsap.set(path, { strokeDashoffset: len * (1 - p) });
            if (vehicle) {
              const cur = path.getPointAtLength(p * len);
              const nxt = path.getPointAtLength(Math.min(1, p + 0.003) * len);
              const angle = Math.atan2(nxt.y - cur.y, nxt.x - cur.x) * (180 / Math.PI) + 90;
              gsap.set(vehicle, {
                left: `${(cur.x / 1600) * 100}%`,
                top: `${(cur.y / 600) * 100}%`,
                rotation: angle,
                opacity: p > 0.01 && p < 0.99 ? 1 : 0,
              });
            }
          },
        });
      }

      if (mainAnimation) {
        gsap.utils.toArray<HTMLElement>('.co-panel').forEach((panel) => {
          const els = panel.querySelectorAll('.rv');
          const dot = panel.querySelector('.map-dot');

          if (dot) {
            gsap.fromTo(dot, { scale: 0, opacity: 0 }, {
              scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: mainAnimation!,
                start: 'left 75%',
                toggleActions: 'play reverse play reverse',
              },
            });
          }
          gsap.fromTo(els, { opacity: 0, y: 14, filter: 'blur(5px)' }, {
            opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.55, stagger: 0.07, ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: mainAnimation!,
              start: 'left 70%',
              toggleActions: 'play reverse play reverse',
            },
          });
        });
      }

      ScrollTrigger.refresh();
    };

    const raf = requestAnimationFrame(init);
    return () => {
      cancelAnimationFrame(raf);
      ScrollTrigger.getById('co-main')?.kill();
      ScrollTrigger.getById('co-video')?.kill();
      ScrollTrigger.getById('co-path')?.kill();
      if (mainAnimation) mainAnimation.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="coastal-section"
      className="relative bg-[#010d18] overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Background video */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video ref={videoRef} src="/coast_scrub.mp4" className="w-full h-full object-cover opacity-75" muted playsInline preload="auto" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#010d18]/85 via-transparent to-[#010d18]/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#010d18]/70 via-transparent to-[#010d18]/70" />
      </div>

      {/* Map path + vehicle */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1600 600" preserveAspectRatio="none">
          <path ref={pathRef} d={PATH_D} fill="none" stroke="rgba(34,211,238,0.55)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 10" />
        </svg>
        <div ref={vehicleRef} className="absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none">
          <Yacht className="w-full h-full text-cyan-400 drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]" />
        </div>
      </div>

      {/* Horizontal track */}
      <div ref={trackRef} className="relative z-20 flex items-stretch h-full will-change-transform" style={{ width: 'max-content' }}>

        {/* Intro panel */}
        <div className="flex flex-col justify-center gap-4 px-14 md:px-20 shrink-0" style={{ width: '45vw', minWidth: '340px' }}>
          <h2 className="rv font-display-lg text-4xl md:text-6xl text-white leading-tight font-bold">
            Coastal Retreats
          </h2>
          <p className="rv text-white/50 md:text-sm leading-relaxed">
            Sail through breathtaking coastal destinations.
          </p>
          <div className="rv flex items-center gap-2 text-cyan-400/70">
            <span className="uppercase tracking-widest text-[9px] font-bold">Scroll to explore</span>
            <svg className="w-3.5 h-3.5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>

        {/* Destination panels */}
        {DESTINATIONS.map((dest, i) => {
          const isTop = i % 2 === 0;
          return (
            <div
              key={dest.id}
              className="co-panel relative flex flex-col justify-between h-full shrink-0 py-8 px-6"
              style={{ width: '36vw', minWidth: '300px' }}
            >
              {/* TOP SLOT */}
              <div className="flex-1 flex items-end pb-3">
                {isTop && (
                  <div
                    className="w-full p-4 rounded-2xl"
                    style={{
                      background: 'rgba(1,13,24,0.82)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      border: '1px solid rgba(34,211,238,0.2)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                    }}
                  >
                    <div className="flex flex-col gap-2">
                      <p className="rv text-cyan-300 uppercase tracking-[0.18em] text-[8px] font-bold">{dest.subtitle}</p>
                      <h3 className="rv text-white font-display-lg text-lg leading-snug">{dest.title}</h3>
                      <p className="rv text-white/60 text-[11px] leading-relaxed">{dest.description}</p>
                      <div className="rv flex flex-wrap gap-1">
                        {dest.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 text-[8px] uppercase tracking-wide text-cyan-200 rounded-full" style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.25)' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button className="rv flex items-center gap-1 text-cyan-400 text-[9px] uppercase tracking-wide hover:opacity-70 transition-opacity group/btn">
                        <span className="border-b border-current pb-0.5">Explore Package</span>
                        <svg className="w-2.5 h-2.5 group-hover/btn:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* MILESTONE DOT */}
              <div className="flex justify-center py-2 shrink-0">
                <div
                  className="map-dot flex items-center justify-center w-7 h-7 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(34,211,238,0.25) 0%, transparent 70%)',
                    border: '2px solid rgba(34,211,238,0.9)',
                    boxShadow: '0 0 12px rgba(34,211,238,0.6)',
                  }}
                >
                  <span className="text-cyan-300 font-bold text-[10px] font-mono">{dest.stop}</span>
                </div>
              </div>

              {/* BOTTOM SLOT */}
              <div className="flex-1 flex items-start pt-3">
                {!isTop && (
                  <div
                    className="w-full p-4 rounded-2xl"
                    style={{
                      background: 'rgba(1,13,24,0.82)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      border: '1px solid rgba(34,211,238,0.2)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                    }}
                  >
                    <div className="flex flex-col gap-2">
                      <p className="rv text-cyan-300 uppercase tracking-[0.18em] text-[8px] font-bold">{dest.subtitle}</p>
                      <h3 className="rv text-white font-display-lg text-lg leading-snug">{dest.title}</h3>
                      <p className="rv text-white/60 text-[11px] leading-relaxed">{dest.description}</p>
                      <div className="rv flex flex-wrap gap-1">
                        {dest.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 text-[8px] uppercase tracking-wide text-cyan-200 rounded-full" style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.25)' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button className="rv flex items-center gap-1 text-cyan-400 text-[9px] uppercase tracking-wide hover:opacity-70 transition-opacity group/btn">
                        <span className="border-b border-current pb-0.5">Explore Package</span>
                        <svg className="w-2.5 h-2.5 group-hover/btn:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Trailing spacer */}
        <div className="shrink-0" style={{ width: '35vw' }} />
      </div>
    </section>
  );
}
