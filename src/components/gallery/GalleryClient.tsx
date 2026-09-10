'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  GALLERY_ALBUMS,
  GALLERY_CATEGORIES,
  GALLERY_FRAMES,
  GALLERY_SANCTUARIES,
  type GalleryFrame,
} from '@/data/gallery';

gsap.registerPlugin(ScrollTrigger);

type CategoryId = (typeof GALLERY_CATEGORIES)[number]['id'];
type Sanctuary = (typeof GALLERY_SANCTUARIES)[number];

const ALBUM_CARD_WIDTH = 380;

function GalleryHero() {
  return (
    <section className="relative w-full bg-surface-low border-b border-surface-container overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-16">
      <div className="absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full bg-primary-fixed-dim/25 blur-3xl pointer-events-none animate-float-orb" />
      <div className="absolute -bottom-20 right-0 w-[480px] h-[480px] rounded-full bg-gold-accent/15 blur-3xl pointer-events-none animate-float-orb-delayed" />
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-dark tracking-tight leading-[1.12] mb-5">
              <span className="block hero-line">Visual Tales</span>
              <span className="block hero-line italic font-normal text-surface-tint">of East Africa</span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed hero-fade">
              Explore the raw majesty of our expeditions through uncompressed photography and field journals across the Mara, Amboseli, Samburu, and beyond. Captured on medium format and telephoto optics by lead naturalists and guest explorers.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4">
            <button
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-dark shadow-sm hover:shadow transition-all duration-200 group hero-fade"
              onClick={() => document.getElementById('gallery-grid')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="material-symbols-outlined text-[20px] text-primary-fixed-dim">slideshow</span>
              <span>Launch Fullscreen Gallery</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
            </button>
            <div className="flex items-center gap-2 text-xs text-on-surface-variant hero-fade">
              <span className="material-symbols-outlined text-[16px] text-surface-tint">verified</span>
              <span>100% Ethical &amp; Non-Intrusive Field Records</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-surface-container">
          {[
            { value: '3,400+', label: 'High-Res Dispatches' },
            { value: '18', label: 'Protected Sanctuaries' },
            { value: '42', label: 'Signature Albums' },
            { value: '14', label: 'Master Field Naturalists' },
          ].map((stat, index) => (
            <div className="flex flex-col" key={stat.label}>
              <span className="font-serif text-2xl sm:text-3xl font-semibold text-primary-dark stat-number" data-target={stat.value.replace(',', '')}>
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-wider text-on-surface-variant mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AlbumCard({ album, index, onOpen }: { album: (typeof GALLERY_ALBUMS)[number]; index: number; onOpen: () => void }) {
  return (
    <article
      className="album-card flex-none w-[320px] sm:w-[370px] snap-start bg-surface-container-lowest rounded-2xl overflow-hidden border border-surface-container shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.1)] transition-all duration-300 group cursor-pointer flex flex-col"
      onClick={onOpen}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      <div className="relative h-64 w-full overflow-hidden bg-surface-high">
        <Image
          alt={album.alt}
          fill
          sizes="(max-width: 768px) 320px, 370px"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          src={album.src}
          placeholder="empty"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/85 via-primary-dark/20 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-primary-dark text-xs font-semibold tracking-wide">
            {album.region}
          </span>
          <span className="px-3 py-1 rounded-full bg-primary/90 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">photo_library</span> {album.frames} Frames
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <span className="text-[11px] font-medium text-primary-fixed-dim uppercase tracking-wider block mb-1">{album.subtitle}</span>
          <h3 className="font-serif text-xl font-semibold leading-snug">{album.title}</h3>
        </div>
      </div>
      <div className="p-5 flex items-center justify-between bg-surface-container-lowest">
        <span className="text-xs text-on-surface-variant font-medium">Field Lead: {album.fieldLead}</span>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
          Open Album <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </span>
      </div>
    </article>
  );
}

function AlbumsSection({ onOpen }: { onOpen: (index: number) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 'left' | 'right') => {
    trackRef.current?.scrollBy({ left: direction === 'left' ? -ALBUM_CARD_WIDTH : ALBUM_CARD_WIDTH, behavior: 'smooth' });
  };

  return (
    <section className="max-w-[1280px] mx-auto px-6 sm:px-8 py-14 sm:py-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold tracking-widest text-surface-tint uppercase mb-2">
            <span className="material-symbols-outlined text-[16px]">folder_special</span>
            <span>Curated Portfolios</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-primary-dark">Featured Expedition Albums</h2>
          <p className="text-sm text-on-surface-variant mt-1.5">Select a portfolio to immerse yourself in curated expedition logs and multi-frame studies.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            aria-label="Scroll left"
            className="w-10 h-10 rounded-full border border-outline-variant/60 bg-surface-container-lowest text-on-surface hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center transition-all duration-200"
            onClick={() => scrollBy('left')}
          >
            <span className="material-symbols-outlined text-[20px]">west</span>
          </button>
          <button
            aria-label="Scroll right"
            className="w-10 h-10 rounded-full border border-outline-variant/60 bg-surface-container-lowest text-on-surface hover:bg-primary hover:text-white hover:border-primary flex items-center justify-center transition-all duration-200"
            onClick={() => scrollBy('right')}
          >
            <span className="material-symbols-outlined text-[20px]">east</span>
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto pb-4 pt-1 -mx-6 px-6 sm:-mx-8 sm:px-8 hide-scrollbar snap-x snap-mandatory"
        id="albums-track"
      >
        {GALLERY_ALBUMS.map((album, index) => (
          <AlbumCard key={album.id} album={album} index={index} onOpen={() => onOpen(album.frameIndex)} />
        ))}
      </div>
    </section>
  );
}

function FilterBar({
  activeCategory,
  setActiveCategory,
  activeSanctuary,
  setActiveSanctuary,
}: {
  activeCategory: CategoryId;
  setActiveCategory: (id: CategoryId) => void;
  activeSanctuary: Sanctuary;
  setActiveSanctuary: (s: Sanctuary) => void;
}) {
  return (
    <section className="max-w-[1280px] mx-auto px-6 sm:px-8 mb-8">
      <div className="bg-surface-low border border-surface-container rounded-2xl p-4 sm:p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4 overflow-x-auto pb-1 hide-scrollbar">
          <div className="flex items-center gap-2" id="category-tabs">
            {GALLERY_CATEGORIES.map((category) => (
              <button
                key={category.id}
                className={`filter-tab px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-surface-container-lowest text-on-surface-variant hover:text-primary hover:bg-white border border-surface-container'
                }`}
                data-category={category.id}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-3 flex-none pl-4 border-l border-surface-container">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined text-outline text-[18px] absolute left-3 pointer-events-none">swap_vert</span>
              <select className="text-xs font-medium pl-8 pr-8 py-2 bg-surface-container-lowest border border-surface-container rounded-full text-on-surface focus:outline-none focus:border-primary cursor-pointer appearance-none">
                <option>Featured First</option>
                <option>Most Recent Dispatches</option>
                <option>By Sanctuary (A-Z)</option>
                <option>Award Winning</option>
              </select>
            </div>
            <div className="flex items-center bg-surface-container-lowest border border-surface-container rounded-full p-1">
              <button className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center" title="Masonry Editorial">
                <span className="material-symbols-outlined text-[16px]">dashboard</span>
              </button>
              <button className="w-7 h-7 rounded-full text-on-surface-variant hover:text-primary flex items-center justify-center" title="Equal Grid">
                <span className="material-symbols-outlined text-[16px]">grid_view</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-surface-container/70">
          <span className="text-xs uppercase tracking-wider font-semibold text-on-surface-variant mr-1">Sanctuary Filter:</span>
          {GALLERY_SANCTUARIES.map((sanctuary) => (
            <button
              key={sanctuary}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                activeSanctuary === sanctuary
                  ? 'bg-primary-fixed/40 text-primary border border-primary/20'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:border-primary/40 border border-surface-container'
              }`}
              onClick={() => setActiveSanctuary(sanctuary)}
            >
              {sanctuary}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function GridCard({ frame, index, onOpen }: { frame: GalleryFrame; index: number; onOpen: () => void }) {
  const spanClass =
    frame.span === 'wide'
      ? 'lg:col-span-8'
      : frame.span === 'portrait'
        ? 'lg:col-span-4'
        : frame.span === 'endcap'
          ? 'lg:col-span-12 h-72'
          : 'lg:col-span-4';

  return (
    <div
      className={`grid-card group relative rounded-2xl overflow-hidden bg-surface-high border border-surface-container shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer ${spanClass}`}
      onClick={onOpen}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      <Image
        alt={frame.alt}
        fill
        sizes={frame.span === 'wide' ? '(max-width: 1024px) 100vw, 66vw' : frame.span === 'endcap' ? '100vw' : '(max-width: 1024px) 50vw, 33vw'}
        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        src={frame.src}
        placeholder="empty"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          {frame.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-primary-dark text-xs font-semibold">
              {tag}
            </span>
          ))}
        </div>
        <button
          className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-on-surface flex items-center justify-center hover:bg-white transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            e.currentTarget.classList.toggle('text-red-400');
          }}
          aria-label="Add to favorites"
        >
          <span className="material-symbols-outlined text-[18px]">favorite</span>
        </button>
      </div>

      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
        <div className="w-full max-w-[calc(100%-48px)]">
          <span className="text-[11px] text-primary-fixed-dim uppercase tracking-widest font-semibold block mb-1">{frame.time}</span>
          <h3 className={`font-serif font-semibold leading-snug ${frame.span === 'wide' || frame.span === 'endcap' ? 'text-2xl' : 'text-xl'}`}>{frame.headline}</h3>
          <p className="text-xs text-white/80 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-1 font-light max-w-lg">
            {frame.desc}
          </p>
          {/* <span className="text-xs text-white/80 font-light block mt-0.5">{frame.naturalist} • {frame.optics}</span> */}
        </div>
        <div className={`w-10 h-10 rounded-full bg-white/20 backdrop-blur-md group-hover:bg-primary transition-colors flex items-center justify-center flex-none ml-4`}>
          <span className="material-symbols-outlined text-[20px] text-white">fullscreen</span>
        </div>
      </div>
    </div>
  );
}

function GalleryGrid({
  activeCategory,
  activeSanctuary,
  onOpen,
}: {
  activeCategory: CategoryId;
  activeSanctuary: Sanctuary;
  onOpen: (index: number) => void;
}) {
  const visibleFrames = useMemo(() => {
    return GALLERY_FRAMES.filter((frame) => {
      const categoryMatch = activeCategory === 'all' || frame.category === activeCategory;
      const sanctuaryMatch =
        activeSanctuary === 'All Reserves' || frame.sanctuary === activeSanctuary || frame.sanctuary.includes(activeSanctuary.replace(' Beach', ''));
      return categoryMatch && sanctuaryMatch;
    });
  }, [activeCategory, activeSanctuary]);

  return (
    <section className="max-w-[1280px] mx-auto px-6 sm:px-8 pb-20" id="gallery-grid">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[290px]">
        {visibleFrames.map((frame, index) => (
          <GridCard key={frame.id} frame={frame} index={index} onOpen={() => onOpen(frame.id - 1)} />
        ))}
      </div>

      {visibleFrames.length === 0 && (
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-5xl text-outline mb-4">photo_size_select_actual</span>
          <h3 className="font-serif text-2xl text-primary-dark mb-2">No frames in this archive</h3>
          <p className="text-on-surface-variant text-sm">Try adjusting your category or sanctuary filters.</p>
        </div>
      )}
    </section>
  );
}

function Lightbox({
  openIndex,
  onClose,
}: {
  openIndex: number | null;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (openIndex !== null) {
      setCurrentIndex(openIndex);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [openIndex]);

  useEffect(() => {
    if (openIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrentIndex((prev) => (prev + 1) % GALLERY_FRAMES.length);
      if (e.key === 'ArrowLeft') setCurrentIndex((prev) => (prev - 1 + GALLERY_FRAMES.length) % GALLERY_FRAMES.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openIndex, onClose]);

  if (openIndex === null) return null;

  const frame = GALLERY_FRAMES[currentIndex];
  const goTo = (index: number) => setCurrentIndex((index + GALLERY_FRAMES.length) % GALLERY_FRAMES.length);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl shadow-[inset_0_0_120px_rgba(0,0,0,0.95)] flex flex-col justify-between p-4 sm:p-6">
      <div className="max-w-[1360px] w-full mx-auto flex items-center justify-between text-white pb-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary-fixed text-primary-dark font-serif font-bold text-sm flex items-center justify-center shadow-inner">
            HV
          </div>
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-semibold text-white leading-snug">{frame.album}</h3>
            <p className="text-xs text-primary-fixed-dim">
              Frame {currentIndex + 1} of {GALLERY_FRAMES.length} • Curated Master Collection
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors" title="Download High-Res Print">
            <span className="material-symbols-outlined text-[18px]">download</span>
          </button>
          <button className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors" title="Share Frame">
            <span className="material-symbols-outlined text-[18px]">share</span>
          </button>
          <button className="w-9 h-9 rounded-full bg-white/20 hover:bg-red-500 text-white flex items-center justify-center transition-colors ml-2" onClick={onClose} title="Close Viewer (ESC)">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      </div>

      <div className="max-w-[1360px] w-full mx-auto flex-1 flex flex-col lg:flex-row items-center justify-center gap-6 my-4 overflow-hidden relative min-h-0">
        <button
          aria-label="Previous image"
          className="absolute left-2 top-1/2 -translate-y-1/2 lg:translate-y-0 lg:static z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md transition-all border border-white/10 shadow-lg"
          onClick={() => goTo(currentIndex - 1)}
        >
          <span className="material-symbols-outlined text-[28px]">chevron_left</span>
        </button>

        <div className="relative w-full lg:w-3/4 flex-1 lg:flex-none lg:h-full flex items-center justify-center rounded-2xl overflow-hidden bg-black/90 shadow-[inset_0_0_60px_rgba(0,0,0,0.9)] border border-white/10 p-2 min-h-0">
          <Image
            key={frame.id}
            alt={frame.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 75vw"
            className="transition-all duration-300"
            style={{ objectFit: 'contain' }}
            src={frame.src}
            priority
          />
        </div>

        <div className="w-full lg:w-1/4 bg-neutral-900/95 border border-white/15 backdrop-blur-2xl rounded-2xl p-5 flex flex-col justify-between text-white gap-4 overflow-y-auto shrink-0 max-h-[42vh] lg:max-h-full shadow-2xl">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-primary-fixed uppercase tracking-wider">Field Naturalist Log</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-white/10 text-white font-mono border border-white/10">14-BIT RAW</span>
            </div>
            <h4 className="font-serif text-xl font-semibold text-white leading-tight">{frame.headline}</h4>
            <p className="text-xs text-white/90 leading-relaxed font-light">{frame.desc}</p>
          </div>
          <div className="bg-black/60 rounded-xl p-3.5 grid grid-cols-2 gap-3 text-xs border border-white/10 shadow-inner">
            <div>
              <span className="text-white/60 block text-[10px] uppercase tracking-wider font-medium">Location</span>
              <span className="font-semibold text-primary-fixed">{frame.location}</span>
            </div>
            <div>
              <span className="text-white/60 block text-[10px] uppercase tracking-wider font-medium">Expedition</span>
              <span className="font-medium text-white line-clamp-1" title={frame.album}>{frame.album}</span>
            </div>
            <div>
              <span className="text-white/60 block text-[10px] uppercase tracking-wider font-medium">Naturalist</span>
              <span className="font-medium text-white">{frame.naturalist}</span>
            </div>
            <div>
              <span className="text-white/60 block text-[10px] uppercase tracking-wider font-medium">Optics &amp; Profile</span>
              <span className="font-mono text-primary-fixed text-[11px]">{frame.optics}</span>
            </div>
          </div>
          <Link
            className="w-full py-3 rounded-full bg-primary-fixed text-primary-dark text-xs font-bold uppercase tracking-wider text-center hover:bg-primary-fixed-dim transition-colors shadow-md"
            href="/explore"
          >
            Inquire About This Safari
          </Link>
        </div>

        <button
          aria-label="Next image"
          className="absolute right-2 top-1/2 -translate-y-1/2 lg:translate-y-0 lg:static z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all"
          onClick={() => goTo(currentIndex + 1)}
        >
          <span className="material-symbols-outlined text-[28px]">chevron_right</span>
        </button>
      </div>

      <div className="max-w-[1360px] w-full mx-auto pt-2 border-t border-white/10">
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 hide-scrollbar">
          {GALLERY_FRAMES.map((item, index) => (
            <button
              key={item.id}
               className={`relative w-14 h-10 rounded-lg overflow-hidden flex-none border-2 transition-all duration-200 ${
                 index === currentIndex ? 'border-primary-fixed scale-105 opacity-100' : 'border-transparent opacity-50 hover:opacity-90'
               }`}
              onClick={() => goTo(index)}
              aria-label={`View frame ${index + 1}`}
            >
              <Image alt={item.alt} fill sizes="56px" className="w-full h-full object-cover" src={item.src} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [activeSanctuary, setActiveSanctuary] = useState<Sanctuary>('All Reserves');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef);

      gsap.set(q('.hero-line'), { y: 40, opacity: 0 });
      gsap.set(q('.hero-fade'), { opacity: 0, y: 24 });
      gsap.set(q('.stat-number'), { opacity: 0, y: 16 });
      gsap.set(q('.album-card'), { opacity: 0, y: 40 });
      gsap.set(q('.grid-card'), { opacity: 0, y: 40, filter: 'blur(6px)' });

      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .to(q('.hero-line'), { y: 0, opacity: 1, duration: 1, stagger: 0.12 })
        .to(q('.hero-fade'), { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, '-=0.5')
        .to(q('.stat-number'), { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, '-=0.4');

      gsap.utils.toArray<HTMLElement>('.album-card').forEach((card, index) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
          },
          delay: index * 0.06,
        });
      });

      gsap.utils.toArray<HTMLElement>('.grid-card').forEach((card) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('.grid-card').forEach((card) => {
        const img = card.querySelector('img');
        if (!img) return;
        gsap.fromTo(
          img,
          { scale: 1.15 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      });

      q('.stat-number').forEach((el) => {
        const target = Number(el.getAttribute('data-target'));
        const suffix = el.textContent?.includes('+') ? '+' : '';
        const obj = { value: 0 };
        gsap.to(obj, {
          value: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
          },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.value).toLocaleString()}${suffix}`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="w-full pt-20 bg-background min-h-screen">
      <GalleryHero />
      <AlbumsSection onOpen={(index) => setOpenIndex(index)} />
      <FilterBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeSanctuary={activeSanctuary}
        setActiveSanctuary={setActiveSanctuary}
      />
      <GalleryGrid activeCategory={activeCategory} activeSanctuary={activeSanctuary} onOpen={setOpenIndex} />
      <Lightbox openIndex={openIndex} onClose={() => setOpenIndex(null)} />
    </div>
  );
}
