import { useDispatch } from "react-redux";
import { clearAuthState } from "../../store/authSlice";
import { useState } from "react";
import apiClient from "../../utils/axiosConfig";
import { IoLogOutOutline } from "react-icons/io5";

function Logout({ token,textLogout }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function logoutHandler() {
    try {
      if (token) {
         await apiClient.post(`/auth/logout`);
        dispatch(clearAuthState());
        setIsModalOpen(false);
      }
    } catch (error) {}
  }

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className="w-full items-center justify-center sm:justify-between flex">
        <IoLogOutOutline className="w-6 h-6" />
        {
          textLogout &&
          <span className="text-base font-medium ml-4">{textLogout}</span>
        }
      </button>

      {isModalOpen && (
        <div className="fixed z-50 inset-0 flex items-center justify-center  bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm text-center">
            <h2 className="text-lg font-bold mb-4 text-black">
              Confirm Logout
            </h2>
            <p className="mb-4 text-black">Are you sure you want to log out?</p>
            <div className="flex justify-around">
              <button
                onClick={logoutHandler}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
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

export default Logout;
