"use client";
import useFoodFetching from "../../../hooks/foods/useFoodFetching";
import useExtractColor from "../../../hooks/useExtractColor";
import {
  AlertCircle,
  Weight,
  Droplet,
  Beef,
  Wheat,
  Apple,
  Flame,
} from "lucide-react";

function NutritionItem({
  icon,
  label,
  value,
  unit,
  loading,
  weight,
  maxValue,
}) {
  const percentage = loading ? 0 : Math.min((value / weight) * 100, 100);
  const displayValue = loading ? "-" : value;

  const getColor = (percent) => {
    if (percent >= 80) return "bg-green-500";
    if (percent >= 60) return "bg-lime-500";
    if (percent >= 40) return "bg-yellow-500";
    if (percent >= 20) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="flex items-center space-x-2 p-2 bg-white rounded-lg shadow">
      <div className="flex h-10 w-10 items-center justify-center rounded-full">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium leading-none">{label}</p>
        {loading ? (
          <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded mt-1"></div>
        ) : (
          <p className="text-xl font-bold">
            {displayValue}
            {unit}
          </p>
        )}
      </div>
      <div className="w-1/4 bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ease-out ${
            loading ? "bg-gray-300" : getColor(percentage)
          }`}
          style={{ width: loading ? "0%" : `${percentage}%` }}
        ></div>
      </div>
      <div className="text-xs text-gray-500 w-12 text-right">
        {loading ? "-" : `${percentage.toFixed(1)}%`}
      </div>
    </div>
  );
}

export default function SingleFoodBody() {
  const { foodData, foodFetchingLoading, foodFetchingError } =
    useFoodFetching();
  const {
    colors,
    loading: colorLoading,
  } = useExtractColor(foodData?.image, {
    maxColors: 10,
    format: "hex",
    maxSize: 10,
  });

  const isLoading = foodFetchingLoading || colorLoading;

  const fallbackColor = (colorIndex, fallback = "#f0f0f0") =>
    colors[colorIndex] || fallback;

  if (foodFetchingError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <AlertCircle className="h-10 w-10 text-red-500" />
            <h2 className="text-xl font-semibold text-red-500">Error</h2>
            <p className="text-sm text-gray-500">{foodFetchingError}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div
          className="relative h-48 bg-cover bg-center"
          style={{
            backgroundImage: isLoading
              ? "linear-gradient(to right, #f0f0f0, #e0e0e0)"
              : `linear-gradient(to right, ${fallbackColor(1)}, ${fallbackColor(
                  9
                )})`,
          }}
        >
          {isLoading ? (
            <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gray-300 animate-pulse"></div>
          ) : foodData?.image ? (
            <img
              src={foodData.image}
              alt={foodData.name}
              className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-4 border-white object-cover shadow-lg"
            />
          ) : null}
        </div>
        <div className="text-center p-6">
          <h1 className="text-3xl font-bold">
            {isLoading ? (
              <div className="h-9 w-3/4 mx-auto bg-gray-200 animate-pulse rounded"></div>
            ) : (
              foodData?.name
            )}
          </h1>

          {isLoading ? (
            <div className="h-6 w-1/2 mx-auto bg-gray-200 animate-pulse rounded mt-2"></div>
          ) : (
            <p className="text-lg text-gray-600 mt-2">{foodData?.category}</p>
          )}
        </div>
        <div className="p-2 md:p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <NutritionItem
              icon={<Weight className="h-5 w-5" />}
              label="Weight"
              value={foodData?.weight || 0}
              unit="g"
              loading={isLoading}
              weight={foodData?.weight || 1}
              maxValue={foodData?.weight || 100}
            />
            <NutritionItem
              icon={<Droplet className="h-5 w-5" />}
              label="Fat"
              value={foodData?.fat || 0}
              unit="g"
              loading={isLoading}
              weight={foodData?.weight || 1}
              maxValue={foodData?.weight || 100}
            />
            <NutritionItem
              icon={<Beef className="h-5 w-5" />}
              label="Protein"
              value={foodData?.protein || 0}
              unit="g"
              loading={isLoading}
              weight={foodData?.weight || 1}
              maxValue={foodData?.weight || 100}
            />
            <NutritionItem
              icon={<Wheat className="h-5 w-5" />}
              label="Carbs"
              value={foodData?.carbohydrates || 0}
              unit="g"
              loading={isLoading}
              weight={foodData?.weight || 1}
              maxValue={foodData?.weight || 100}
            />
            <NutritionItem
              icon={<Apple className="h-5 w-5" />}
              label="Fiber"
              value={foodData?.fiber || 0}
              unit="g"
              loading={isLoading}
              weight={foodData?.weight || 1}
              maxValue={foodData?.weight || 100}
            />
            <NutritionItem
              icon={<Flame className="h-5 w-5" />}
              label="Calories"
              value={foodData?.calories || 0}
              unit="kcal"
              loading={isLoading}
              weight={foodData?.weight || 1}
              maxValue={foodData?.weight * 4 || 400}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
