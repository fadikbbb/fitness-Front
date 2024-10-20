import React from "react";
import { Link } from "react-router-dom";
import { FaEye, FaUser } from "react-icons/fa";
import { IoFitnessOutline } from "react-icons/io5";
import { IoIosFitness } from "react-icons/io";
import useUpdateUser from "../../../hooks/users/useUpdateUser"
import DeleteUser from "./deleteUser";
import EditUser from "./editUser";

function UserCard({ user, handleRefresh }) {
  const { updateUser, updatingUserError } = useUpdateUser({ handleRefresh })
  return (
    <div className="overflow-hidden lg:w-[calc(50%-2rem)] xl:w-[calc(33%-2rem)] md:w-[calc(75%-2rem)] w-full mx-auto m-2 ">
      <div className="h-full flex flex-col justify-between bg-white rounded-xl sm:p-6 p-4 border border-gray-200 space-y-6">
        <div className="flex flex-wrap justify-around items-center sm:space-x-4 ">
          {user.image ?
            <img
              src={user.image}
              alt={user.firstName}
              className="min-w-16 max-w-16 h-16 object-cover rounded-full shadow"
            /> :
            <FaUser className="rounded-full border-white border-2 w-10 h-10 p-1" />
          }
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-500 text-sm">
              {user.email}
            </p>
            <p className={`text-sm font-medium ${user.subscriptionStatus === "premium" ? "text-yellow-500" : "text-gray-500"}`} >
              {user.subscriptionStatus}
            </p>
          </div>
        </div>
        {user.subscriptionStatus === "premium" && (
          <div className="flex flex-wrap items-center w-full justify-around">
            <Link
              to={`/dashboard/${user._id}/nutrition-plan`}
              className="flex mt-2 items-center border-[1px] rounded-lg px-4 py-1 border-green-500 hover:text-green-700"
            >
              <IoFitnessOutline className="w-6 h-6 mr-2" />
              Nutrition Plan
            </Link>
            <Link
              to={`/dashboard/${user._id}/workout-plan`}
              className="flex mt-2 items-center border-[1px] rounded-lg px-4 py-1 border-cyan-500 hover:text-cyan-700"
            >
              <IoIosFitness className="w-6 h-6 mr-2" />
              Workout Plan
            </Link>
          </div>
        )}
        {user.role !== "admin" &&
          <div className="h-[40%] flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <DeleteUser userId={user._id} onDelete={handleRefresh} />
              <EditUser user={user} onEdit={handleRefresh} />
              <Link
                to={`/dashboard/users/${user._id}`}
                className="flex duration-300 items-center text-green-500 hover:text-green-700 space-x-1"
              >
                <FaEye className="w-4 h-4 md:hidden flex" />
                <span className="hidden md:inline">View</span>
              </Link>
            </div>
            <hr className="border-gray-300" />
            <div className="flex items-center space-x-4">
              <label className="relative inline-block min-w-36 h-7">
                <input
                  id="toggle"
                  name="toggle"
                  type="checkbox"
                  onChange={() => updateUser(user._id, !user.isActive)}
                  checked={user.isActive}
                  className="opacity-0 w-0 h-0 peer focus:ring-2 focus:ring-red-300 peer-checked:focus:ring-green-300"
                />
                <span
                  className={`slider selection:bg-transparent flex items-center justify-around absolute cursor-pointer inset-0 bg-gray-300 rounded-full transition-all before:content-[''] duration-300 before:z-10 ${user.isActive ? "before:bg-green-500 before:translate-x-full" : "before:bg-red-500 translate-x-0"} before:rounded-full before:absolute before:inset-0  before:left-0 rounded-xl before:top-0 before:h-full before:transition-all before:duration-300 before:w-1/2`}
                >
                  <span className={`text-sm font-medium z-10 w-fit text-white`}>
                    block
                  </span>
                  <span className={`text-sm font-medium z-10 w-fit text-white`}>
                    unblock
                  </span>
                </span>
              </label>
              {updatingUserError && <div className="text-red-500 text-xs">{updatingUserError}</div>}
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default UserCard;
