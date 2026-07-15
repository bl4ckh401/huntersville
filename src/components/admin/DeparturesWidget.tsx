import React from 'react';
import type { Experience } from '@/lib/content-store';

interface DeparturesWidgetProps {
  experiences: Experience[];
}

export default function DeparturesWidget({ experiences }: DeparturesWidgetProps) {
  return (
    <div className="glass-card rounded-xl p-0 flex flex-col overflow-hidden">
      <div className="p-md bg-surface-container-low border-b border-outline-variant">
        <h3 className="font-title-lg text-title-lg text-primary">Active Experiences</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-md flex flex-col gap-sm">
        {experiences.length === 0 ? (
          <p className="text-sm text-on-surface-variant">No active experiences yet.</p>
        ) : (
          experiences.map((experience) => (
            <div key={experience.id} className="flex gap-sm items-center p-sm rounded-lg hover:bg-surface-container-lowest transition-colors cursor-pointer border border-transparent hover:border-outline-variant">
              <div className="w-12 h-12 rounded bg-surface-container-high flex-shrink-0 flex flex-col items-center justify-center text-primary">
                <span className="font-label-sm text-label-sm uppercase">{experience.location.split(',').slice(-1)[0].trim()}</span>
                <span className="font-title-lg text-title-lg leading-none">{experience.duration.split(' ')[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-label-md text-label-md text-on-surface truncate">{experience.title}</h4>
                <p className="font-label-sm text-label-sm text-on-surface-variant truncate">{experience.location} • {experience.bookings} bookings</p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-sm border-t border-outline-variant text-center">
        <a href="/admin/experiences" className="font-label-md text-label-md text-primary hover:underline">Manage experiences</a>
      </div>
    </div>
  );
}
