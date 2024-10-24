import React, { useEffect, useState } from "react";
import apiClient from "../../../utils/axiosConfig";

function WeeklyReports() {
  const [weeklyReports, setWeeklyReports] = useState([]);
  const [timeFrame, setTimeFrame] = useState("currentWeek"); // Default timeFrame

  useEffect(() => {
    const fetchWeeklyReports = async () => {
      try {
        const response = await apiClient.get(
          `/weekly-reports?timeFrame=${timeFrame}`
        );
        setWeeklyReports(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeeklyReports();
  }, [timeFrame]); // Re-fetch when timeFrame changes

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h1 className="font-sans text-xl text-center">Weekly Reports</h1>
      {/* Dropdown for selecting timeFrame */}
      <select
        value={timeFrame}
        onChange={(e) => setTimeFrame(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      >
        <option value="currentWeek">Current Week</option>
        <option value="lastWeek">Last Week</option>
        <option value="lastMonth">Last Month</option>
      </select>

      <div>
        {weeklyReports.length === 0 ? (
          <p>No reports available for this timeframe.</p>
        ) : (
          weeklyReports.map((weeklyReport, index) => (

            <div key={index} className="bg-gray-200 p-4 m-2 rounded">
            <p><strong>number:</strong> {index + 1}</p>
              <p>
                <strong>Email:</strong> {weeklyReport.userId.email}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(weeklyReport.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Commitment to Eating:</strong>{" "}
                {weeklyReport.eatingLevel}
              </p>
              <p>
                <strong>Commitment to Exercise:</strong>{" "}
                {weeklyReport.exerciseLevel}
              </p>
              <p>
                <strong>Commitment to Sleep:</strong> {weeklyReport.sleepLevel}
              </p>
              <p>
                <strong>Weight:</strong> {weeklyReport.weight}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default WeeklyReports;
