'use client';

import React, { useState } from 'react';
import SideNav from '@/components/admin/SideNav';
import TopNav from '@/components/admin/TopNav';
import { AdminProvider } from '@/contexts/AdminContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AdminProvider>
      <div className="flex h-screen bg-surface font-body-md text-on-surface antialiased overflow-hidden">
        <SideNav isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        {isSidebarOpen ? (
          <button
            type="button"
            aria-label="Close mobile navigation"
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        ) : null}
        <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
          <TopNav onMenuToggle={() => setIsSidebarOpen((value) => !value)} />
          <main className="flex-1 overflow-y-auto p-sm sm:p-md md:p-lg lg:px-xl max-w-container-max mx-auto w-full">
            {children}
          </main>
        </div>
      </div>
    </AdminProvider>
  );
}
