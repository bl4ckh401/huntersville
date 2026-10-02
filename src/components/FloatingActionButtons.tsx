"use client";

export default function FloatingActionButtons() {
  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* FABs Container */}
      <div className="flex flex-col gap-3">
        {/* Call FAB */}
        <a
          href="tel:+254723388905"
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mx-auto"
          aria-label="Call Support"
          title="Call Support"
        >
          <span className="material-symbols-outlined text-[24px]">call</span>
        </a>
      </div>
    </div>
  );
}