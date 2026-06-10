'use client';

import { useState, useCallback } from 'react';

interface GalleryImage {
  src: string;
  alt: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback((total: number) => {
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex - 1 + total) % total);
    else setCarouselIndex((carouselIndex - 1 + total) % total);
  }, [lightboxIndex, carouselIndex]);

  const next = useCallback((total: number) => {
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex + 1) % total);
    else setCarouselIndex((carouselIndex + 1) % total);
  }, [lightboxIndex, carouselIndex]);

  const total = images.length;
  const main = images[0];
  const secondary = images.slice(1, 3);

  return (
    <>
      {/* ─── Mobile Carousel ─── */}
      <div className="md:hidden relative w-full h-64 rounded-xl overflow-hidden mb-md group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[carouselIndex].src}
          alt={images[carouselIndex].alt}
          className="w-full h-full object-cover transition-all duration-500 cursor-pointer"
          onClick={() => openLightbox(carouselIndex)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Arrows */}
        <button onClick={() => prev(total)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm text-white rounded-full p-1 hover:bg-black/60 transition-colors z-10">
          <span className="material-symbols-outlined text-[20px]">chevron_left</span>
        </button>
        <button onClick={() => next(total)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm text-white rounded-full p-1 hover:bg-black/60 transition-colors z-10">
          <span className="material-symbols-outlined text-[20px]">chevron_right</span>
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button key={i} onClick={() => setCarouselIndex(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${i === carouselIndex ? 'bg-white scale-125' : 'bg-white/50'}`} />
          ))}
        </div>

        {/* Gallery count badge */}
        <button onClick={() => openLightbox(carouselIndex)} className="absolute bottom-3 right-3 bg-surface/90 backdrop-blur-sm text-primary px-sm py-xs rounded-full font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-xs shadow-sm z-10">
          <span className="material-symbols-outlined text-[14px]">photo_camera</span> {total} Photos
        </button>
      </div>

      {/* ─── Desktop Bento Grid ─── */}
      <section className="hidden md:grid grid-cols-4 grid-rows-2 gap-sm mb-lg h-[500px] lg:h-[600px]">
        {/* Main Hero Image */}
        <div
          className="col-span-3 row-span-2 relative rounded-lg overflow-hidden group cursor-pointer"
          onClick={() => openLightbox(0)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={main.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={main.src} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          <div className="absolute bottom-md left-md">
            <span className="bg-surface/90 backdrop-blur-sm text-primary px-sm py-xs rounded-full font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-xs shadow-sm">
              <span className="material-symbols-outlined text-[14px]">photo_camera</span> Gallery ({total})
            </span>
          </div>
          {/* View all overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="bg-black/40 backdrop-blur-sm text-white font-label-md text-label-md px-md py-sm rounded-full flex items-center gap-xs">
              <span className="material-symbols-outlined text-[18px]">open_in_full</span> View Photos
            </span>
          </div>
        </div>

        {secondary.map((img, i) => (
          <div
            key={i}
            className="col-span-1 row-span-1 relative rounded-lg overflow-hidden group cursor-pointer"
            onClick={() => openLightbox(i + 1)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={img.src} />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity text-[32px]">open_in_full</span>
            </div>
          </div>
        ))}
      </section>

      {/* ─── Lightbox Modal ─── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors z-10"
            onClick={closeLightbox}
          >
            <span className="material-symbols-outlined text-[28px]">close</span>
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prev(total); }}
          >
            <span className="material-symbols-outlined text-[28px]">chevron_left</span>
          </button>

          <div className="relative max-w-5xl max-h-[85vh] mx-8" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            <p className="text-white/70 text-center text-sm mt-3 font-label-sm">
              {lightboxIndex + 1} / {total}
            </p>
          </div>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); next(total); }}
          >
            <span className="material-symbols-outlined text-[28px]">chevron_right</span>
          </button>

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === lightboxIndex ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
