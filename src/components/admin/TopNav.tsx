import React from 'react';

interface TopNavProps {
  onMenuToggle: () => void;
}

export default function TopNav({ onMenuToggle }: TopNavProps) {
  return (
    <header className="flex justify-between items-center w-full px-sm sm:px-lg py-sm sticky top-0 z-40 bg-surface-bright shadow-sm">
      <div className="flex items-center gap-md">
        <button
          type="button"
          aria-label="Open navigation menu"
          className="md:hidden text-on-surface-variant hover:bg-surface-container-low p-xs rounded-full transition-colors"
          onClick={onMenuToggle}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h2 className="font-headline-sm text-headline-sm font-bold text-primary hidden md:block">HuntersVille</h2>
        <div className="relative hidden sm:block">
          <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-opacity-50">search</span>
          <input className="pl-xl pr-sm py-xs bg-surface-container-lowest border border-outline-variant rounded-full font-body-md text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all w-64" placeholder="Search insights..." type="text"/>
        </div>
      </div>
      <div className="flex items-center gap-sm">
        <button className="text-on-surface-variant hover:bg-surface-container-low p-sm rounded-full transition-colors relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
        </button>
        <button className="text-on-surface-variant hover:bg-surface-container-low p-sm rounded-full transition-colors hidden sm:block">
          <span className="material-symbols-outlined">help</span>
        </button>
        <button className="text-on-surface-variant hover:bg-surface-container-low p-sm rounded-full transition-colors hidden sm:block">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="w-px h-6 bg-outline-variant mx-xs hidden sm:block"></div>
        <img alt="Administrator Profile" className="w-10 h-10 rounded-full object-cover border-2 border-surface-container cursor-pointer ml-xs" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDskqZAXxWaQZrElx5DE5kI2oGSx20kMuTE6Lle6kVYvYwjG7msZB3ysHcn1MSIqGJeJybVeKeFpvGrJXOmOgRjPIEkAbtV43k36ev_ALvZR2RVJyCr0Pt0ZIaGHrHsCkGGAK3qDgke4BOtKRf7A2G18xHFEho2foCBqj4Z6Ua1vjuMXYhsWc_nm0ZvYsdizsTCan7AMX7y-cbAcsgVKZsqQ91oM4iKLz0EN-YH0jRcNvgRgpsWN34hkA_A1MQURm10LFVuBY_9"/>
      </div>
    </header>
  );
}
