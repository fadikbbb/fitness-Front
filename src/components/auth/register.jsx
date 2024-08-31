import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [errorPath, setErrorPath] = useState([]);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [passwordVisible, setPasswordVisible] = useState(false); // Password visibility

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Show spinner on submit
    try {
      await axios.post("http://localhost:5000/api/v1/auth/register", formData);
      setSuccess("Registration successful!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      setErrors([]);
      setErrorPath([]);
      navigate("/auth/login");
    } catch (error) {
      setErrors(error.response.data.errors.map((err) => err.msg));
      setErrorPath(error.response.data.errors.map((err) => err.path));
      setSuccess("");
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600">
        Create an Account
      </h2>

      {success && (
        <p className="text-green-500 text-sm mb-6 text-center">{success}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errorPath.includes("firstName")
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
             {errorPath && errorPath.includes("lastName") && (
            <p className="text-red-500 text-xs mt-1">
              {errors[errorPath.indexOf("lastName")]}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errorPath.includes("lastName")
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {errorPath &&  errorPath.includes("lastName") && (
            <p className="text-red-500 text-xs mt-1">
              {errors[errorPath.indexOf("lastName")]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errorPath.includes("email") ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errorPath && errorPath.includes("email") && (
            <p className="text-red-500 text-xs mt-1">
              {errors[errorPath.indexOf("email")]}
            </p>
          )}
        </div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="space-y-1 relative">
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errorPath.includes("password")
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 px-3 py-1 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
          </div>
          {errorPath && errorPath.includes("password") && (
            <p className="text-red-500 text-xs mt-1">
              {errors[errorPath.indexOf("password")]}
            </p>
          )}

        <div>
          <button
            type="submit"
            className={`w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              loading ? "cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className="animate-spin mx-auto" />
            ) : (
              "Register"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
