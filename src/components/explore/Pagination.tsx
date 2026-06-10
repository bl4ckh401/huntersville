export default function Pagination() {
  return (
    <div className="mt-lg flex justify-center gap-2">
      <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors">
        <span className="material-symbols-outlined text-[20px]">chevron_left</span>
      </button>
      <button className="w-10 h-10 rounded-full bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center">1</button>
      <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors font-label-md text-label-md">2</button>
      <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors font-label-md text-label-md">3</button>
      <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors">
        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
      </button>
    </div>
  );
}
