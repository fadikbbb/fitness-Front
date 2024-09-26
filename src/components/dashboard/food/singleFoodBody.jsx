import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../../../utils/axiosConfig";

function SingleFoodBody() {
  const { id } = useParams();
  const [food, setFood] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(`/foods/${id}`);
        setFood(response.data.food);
        setError(null);
      } catch (error) {
        setError(error.response.data.message);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFood();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-600">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-4xl font-semibold mb-4 text-center text-gray-800">
        {food.name}
      </h1>
      <img
        src={food.image}
        alt={food.name}
        className="w-full h-64 object-cover rounded-lg mb-4 border border-gray-300 shadow-md"
      />
      <div className="space-y-3">
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Category:</span> {food.category}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Calories:</span> {food.calories}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Serving Size:</span>{" "}
          {food.servingSize}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Fat:</span> {food.fat}g
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Protein:</span> {food.protein}g
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Carbohydrates:</span>{" "}
          {food.carbohydrates}g
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Fiber:</span> {food.fiber}g
        </p>
      </div>
    </div>
  );
}

export default SingleFoodBody;
