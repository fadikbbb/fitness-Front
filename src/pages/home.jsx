import React from "react";
import NavBar from "../components/header/navbar";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct named import

function Home() {
  const location = useLocation();
  const { token } = location.state || {}; // Destructure the token from location state

  // Decode the token if available
  const decodedToken = token ? jwtDecode(token) : null;

  return (
    <div>
      {/* Pass decoded token or raw token to NavBar if needed */}
      <NavBar tokenFromHome={token} decodedToken={decodedToken} />
    </div>
  );
}

export default Home;
