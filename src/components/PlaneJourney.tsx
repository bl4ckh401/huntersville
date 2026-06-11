'use client';

import { forwardRef } from 'react';

interface PlaneProps {
  className?: string;
  style?: React.CSSProperties;
}

const Plane = forwardRef<SVGSVGElement, PlaneProps>(({ className, style }, ref) => {
  return (
    <svg
      ref={ref}
      className={className}
      style={{
        ...style,
        filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.5))',
      }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sleek modern plane silhouette, top-down view */}
      <path
        d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z"
        fill="#ffffff"
      />
    </svg>
  );
});

Plane.displayName = 'Plane';
export default Plane;
