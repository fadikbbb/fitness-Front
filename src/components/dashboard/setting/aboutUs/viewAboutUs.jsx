import { DeleteAboutUs } from "./deleteAboutUs";
import { EditAboutUs } from "./editAboutUs";
import React from "react";

export function TableAboutUs({ aboutUs, handleRefresh, viewError }) {
  if (!aboutUs || aboutUs.length === 0) {
    return <p>No About Us available.</p>;
  }
  console.log(aboutUs);

  return (
    <div className="space-y-4">
      {viewError && <p className="text-red-500 text-sm mt-1">{viewError}</p>}
      {aboutUs.map((About) => (
        <div key={About._id}>
          <div className="flex-shrink-0">
            <img
              src={About.image}
              alt={About.title}
              className="h-16 w-16 object-cover rounded-md"
            />
          </div>
          <div className="flex-grow ml-4">
            <h1 className="text-lg font-semibold">{About.title}</h1>
            <p className="text-gray-600">{About.description}</p>
          </div>
          <div className="flex space-x-2">
            <EditAboutUs
              id={About._id}
              currentData={About}
              handleRefresh={handleRefresh}
            />
            <DeleteAboutUs id={About._id} handleRefresh={handleRefresh} />{" "}
          </div>
        </div>
      ))}
    </div>
  );
}
