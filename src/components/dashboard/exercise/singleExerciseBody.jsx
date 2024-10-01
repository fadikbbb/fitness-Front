import useFoodFetching from "../../../hooks/exercises/useExerciseFetching";
function SingleExerciseBody() {
  const { exercise, loading, error } = useFoodFetching();
  
  if (loading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!exercise)
    return <div className="text-center text-gray-500">No exercise found</div>;

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        {exercise.name}
      </h1>
      {exercise.videoUrl && (
        <div className="w-full">
          <iframe
            width="100%"
            height="315"
            src={exercise.videoUrl}
            title="video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <p className="mb-4 text-gray-700">{exercise.description}</p>
      <div className="space-y-2">
        <p className="text-gray-800">
          <strong>Category:</strong> {exercise.category}
        </p>
        <p className="text-gray-800">
          <strong>Duration:</strong> {exercise.duration} minutes
        </p>
        <p className="text-gray-800">
          <strong>Rest Duration:</strong> {exercise.restDuration} minutes
        </p>
        <p className="text-gray-800">
          <strong>Intensity:</strong> {exercise.intensity}
        </p>
        <p className="text-gray-800">
          <strong>Sets:</strong> {exercise.sets}
        </p>
        <p className="text-gray-800">
          <strong>Reps:</strong> {exercise.reps}
        </p>
      </div>
    </div>
  );
}

export default SingleExerciseBody;
