'use client';

import { forwardRef } from 'react';

interface VehicleProps {
  className?: string;
  style?: React.CSSProperties;
}

const Yacht = forwardRef<SVGSVGElement, VehicleProps>(({ className, style }, ref) => {
  return (
    <svg
      ref={ref}
      className={className}
      style={{
        ...style,
        filter: 'drop-shadow(0px 8px 15px rgba(0,0,0,0.3))',
      }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Wake (water behind the yacht) */}
      <path d="M4 22L12 14L20 22" stroke="#ffffff" strokeWidth="0.5" strokeLinecap="round" strokeDasharray="1 2" opacity="0.6" />
      <path d="M7 23L12 16L17 23" stroke="#87CEFA" strokeWidth="0.5" strokeLinecap="round" strokeDasharray="1 2" opacity="0.8" />
      
      {/* Hull (pointy front at top, curved back) */}
      <path d="M12 1.5C8 5 6 10 6 18C6 20.5 8 22 12 22C16 22 18 20.5 18 18C18 10 16 5 12 1.5Z" fill="#F8F9FA" />
      <path d="M12 1.5C8 5 6 10 6 18C6 20.5 8 22 12 22C16 22 18 20.5 18 18C18 10 16 5 12 1.5Z" stroke="#E9ECEF" strokeWidth="0.5" />
      
      {/* Teak Wooden deck area back */}
      <path d="M8 17C8 19.5 10 20.5 12 20.5C14 20.5 16 19.5 16 17V14H8V17Z" fill="#D2B48C" />
      <line x1="9.5" y1="14" x2="9.5" y2="19.5" stroke="#C19A6B" strokeWidth="0.2" />
      <line x1="11" y1="14" x2="11" y2="20.2" stroke="#C19A6B" strokeWidth="0.2" />
      <line x1="12.5" y1="14" x2="12.5" y2="20.2" stroke="#C19A6B" strokeWidth="0.2" />
      <line x1="14.5" y1="14" x2="14.5" y2="19.5" stroke="#C19A6B" strokeWidth="0.2" />
      
      {/* Cabin / Bridge */}
      <path d="M8.5 9C8.5 7.5 9.5 6 12 6C14.5 6 15.5 7.5 15.5 9V14H8.5V9Z" fill="#FFFFFF" />
      <path d="M9 9.5C9 8.5 10 7 12 7C14 7 15 8.5 15 9.5V11H9V9.5Z" fill="#111" opacity="0.8" /> {/* Dark windshield */}
      
      {/* Front sunpad */}
      <path d="M10 5L12 3L14 5H10Z" fill="#E0F7FA" />
      
      {/* Radar arch / details */}
      <rect x="10" y="12" width="4" height="1.5" rx="0.5" fill="#CCCCCC" />
      <circle cx="12" cy="12.75" r="0.5" fill="#333" />
    </svg>
  );
});

Yacht.displayName = 'Yacht';
export default Yacht;
