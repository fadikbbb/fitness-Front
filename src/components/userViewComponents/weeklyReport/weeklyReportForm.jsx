import React, { useState, useEffect } from "react";
import { FaCircle } from "react-icons/fa"; // Import icons for the clickable balls

function WeeklyReportForm() {
  // State for form fields
  const [formData, setFormData] = useState({
    eatingCommitment: 5,
    exerciseCommitment: 5,
    sleepCommitment: 5,
    weightOld: "",
    weightNow: "",
    noProblems: false,
    problemDescription: "",
  });

  // Effect to clear problem description if "noProblems" is unchecked
  useEffect(() => {
    if (!formData.noProblems) {
      setFormData((prevState) => ({
        ...prevState,
        problemDescription: "",
      }));
    }
  }, [formData.noProblems]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRatingChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.noProblems) {
      // If no problems, ensure problemDescription is empty
      formData.problemDescription = "";
    }
    console.log("Form Data:", formData);
  };

  const renderRating = (name, value) => {
    return (
      <div className="flex space-x-2">
        {[...Array(10)].map((_, index) => (
          <FaCircle
            key={index}
            size={20}
            className={`cursor-pointer ${
              index < value ? "text-indigo-600" : "text-gray-300"
            }`}
            onClick={() => handleRatingChange(name, index + 1)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Weekly Commitment Report
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Eating Commitment */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Commitment to Eating (1-10):
          </label>
          {renderRating("eatingCommitment", formData.eatingCommitment)}
        </div>

        {/* Exercise Commitment */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Commitment to Exercise (1-10):
          </label>
          {renderRating("exerciseCommitment", formData.exerciseCommitment)}
        </div>

        {/* Sleep Commitment */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Commitment to Sleep (1-10):
          </label>
          {renderRating("sleepCommitment", formData.sleepCommitment)}
        </div>

        {/* Old and Current Weight */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Old Weight (kg):
          </label>
          <input
            type="number"
            name="weightOld"
            value={formData.weightOld}
            onChange={handleChange}
            placeholder="Enter your old weight"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Current Weight (kg):
          </label>
          <input
            type="number"
            name="weightNow"
            value={formData.weightNow}
            onChange={handleChange}
            placeholder="Enter your current weight"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            required
          />
        </div>

        {/* Problem Checkbox */}
        <div className="mb-4 flex items-center">
          <label className="text-gray-700 font-bold">
            <input
              type="checkbox"
              name="noProblems"
              checked={formData.noProblems}
              onChange={handleChange}
              className="mr-2 leading-tight"
            />
            Have Problems?
          </label>
        </div>

        {/* Problem Description (conditionally rendered) */}
        {formData.noProblems && (
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Describe the problem:
            </label>
            <textarea
              name="problemDescription"
              value={formData.problemDescription}
              onChange={handleChange}
              placeholder="Describe any problems you encountered"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              rows="4"
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
        >
          Submit Commitment
        </button>
      </form>
    </div>
  );
}

export default WeeklyReportForm;
