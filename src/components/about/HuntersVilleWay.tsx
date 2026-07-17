import Image from 'next/image';
import Link from 'next/link';

export default function HuntersVilleWay() {
  return (
    <section className="py-24 md:py-32 px-gutter bg-surface">
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-lg items-center">
        {/* Text Column */}
        <div className="lg:col-span-5 scroll-reveal md:pr-8">
          <span className="font-label-md text-label-md text-surface-tint uppercase tracking-widest mb-4 block">
            Our Story
          </span>
          <h2 className="font-headline-md text-[32px] md:text-[44px] text-primary mb-6 leading-tight">
            Every journey has a beginning
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 leading-relaxed">
            Ours started with a simple belief: that travel should feel real. Not rushed. Not crowded. Not scripted. Just real.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
            Born in Kenya and inspired by its wild beauty, our company was created to offer something different. Experiences that go beyond ticking destinations off a list. We wanted travelers to feel the rhythm of the land, to hear stories from local voices, to witness nature in its purest form.
          </p>
        </div>

        {/* Image Column */}
        <div className="lg:col-span-7 scroll-reveal mt-8 lg:mt-0">
          <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              width={1920}
              height={1080}
              alt="Kenyan savannah landscape at golden hour"
              className="w-full h-full object-cover"
              src="/safarihouse.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
