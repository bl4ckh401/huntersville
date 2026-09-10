'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';

const links = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/explore', label: 'Explore', icon: 'search' },
  { href: '/gallery', label: 'Gallery', icon: 'photo_library' },
  { href: '/about', label: 'About', icon: 'tour' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 z-50 w-full pb-[env(safe-area-inset-bottom)]">
      <div className="mx-4 mb-3 flex items-center justify-between rounded-[28px] border border-outline-variant/40 bg-surface/80 px-2 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
        {links.map(({ href, label, icon }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? 'page' : undefined}
              className="relative flex flex-1 flex-col items-center justify-center py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-2xl"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-x-1 inset-y-0 rounded-2xl bg-primary/10"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 500, damping: 34 }
                  }
                />
              )}

              <motion.span
                whileTap={{ scale: 0.85 }}
                className={`material-symbols-outlined relative z-10 text-[24px] transition-colors duration-200 ${
                  isActive ? 'text-primary icon-fill' : 'text-on-surface-variant'
                }`}
              >
                {icon}
              </motion.span>

              <span
                className={`relative z-10 mt-0.5 text-[11px] font-medium transition-opacity duration-200 ${
                  isActive ? 'text-primary opacity-100' : 'text-on-surface-variant opacity-70'
                }`}
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