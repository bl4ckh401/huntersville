"use client";

import { useEffect, useState } from 'react';

interface ReviewItem {
  id: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
}

export default function Reviews({ reviewsCount, highlights = [], reviews = [], experienceId }: { reviewsCount: number; highlights?: string[]; reviews?: ReviewItem[]; experienceId: string }) {
  const visitorHighlights = highlights.length ? highlights : ['Flexible pacing', 'Personalized support', 'Premium guidance'];
  const [reviewList, setReviewList] = useState(reviews);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();
        setIsSignedIn(Boolean(data.user));
      } catch {
        setIsSignedIn(false);
      }
    }

    loadProfile();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ experienceId, title, comment, rating }),
    });

    if (response.ok) {
      const nextReview = await response.json();
      setReviewList((current) => [nextReview, ...current]);
      setTitle('');
      setComment('');
      setRating(5);
      setMessage('Thank you for sharing your experience.');
    } else {
      const data = await response.json().catch(() => ({}));
      setMessage(data.error || 'Unable to submit review right now.');
    }
  }

  return (
    <>
      <hr className="mb-lg border-outline-variant/50" />
      <section className="mb-lg">
        <div className="mb-md flex items-center justify-between">
          <h2 className="font-title-lg text-title-lg text-on-surface">Traveler Highlights</h2>
          <span className="font-label-md text-label-md font-semibold text-secondary">{reviewsCount} guest notes</span>
        </div>

        <div className="mb-lg grid grid-cols-1 gap-md sm:grid-cols-2">
          {visitorHighlights.map((highlight, index) => (
            <div key={highlight} className="rounded-lg border border-outline-variant/30 bg-surface-container-lowest p-md custom-shadow-card">
              <div className="mb-sm flex items-center gap-sm">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-label-md ${index % 2 === 0 ? 'bg-primary-container text-on-primary-container' : 'bg-secondary-container text-on-secondary-container'}`}>
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-label-md text-label-md font-semibold text-on-surface">Guest favorite</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">Reviewed by recent travelers</p>
                </div>
              </div>
              <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">{highlight}</p>
            </div>
          ))}
        </div>

        {isSignedIn ? (
          <form onSubmit={handleSubmit} className="mb-lg rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-md">
            <h3 className="mb-sm font-title-md text-title-md text-on-surface">Leave a review</h3>
            <p className="mb-sm font-body-md text-body-md text-on-surface-variant">Only travelers with a confirmed booking for this experience can submit feedback.</p>
            <div className="grid gap-sm md:grid-cols-[1fr_140px]">
              <input value={title} onChange={(event) => setTitle(event.target.value)} required className="rounded-lg border border-outline-variant bg-surface px-sm py-sm" placeholder="Short title" />
              <select value={rating} onChange={(event) => setRating(Number(event.target.value))} className="rounded-lg border border-outline-variant bg-surface px-sm py-sm">
                {[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} stars</option>)}
              </select>
            </div>
            <textarea value={comment} onChange={(event) => setComment(event.target.value)} required rows={4} className="mt-sm w-full rounded-lg border border-outline-variant bg-surface px-sm py-sm" placeholder="Share what made the experience special" />
            <div className="mt-sm flex items-center justify-between gap-sm">
              <span className="font-body-md text-body-md text-on-surface-variant">{message}</span>
              <button type="submit" className="rounded-lg bg-primary px-md py-sm text-on-primary">Submit review</button>
            </div>
          </form>
        ) : null}

        <div className="space-y-md">
          {reviewList.length ? reviewList.map((review) => (
            <div key={review.id} className="rounded-lg border border-outline-variant/30 bg-surface-container-lowest p-md">
              <div className="mb-sm flex items-center justify-between gap-sm">
                <div>
                  <h4 className="font-label-md text-label-md font-semibold text-on-surface">{review.userName}</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">{new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="rounded-full bg-primary-container px-sm py-xs font-label-sm text-label-sm text-on-primary-container">{review.rating}/5</div>
              </div>
              <p className="mb-xs font-label-md text-label-md font-semibold text-on-surface">{review.title}</p>
              <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">{review.comment}</p>
            </div>
          )) : <p className="font-body-md text-body-md text-on-surface-variant">No verified reviews yet. Once travelers complete a booking, their feedback will appear here.</p>}
        </div>
      </section>
    </>
  );
}
