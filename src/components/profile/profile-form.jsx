import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa"; // Import the spinner icon
import apiClient from "../../utils/axiosConfig";
const ProfileForm = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // Manage loading state
  const [globalError, setGlobalError] = useState(null);
  const [message, setMessage] = useState(null); // For success messages
 
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm();

  useEffect(() => {
    if (!userId) return;
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(`/users/${userId}`, {});
        const userData = response.data.user;
        setUser(userData);

        // Set form values with the fetched user data
        setValue("firstName", userData.firstName);
        setValue("lastName", userData.lastName);
        setValue("email", userData.email);
        setValue("gender", userData.gender);
        setValue("weight", userData.weight);
        setValue("height", userData.height);
        setValue(
          "dateOfBirth",
          userData.dateOfBirth
            ? new Date(userData.dateOfBirth).toISOString().split("T")[0]
            : ""
        );
        setValue("profileImage", userData.profileImage || "");
        setGlobalError(null);
      } catch (error) {
        setGlobalError(error.response?.data?.error || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [ userId, setValue]);

  const onSubmit = async (data) => {
    if (!userId) {
      return;
    }

    const updatedData = {
      ...(data.email && { email: data.email }),
      ...(data.firstName && { firstName: data.firstName }),
      ...(data.lastName && { lastName: data.lastName }),
      ...(data.gender && { gender: data.gender }),
      ...(data.weight && { weight: data.weight }),
      ...(data.height && { height: data.height }),
      ...(data.dateOfBirth && { dateOfBirth: data.dateOfBirth }),
      ...(data.profileImage && { profileImage: data.profileImage }),
    };

    setLoading(true);
    try {
      const response = await apiClient.patch(
        `/users/${userId}`,
        updatedData
      );
      setMessage(response.data.message);
      setGlobalError("");
    } catch (error) {
      setMessage("");
      if (error.response && error.response.data && error.response.data.errors) {
        // Handle backend validation errors
        error.response.data.errors.forEach((err) => {
          setError(err.path, {
            type: "manual",
            message: err.msg,
          });
        });
      } else {
        setGlobalError(error.response.data?.error || "Error updating profile");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);

      try {
        await apiClient.post(`/upload`, formData);
        setValue("profileImage", file.name);
      } catch (error) {
        setGlobalError("Error uploading profile image");
        console.error("Error uploading profile image:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    ); // Spinner while loading
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg"
    >
      <div>
        <label htmlFor="firstName" className="block font-medium text-gray-700">
          First Name
        </label>
        <input
          id="firstName"
          {...register("firstName", { required: "First name is required" })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.firstName && (
          <p className="mt-1 text-sm text-red-600">
            {errors.firstName.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="lastName" className="block font-medium text-gray-700">
          Last Name
        </label>
        <input
          id="lastName"
          {...register("lastName", { required: "Last name is required" })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.lastName && (
          <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="block font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value:
                /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Invalid email address",
            },
          })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          readOnly // Makes email field visible but non-editable
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="gender" className="block font-medium text-gray-700">
          Gender
        </label>
        <select
          id="gender"
          {...register("gender")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="weight" className="block font-medium text-gray-700">
          Weight (kg)
        </label>
        <input
          id="weight"
          type="number"
          {...register("weight", { min: 0, max: 500 })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="height" className="block font-medium text-gray-700">
          Height (cm)
        </label>
        <input
          id="height"
          type="number"
          {...register("height", { min: 0, max: 300 })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="dateOfBirth"
          className="block font-medium text-gray-700"
        >
          Date of Birth
        </label>
        <input
          id="dateOfBirth"
          type="date"
          {...register("dateOfBirth")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="profileImage"
          className="block font-medium text-gray-700"
        >
          Profile Image
        </label>
        <input
          id="profileImage"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {user && user.profileImage && (
          <p className="mt-2 text-sm text-gray-500">
            Current image: {user.profileImage}
          </p>
        )}
      </div>
      {globalError && <p className="text-red-500">{globalError}</p>}
      {message && <p className="text-green-500">{message}</p>}
      <button
        type="submit"
        className="relative w-full px-4 py-2 bg-indigo-600 text-white font-medium text-sm leading-tight rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={loading}
      >
        {loading && (
          <FaSpinner className="absolute inset-0 m-auto w-5 h-5 text-white animate-spin" />
        )}
        <span className={loading ? "opacity-0" : ""}>
          {loading ? "Updating..." : "Update Profile"}
        </span>
      </button>
    </form>
  );
};

export default ProfileForm;
