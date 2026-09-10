"use client";

import { useState } from 'react';

interface ReviewItem {
  id: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
}

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`material-symbols-outlined text-[18px] ${star <= Math.round(value) ? 'text-[#F59E0B] icon-fill' : 'text-outline-variant'}`}
        >
          star
        </span>
      ))}
    </span>
  );
}

export default function Reviews({
  average,
  reviewsCount,
  reviews = [],
  experienceId,
}: {
  average: number;
  reviewsCount: number;
  reviews?: ReviewItem[];
  experienceId: string;
}) {
  const [reviewList, setReviewList] = useState(reviews);
  const [userName, setUserName] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const actualCount = reviewsCount + (reviewList.length - reviews.length);
  const displayAverage = average ? average.toFixed(1) : reviewList.length ? '5.0' : '—';
  const displayCount = actualCount || reviewList.length;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ experienceId, userName: userName.trim() || 'Anonymous Traveler', title, comment, rating }),
    });

    if (response.ok) {
      const nextReview = await response.json();
      setReviewList((current) => [nextReview, ...current]);
      setUserName('');
      setTitle('');
      setComment('');
      setRating(5);
      setMessage('Thank you for sharing your experience.');
    } else {
      const data = await response.json().catch(() => ({}));
      setMessage(data.error || 'Unable to submit review right now.');
    }
    setIsSubmitting(false);
  }

  return (
    <section id="reviews" className="mb-lg scroll-mt-[100px]">
      <div className="mb-md flex items-start gap-sm">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-on-primary-container">
          <span className="material-symbols-outlined text-[22px]">reviews</span>
        </span>
        <div className="min-w-0">
          <h2 className="font-title-lg text-[19px] leading-tight text-on-surface sm:text-title-lg">Reviews</h2>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-sm gap-y-1">
            <Stars value={average || (reviewList.length ? 5 : 0)} />
            <span className="font-label-md text-label-md font-semibold text-on-surface">{displayAverage}</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              ({displayCount} {displayCount === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-md rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-md">
        <h3 className="mb-xs font-title-md text-title-md text-on-surface">Leave a review</h3>
        <p className="mb-sm font-body-sm text-body-sm text-on-surface-variant">
          Share your experience with other travelers.
        </p>
        <div className="grid gap-sm sm:grid-cols-[1fr_1fr]">
          <input
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            className="rounded-lg border border-outline-variant bg-surface px-sm py-sm text-sm"
            placeholder="Your name (optional)"
          />
          <select
            value={rating}
            onChange={(event) => setRating(Number(event.target.value))}
            className="rounded-lg border border-outline-variant bg-surface px-sm py-sm text-sm"
          >
            {[5, 4, 3, 2, 1].map((value) => (
              <option key={value} value={value}>
                {value} stars
              </option>
            ))}
          </select>
        </div>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          className="mt-sm w-full rounded-lg border border-outline-variant bg-surface px-sm py-sm text-sm"
          placeholder="Short title"
        />
        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          required
          rows={4}
          className="mt-sm w-full rounded-lg border border-outline-variant bg-surface px-sm py-sm text-sm"
          placeholder="Share what made the experience special"
        />
        <div className="mt-sm flex flex-wrap items-center justify-between gap-sm">
          <span className="font-body-sm text-body-sm text-on-surface-variant">{message}</span>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="rounded-lg bg-primary px-md py-sm font-label-md text-label-md text-on-primary disabled:opacity-70"
          >
            {isSubmitting ? 'Submitting...' : 'Submit review'}
          </button>
        </div>
      </form>

      <div className="space-y-sm">
        {reviewList.length ? (
          reviewList.map((review) => (
            <div key={review.id} className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-md">
              <div className="mb-xs flex items-start justify-between gap-sm">
                <div className="min-w-0">
                  <h4 className="font-label-md text-label-md font-semibold text-on-surface">{review.userName}</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Stars value={review.rating} />
              </div>
              {review.title ? (
                <p className="mb-xs font-label-md text-label-md font-semibold text-on-surface">{review.title}</p>
              ) : null}
              <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="font-body-md text-body-md text-on-surface-variant">
            No reviews yet. Be the first to share your experience!
          </p>
        )}
      </div>
    </section>
  );
}
