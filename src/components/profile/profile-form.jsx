import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaSpinner, FaArrowRight, FaUser } from "react-icons/fa";
import ChangePassword from "./changePassword";
import DeleteAccount from "./deleteAccount";
import useEditUserStatus from "../../hooks/users/useEditUserStatus";
import { useSelector } from "react-redux";

export default function ProfileForm() {
  const { userId } = useParams();
  const [previewImage, setPreviewImage] = useState(null);

  const { editUser, isEditing, editUserMessage, editUserError } =
    useEditUserStatus(true);
  const { user } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setValue("image", file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
      setPreviewImage(null);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    Object.keys(data).forEach((key) => {
      if (key !== "image" && data[key] !== "") {
        formData.append(key, data[key]);
      }
    });

    await editUser(userId, formData);
  };

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
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
      setPreviewImage(user.image || null);
    }
  }, [user, setValue]);

  return (
    <div className="container w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      {!user ? (
        <div className="flex justify-center items-center h-full">
          <FaSpinner className="animate-spin w-6 h-6 text-gray-500" />
        </div>
      ) : (
        <>
          <div className="relative p-6 border-b flex justify-between border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">
              Profile Information
            </h2>
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaArrowRight className="w-6 h-6" />
            </Link>
          </div>
          <div className="p-6 w-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
              className="space-y-6 p-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {/* First Name */}
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
                        pattern: {
                          value: /^[A-Za-z]+$/i,
                          message: "First name should only contain letters",
                        },
                      })}
                      autoComplete="given-name"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
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
                        pattern: {
                          value: /^[A-Za-z]+$/i,
                          message: "Last name should only contain letters",
                        },
                      })}
                      autoComplete="family-name"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>

                  {/* Email (Read Only) */}
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
                      value={user?.email || ""}
                      readOnly
                      autoComplete="email"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      {...register("gender", {
                        required: "Please select a gender",
                      })}
                      autoComplete="off"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Weight */}
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
                      {...register("weight", {
                        min: {
                          value: 1,
                          message: "Weight must be at least 1 kg",
                        },
                        max: {
                          value: 500,
                          message: "Weight must not exceed 500 kg",
                        },
                      })}
                      autoComplete="off"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.weight && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.weight.message}
                      </p>
                    )}
                  </div>

                  {/* Height */}
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
                      {...register("height", {
                        min: {
                          value: 1,
                          message: "Height must be at least 1 cm",
                        },
                        max: {
                          value: 300,
                          message: "Height must not exceed 300 cm",
                        },
                      })}
                      autoComplete="off"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.height && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.height.message}
                      </p>
                    )}
                  </div>

                  {/* Date of Birth */}
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
                      {...register("dateOfBirth", {
                        validate: {
                          minAge: (value) => {
                            if (!value) return true; // If no date is provided, it's valid
                            const dob = new Date(value);
                            const minAgeDate = new Date();
                            minAgeDate.setFullYear(
                              minAgeDate.getFullYear() - 5
                            );
                            return (
                              dob <= minAgeDate ||
                              "You must be at least 5 years old"
                            );
                          },
                          maxAge: (value) => {
                            if (!value) return true; // If no date is provided, it's valid
                            const dob = new Date(value);
                            const maxAgeDate = new Date();
                            maxAgeDate.setFullYear(
                              maxAgeDate.getFullYear() - 100
                            );
                            return (
                              dob >= maxAgeDate ||
                              "You must be less than 100 years old"
                            );
                          },
                        },
                      })}
                      autoComplete="bday"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.dateOfBirth && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.dateOfBirth.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Profile Picture
                </label>
                <div className="flex items-center mt-1">
                  <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Profile Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <FaUser className="h-full w-full text-gray-300" />
                    )}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onImageChange}
                    className="ml-5 bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              {editUserMessage && (
                <p className="mt-2 text-green-600 text-center">
                  {editUserMessage}
                </p>
              )}
              {editUserError && (
                <p className="mt-2 text-red-600 text-center">{editUserError}</p>
              )}
              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isEditing}
                  className={`w-fit  flex justify-center self-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isEditing
                      ? "bg-gray-500"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {isEditing ? (
                    <>
                      <FaSpinner className="animate-spin h-5 w-5 mr-2" />{" "}
                      Updating...
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </button>
              </div>
            </form>

            {/* Delete Account Button */}
            <div className="mt-6">
              <DeleteAccount userId={userId} />
            </div>

            {/* Change Password Button */}
            <div>
              <ChangePassword userId={userId} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
