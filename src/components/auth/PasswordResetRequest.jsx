import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

function RequestPasswordReset() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Use Effect to set email if provided in location state
  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the email field is not empty
    if (!email) {
      setError("Please enter your email.");
      setMessage("");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/password-reset/request", {
        email,
      });

      if (response.data.message === "success") {
        setMessage("Reset link sent successfully!");
        setError("");
      } else {
        setError(response.data.error || "Something went wrong");
        setMessage("");
      }
    } catch (err) {
      setError("Network error");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Request Password Reset
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className={`w-full py-3 rounded-md text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading ? "bg-blue-400" : "bg-blue-500"
            } ${loading ? "cursor-not-allowed" : "hover:bg-blue-600"}`}
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className="animate-spin mx-auto" />
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-green-600 text-center">{message}</p>
        )}
        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default RequestPasswordReset;
