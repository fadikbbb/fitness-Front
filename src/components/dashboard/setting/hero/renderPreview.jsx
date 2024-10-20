import React from "react";

function RenderPreview({ hero }) {
  return (
    <div className="space-y-6 p-6 border border-gray-200 rounded-lg bg-white shadow-md">
      <h2 className="text-3xl font-semibold text-gray-800">
        {hero?.heroTitle || "No Title Available"}
      </h2>
      <h2 className="text-3xl font-semibold text-gray-800">
        {hero?.companyName || "No company name Available"}
      </h2>
      <p className="text-gray-600 text-lg">
        {hero?.heroDescription || "No description available."}
      </p>
      {hero?.heroImage && (
        <div className="mt-6">
          <p className="font-medium text-gray-700">Hero Image:</p>
          <img
            src={hero?.heroImage}
            alt="Hero"
            className="mt-3 rounded-md max-w-full h-auto object-cover border border-gray-300 shadow-sm"
          />
        </div>
      )}
      {hero?.heroVideo && (
        <div className="mt-6">
          <p className="font-medium text-gray-700">Hero Video:</p>
          <video
            src={hero?.heroVideo}
            controls
            className="mt-3 rounded-md max-w-full h-auto object-cover border border-gray-300 shadow-sm"
          />
        </div>
      )}
    </div>
  );
}

export default RenderPreview;
