import React, { useState, useEffect } from "react";
import SideBar from "../../components/dashboard/sidebar";
import Navbar from "../../components/home/navBar";
import apiClient from "../../utils/axiosConfig";
import { useSelector } from "react-redux";
import LineChart from "../../components/dashboard/lineChart";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await apiClient.get(`/users/${userId}`);
        setUser(response.data.user);
        setError(null);
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [userId]);

  return (
    <div className="flex flex-col min-h-screen container mx-auto">
      <Navbar />
      <div className="flex flex-1">
        <SideBar />
        <div className="flex-1 p-6 bg-background  overflow-y-auto ">
          <div className="bg-white  p-6 rounded-lg shadow-md">
            <div className="text-center">
              <LineChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
