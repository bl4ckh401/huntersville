import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-gutter py-4 bg-surface/80 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="max-w-container-max mx-auto w-full flex justify-between items-center px-4 md:px-0">
        <div className="flex items-center gap-md">
          <Link
            className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary scale-101 hover:shadow-md active:scale-95 transition-transform"
            href="/"
          >
            HuntersVilleTours
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-lg">
          <ul className="flex items-center gap-md font-label-md text-label-md">
            <li>
              <Link className="text-primary font-bold border-b-2 border-primary py-1" href="/">
                Explore
              </Link>
            </li>
            <li>
              <Link className="text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-all duration-200 py-1 px-2 rounded" href="/build">
                Build Journey
              </Link>
            </li>
            <li>
              <Link className="text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-all duration-200 py-1 px-2 rounded" href="/dashboard">
                Dashboard
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
