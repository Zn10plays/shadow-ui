import React from 'react';

const PaginationSkeleton = () => (
  <div className="flex justify-center items-center gap-2">
    <div className="w-16 h-9 bg-slate-700 rounded-md"></div>
    <div className="w-9 h-9 bg-slate-600 rounded-md"></div>
    <div className="w-9 h-9 bg-slate-700 rounded-md"></div>
    <div className="w-9 h-9 bg-slate-700 rounded-md"></div>
    <div className="w-9 h-9 bg-slate-700 rounded-md"></div>
    <div className="w-9 h-9 bg-slate-700 rounded-md"></div>
    <div className="w-4 h-9 flex items-center justify-center text-slate-600">...</div>
    <div className="w-9 h-9 bg-slate-700 rounded-md"></div>
    <div className="w-16 h-9 bg-slate-700 rounded-md"></div>
  </div>
);

const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-screen-xl mx-auto animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Title Section */}
            <div className="space-y-3">
              <div className="h-9 bg-slate-700 rounded-md w-full"></div>
              <div className="h-9 bg-slate-700 rounded-md w-4/5"></div>
              <div className="h-5 bg-slate-700 rounded-md w-1/2 mt-2"></div>
            </div>

            <div className="h-px bg-slate-700 w-full"></div>

            {/* Cover and Info */}
            <div className="space-y-6">
              <div className="bg-slate-700 rounded-lg aspect-[3/4] w-full max-w-sm mx-auto lg:max-w-none"></div>

              <div className="space-y-5">
                {/* Source */}
                <div className="space-y-1.5">
                  <div className="h-4 bg-slate-700 rounded w-1/4"></div>
                  <div className="h-4 bg-slate-700 rounded w-full"></div>
                </div>
                {/* Update Cycle */}
                <div className="space-y-1.5">
                  <div className="h-4 bg-slate-700 rounded w-1/3"></div>
                  <div className="h-3 bg-slate-700 rounded w-2/5"></div>
                  <div className="h-3 bg-slate-700 rounded w-full"></div>
                  <div className="h-3 bg-slate-700 rounded w-3/4"></div>
                </div>
                {/* Chapters */}
                <div className="space-y-3 pt-2">
                  <div className="h-5 bg-slate-700 rounded w-1/4"></div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="h-4 bg-slate-700 rounded w-1/4"></div>
                    <div className="h-4 bg-slate-700 rounded w-1/5"></div>
                    <div className="h-4 bg-slate-700 rounded w-1/4"></div>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2.5">
                    <div className="bg-slate-600 h-2.5 rounded-full" style={{ width: '99%' }}></div>
                  </div>
                   <div className="h-3 bg-slate-700 rounded w-full"></div>
                   <div className="h-3 bg-slate-700 rounded w-3/5"></div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <div className="h-12 bg-slate-700 rounded-lg w-1/2"></div>
              <div className="h-12 bg-slate-700 rounded-lg w-1/2"></div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="h-8 bg-slate-700 rounded-md w-48"></div>
            <div className="bg-slate-800 rounded-lg p-2 sm:p-4">
              <PaginationSkeleton />
              
              <div className="mt-4 space-y-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="py-3 px-2 border-b border-slate-700/50">
                    <div className="h-5 bg-slate-700 rounded-md w-11/12"></div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <PaginationSkeleton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;