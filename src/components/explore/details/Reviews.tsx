import Link from 'next/link';

export default function Reviews({ reviewsCount }: { reviewsCount: number }) {
  return (
    <>
      <hr className="border-outline-variant/50 mb-lg"/>
      <section className="mb-lg">
        <div className="flex justify-between items-center mb-md">
          <h2 className="font-title-lg text-title-lg text-on-surface">Traveler Reviews</h2>
          <Link className="font-label-md text-label-md text-secondary font-semibold hover:underline underline-offset-4" href="#">
            View All {reviewsCount}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
          {/* Review 1 */}
          <div className="bg-surface-container-lowest p-md rounded-lg border border-outline-variant/30 custom-shadow-card">
            <div className="flex items-center gap-sm mb-sm">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-label-md shrink-0">
                JD
              </div>
              <div>
                <h4 className="font-label-md text-label-md font-semibold text-on-surface">Jane Doe</h4>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[14px] icon-fill text-[#F59E0B]">star</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant italic text-sm sm:text-base leading-relaxed">
              "An absolutely flawless experience. The attention to detail in the itinerary was evident, and our guide was incredibly knowledgeable. The luxury tents exceeded all expectations."
            </p>
          </div>

          {/* Review 2 */}
          <div className="bg-surface-container-lowest p-md rounded-lg border border-outline-variant/30 custom-shadow-card">
            <div className="flex items-center gap-sm mb-sm">
              <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-label-md shrink-0">
                MK
              </div>
              <div>
                <h4 className="font-label-md text-label-md font-semibold text-on-surface">Marcus K.</h4>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[14px] icon-fill text-[#F59E0B]">star</span>
                  ))}
                </div>
              </div>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant italic text-sm sm:text-base leading-relaxed">
              "The Serengeti game drives were beyond anything I have ever experienced. Worth every penny — the guides were phenomenal. Already planning my return trip!"
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
