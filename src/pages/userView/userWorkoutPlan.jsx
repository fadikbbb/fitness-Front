import useWorkoutPlan from "../../hooks/workoutPlans/useWorkoutPlanFetching";
import { useState } from "react";
import NavBar from "../../components/home/navBar";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

function ViewWorkOut() {
  const [changes, setChanges] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const { workoutPlan, loading } = useWorkoutPlan({ changes, setChanges });

  const exercises = workoutPlan?.days[selectedDay]?.exercises || [];

  const handleDayChange = (e) => {
    const dayIndex = parseInt(e.target.value, 10);
    setSelectedDay(dayIndex);
    setCurrentExerciseIndex(0);
  };

  const nextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
    }
  };

  const prevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavBar />
      <div className="flex-grow p-6 flex flex-col items-center bg-gray-100">
        {loading && (
          <div className="text-xl font-semibold text-primary">Loading...</div>
        )}

        <h1 className="text-4xl font-bold text-primary mb-6">Workout Plan</h1>

        {exercises.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold text-primary mb-4 text-center">
              {currentExerciseIndex + 1}/{exercises.length}
            </h2>
            <div className="mb-4 flex justify-center">
              <select
                id="day-select"
                value={selectedDay}
                onChange={handleDayChange}
                className="p-3 border rounded shadow-md transition duration-200"
              >
                {workoutPlan?.days.map((day, index) => (
                  <option key={day.day} value={index}>
                    {day.day}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative w-full max-w-md bg-white shadow-xl rounded-lg p-8">
              <Link
                to={`/workout-plan/${workoutPlan.userId._id}/exercises/${exercises[currentExerciseIndex].exerciseId._id}`}
                state={{ exercise: exercises[currentExerciseIndex] }}
              >
                <div className="flex flex-col items-center space-y-6 mb-4 border p-4 rounded-lg shadow-md bg-gray-50 w-full">
                  {/* Animate image and exercise details */}
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={exercises[currentExerciseIndex].exerciseId.image}
                      src={exercises[currentExerciseIndex].exerciseId.image}
                      alt={exercises[currentExerciseIndex].exerciseId.name}
                      className="w-36 h-36 rounded-lg object-cover shadow-md"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.5 }}
                    />
                  </AnimatePresence>
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }} // Add exit to text details
                    transition={{ duration: 0.5 }}
                    key={currentExerciseIndex} // Key for changing content smoothly
                  >
                    <h3 className="text-lg font-semibold text-secondary">
                      {exercises[currentExerciseIndex].exerciseId.name}
                    </h3>
                    <p className="text-sm text-text">
                      Intensity:{" "}
                      <span className="font-semibold">
                        {exercises[currentExerciseIndex].exerciseId.intensity}
                      </span>
                    </p>
                    <p className="text-sm text-text">
                      Category:{" "}
                      <span className="font-semibold">
                        {exercises[currentExerciseIndex].exerciseId.category}
                      </span>
                    </p>
                    <p className="text-sm text-text">
                      Sets:{" "}
                      <span className="font-semibold">
                        {exercises[currentExerciseIndex].sets}
                      </span>
                      , Reps:{" "}
                      <span className="font-semibold">
                        {exercises[currentExerciseIndex].minReps}-
                        {exercises[currentExerciseIndex].maxReps}
                      </span>
                    </p>
                    <p className="text-sm text-text">
                      Rest Duration:{" "}
                      <span className="font-semibold">
                        {exercises[currentExerciseIndex].restDuration}
                      </span>{" "}
                      seconds
                    </p>
                    {exercises[currentExerciseIndex].note && (
                      <p className="text-sm text-muted italic">
                        Note:{" "}
                        <span className="font-semibold">
                          {exercises[currentExerciseIndex].note}
                        </span>
                      </p>
                    )}
                    <p className="text-sm text-muted mt-2">
                      {exercises[currentExerciseIndex].exerciseId.description}
                    </p>
                  </motion.div>
                </div>
              </Link>

              <div className="absolute top-1/2 left-0 right-0 flex justify-between -translate-y-1/2">
                <button
                  onClick={prevExercise}
                  disabled={currentExerciseIndex === 0}
                  className="px-4 py-2 bg-button rounded-full shadow-md hover:bg-buttonHover disabled:opacity-50 transition duration-200"
                  aria-label="Previous Exercise"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-black"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextExercise}
                  disabled={currentExerciseIndex === exercises.length - 1}
                  className="px-4 py-2 bg-button rounded-full shadow-md hover:bg-buttonHover disabled:opacity-50 transition duration-200"
                  aria-label="Next Exercise"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-black"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-xl text-secondary">Free plan</div>
        )}
      </div>
    </div>
  );
}

export default ViewWorkOut;
