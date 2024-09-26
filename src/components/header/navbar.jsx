import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "../auth/logout";
import ThemeToggle from "../../ThemeToggle";
import TopBar from "./topBar";
import { IoPersonOutline } from "react-icons/io5";

function NavBar() {
  const token = useSelector((state) => state.auth.token);
  const userRole = useSelector((state) => state.auth.userRole);

  return (
    <header>
      <TopBar />
      <nav className="flex items-center justify-between bg-secondaryBackground text-white p-4">
        <ul className="flex items-center space-x-4">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:underline">
              About
            </Link>
          </li>
          {userRole === "admin" && (
            <li>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            </li>
          )}
        </ul>
        <ul className="flex space-x-4 items-center">
          {!userRole && (
            <>
              <li>
                <Link to="/auth/register" className="hover:underline">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/auth/login" className="hover:underline">
                  Login
                </Link>
              </li>
            </>
          )}
          {userRole && (
            <li>
              <Logout token={token} />
            </li>
          )}
          {userRole && (
            <li>
              <Link to="/profile" className="hover:underline">
                <IoPersonOutline />
              </Link>
            </li>
          )}
          <li className="flex items-center">
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
