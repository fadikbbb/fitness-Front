import React, { useState, useEffect } from "react";
import SideBar from "../../components/dashboard/sidebar";
import Navbar from "../../components/header/navBar";
import apiClient from "../../utils/axiosConfig";
import { useSelector } from "react-redux";

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
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <SideBar />
        <div className="flex-1 p-6 bg-background dark:bg-darkBackground overflow-y-auto ">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            {loading ? (
              <div className="text-center">
                <p className="text-muted dark:text-darkMuted">
                  Loading user data...
                </p>
              </div>
            ) : error ? (
              <div className="text-danger text-center">
                <p>{error}</p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-primary dark:text-accent">
                  Welcome, {user?.firstName || "Admin"} {user?.lastName || ""}!
                </h2>
                <p className="mt-2 text-text dark:text-darkText">
                  We are thrilled to have you here! As an admin, you hold the
                  key to our fitness community's success. You have the authority
                  to manage exercises, oversee food entries, and handle user
                  accounts, all of which are vital for creating an optimal
                  fitness experience for everyone involved.
                </p>
                <p className="mt-2 text-text dark:text-darkText">
                  Your insights and actions directly impact the engagement and
                  satisfaction of our users. Whether you are adding new
                  workouts, updating dietary options, or providing support to
                  our community, your contributions make a real difference.
                </p>
                <p className="mt-4 text-muted dark:text-darkMuted">
                  <span className="font-semibold text-text dark:text-darkText">
                    Let’s get started!
                  </span>
                  Use the sidebar to navigate to the various sections and take
                  control of the dashboard. Your journey towards enhancing our
                  fitness offerings begins now!
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
