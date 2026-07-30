"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideNav({ isOpen, onClose }: SideNavProps) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', icon: 'dashboard', href: '/admin' },
    { name: 'Experiences', icon: 'flight', href: '/admin/experiences' },
    { name: 'Travelers', icon: 'group', href: '/admin/travelers' },
  ];

  return (
    <nav className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col p-md gap-base border-r border-outline-variant bg-surface-container-low transition-transform duration-300 md:translate-x-0 md:static md:h-screen ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center gap-sm mb-lg px-sm">
        <img alt="HuntersVille Logo" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZi3Iqbq5OCtz5h2zBCLfzgzJyhBlZPSd8LU513mbtqGDyrJDAClSEeZXwK70atF0k9bAcmK0COVQxjkb6CD7rwLBycbVc7IqYRtWYT2pqyMZ4cxHnIVllAx8grDakIS-AoMvY1g4px43lOK9q_zSFkcxzZ8L5_1_RW1MgCvqn4bsyWlvmjxIZPJuiuWanUwCQcEN88MZeBkQU2MrCnfJNjFJDivtYXdr4IaA9Fd8TH6oy8wqDwgHUqywtpvdeTFFhvEvOupEh" />
        <div>
          <p className="font-label-sm text-label-sm text-on-surface-variant">HuntersVille</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-xs">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-sm px-sm py-sm rounded-lg transition-all ${isActive
                ? 'bg-primary-container text-on-primary-container font-bold shadow-sm translate-x-1'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                }`}
            >
              <span
                className={`material-symbols-outlined ${isActive ? 'filled-icon' : ''}`}
                style={isActive ? { fontVariationSettings: `"FILL" 1` } : {}}
              >
                {item.icon}
              </span>
              <span className="font-label-md text-label-md">{item.name}</span>
            </Link>
          );
        })}
      </div>
      <div className="mt-auto pt-md border-t border-outline-variant flex flex-col gap-xs">
        <Link href="/admin/experiences" onClick={onClose} className="w-full py-sm bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity mb-sm shadow-[0_2px_0_rgba(0,0,0,0.1)] flex items-center justify-center gap-sm">
          <span className="material-symbols-outlined text-[20px]">add</span>
          New Experience
        </Link>
        <Link onClick={onClose} className="flex items-center gap-sm px-sm py-sm rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container transition-all" href="/login">
          <span className="material-symbols-outlined">logout</span>
          <span className="font-label-md text-label-md">Logout</span>
        </Link>
      </div>
    </nav>
  );
}
