import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-24 px-gutter bg-[#011C12] text-white/80 font-body-md border-t border-white/10">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="col-span-1 md:col-span-5 pr-8">
          <span className="font-display-lg text-white block mb-6">HuntersVilleTours</span>
          <p className="text-white/70 mb-8 leading-relaxed">
            Curating unforgettable journeys for the modern explorer. Experience the world with unparalleled luxury, profound respect for nature, and impeccable service.
          </p>
          <div className="flex gap-4">
            <Link
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]">public</span>
            </Link>
            <Link
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]">mail</span>
            </Link>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2">
          <h4 className="font-title-lg font-semibold mb-6 text-white tracking-wide uppercase text-sm">Company</h4>
          <ul className="space-y-4">
            <li><Link className="hover:text-white transition-colors" href="/about">About Us</Link></li>
            <li><Link className="hover:text-white transition-colors" href="#">Sustainability</Link></li>
            <li><Link className="hover:text-white transition-colors" href="#">Careers</Link></li>
            <li><Link className="hover:text-white transition-colors" href="#">Press</Link></li>
          </ul>
        </div>
        <div className="col-span-1 md:col-span-2">
          <h4 className="font-title-lg font-semibold mb-6 text-white tracking-wide uppercase text-sm">Destinations</h4>
          <ul className="space-y-4">
            <li><Link className="hover:text-white transition-colors" href="#">East Africa</Link></li>
            <li><Link className="hover:text-white transition-colors" href="#">Southern Africa</Link></li>
            <li><Link className="hover:text-white transition-colors" href="#">Indian Ocean</Link></li>
            <li><Link className="hover:text-white transition-colors" href="#">Tailor-made</Link></li>
          </ul>
        </div>
        <div className="col-span-1 md:col-span-3">
          <h4 className="font-title-lg font-semibold mb-6 text-white tracking-wide uppercase text-sm">Newsletter</h4>
          <p className="mb-4 text-white/70 text-sm">Subscribe to receive travel inspiration and exclusive offers.</p>
          <div className="flex gap-2">
            <input
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 w-full text-white placeholder:text-white/40 focus:outline-none focus:border-white/30"
              placeholder="Email Address"
              type="email"
            />
            <button className="bg-white text-[#011C12] px-4 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-container-max mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
        <p>© 2024 HuntersVilleTours. All rights reserved.</p>
        <div className="flex gap-6">
          <Link className="hover:text-white transition-colors" href="#">Privacy Policy</Link>
          <Link className="hover:text-white transition-colors" href="#">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
