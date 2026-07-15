import React from 'react';

interface RevenueChartProps {
  series: Array<{ label: string; value: number }>;
}

export default function RevenueChart({ series }: RevenueChartProps) {
  const maxValue = Math.max(...series.map((item) => item.value), 1);

  return (
    <div className="glass-card rounded-xl p-md xl:col-span-3 min-h-[300px] flex flex-col">
      <div className="flex justify-between items-center mb-md">
        <h3 className="font-title-lg text-title-lg text-primary">Revenue Trends</h3>
        <button className="text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </div>
      <div className="flex-1 w-full relative flex items-end gap-2 pt-xl border-b border-l border-outline-variant pb-xs pl-xs mt-auto">
        <div className="absolute left-[-40px] top-0 bottom-0 flex flex-col justify-between text-label-sm text-outline font-label-sm pb-sm">
          <span>$40k</span>
          <span>$30k</span>
          <span>$20k</span>
          <span>$10k</span>
          <span>$0</span>
        </div>
        <div className="w-full flex justify-around items-end h-full gap-2">
          {series.map((item) => {
            const height = `${Math.max(12, (item.value / maxValue) * 100)}%`;
            return (
              <div key={item.label} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-primary-container rounded-t-sm relative group cursor-pointer transition-all hover:bg-primary" style={{ height }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-label-sm font-label-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                    {item.value ? `$${Math.round(item.value / 1000)}k` : '$0'}
                  </div>
                </div>
                <span className="text-label-sm text-outline font-label-sm">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
