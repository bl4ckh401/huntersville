"use client";

import React from 'react';

export interface AdminPaginationProps {
  currentPage: number;
  totalPages: number;
  label?: string;
  onPageChange?: (page: number) => void;
  className?: string;
}

export default function AdminPagination({
  currentPage = 1,
  totalPages = 3,
  label,
  onPageChange,
  className,
}: AdminPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const wrapperClass = className !== undefined 
    ? className 
    : "mt-lg flex flex-col sm:flex-row justify-between items-center gap-sm bg-surface-container-lowest p-sm rounded-lg subtle-shadow border border-outline-variant/30";

  return (
    <div className={wrapperClass}>
      {label && (
        <span className="font-label-sm text-label-sm text-on-surface-variant px-sm">{label}</span>
      )}
      <div className="flex gap-xs sm:ml-auto">
        <button 
          className="p-2 rounded-md border border-outline-variant text-on-surface-variant hover:bg-surface-container-low disabled:opacity-50 transition-colors" 
          disabled={currentPage === 1}
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
        >
          <span className="material-symbols-outlined text-[18px]">chevron_left</span>
        </button>
        
        {pages.map(page => (
          <button 
            key={page}
            className={`w-8 h-8 rounded-md font-label-md text-label-md flex items-center justify-center transition-colors ${
              currentPage === page 
                ? 'bg-primary text-on-primary' 
                : 'hover:bg-surface-container-low text-on-surface'
            }`}
            onClick={() => onPageChange && onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button 
          className="p-2 rounded-md border border-outline-variant text-on-surface-variant hover:bg-surface-container-low disabled:opacity-50 transition-colors"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
        >
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
