'use client';

import { forwardRef } from 'react';

interface VehicleProps {
  className?: string;
  style?: React.CSSProperties;
}

const SafariCar = forwardRef<SVGSVGElement, VehicleProps>(({ className, style }, ref) => {
  return (
    <svg
      ref={ref}
      className={className}
      style={{
        ...style,
        filter: 'drop-shadow(0px 8px 12px rgba(0,0,0,0.4))',
      }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body */}
      <rect x="5" y="2" width="14" height="20" rx="2" fill="#4B5320" />
      {/* Roof Canvas / Rack */}
      <rect x="6" y="6" width="12" height="10" rx="1" fill="#C2B280" />
      {/* Tires */}
      <rect x="3" y="4" width="2" height="4" rx="1" fill="#111" />
      <rect x="19" y="4" width="2" height="4" rx="1" fill="#111" />
      <rect x="3" y="16" width="2" height="4" rx="1" fill="#111" />
      <rect x="19" y="16" width="2" height="4" rx="1" fill="#111" />
      {/* Windshield */}
      <rect x="6" y="4" width="12" height="2" fill="#87CEFA" fillOpacity="0.6" />
      {/* Front Bumper / Grill */}
      <rect x="8" y="1.5" width="8" height="1" fill="#333" />
      {/* Spare Tire */}
      <circle cx="12" cy="20.5" r="2.5" fill="#111" />
      <circle cx="12" cy="20.5" r="1" fill="#555" />
    </svg>
  );
});

SafariCar.displayName = 'SafariCar';
export default SafariCar;
