import React from "react";
import { useParams } from "react-router-dom";
import {
  Dumbbell,
  Clock,
  Flame,
  Target,
  BarChart2,
  FileText,
} from "lucide-react";
import useExerciseFetching from "../../../hooks/exercises/useExerciseFetching";
import { useLocation } from "react-router-dom";

export default function SingleExerciseBody() {
  const { id } = useParams();
  const { exercise, loading, error } = useExerciseFetching(id);
  const location = useLocation();
  const exerciseData = location?.state?.exercise;

  if (loading) return <ExerciseSkeleton />;
  if (error) return <ErrorMessage message={error} />;
  if (!exercise) return <NoExerciseFound />;

  const combinedExerciseData = {
    ...exercise,
    restDuration: exerciseData?.restDuration || exercise.restDuration,
    sets: exerciseData?.sets || exercise.sets,
    minReps: exerciseData?.minReps || exercise.minReps,
    maxReps: exerciseData?.maxReps || exercise.maxReps,
    note: exerciseData?.note || exercise.note,
  };
  return (
    <div className="container mx-auto p-6">
      <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">
            {combinedExerciseData.name}
          </h1>
          <p className="text-gray-600 mb-6">
            {combinedExerciseData.description}
          </p>
          <VideoSection videoUrl={combinedExerciseData.videoUrl} />
          <ExerciseDetails exercise={combinedExerciseData} />
          <ExerciseMetrics exercise={combinedExerciseData} />
        </div>
      </div>
    </div>
  );
}

function VideoSection({ videoUrl }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-lg shadow-lg"
      style={{ paddingTop: "56.25%" }}
    >
      <iframe
        src={`${videoUrl}?autoplay=0&controls=1&rel=0&modestbranding=1`}
        title="Exercise video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
}

function ExerciseDetails({ exercise }) {
  return (
    <div className="flex flex-wrap justify-around my-6">
      <DetailItem
        icon={<Dumbbell className="w-5 h-5" />}
        label="Category"
        value={exercise.category}
      />
      <DetailItem
        icon={<Flame className="w-5 h-5" />}
        label="Intensity"
        value={exercise.intensity}
      />
    </div>
  );
}

function ExerciseMetrics({ exercise }) {
  const { restDuration, sets, minReps, maxReps, note } = exercise;
  return (
    <div className="flex flex-wrap justify-between w-full">
      {restDuration && (
        <MetricItem
          icon={<Clock className=" w-5 h-5" />}
          label="Rest"
          value={`${restDuration}min`}
        />
      )}
      {sets && (
        <MetricItem
          icon={<Target className="w-5 h-5" />}
          label="Sets"
          value={sets}
        />
      )}
      {minReps && maxReps && (
        <MetricItem
          icon={<BarChart2 className="w-5 h-5" />}
          label="Reps"
          value={`${minReps}-${maxReps}`}
        />
      )}
      {note && (
        <MetricItem
          icon={<FileText className="w-5 h-5" />}
          label="Note"
          value={note}
        />
      )}
    </div>
  );
}

function DetailItem({ icon, label, value }) {
  return (
    <div className="flex items-center space-x-2 mb-4">
      {icon}
      <span className="font-medium">{label}:</span>
      <span className="bg-gray-200 px-2 py-1 rounded-full text-sm">
        {value}
      </span>
    </div>
  );
}

function MetricItem({ icon, label, value }) {
  return (
    <div
      className={`w-full ${
        label === "Note" ? "w-full" : "md:w-[calc(33%-0.5rem)]"
      } flex flex-col items-center justify-center bg-white shadow rounded-lg p-4sm:w-auto mb-4 `}
    >
      {icon}
      <h3 className="mt-2 font-semibold">{label}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function ExerciseSkeleton() {
  return (
    <div className="container mx-auto p-6">
      <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden animate-pulse">
        <div className="p-6">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
          <div className="w-full h-64 bg-gray-200 rounded mb-6"></div>
          <div className="flex justify-between mb-6">
            <div className="h-10 bg-gray-200 rounded w-full mr-4"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
          <div className="flex justify-between flex-wrap">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-24 bg-gray-200 rounded w-full sm:w-1/4 mb-4"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <div className="container mx-auto p-6">
      <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 flex items-center justify-center h-64">
          <p className="text-red-500 text-xl">{message}</p>
        </div>
      </div>
    </div>
  );
}

function NoExerciseFound() {
  return (
    <div className="container mx-auto p-6">
      <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 flex items-center justify-center h-64">
          <p className="text-gray-500 text-xl">No exercise found</p>
        </div>
      </div>
    </div>
  );
}
