import React, { memo } from "react";
import { useSelector } from "react-redux";
import { DeleteAboutUs } from "./deleteAboutUs";
import { EditAboutUs } from "./editAboutUs";
export const TableAboutUs = memo(({ setError }) => {
  const { about, error } = useSelector((state) => state.settings);
  if (!about || about.length === 0) {
    return <p>No About Us available.</p>;
  }
  return (
    <div className="space-y-4">
      {error && <p className="text-red-500 text-sm mt-1">error view:{error}</p>}
      {about.map((About) => (
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
              setError={setError}
              id={About._id}
              currentData={About}
            />
            <DeleteAboutUs id={About._id} />{" "}
          </div>
        </div>
      ))}
    </div>
  );
});
