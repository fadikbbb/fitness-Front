import React from "react";
import EditExercise from "./editExercise";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import DeleteExercise from "./deleteExercise";
function ExerciseCard({ exercise, onDelete, onEdit, categories }) {
  return (
    <div className="m-4 bg-white rounded-xl shadow-lg md:w-[calc(50%-2rem)] lg:w-[calc(33%-2rem)] xl:[calc(25%-2rem)] w-full">
      <div className="relative w-full h-48 ">
        <img
          src={exercise.image}
          alt={exercise.name}
          className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  h-full rounded-t-xl"
        />
        <div className="absolute z-20 top-2 left-2 bg-button text-white m-1 text-xs sm:text-sm px-3 py-1 rounded-full">
          {exercise.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {exercise.name}
        </h3>
        <div className="flex flex-wrap justify-between">
          <EditExercise
            exercise={exercise}
            categories={categories}
            onSuccess={onEdit}
          />
          <DeleteExercise exerciseId={exercise._id} onSuccess={onDelete} />
          <Link
            to={`/dashboard/single-exercise/${exercise._id}`}
            className="md:flex items-center text-green-500 hover:text-green-700"
          >
            <FaEye className="w-8 h-8 sm:w-4 sm:h-4" />
            <div className="hidden md:flex">View</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ExerciseCard;
