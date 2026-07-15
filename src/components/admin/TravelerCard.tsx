import React from 'react';

export interface TravelerCardProps {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  initials?: string;
  status: 'Premium' | 'Explorer' | 'New';
  totalTrips: number;
  lastBookingDate: string;
}

const TravelerCard = React.memo(function TravelerCard({
  name,
  email,
  avatarUrl,
  initials,
  status,
  totalTrips,
  lastBookingDate,
}: TravelerCardProps) {
  let statusBadgeColor = '';
  let statusIcon = '';
  let cornerBgColor = '';

  if (status === 'Premium') {
    statusBadgeColor = 'bg-primary-fixed/30 text-on-primary-fixed-variant border-primary-fixed';
    statusIcon = 'star';
    cornerBgColor = 'bg-primary-container/10';
  } else if (status === 'Explorer') {
    statusBadgeColor = 'bg-secondary-fixed/50 text-on-secondary-fixed-variant border-secondary-fixed';
    statusIcon = 'explore';
    cornerBgColor = 'bg-secondary-container/10';
  } else {
    statusBadgeColor = 'bg-surface-variant text-on-surface-variant border-outline-variant';
    statusIcon = 'fiber_new';
    cornerBgColor = 'bg-surface-variant/30';
  }

  return (
    <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest shadow-[0px_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0px_8px_30px_rgba(0,0,0,0.06)] p-md flex flex-col relative overflow-hidden group transition-all duration-300">
      <div className={`absolute top-0 right-0 w-32 h-32 ${cornerBgColor} rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500`}></div>
      <div className="flex justify-between items-start mb-md">
        <div className="flex items-center gap-sm">
          {avatarUrl ? (
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-surface-container-lowest shadow-sm">
              <img className="w-full h-full object-cover" alt={name} src={avatarUrl} />
            </div>
          ) : (
            <div className="relative w-14 h-14 rounded-full bg-surface-container-highest flex items-center justify-center border-2 border-surface-container-lowest shadow-sm text-on-surface-variant font-bold text-lg">
              {initials || name.substring(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <h3 className="font-title-lg text-title-lg text-on-surface leading-tight">{name}</h3>
            <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">{email}</p>
          </div>
        </div>
        <span className={`${statusBadgeColor} px-2 py-1 rounded-md font-label-sm text-label-sm flex items-center gap-1 border`}>
          <span className={`material-symbols-outlined text-[14px] ${status === 'Premium' ? 'filled-icon' : ''}`}>
            {statusIcon}
          </span>
          {status}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-sm mb-lg">
        <div className="bg-surface-container-low rounded-lg p-sm">
          <p className="font-label-sm text-label-sm text-outline mb-1">Total Trips</p>
          <p className="font-title-lg text-title-lg text-primary">{totalTrips}</p>
        </div>
        <div className="bg-surface-container-low rounded-lg p-sm">
          <p className="font-label-sm text-label-sm text-outline mb-1">Last Booking</p>
          <p className="font-label-md text-label-md text-on-surface mt-1">{lastBookingDate}</p>
        </div>
      </div>
      <button className="mt-auto w-full border border-primary text-primary hover:bg-primary hover:text-on-primary py-2 rounded-lg font-label-md text-label-md transition-colors">
        View Profile
      </button>
    </div>
  );
});

TravelerCard.displayName = 'TravelerCard';

export default TravelerCard;
