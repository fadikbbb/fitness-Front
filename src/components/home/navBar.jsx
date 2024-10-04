import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import useContentsHook from "../../hooks/contents";

function NavBar({ exception }) {
  const { logo } = useContentsHook();
  const userRole = useSelector((state) => state.auth.userRole);
  return (
    <header className="w-full h-[72px]">
      <div className={`${exception ? "fixed top-0" : ""} w-full z-50`}>
        <nav className={`container flex items-center justify-between ${exception?"backdrop-blur-md bg-[rgba(0,0,0,0.5)]":"bg-primary"} text-white p-4`}>
          <div className="min-w-[40px] w-[40px] h-[40px] overflow-hidden">
            <img src={logo} alt="" />
          </div>
          <ul className="flex items-center space-x-4">
            <li>
              <Link
                to="/"
                className="hover:text-green-500 duration-300 md:text-base text-xs"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-green-500 duration-300 md:text-base text-xs"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-green-500 duration-300 md:text-base text-xs"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/trainers"
                className="hover:text-green-500 duration-300 md:text-base text-xs"
              >
                trainers
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-green-500 duration-300 md:text-base text-xs"
              >
                services
              </Link>
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
            {!userRole && (
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
            {userRole && (
              <li>
                <Link
                  to="/profile"
                  className="hover:text-green-500 duration-300 md:text-base text-xs"
                >
                  <IoPersonOutline />
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
export default NavBar;
