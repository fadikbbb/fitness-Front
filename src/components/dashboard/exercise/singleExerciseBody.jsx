import useExerciseFetching from "../../../hooks/exercises/useExerciseFetching";
import { useLocation } from "react-router-dom";

function SingleExerciseBody() {
  const { exercise, loading, error } = useExerciseFetching();
  const location = useLocation();
  const exerciseData = location?.state?.exercise || {};
  console.log(exerciseData);

  if (loading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!exercise)
    return <div className="text-center text-gray-500">No exercise found</div>;

  return (
    <div className="min-h-screen w-full bg-gray-100 ">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-6 text-center text-primary">
          {exercise.name}
        </h1>

        {/* Video Section */}
        {exercise.videoUrl && (
          <div
            className="relative w-full mb-6 overflow-hidden shadow-lg"
            style={{ paddingTop: "56.25%" }}
          >
            <iframe
              src={exercise.videoUrl}
              title="Exercise video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-lg"
            ></iframe>
          </div>
        )}

        {/* Description */}
        <p className="mb-6 text-sm text-muted text-center leading-relaxed">
          {exercise?.description}
        </p>

        {/* Exercise Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <p className="text-gray-700">
              <strong className="text-secondary">Category:</strong>{" "}
              {exercise.category}
            </p>
          </div>

          <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <p className="text-gray-700">
              <strong className="text-secondary">Rest Duration:</strong>{" "}
              {exerciseData.restDuration
                ? exerciseData.restDuration
                : exercise.restDuration}{" "}
              minutes
            </p>
          </div>

          <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <p className="text-gray-700">
              <strong className="text-secondary">Intensity:</strong>{" "}
              {exercise.intensity}
            </p>
          </div>

          <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <p className="text-gray-700">
              <strong className="text-secondary">Sets:</strong>{" "}
              {exerciseData.sets ? exerciseData.sets : exercise.sets}
            </p>
          </div>

          <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <p className="text-gray-700">
              <strong className="text-secondary">Reps:</strong>{" "}
              {exerciseData.minReps && exerciseData.maxReps
                ? `${exerciseData.minReps} - ${exerciseData.maxReps}`
                : `${exercise.minReps} - ${exercise.maxReps}`}
            </p>
          </div>

          {exerciseData.note && (
            <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
              <p className="text-gray-700">
                <strong className="text-secondary">Note:</strong>{" "}
                {exerciseData.note}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleExerciseBody;
