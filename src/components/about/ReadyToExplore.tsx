import Link from 'next/link';

export default function ReadyToExplore() {
  return (
    <section className="py-xl px-gutter bg-surface-container-low">
      <div className="max-w-container-max mx-auto text-center scroll-reveal">
        <h2 className="font-headline-md text-headline-md text-primary mb-4">Ready to Experience Kenya?</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-8 leading-relaxed">
          Whether it&apos;s your first safari or your tenth, we&apos;re here to make it unforgettable. Let&apos;s plan your journey together.
        </p>
        <Link
          href="/explore"
          className="inline-flex items-center gap-xs rounded-xl bg-amber-500 px-8 py-3 font-label-md text-label-md text-white shadow-sm hover:bg-amber-600 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">explore</span>
          Start Your Journey
        </Link>
      </div>
    </section>
  );
}
