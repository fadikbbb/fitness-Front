import React from "react";
import { useDispatch } from "react-redux";
import { clearAuthState } from "../../store/authSlice";
import apiClient from "../../utils/axiosConfig";
import { useSelector } from "react-redux";
export default function Logout({ isLogoutModalOpen, setIsLogoutModalOpen }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      if (token) {
        await apiClient.post(
          "/auth/logout",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        dispatch(clearAuthState());
        setIsLogoutModalOpen(false);
        console.log("Logged out successfully");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {isLogoutModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full mx-4 text-center">
            <h2 className="text-lg font-bold mb-4 text-black">
              Confirm Logout
            </h2>
            <p className="mb-4 text-black">Are you sure you want to log out?</p>
            <div className="flex justify-around">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
