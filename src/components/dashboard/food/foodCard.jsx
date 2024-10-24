import React from "react";
import EditFood from "./editFood";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import DeleteFood from "./deleteFood";

function foodCard({ food, handleRefresh }) {
  return (
    <div className="flex flex-col justify-between bg-white rounded-xl shadow-lg md:w-[calc(50%-2rem)] lg:w-[calc(33%-2rem)] xl:[calc(25%-2rem)] w-full">
      <div className="relative">
        <img
          src={food.image}
          alt={food.name}
          className="rounded-t-xl h-[240px] w-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-button text-white m-1 text-sm px-3 py-1 rounded-full">
          {food.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-text mb-2">{food.name}</h3>
        <div className="flex flex-wrap justify-between">
          <EditFood food={food} onEdit={handleRefresh} />
          <DeleteFood foodId={food._id} onDelete={handleRefresh} />
          <Link
            to={`/dashboard/food/${food._id}`}
            className="md:flex items-center text-white p-2 rounded-lg bg-green-500 hover:bg-green-700"
          >
            <FaEye className="w-4 h-4 flex md:hidden" />
            <div className="hidden md:flex">View</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default foodCard;
