import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import useFetchUser from "../../../hooks/users/useUserFetching";
import apiClient from "../../../utils/axiosConfig";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ViewUser() {
  const { user, fetchUserError, fetchUserLoading } = useFetchUser();
  const [userReports, setUserReports] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    async function fetchReportsOfUser() {
      try {
        const response = await apiClient.get(`/weekly-reports/${userId}`);
        setUserReports(response.data.reports);
        console.log(response.data.reports);
      } catch (error) {
        console.error(error);
      }
    }
    fetchReportsOfUser();
  }, [userId]);

  // Prepare chart data
  const weightChartData = {
    labels: userReports.map((report) =>
      new Date(report.createdAt).toLocaleDateString()
    ), // Assuming the report has a date field
    datasets: [
      {
        label: "Weight (kg)",
        data: userReports.map((report) => report.weight), // Assuming the report has a weight field
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.1,
      },
    ],
  };
  const levelChartData = {
    labels: userReports.map((report) =>
      new Date(report.createdAt).toLocaleDateString()
    ), // Assuming the report has a date field
    datasets: [
      {
        label: "sleep (kg)",
        data: userReports.map((report) => report.sleepLevel), // Assuming the report has a weight field
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.1,
      },
      {
        label: "eating (kg)",
        data: userReports.map((report) => report.eatingLevel), // Assuming the report has a weight field
        borderColor: "rgba(75, 12, 92, 1)",
        backgroundColor: "rgba(75, 12, 92, 0.2)",
        fill: true,
        tension: 0.1,
      },
      {
        label: "exercise (kg)",
        data: userReports.map((report) => report.exerciseLevel), // Assuming the report has a weight field
        borderColor: "rgba(175, 123, 92, 1)",
        backgroundColor: "rgba(175, 123, 92, 0.2)",
        fill: true,
        tension: 0.1,
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
  if (fetchUserError) {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
        <p className="text-red-500 text-center text-xl">{fetchUserError}</p>
      </div>
    );
  }

  if (fetchUserLoading) {
    return <UserSkeleton />;
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
        <p className="text-gray-500 text-center text-xl">No user data found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="text-center mb-8">
        <div className="relative inline-block">
          {/* Chart displaying weight trend */}
          {userReports.length > 0 && (
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Line
                options={generateChartOptions("Weight Trend")}
                width={300}
                height={200}
                data={weightChartData}
              />
              <Line
                options={generateChartOptions("Level Trend")}
                width={300}
                height={200}
                data={levelChartData}
              />
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoItem icon="📧" label="Email" value={user?.email} />
          <InfoItem icon="👤" label="Role" value={user?.role} />
          <InfoItem
            icon="🎂"
            label="Date of Birth"
            value={new Date(user?.dateOfBirth).toLocaleDateString()}
          />
          <InfoItem icon="⚧" label="Gender" value={user?.gender} />
          <InfoItem icon="⚖️" label="Weight" value={`${user?.weight} kg`} />
          <InfoItem icon="📏" label="Height" value={`${user?.height} cm`} />
        </div>
      </div>

      {/* Reports Section */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Weekly Reports</h3>
        {userReports.length > 0 ? (
          userReports.map((report, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white p-4 mb-2 rounded-lg shadow-sm"
            >
              <span>{new Date(report.createdAt).toLocaleDateString()}</span>
              <span>{report.weight} kg</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reports found for this user.</p>
        )}
      </div>

      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold mb-3">Subscription Status</h3>
        <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
          {user?.subscriptionStatus}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Link
          to={`/dashboard/${user?._id}/nutrition-plan`}
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-md"
        >
          🍎 Nutrition Plan
        </Link>
        <Link
          to={`/dashboard/${user?._id}/workout-plan`}
          className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold transition-all duration-300 hover:from-green-600 hover:to-green-700 hover:shadow-md"
        >
          🏋️ Workout Plan
        </Link>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
      <span className="text-2xl">{icon}</span>
      <div>
        <span className="text-sm text-gray-500 block">{label}</span>
        <span className="font-medium text-gray-800">{value}</span>
      </div>
    </div>
  );
}

function UserSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
        <div className="h-8 bg-gray-200 w-64 mx-auto rounded-full"></div>
      </div>
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="h-6 bg-gray-200 w-16 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 w-full rounded"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mb-8">
        <div className="h-6 bg-gray-200 w-48 mx-auto rounded-full mb-3"></div>
        <div className="h-8 bg-gray-200 w-32 mx-auto rounded-full"></div>
      </div>
      <div className="flex justify-center space-x-4">
        <div className="h-12 bg-gray-200 w-40 rounded-lg"></div>
        <div className="h-12 bg-gray-200 w-40 rounded-lg"></div>
      </div>
    </div>
  );
}

export default ViewUser;
