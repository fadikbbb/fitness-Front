import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Correct import
import axios from "axios";
import { Link } from "react-router-dom";

function NavBar({ tokenFromHome }) {
  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState(
    localStorage.getItem("authToken") !== null
      ? localStorage.getItem("authToken")
      : null
  );

  useEffect(() => {
    setToken(tokenFromHome);
  }, [tokenFromHome]);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          const response = await axios.get(
            `http://localhost:5000/api/v1/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("User details:", response.data.user);
          setUserRole(response.data.user.role);
        } catch (error) {
          console.error(
            "Error fetching user details:",
            error.response?.data || error.message
          );

          localStorage.removeItem("authToken");
          setToken(null);
          setUserRole(null);
        }
      } else {
        setUserRole(null);
      }
    };

    fetchUserRole();
  }, [token]);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
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

        {userRole && userRole === "admin" && (
          <li>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
          </li>
        )}
        {userRole && userRole !== "admin" && (
          <li>
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
          </li>
        )}

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
            <button
              onClick={() => {
                localStorage.removeItem("authToken");
                setToken(null);
                setUserRole(null);
              }}
              className="hover:underline"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
