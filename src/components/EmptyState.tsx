import React from 'react';
import Link from 'next/link';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  imageUrl?: string;
}

export default function EmptyState({
  icon = 'inbox',
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
  imageUrl,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-xl px-gutter text-center">
      <div className="relative mb-6">
        <div className="absolute inset-0 -z-10 m-auto h-20 w-20 rounded-full bg-primary/5 blur-xl" aria-hidden="true" />
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-32 h-32 object-contain opacity-70" />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-outline-variant/60 bg-surface-container-high">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant">{icon}</span>
          </div>
        )}
      </div>
      <h3 className="font-headline-md text-headline-md text-on-surface mb-2">{title}</h3>
      <p className="font-body-md text-body-md text-on-surface-variant w-full mb-6">{description}</p>
      {actionLabel && (onAction || actionHref) && (
        actionHref ? (
          <Link
            href={actionHref}
            className="inline-flex items-center gap-2 px-md py-sm bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors"
          >
            {actionLabel}
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        ) : (
          <button
            onClick={onAction}
            className="inline-flex items-center gap-2 px-md py-sm bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors"
          >
            {actionLabel}
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        )
      )}
    </div>
  );
}
