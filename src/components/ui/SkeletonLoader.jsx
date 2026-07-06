import React from 'react';

export function SkeletonLine({ className = '', width = 'w-full', height = 'h-3' }) {
  return (
    <div 
      className={`bg-gym-gray-800 animate-pulse rounded-md ${width} ${height} ${className}`}
    />
  );
}

export function SkeletonCard({ className = '' }) {
  return (
    <div className={`glass-card p-6 rounded-2xl border border-gym-gray-800 space-y-4 bg-gym-gray-900/40 animate-pulse ${className}`}>
      <div className="flex justify-between items-center">
        <SkeletonLine width="w-1/3" height="h-4" />
        <div className="w-8 h-8 bg-gym-gray-800 rounded-lg" />
      </div>
      <SkeletonLine width="w-2/3" height="h-8" />
      <SkeletonLine width="w-1/2" height="h-3.5" />
    </div>
  );
}

export function SkeletonTable({ rows = 4, cols = 5 }) {
  return (
    <div className="w-full bg-gym-gray-900/20 border border-gym-gray-800 rounded-2xl p-6 space-y-4 animate-pulse">
      <div className="flex justify-between border-b border-gym-gray-800 pb-3">
        {Array.from({ length: cols }).map((_, i) => (
          <SkeletonLine key={i} width="w-20" height="h-4" />
        ))}
      </div>
      <div className="space-y-4">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex justify-between items-center py-2">
            {Array.from({ length: cols }).map((_, c) => (
              <SkeletonLine key={c} width={c === 0 ? 'w-32' : 'w-16'} height="h-3" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 4, className = '' }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

const SkeletonLoader = {
  Line: SkeletonLine,
  Card: SkeletonCard,
  Table: SkeletonTable,
  Grid: SkeletonGrid
};

export default SkeletonLoader;
