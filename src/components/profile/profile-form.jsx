import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaSpinner, FaArrowRight, FaUpload, FaUser } from "react-icons/fa";
import apiClient from "../../utils/axiosConfig";
import ChangePassword from "./changePassword";

export default function ProfileForm() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    watch,
  } = useForm();

  const watchProfileImage = watch("image");

  useEffect(() => {
    if (!id) return;

    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const { data } = await apiClient.get(`/users/${id}`);
        setUser(data.user);
        setGlobalError(null);
      } catch (error) {
        setGlobalError(error.response?.data?.error || "Error fetching data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [id]);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      setValue("firstName", user.firstName || "");
      setValue("lastName", user.lastName || "");
      setValue("email", user.email || "");
      setValue("gender", user.gender || "");
      setValue("weight", user.weight || "");
      setValue("height", user.height || "");
      setValue(
        "dateOfBirth",
        user.dateOfBirth ? user.dateOfBirth.slice(0, 10) : ""
      );

      // Don't set image here, as it's a file input
      setPreviewImage(user.image || null);
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    if (!id) return;
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "image") {
        formData.append(key, data.image);
      } else {
        formData.append(key, data[key]);
      }
    });

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    setIsLoading(true);
    try {
      setSuccessMessage("");
      const { data: response } = await apiClient.patch(
        `/users/${id}`,
        formData
      );
      setSuccessMessage(response.message);
      setGlobalError(null);
    } catch (error) {
      setSuccessMessage("");
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => {
          setError(err.path, { type: "manual", message: err.msg });
        });
      } else {
        setGlobalError(error.response?.data?.error || "Error updating profile");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      setGlobalError("Only image files are allowed (JPG, PNG, GIF).");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setGlobalError("File size must be less than 2MB.");
      return;
    }
    setPreviewImage(URL.createObjectURL(file));
    setGlobalError(null);

    setValue("image", file);
  };

  return (
    <div className="w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="relative p-6 border-b flex justify-between border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">
          Profile Information
        </h2>
        <Link
          to="/"
          className=" text-gray-500 hover:text-gray-700 transition-colors"
        >
          <FaArrowRight className="w-6 h-6" />
        </Link>
      </div>
      <div className="p-6 w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={user.email || ""}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  {...register("gender")}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="weight"
                  className="block text-sm font-medium text-gray-700"
                >
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
                <label
                  htmlFor="height"
                  className="block text-sm font-medium text-gray-700"
                >
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
                  className="block text-sm font-medium text-gray-700"
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
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profile Image
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUser className="w-full h-full text-gray-300" />
                    )}
                  </div>
                  <label htmlFor="image" className="cursor-pointer">
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      {...register("image")}
                      onChange={handleFileChange} // Ensure this function is correctly updating the state
                      className="hidden"
                    />
                    <div className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-500">
                      <FaUpload className="w-4 h-4" />
                      <span>Upload new image</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {globalError && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{globalError}</span>
            </div>
          )}

          {successMessage && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{successMessage}</span>
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? (
                <FaSpinner className="animate-spin mr-2 h-5 w-5" />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>

        <div className="mt-8">
          <ChangePassword />
        </div>
      </div>
    </div>
  );
}
