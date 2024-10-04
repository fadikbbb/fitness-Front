import useFoodFetching from "../../../hooks/foods/useFoodFetching";
import useExtractColor from "../../../hooks/useExtractColor";

function SingleFoodBody() {
  const { foodData, isLoading, error } = useFoodFetching();
  const { colors, dominantColor, loading } = useExtractColor(foodData?.image, {
    maxColors: 10,
    format: "hex",
    maxSize: 10,
  });
  const fallbackColor = (colorIndex, fallback = "#f0f0f0") =>
    colors[colorIndex] || fallback;
  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-center text-lg text-gray-600">Loading...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-center text-lg text-red-500">Error: {error}</p>
      </div>
    );
  }
  return (
    <div className="relative  flex justify-center items-center min-h-screen bg-gray-50">
      <div
        className="relative w-[800px] m-4 min-h-[400px] flex flex-col sm:flex-row justify-around items-center rounded-2xl shadow-lg p-6"
        style={{
          background: `linear-gradient(135deg, white 30%, ${fallbackColor(
            3
          )} 70%, ${fallbackColor(9)} 100%)`,
        }}
      >
        <div className="sm:h-fit h-[70px] w-fit flex justify-center">
          {foodData?.image && (
            <img
              src={foodData.image}
              alt={foodData.name}
              className="translate-y-[-50%] sm:translate-y-0 h-[200px]  md:max-w-[250px] sm:h-[250px] object-contain rounded-full shadow-lg"
              style={{
                border: `4px solid ${dominantColor || "#ccc"}`,
              }}
            />
          )}
        </div>
        <div className="p-6 pt-12 text-center">
          <h2
            className="text-2xl md:text-4xl lg:text-6xl  font-bold uppercase tracking-wide"
            style={{
              textShadow: `1px 3px 5px ${colors[5] || "#ccc"}`,
              color: fallbackColor(9, "#000"),
            }}
          >
            {foodData?.name}
          </h2>
          <p className="text-lg md:text-3xl   text-gray-600 opacity-50 mt-2">
            {foodData?.category}
          </p>
          <div className="mt-4 text-md md:text-xl text-gray-800">
            <p>Weight: {foodData?.weight}g</p>
            <p>Fat: {foodData?.fat}g</p>
            <p>Protein: {foodData?.protein}g</p>
            <p>Carbs: {foodData?.carbohydrates}g</p>
            <p>Fiber: {foodData?.fiber}g</p>
            <p>Calories: {foodData?.calories}</p>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleFoodBody;
