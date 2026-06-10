import Image from 'next/image';
import Link from 'next/link';

export default function HuntersVilleWay() {
  return (
    <section className="py-24 md:py-32 px-gutter bg-surface">
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-lg items-center">
        {/* Text Column */}
        <div className="lg:col-span-5 scroll-reveal md:pr-8">
          <span className="font-label-md text-label-md text-surface-tint uppercase tracking-widest mb-4 block">
            Our Heritage
          </span>
          <h2 className="font-headline-md text-[32px] md:text-[44px] text-primary mb-6 leading-tight">
            The HuntersVille Way
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 leading-relaxed">
            For over three decades, we have defined the pinnacle of luxury safari experiences. Born from a profound reverence for East Africa's untamed wilderness, our journey began with a simple yet ambitious vision: to share the raw beauty of Africa without compromising on elegance or ecological integrity.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8">
            Today, HuntersVilleTours remains a testament to that enduring promise, curating bespoke adventures that resonate with the soul while fiercely protecting the lands we traverse.
          </p>
          <Link
            className="inline-flex items-center font-label-md text-label-md text-primary font-bold border-b-2 border-primary pb-1 hover:text-primary-container transition-colors group"
            href="#"
          >
            Discover Our Conservation Efforts
            <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>

        {/* Image Column */}
        <div className="lg:col-span-7 scroll-reveal mt-8 lg:mt-0">
          <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              width={1920}
              height={1080}
              alt="Luxury Safari Camp — an elevated tented lodge overlooking an open Serengeti plain at dusk"
              className="w-full h-full object-cover"
              src="/safarihouse.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
