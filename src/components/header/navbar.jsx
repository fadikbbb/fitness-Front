// src/components/partsOfpage/navbar.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserRole, clearAuthState } from "../../store/authSlice";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
import Logout from "../auth/logout";

function NavBar() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userRole = useSelector((state) => state.auth.userRole);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    if (token) {
      const fetchUserRole = async () => {
        try {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          const response = await axios.get(`${BASE_URL}/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch(setUserRole(response.data.user.role));
        } catch (error) {
          console.error(
            "Error fetching user details:",
            error.response?.data || error.message
          );
        }
      };

      fetchUserRole();
    } else {
      dispatch(clearAuthState());
    }
  }, [token, dispatch, BASE_URL]);

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

        {userRole === "admin" && (
          <li>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
          </li>
        )}
        {userRole && (
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
            <Logout token={token} />
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
