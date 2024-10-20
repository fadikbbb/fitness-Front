import React from "react";

function SkeletonBody() {
  return (
    <div className="animate-pulse space-y-4">
      {/* Search and Add Exercise Section */}
      <div className="flex justify-between mb-4">
        <div className="w-[70%] h-10 bg-gray-300 rounded-md" />
        <div className="w-20 h-10 bg-gray-300 rounded-md" />
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-md p-4 space-y-4">
        <div className="w-full h-10 bg-gray-300 rounded-md" />
        <div className="flex justify-between space-x-2">
          <div className="w-1/3 h-10 bg-gray-300 rounded-md" />
          <div className="w-1/3 h-10 bg-gray-300 rounded-md" />
          <div className="w-1/3 h-10 bg-gray-300 rounded-md" />
        </div>
      </div>

      {/* Exercise Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="bg-gray-300 h-40 rounded-md"
            />
          ))}
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center space-x-4 mt-6">
        <div className="w-20 h-10 bg-gray-300 rounded-md" />
        <div className="w-10 h-10 bg-gray-300 rounded-md" />
        <div className="w-20 h-10 bg-gray-300 rounded-md" />
      </div>
    </div>
  );
}

export default SkeletonBody;
