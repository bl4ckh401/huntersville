import Link from 'next/link';

export default function AboutPhilosophy() {
  return (
    <section className="py-xl px-gutter max-w-container-max mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg items-center">
        <div className="order-2 md:order-1 scroll-reveal">
          <h2 className="font-headline-md text-headline-md text-primary mb-md">Our Philosophy</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-md leading-relaxed">
            We believe that travel should be transformative—not just for the traveler, but for the land and the people who call it home. Our approach to safari curation is rooted in a deep respect for the natural world and a commitment to authentic, unhurried exploration.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
            By meticulously designing every journey, we ensure that our guests experience the raw beauty of East Africa without leaving a heavy footprint, preserving these wild spaces for generations to come.
          </p>
          <Link
            className="inline-flex items-center font-label-md text-label-md text-primary font-bold border-b-2 border-primary pb-1 hover:text-primary-container transition-colors group"
            href="#"
          >
            Discover Our Conservation Efforts
            <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
        <div className="order-1 md:order-2 scroll-reveal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Close-up portrait of an African elephant in the wild, emphasizing its textured skin and wise eyes."
            className="w-full h-auto rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAH1XGeXdTi7Zz2_KCU3ddaNHb6c1AVVMCIa4xjH1tMjI_rtOZ7_sm631UaKXGll__dCcoF0GI5_JRJm3HSZupCtPqesJYrbL700jFXB9cis0Fe-v-SdiThBZ2RTozuHc18zpR1KYntgExyCkJkzJ7HQvj1eU8Wj9LuOn1lQIXue3oJl3Cp4OzETecR8jFu5aBDZqfvRTGfG3OrrWyIqImttulTzzYqaLz3qqyfsF5dYIwiUfNDcsW0aX5jvqAct4K-GN3i7a5e"
          />
        </div>
      </div>
    </section>
  );
}
