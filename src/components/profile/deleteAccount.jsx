import React, { useState } from "react";
import apiClient from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { clearAuthState } from "../../store/authSlice";
import { useDispatch } from "react-redux";

function DeleteAccount({ userId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  async function deleteAccount(e) {
    e.preventDefault();
    setShowModal(false);
    try {
      await apiClient.delete(`/users/${userId}`);
      navigate("/auth/register");
      dispatch(clearAuthState());
    } catch (error) {
    }
  }

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        Delete Account
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={(e) => deleteAccount(e)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteAccount;
