"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-gutter py-4 bg-surface/80 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="max-w-container-max mx-auto w-full flex justify-between items-center px-4 md:px-0">
        <div className="flex items-center gap-md">
          <Link
            className="font-display-lg text-display-md-mobile md:text-display-md text-primary"
            href="/"
          >
            HuntersVilleTours
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-lg">
          <ul className="flex items-center gap-md font-label-md text-label-md">
            <li>
              <Link className={`${pathname === '/explore' ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'} transition-all duration-200 py-1 px-2 rounded`} href="/explore">
                Explore
              </Link>
            </li>
            <li>
              <Link className={`${pathname === '/about' ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'} transition-all duration-200 py-1 px-2 rounded`} href="/about">
                About HuntersVille
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-sm">
          {/* Search Icon for Mobile */}
          <button className="md:hidden text-on-surface-variant p-2 rounded-full hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined">search</span>
          </button>
          <button className="bg-primary text-on-primary font-label-md text-label-md px-4 py-2 rounded-full hover:shadow-md hover:scale-101 active:scale-95 transition-all shadow-[0_2px_0_rgba(0,0,0,0.1)]">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
