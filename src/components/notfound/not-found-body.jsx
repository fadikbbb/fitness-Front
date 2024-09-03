// src/pages/NotFound.js
import React from "react";
import { useNavigate } from "react-router-dom";

function NotFoundBody() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-red-500">
        404 - Page Not Found
      </h1>
      <p className="text-lg mb-8 text-gray-700">
        Sorry, the page you are looking for does not exist.
      </p>
      <button
        onClick={handleGoHome}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
      >
        Go to Home
      </button>
    </div>
  );
}

export default NotFoundBody;
