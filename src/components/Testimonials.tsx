'use client';

import { useEffect, useRef, useState } from 'react';
import type { Review } from '@/lib/content-store';

const FALLBACK_TESTIMONIALS = [
  {
    id: 'fallback-1',
    userName: 'Eleanor Vance',
    comment: 'An absolutely breathtaking experience. The attention to detail and profound respect for the local environment made this the trip of a lifetime.',
    title: 'Kenya Safari Explorer, 2023',
    rating: 5,
    createdAt: '2023-11-01T00:00:00.000Z',
  },
  {
    id: 'fallback-2',
    userName: 'Marcus Chen',
    comment: 'HuntersVille crafted a journey that went beyond anything we imagined. Every moment felt intentional, every vista unforgettable.',
    title: 'Tanzania Cultural Expedition, 2024',
    rating: 5,
    createdAt: '2024-03-15T00:00:00.000Z',
  },
  {
    id: 'fallback-3',
    userName: 'Sofia Andersson',
    comment: 'From the seamless logistics to the deeply immersive experiences, this was pure luxury with soul. We left changed.',
    title: 'Uganda Gorilla Trek, 2024',
    rating: 5,
    createdAt: '2024-06-20T00:00:00.000Z',
  },
];

interface TestimonialsProps {
  reviews?: Review[];
}

export default function Testimonials({ reviews }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const testimonials = reviews && reviews.length > 0 ? reviews : FALLBACK_TESTIMONIALS;
  const current = testimonials[currentIndex];

  const goTo = (index: number) => {
    setCurrentIndex(index);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    intervalRef.current = setInterval(goNext, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <section className="mx-auto px-gutter pt-lg pb-md scroll-reveal bg-surface-container-low rounded-3xl shadow-sm">
      <div className="relative max-w-3xl mx-auto px-4 py-12">
        <span className="material-symbols-outlined text-[56px] text-primary/20 mb-8 absolute top-6 left-1/2 -translate-x-1/2">
          format_quote
        </span>

        <div className="relative overflow-hidden min-h-[220px] flex flex-col items-center text-center">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out px-4 ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <p className="font-display-lg-mobile text-primary italic mb-10 leading-tight">
                &quot;{testimonial.comment}&quot;
              </p>
              <div className="flex flex-col items-center">
                <p className="font-title-lg text-on-surface font-bold mb-1">{testimonial.userName}</p>
                <p className="font-body-md text-on-surface-variant">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={goPrev}
            className="p-2 rounded-full text-on-surface-variant hover:text-primary transition-colors"
            aria-label="Previous testimonial"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>

          <div className="flex items-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-2.5 h-2.5 bg-primary'
                    : 'w-2.5 h-2.5 bg-primary/20 hover:bg-primary/40'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            className="p-2 rounded-full text-on-surface-variant hover:text-primary transition-colors"
            aria-label="Next testimonial"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
      </div>
    </section>
  );
}
