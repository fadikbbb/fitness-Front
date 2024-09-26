import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IoFastFoodOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import Logout from "../auth/logout";
import { useSelector } from "react-redux";
import { GiMuscularTorso } from "react-icons/gi";
function SideBar() {
  const { token } = useSelector((state) => state.auth.token);
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) =>
    currentPath === path
      ? "text-primary ml-2 relative before:absolute  before:rounded-r-lg before:-top-[8.5px] before:-right-[1px] before:w-2 before:border-r-[3px] before:border-background before:h-3 before:rotate-45 after:absolute  after:rounded-r-lg after:-bottom-[8.5px] after:-right-[1px] after:w-2 after:border-r-[3px] after:border-background after:h-3 after:-rotate-45 bg-background rounded-tl-lg rounded-bl-lg transition-all duration-300"
      : "text-white  ml-2  relative hover:text-white before:border-r-2 after:border-r-2 before:border-hover after:border-hover  before:absolute  before:rounded-r-lg before:-top-[8.5px] before:-right-[1px] before:w-2 before:border-r-[3px] before:hover:border-r-[3px] before:duration-300 after:duration-300 before:hover:border-primary before:h-3 before:rotate-45 after:absolute  after:rounded-r-lg after:-bottom-[8.5px] after:-right-[1px] after:w-2  after:border-r-[3px] after:hover:border-primary after:h-3 after:-rotate-45 hover:bg-primary dark:hover:bg-darkHover rounded-tl-lg rounded-bl-lg transition-all duration-300";

  return (
    <div className="w-[20%] h-screen overflow-hidden sticky z-40 top-0 bg-hover text-white flex flex-col justify-between ">
      <ul className="flex flex-col space-y-4 my-2">
        <h3 className="p-4 text-lg font-bold border-b border-primary">
          Fitness Dashboard
        </h3>
        <li>
          <Link
            to="/dashboard/exercise"
            className={`flex flex-col items-center sm:justify-between justify-center ${isActive(
              "/dashboard/exercise"
            )}`}
          >
            <div className="w-full flex items-center sm:justify-between justify-center p-2 sm:p-4">
              <GiMuscularTorso className="w-6 h-6 mr-2" />
              <span className="text-base font-medium sm:block hidden">
                Exercises
              </span>
            </div>
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/food"
            className={`flex items-center sm:justify-between justify-center p-2 sm:p-4 ${isActive(
              "/dashboard/food"
            )}`}
          >
            <IoFastFoodOutline className="w-6 h-6 " />
            <span className="text-base font-medium sm:block hidden">Food</span>
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/users"
            className={`flex items-center sm:justify-between justify-center p-2 sm:p-4 ${isActive(
              "/dashboard/users"
            )}`}
          >
            <IoPersonOutline className="w-6 h-6 " />
            <span className="text-base font-medium sm:block hidden">Users</span>
          </Link>
        </li>
      </ul>
      <ul className="border-t border-primary dark:border-darkText">
        <li>
          <Link
            to="/dashboard/settings"
            className="flex items-center sm:justify-between justify-center p-2 sm:p-4"
          >
            <IoSettingsOutline className="w-6 h-6" />
            <span className="text-base font-medium  sm:block hidden">
              Settings
            </span>
          </Link>
        </li>
        <li className="sm:flex hidden items-center sm:justify-between justify-center p-2 sm:p-4">
          <Logout token={token} textLogout="Logout" />
        </li>
        <li className="sm:hidden flex items-center sm:justify-between justify-center p-2 sm:p-4">
          <Logout token={token} textLogout="" />
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
