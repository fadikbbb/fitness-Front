import { DeleteService } from "./deleteService";
import { EditService } from "./editService";
import React from "react";

export function TableServices({ services, handleRefresh }) {
  if (!services || services.length === 0) {
    return <p>No services available.</p>; // Handle empty state
  }

  return (
    <div className="space-y-4">
      {services.map((service) => (
        <div
          key={service._id}
          className="flex items-center border rounded-lg p-4 shadow-md"
        >
          <div className="flex-shrink-0">
            <img
              src={service.image}
              alt={service.title}
              className="h-16 w-16 object-cover rounded-md"
            />
          </div>
          <div className="flex-grow ml-4">
            <h1 className="text-lg font-semibold">{service.title}</h1>
            <p className="text-gray-600">{service.description}</p>
          </div>
          <div className="flex space-x-2">
            <EditService
              id={service._id}
              currentData={service}
              handleRefresh={handleRefresh}
            />
            <DeleteService id={service._id} handleRefresh={handleRefresh} />{" "}
            {/* Pass handleRefresh to DeleteService */}
          </div>
        </div>
      ))}
    </div>
  );
}
