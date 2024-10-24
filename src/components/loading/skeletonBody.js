import React from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonBody() {
  return (
    <div className="space-y-4">
      {/* Search and Add Exercise Section */}
      <div className="flex justify-between mb-4">
        <Skeleton width="70%" height={40} borderRadius={8} />
        <Skeleton width={80} height={40} borderRadius={8} />
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-md p-4 space-y-4">
        <Skeleton width="100%" height={40} borderRadius={8} />
        <div className="flex justify-between space-x-2">
          <Skeleton width="33%" height={40} borderRadius={8} />
          <Skeleton width="33%" height={40} borderRadius={8} />
          <Skeleton width="33%" height={40} borderRadius={8} />
        </div>
      </div>

      {/* Exercise Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} height={160} borderRadius={8} />
          ))}
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center space-x-4 mt-6">
        <Skeleton width={80} height={40} borderRadius={8} />
        <Skeleton width={40} height={40} borderRadius={8} />
        <Skeleton width={80} height={40} borderRadius={8} />
      </div>
    </div>
  );
}

export default SkeletonBody;
