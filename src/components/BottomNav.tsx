'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const links = [
    { href: '/explore', label: 'Explore', icon: 'search', activeOn: ['/', '/explore'] },
    { href: '/about', label: 'About', icon: 'tour', activeOn: ['/about'] },
    { href: '/profile', label: 'Profile', icon: 'person', activeOn: ['/profile'] },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-t border-outline-variant/30 pb-6 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center relative h-16 px-2 mt-1">
        {links.map(({ href, label, icon, activeOn }) => {
          const isActive = activeOn.includes(pathname) || (href !== '/' && pathname.startsWith(href));
          return (
            <Link key={href} href={href} className="flex flex-col items-center justify-center flex-1 h-full relative group z-10 w-full">
              
              {/* The Depression Hole (Downward Arc) */}
              <div 
                className={`absolute transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-full
                ${isActive 
                  ? 'w-14 h-14 bg-black/[0.04] dark:bg-black/40 shadow-[inset_0_6px_12px_rgba(0,0,0,0.15)] dark:shadow-[inset_0_6px_12px_rgba(0,0,0,0.6)] border-t border-black/5 dark:border-white/5 opacity-100 translate-y-0' 
                  : 'w-10 h-10 bg-transparent opacity-0 -translate-y-4'}`}
              ></div>
              
              {/* The Icon */}
              <span 
                className={`material-symbols-outlined text-[26px] relative z-20 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                ${isActive 
                  ? 'text-primary icon-fill translate-y-0 scale-110 drop-shadow-sm' 
                  : 'text-on-surface-variant group-hover:text-primary -translate-y-2'}`}
              >
                {icon}
              </span>
              
              {/* The Label */}
              <span 
                className={`font-label-sm text-[10px] tracking-wide absolute bottom-0 z-20 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                ${isActive 
                  ? 'text-primary opacity-0 translate-y-4 scale-75' 
                  : 'text-on-surface-variant opacity-100 translate-y-0 scale-100'}`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
