import { useState, useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import apiClient from "../../../utils/axiosConfig";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function WeeklyReportForm() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { userId } = useSelector((state) => state.auth);
  const [addError, setAddError] = useState("");
  const [addMessage, setAddMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      eatingLevel: 5,
      exerciseLevel: 5,
      sleepLevel: 5,
      weight: 0,
      isProblems: false,
      problems: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await apiClient.post(
        `${BASE_URL}/weekly-reports/${userId}`,
        data
      );
      setAddMessage(response.data.message);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        error.response.data.errors.forEach((err) =>
          setError(err.path, {
            type: "manual",
            message: err.msg,
          })
        );
      } else if (error.response && error.response.data.message) {
        setAddError(error.response.data.message || "An error occurred");
      }
    } finally {
      setTimeout(() => {
        setAddMessage(null);
        setAddError(null);
        clearErrors(); // Clear form errors after timeout
      }, 5000);
    }
  };

  const renderRating = (name, value) => (
    <div className="flex space-x-2">
      {[...Array(10)].map((_, index) => (
        <FaCircle
          key={index}
          size={20}
          className={`cursor-pointer ${
            index < value ? "text-indigo-600" : "text-gray-300"
          }`}
          onClick={() => setValue(name, index + 1)}
        />
      ))}
    </div>
  );

  const isProblems = watch("isProblems");

  useEffect(() => {
    const today = new Date();
    const isItSunday = today.getDay() === 2;
    if (!isItSunday) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (!isProblems) {
      setValue("problems", "");
    }
  }, [isProblems, setValue]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Weekly Commitment Report
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Eating Commitment */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Commitment to Eating (1-10):
          </label>
          {renderRating("eatingLevel", watch("eatingLevel"))}
          {errors.eatingLevel && (
            <span className="text-red-500">{errors.eatingLevel.message}</span>
          )}
        </div>

        {/* Exercise Commitment */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Commitment to Exercise (1-10):
          </label>
          {renderRating("exerciseLevel", watch("exerciseLevel"))}
          {errors.exerciseLevel && (
            <span className="text-red-500">{errors.exerciseLevel.message}</span>
          )}
        </div>

        {/* Sleep Commitment */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Commitment to Sleep (1-10):
          </label>
          {renderRating("sleepLevel", watch("sleepLevel"))}
          {errors.sleepLevel && (
            <span className="text-red-500">{errors.sleepLevel.message}</span>
          )}
        </div>

        {/* Weight */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Weight (kg):
          </label>
          <input
            type="number"
            {...register("weight", { required: "Weight is required" })}
            placeholder="Enter your current weight"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          />
          {errors.weight && (
            <span className="text-red-500">{errors.weight.message}</span>
          )}
        </div>

        {/* Problem Checkbox */}
        <div className="mb-4 flex items-center">
          <label className="text-gray-700 font-bold">
            <input
              type="checkbox"
              {...register("isProblems")}
              className="mr-2 leading-tight"
            />
            Do you have problems?
          </label>
        </div>

        {/* Problem Description */}
        {isProblems && (
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Describe the problem:
            </label>
            <textarea
              {...register("problems", {
                required: isProblems
                  ? "Problem description is required"
                  : false,
              })}
              placeholder="Describe any problems you encountered"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              rows="4"
            />
            {errors.problems && (
              <span className="text-red-500">{errors.problems.message}</span>
            )}
          </div>
        )}

        {/* Error Messages */}
        {addError && <p className="text-red-500">{addError}</p>}
        {addMessage && <p className="text-green-500">{addMessage}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          disabled={!isValid} // Disable button if form is invalid
        >
          Submit Commitment
        </button>
      </form>
    </div>
  );
}

export default WeeklyReportForm;
