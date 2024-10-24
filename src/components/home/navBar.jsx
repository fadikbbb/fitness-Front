import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FaUser } from "react-icons/fa";

import Logout from "../auth/logout";
import Profile from "../profile/profile";
import { SkeletonNavBar } from "../loading/SkeletonHome";
export default function NavBar({ exception }) {
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const { userRole } = useSelector((state) => state.auth);

  const { user } = useSelector((state) => state.user);

  const { hero, loading } = useSelector((state) => state.settings);

  return (
    <>
      {loading ? (
        <div
          className={`${
            exception ? "fixed top-0 left-1/2 -translate-x-1/2" : "bg-primary"
          } p-3 container z-50`}
        >
          <SkeletonNavBar />
        </div>
      ) : (
        <header className="w-full h-[72px]">
          <div className={`${exception ? "fixed top-0" : ""} w-full z-50`}>
            <nav
              className={`container mx-auto relative flex items-center justify-between ${
                exception
                  ? "backdrop-blur-md bg-[rgba(0,0,0,0.5)]"
                  : "bg-primary"
              } text-white p-4`}
            >
              {/* Logo */}
              <Link to={"/"} className="flex items-center gap-2">
                <div className="min-w-[40px] max-w-[40px] max-h-[40px] min-h-[40px] object-cover object-center">
                  <img src={hero.logo} alt="Logo" />
                </div>
                <h1>{hero.companyName}</h1>
              </Link>
              <ul className="flex items-center space-x-4">
                <li>
                  <HashLink
                    to="/#home"
                    className="hover:text-green-500 duration-300 md:text-base text-xs"
                  >
                    Home
                  </HashLink>
                </li>

                {userRole === "admin" && (
                  <li>
                    <Link
                      to="/dashboard"
                      className="hover:text-green-500 duration-300 md:text-base text-xs"
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
              </ul>
              <ul className="flex space-x-4 items-center">
                {userRole ? (
                  <li
                    onClick={() => setIsOpenProfile(!isOpenProfile)}
                    className="hover:text-green-500 cursor-pointer  md:text-base text-xs"
                  >
                    {user?.image ? (
                      <img
                        src={user?.image}
                        className="min-w-[40px] max-w-[40px] max-h-[40px] min-h-[40px] rounded-full object-cover object-center"
                        alt="profile"
                      />
                    ) : (
                      <FaUser className="rounded-full border-white duration-300 hover:border-green-500 border-2 w-[40px] h-[40px] p-1" />
                    )}
                  </li>
                ) : (
                  <>
                    <li>
                      <Link
                        to="/auth/register"
                        className="hover:text-green-500 duration-300 md:text-base text-xs"
                      >
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/auth/login"
                        className="hover:bg-green-600 bg-green-500 px-4 py-2 rounded-xl duration-300 md:text-base text-xs"
                      >
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </ul>
              <Profile
                setIsLogoutModalOpen={setIsLogoutModalOpen}
                setIsOpenProfile={setIsOpenProfile}
                isOpenProfile={isOpenProfile}
                exception={exception}
              />
            </nav>
          </div>
          <Logout
            isLogoutModalOpen={isLogoutModalOpen}
            setIsLogoutModalOpen={setIsLogoutModalOpen}
          />
        </header>
      )}
    </>
  );
}
