import React, { memo } from "react";
import { useSelector } from "react-redux";
import { DeleteTrainer } from "./deleteTrainer";
import { EditTrainer } from "./editTrainer";

export const TableTrainers = memo(({ setError }) => {
  const { trainers, error } = useSelector((state) => state.settings);
  if (!trainers || trainers.length === 0) {
    return <p>No trainers available.</p>;
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {trainers.map((trainer) => (
        <div
          key={trainer._id}
          className="flex items-center border rounded-lg p-4 shadow-md"
        >
          <div className="flex-shrink-0">
            <img
              src={trainer.image}
              alt={trainer.title}
              className="h-16 w-16 object-cover rounded-md"
            />
          </div>
          <div className="flex-grow ml-4">
            <h1 className="text-lg font-semibold">{trainer.title}</h1>
            <p className="text-gray-600">{trainer.description}</p>
          </div>
          <div className="flex space-x-2">
            <EditTrainer
              setError={setError}
              id={trainer._id}
              currentData={trainer}
            />
            <DeleteTrainer id={trainer._id} />
          </div>
        </div>
      ))}
    </div>
  );
});
