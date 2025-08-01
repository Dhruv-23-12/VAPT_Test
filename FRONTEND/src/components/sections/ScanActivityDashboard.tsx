import React from 'react';

type SummaryItem = {
  label: string;
  value: number;
  total: number;
};

const summary: SummaryItem[] = [
  { label: 'Scanned assets', value: 2, total: 5 },
  { label: 'Running scans', value: 1, total: 2 },
  { label: 'Waiting scans', value: 0, total: 100 },
  { label: 'Added assets', value: 2, total: 100 },
];

export default function ScanActivityDashboard() {
  return (
    <section
      className="w-full px-0 mt-16 mb-12"
      aria-label="Scan activity summary"
    >
      <h2 className="text-2xl font-bold text-green-400 flex items-center mb-10 pl-8">
        <span className="mr-2">⚡</span> Scan activity
      </h2>
      <div className="w-full flex justify-center">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full px-8"
          role="list"
        >
          {summary.map((item, idx) => (
            <div
              key={item.label}
              className="bg-[#182B3A] rounded-2xl p-10 flex flex-col items-center shadow-2xl border border-cyan-900 min-h-[260px] min-w-[240px] max-w-full w-full"
              role="listitem"
            >
              <span className="text-xl font-bold text-gray-100 mb-4 text-center">{item.label}</span>
              <div className="relative flex items-end mb-2">
                <svg width="90" height="90" viewBox="0 0 36 36" aria-label={`${item.label} progress`}>
                  <title>{`${item.label}: ${item.value} of ${item.total}`}</title>
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#222E3A"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831"
                    fill="none"
                    stroke="#06d6a0"
                    strokeWidth="3.5"
                    strokeDasharray={`${(item.value / item.total) * 100}, 100`}
                  />
                </svg>
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-extrabold text-cyan-300">
                  {item.value}
                </span>
              </div>
              <span className="text-lg text-gray-400">/ {item.total}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 