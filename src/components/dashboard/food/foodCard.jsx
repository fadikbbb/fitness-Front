import React from "react";
import EditFood from "./editFood";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import DeleteFood from "./deleteFood";

function foodCard({ food, onDelete, onEdit, foodCategories }) {
  return (
    <div className="m-4 bg-white rounded-xl shadow-lg w-full md:w-3/4 lg:w-1/4">
      <div className="relative">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <div className="absolute top-2 left-2 bg-blue-500 text-white m-1 text-sm px-3 py-1 rounded-full">
          {food.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {food.name}
        </h3>
        <div className="flex flex-wrap justify-between">
          <EditFood foodCategories={foodCategories} food={food} onSuccess={onEdit} />
          <DeleteFood foodId={food._id} onSuccess={onDelete} />
          <Link
            to={`/dashboard/food/single-food/${food._id}`}
            className="md:flex items-center text-green-500 hover:text-green-700"
          >
            <FaEye className="mr-2" />
            <div className="hidden md:flex">View</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default foodCard;
