import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Profile = memo(
  ({ setIsOpenProfile, setIsLogoutModalOpen, exception, isOpenProfile }) => {
    const { userId, userRole } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    if (!userId && userId === "undefined" && userId === "null") {
      setIsOpenProfile(false);
    }
    const [isSunday, setIsSunday] = useState(false);
    useEffect(() => {
      const today = new Date();
      setIsSunday(today.getDay() === 2); // Check if today is Sunday
    }, [isSunday, userId, navigate]);
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
              to={`/user/profile/edit-profile/${userId}`}
            >
              Profile
            </Link>
            {user?.subscriptionStatus === "premium" && (
              <>
                <Link
                  to={`/user/workout-plan/${userId}`}
                  className="hover:text-green-500 duration-300 md:text-base text-xs"
                >
                  Workout Plan
                </Link>
                <Link
                  to={`/user/nutrition-plan/${userId}`}
                  className="hover:text-green-500 duration-300 md:text-base text-xs"
                >
                  Nutrition Plan
                </Link>

                {isSunday && (
                  <Link
                    className="hover:text-green-500 duration-300 md:text-base text-xs"
                    to={`/user/weekly-reports/${userId}`}
                  >
                    Weekly report
                  </Link>
                )}
              </>
            )}

            <Link
              className="hover:text-green-500 duration-300 md:text-base text-xs"
              to={`/user/profile/notifications`}
            >
              Notifications
            </Link>
            <Link
              className="hover:text-green-500 duration-300 md:text-base text-xs"
              to={`/user/profile/subscription`}
            >
              Settings
            </Link>
            <Link
              className="hover:text-green-500 duration-300 md:text-base text-xs"
              to={`/user/profile/help`}
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
);
export default Profile;
