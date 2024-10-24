import React, { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import apiClient from "../../utils/axiosConfig";
import WeeklyReports from "../dashboard/weeklyReports/weeklyReports";
ChartJS.register(ArcElement, Tooltip, Legend);

function UserDistributionChart() {
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await apiClient.get("/users");
        setUsers(response.data.users);
      } catch (error) {
        setError(error.data.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    async function fetchReports() {
      try {
        setLoading(true);
        const response = await apiClient.get(
          "/weekly-reports?timeFrame=currentWeek"
        );
        setReports(response.data);
      } catch (error) {
        setError(error.data.message);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  // Separate users by subscription status
  const freeUsers = users.filter((user) => user.subscriptionStatus === "free");
  const premiumUsers = users.filter(
    (user) => user.subscriptionStatus === "premium"
  );

  // Get the IDs of premium users
  const premiumUserIds = premiumUsers.map((user) => user._id);
  console.log(premiumUserIds.length);
  // Premium users who made reports
  const premiumUsersWhoMadeReports = reports.filter((report) =>
    premiumUserIds.includes(report.userId._id)
  );
  console.log(premiumUsersWhoMadeReports.length);
  // Premium users who did NOT make reports
  const premiumUsersWhoDidNotMakeReports = premiumUserIds.filter(
    (userId) => !reports.some((report) => report.userId._id === userId)
  );
  console.log(premiumUsersWhoDidNotMakeReports.length);

  // Doughnut chart for user distribution (free vs premium)
  const userDistributionData = {
    labels: ["Free Users", "Premium Users"],
    datasets: [
      {
        label: "User Distribution",
        data: [freeUsers.length, premiumUsers.length],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)", // Free Users color
          "rgba(53, 162, 235, 0.5)", // Premium Users color
        ],
        borderWidth: 1,
      },
    ],
  };
  // Doughnut chart for premium users report activity
  const premiumUserReportActivityData = {
    labels: ["Users Made Reports", "Users Didn't Make Reports"],
    datasets: [
      {
        label: "User Report",
        data: [
          premiumUsersWhoMadeReports.length,
          premiumUsersWhoDidNotMakeReports.length,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)", // Made reports color
          "rgba(255, 99, 132, 0.5)", // Did not make reports color
        ],
        borderWidth: 1,
      },
    ],
  };
  const chartLineWeightOfUsersInReports = {
    labels: reports.map((report) =>
      new Date(report.createdAt).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Weight (kg)",
        data: reports.map((report) => report.weight),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };
  const generateChartOptions = (title) => ({
    responsive: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
  });

  if (loading) {
    return <div className="spinner"></div>; // Add spinner CSS for styling
  }
  if (error) {
    return <div>{error}</div>; // Display error message to the user
  }
  return (
    <div className="w-full ">
      <div className="w-full bg-white flex flex-wrap items-center justify-around">
        {reports.length === 0 ? (
          <p className="text-center">No reports available</p>
        ) : (
          <Doughnut
            width={300}
            height={300}
            data={userDistributionData}
            options={generateChartOptions(
              "User Distribution (Free vs Premium)"
            )}
            aria-label="User distribution chart"
          />
        )}
        {users.length === 0 ? (
          <p className="text-center">No users available</p>
        ) : (
          <Doughnut
            width={300}
            height={300}
            data={premiumUserReportActivityData}
            options={generateChartOptions("Premium Users Report")}
          />
        )}
        {reports.length === 0 ? (
          <p className="text-center">No reports available</p>
        ) : (
          <Line
            width={300}
            height={200}
            aria-label="Weight of Users in Reports"
            data={chartLineWeightOfUsersInReports}
            options={generateChartOptions("Weight of Users in Reports")}
          />
        )}
        <WeeklyReports/>
      </div>
    </div>
  );
}

export default UserDistributionChart;
