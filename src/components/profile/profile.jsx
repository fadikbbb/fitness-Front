import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import useUserFetching from "../../hooks/users/useUserFetching";
export default function Profile({
  setIsOpenProfile,
  setIsLogoutModalOpen,
  exception,
  isOpenProfile,
}) {
  const { userId, userRole } = useSelector((state) => state.auth);

  const { user } = useUserFetching(userId);
  if (!userId && userId === "undefined" && userId === "null") {
    setIsOpenProfile(false);
  }
  return (
    <>
      {userId && userRole ? (
        <div
          className={`${
            isOpenProfile
              ? "max-h-[1000px] p-3 opacity-100 z-50"
              : "max-h-0 p-0 opacity-0 overflow-hidden"
          } transition-all duration-300 ease-in-out ${
            exception
              ? "fixed top-[82px] right-0 w-[200px] backdrop-blur-md bg-[rgba(0,0,0,0.6)]  before:absolute before:content-[''] before:top-[-10px] before:right-4 before:w-0 before:h-0 before:border-l-transparent before:border-b-transparent before:border-r-transparent before:border-[10px]  before:border-t-[rgba(0,0,0,0.6)] "
              : "absolute top-[82px] right-0 w-[200px] bg-primary before:absolute before:content-[''] before:top-[-10px] before:right-4 before:w-0 before:h-0 before:border-l-transparent before:border-b-transparent before:border-r-transparent before:border-[10px]  before:border-t-primary"
          } text-white   rounded-lg flex flex-col space-y-4 items-center`}
        >
          <div className="flex flex-wrap gap-5 items-center">
            {user?.image ? (
              <img
                className="max-w-[50px] object-center  object-cover min-h-[50px] min-w-[50px] max-h-[50px] rounded-full border-white border-2"
               
                src={user?.image}
                alt="Profile"
              />
            ) : (
              <FaUser className="rounded-full border-white border-2 w-10 h-10 p-1" />
            )}
            <h1>
              {user?.firstName} {user?.lastName}
            </h1>
          </div>
          <Link
            className="hover:text-green-500 duration-300 md:text-base text-xs"
            to={`../../../../profile/edit-profile/${userId}`}
          >
            Profile
          </Link>

          <Link
            to={`/workout-plan/${userId}`}
            className="hover:text-green-500 duration-300 md:text-base text-xs"
          >
            {user.subscriptionStatus === "premium"
              ? "Workout Plan"
              : "Workout Plan"}
          </Link>

          <Link
            to={`/nutrition-plan/${userId}`}
            className="hover:text-green-500 duration-300 md:text-base text-xs"
          >
            {user.subscriptionStatus === "premium"
              ? "Nutrition Plan"
              : "Nutrition Plan"}
          </Link>

          {user.subscriptionStatus === "premium" && (
            <Link
              className="hover:text-green-500 duration-300 md:text-base text-xs"
              to={`/profile/weekly-report`}
            >
              Weekly report
            </Link>
          )}

          <Link
            className="hover:text-green-500 duration-300 md:text-base text-xs"
            to={`/profile/notifications`}
          >
            Notifications
          </Link>
          <Link
            className="hover:text-green-500 duration-300 md:text-base text-xs"
            to={`/profile/subscription`}
          >
            Settings
          </Link>
          <Link
            className="hover:text-green-500 duration-300 md:text-base text-xs"
            to={`/profile/help`}
          >
            Help
          </Link>
          {userRole && (
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="w-full items-center justify-center md:justify-between flex hover:text-green-500 duration-300"
            >
              <IoLogOutOutline className="md:w-5 md:h-5 h-5 w-5" />
              <span className="text-sm font-medium ml-4 sm:flex hidden">
                Logout
              </span>
            </button>
          )}
        </div>
      ) : null}
    </>
  );
}
