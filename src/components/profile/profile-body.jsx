// Example in a component
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import { removeToken } from "../../store/authSlice";
import { setUserProfile } from "../../store/userSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  const userProfile = useSelector((state) => state.user.userProfile);

  const fetchUserData = async () => {
    try {
      if (!userId) {
        console.error("User ID is not available.");
        return;
      }

      const response = await axiosInstance.get(`/users/${userId}`);
      dispatch(setUserProfile(response.data)); // Update user profile in the store
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(removeToken());
      } else {
        console.error("Failed to fetch user data:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Profile: {userProfile ? userProfile.name : "Loading..."}</p>
    </div>
  );
};

export default Dashboard;
