'use client';

import { useEffect, useState, useMemo } from 'react';
import { useAdminContext } from '@/contexts/AdminContext';
import AdminPagination from '@/components/admin/AdminPagination';
import ExperienceForm from '@/components/admin/ExperienceForm';
import TripRow from '@/components/admin/TripRow';
import EmptyState from '@/components/EmptyState';
import type { Experience } from '@/lib/content-store';

export default function ExperiencesManager() {
  const { refreshKey, refresh } = useAdminContext();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/experiences')
      .then((response) => response.json())
      .then(setExperiences);
  }, [refreshKey]);

  const stats = useMemo(() => {
    return experiences.reduce(
      (acc, exp) => {
        acc.total += 1;
        if (exp.status === 'Active') acc.active += 1;
        return acc;
      },
      { total: 0, active: 0 },
    );
  }, [experiences]);

  async function handleCreate(input: Record<string, unknown>) {
    setIsSubmitting(true);
    const response = await fetch('/api/experiences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (response.ok) {
      setIsCreating(false);
      refresh();
    } else {
      alert('Failed to create experience');
    }
    setIsSubmitting(false);
  }

  async function handleUpdate(input: Record<string, unknown>) {
    if (!editingExperience) return;
    setIsSubmitting(true);
    const response = await fetch(`/api/experiences/${editingExperience.id}/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (response.ok) {
      setEditingExperience(null);
      refresh();
    } else {
      alert('Failed to update experience');
    }
    setIsSubmitting(false);
  }

  async function handleDelete(id: string) {
    const confirmation = confirm('Are you sure you want to delete this experience? This action cannot be undone.');
    if (!confirmation) return;

    const response = await fetch(`/api/experiences/${id}/update`, {
      method: 'DELETE',
    });

    if (response.ok) {
      refresh();
    } else {
      alert('Failed to delete experience');
    }
  }

  const rowData = useMemo(() => {
    return experiences.map((experience) => {
      const isDraft = experience.status === 'Draft';
      const categoryBadgeColor =
        experience.category === 'Safari'
          ? 'bg-primary-fixed text-on-primary-fixed-variant border-primary-fixed-dim'
          : experience.category === 'Coastal'
            ? 'bg-secondary-fixed text-on-secondary-fixed-variant border-secondary-fixed-dim'
            : 'bg-surface-container text-on-surface-variant border-outline-variant';
      const statusColor =
        experience.status === 'Active'
          ? 'bg-primary'
          : 'bg-outline-variant border border-outline';
      const statusText = experience.status === 'Active' ? 'text-primary' : 'text-outline';

      return { experience, isDraft, categoryBadgeColor, statusColor, statusText };
    });
  }, [experiences]);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-lg gap-md">
        <div>
          <h1 className="font-headline-md text-headline-md text-primary mb-xs">Experience Manager</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Curate and oversee global travel packages.</p>
        </div>
        <button
          onClick={() => {
            setIsCreating(true);
            setEditingExperience(null);
          }}
          className="bg-secondary hover:bg-secondary-container text-on-secondary hover:text-on-secondary-container font-label-md text-label-md py-sm px-lg rounded-xl flex items-center justify-center gap-sm transition-colors shadow-sm whitespace-nowrap border border-transparent"
        >
          <span className="material-symbols-outlined text-[18px]">add_location_alt</span>
          Create Experience
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-md mb-lg">
        <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-md shadow-[0px_4px_20px_rgba(0,0,0,0.02)]">
          <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Total Experiences</p>
          <p className="font-title-lg text-title-lg text-primary">{stats.total}</p>
        </div>
        <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-md shadow-[0px_4px_20px_rgba(0,0,0,0.02)]">
          <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">Active Listings</p>
          <p className="font-title-lg text-title-lg text-primary">{stats.active}</p>
        </div>
      </div>

      {(isCreating || editingExperience) && (
        <ExperienceForm
          experience={editingExperience}
          submitting={isSubmitting}
          onSubmit={editingExperience ? handleUpdate : handleCreate}
          onCancel={() => {
            setIsCreating(false);
            setEditingExperience(null);
          }}
        />
      )}

      <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest shadow-[0px_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
        {experiences.length === 0 ? (
          <div className="p-lg">
            <EmptyState
              icon="travel_explore"
              title="No experiences yet"
              description="Create your first travel experience to start building your catalog. Use the Create Experience button above to add details, pricing, and itinerary."
            />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-surface-variant bg-surface-container-low/50">
                    <th className="py-sm px-md font-label-sm text-label-sm text-on-surface-variant font-semibold">Experience Details</th>
                    <th className="py-sm px-md font-label-sm text-label-sm text-on-surface-variant font-semibold">Category</th>
                    <th className="py-sm px-md font-label-sm text-label-sm text-on-surface-variant font-semibold">Price (USD)</th>
                    <th className="py-sm px-md font-label-sm text-label-sm text-on-surface-variant font-semibold">Active Bookings</th>
                    <th className="py-sm px-md font-label-sm text-label-sm text-on-surface-variant font-semibold">Status</th>
                    <th className="py-sm px-md font-label-sm text-label-sm text-on-surface-variant font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-variant">
                  {rowData.map(({ experience, isDraft, categoryBadgeColor, statusColor, statusText }) => (
                    <TripRow
                      key={experience.id}
                      trip={experience}
                      isDraft={isDraft}
                      categoryBadgeColor={categoryBadgeColor}
                      statusColor={statusColor}
                      statusText={statusText}
                      onEdit={(exp) => {
                        setEditingExperience(exp);
                        setIsCreating(false);
                      }}
                      onDelete={handleDelete}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <AdminPagination
              className="px-md py-sm flex flex-col sm:flex-row items-center justify-between"
              currentPage={1}
              totalPages={Math.ceil(experiences.length / 10) || 1}
              label={`Showing 1-${experiences.length} of ${experiences.length} Experiences`}
            />
          </>
        )}
      </div>
    </>
  );
}
