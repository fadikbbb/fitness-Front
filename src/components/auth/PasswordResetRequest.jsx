import { useLocation } from "react-router-dom";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_BASE_URL;

function RequestPasswordReset() {
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: location.state?.email || "",
    },
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/reset-password/request`,
        {
          email: data.email,
        }
      );

      if (response.status === 200) {
        setMessage(response.data.message);
        setError("");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
            className={`w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
          {message && (
            <p className="mt-4 text-green-600 text-center">{message}</p>
          )}
          {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
          <button
            type="submit"
            className={`w-full py-3 rounded-md text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary ${
              loading ? "bg-button" : "bg-button"
            } ${loading ? "cursor-not-allowed" : "hover:bg-buttonHover"}`}
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className="animate-spin mx-auto" />
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      </div>
    </div>
  );
  
}

export default RequestPasswordReset;
