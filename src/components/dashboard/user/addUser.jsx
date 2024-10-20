import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import useFormSubmit from "../../../hooks/users/useAddUser";

const AddUser = ({ onAdd }) => {
  const [addFormOpen, setAddFormOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      gender: "",
      weight: "",
      height: "",
      dateOfBirth: "",
      subscriptionStatus: "",
      image: "",
    },
  });

  const {
    isAdding,
    addUserError,
    addUserMessage,
    addUser,
    setAddUserMessage,
    setAddUserError,
  } = useFormSubmit(onAdd, setAddFormOpen, setError);

  const handleAddUser = async (data) => {
    await addUser(data, reset);
  };

  const handleOpen = () => {
    setAddFormOpen(true);
  };

  return (
    <div className="w-[30%] flex justify-end items-center">
      <button
        onClick={handleOpen}
        className=" bg-button hover:bg-buttonHover text-white flex gap-2 items-center px-4 py-2 rounded-lg"
      >
        <div className="hidden md:flex"> Add user</div>
        <FaPlus className="w-4 h-4 md:hidden flex " />
      </button>
      {addFormOpen && (
        <div className="fixed inset-0 flex z-50 bg-black bg-opacity-50 ">
          <div className="bg-white min-h-screen overflow-auto mx-auto p-6 rounded shadow-lg max-w-sm ">
            <h2 className="text-lg font-bold mb-4 text-center">Add user</h2>
            <form
              onSubmit={handleSubmit(handleAddUser)}
              className="space-y-4"
              encType="multipart/form-data"
            >
              <div className="mb-4">
                <label htmlFor="email" className="">
                  email: <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "email is required",
                  })}
                  autoComplete="email"
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="">
                  password: <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "password is required",
                  })}
                  autoComplete="new-password"
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="firstName" className="">
                  first name: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName", {
                    required: "user first name is required",
                  })}
                  autoComplete="given-name"
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
                {errors.firstName && (
                  <p className="text-red-500">{errors.firstName.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="lastName" className="">
                  last Name: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName", {
                    required: "user last name is required",
                  })}
                  autoComplete="family-name"
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
                {errors.lastName && (
                  <p className="text-red-500">{errors.lastName.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="subscriptionStatus" className="">
                  subscription status: <span className="text-red-500">*</span>
                </label>
                <select
                  id="subscriptionStatus"
                  {...register("subscriptionStatus", {
                    required: "subscription status is required",
                  })}
                  className="p-2 border border-gray-300 rounded-md w-full"
                >
                  <option value="" disabled>
                    Select a subscription status
                  </option>
                  <option value="free">free</option>
                  <option value="premium">premium</option>
                </select>
                {errors.subscriptionStatus && (
                  <p className="text-red-500">
                    {errors.subscriptionStatus.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="gender" className="">
                  gender:
                </label>
                <select
                  id="gender"
                  {...register("gender")}
                  autoComplete="sex"
                  className="p-2 border border-gray-300 rounded-md w-full"
                >
                  <option disabled value="">
                    Select a gender
                  </option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                  <option value="other">other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500">{errors.gender.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="dateOfBirth" className="">
                  date of birth:
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  {...register("dateOfBirth", {
                    validate: {
                      notRequired: (value) => {
                        if (!value) return true;
                        return true;
                      },
                      min: (value) => {
                        if (!value) return true;
                        const minDate = new Date();
                        minDate.setFullYear(minDate.getFullYear() - 100);
                        return (
                          new Date(value) >= minDate ||
                          `Date of birth cannot be before ${
                            minDate.toISOString().split("T")[0]
                          }`
                        );
                      },
                      max: (value) => {
                        if (!value) return true;
                        const maxDate = new Date();
                        maxDate.setFullYear(maxDate.getFullYear() - 5);
                        return (
                          new Date(value) <= maxDate ||
                          `Date of birth cannot be after ${
                            maxDate.toISOString().split("T")[0]
                          }`
                        );
                      },
                    },
                  })}
                  autoComplete="bday"
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500">{errors.dateOfBirth.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="image" className="">
                  profile image URL:
                </label>
                <input
                  type="file"
                  id="image"
                  {...register("image", {
                    validate: {
                      notRequiredFile: (value) => {
                        if (!value[0]) return true;
                        const fileType = value[0].type;
                        const validTypes = [
                          "image/jpeg",
                          "image/jpg",
                          "image/png",
                          "image/gif",
                          "image/bmp",
                          "image/webp",
                        ];
                        if (!validTypes.includes(fileType))
                          return "Only JPG, JPEG, PNG, GIF, and WEBP image formats are allowed.";
                        return true;
                      },
                      maxSize: (value) => {
                        if (value[0] && value[0].size > 2 * 1024 * 1024)
                          return "File size must be less than 2MB";
                        return true;
                      },
                    },
                  })}
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
                {errors.image && (
                  <p className="text-red-500">{errors.image.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="weight" className="">
                  weight (kg):
                </label>
                <input
                  type="number"
                  id="weight"
                  step={0.1}
                  {...register("weight", {
                    min: {
                      value: 0,
                      message: "Weight must be greater than 0",
                    },
                    max: {
                      value: 500,
                      message: "Weight must be less than 500",
                    },
                  })}
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
                {errors.weight && (
                  <p className="text-red-500">{errors.weight.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="height" className="">
                  height (cm):
                </label>
                <input
                  type="number"
                  id="height"
                  {...register("height", {
                    min: {
                      value: 0,
                      message: "Height must be greater than 0",
                    },
                    max: {
                      value: 300,
                      message: "Height must be less than 300",
                    },
                  })}
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
                {errors.height && (
                  <p className="text-red-500">{errors.height.message}</p>
                )}
              </div>
              {addUserMessage && (
                <p className="text-green-500 mb-4">{addUserMessage}</p>
              )}
              {addUserError && (
                <p className="text-red-500 mb-4">{addUserError}</p>
              )}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-button hover:bg-buttonHover text-white font-bold py-2 px-4 rounded mr-2"
                  disabled={isAdding}
                >
                  {isAdding ? "Saving..." : "add user"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAddFormOpen(false);
                    setAddUserMessage(null);
                    setAddUserError(null);
                    reset();
                  }}
                  disabled={isAdding}
                  className={`bg-red-500  ${
                    isAdding
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-red-700"
                  }  text-white font-bold py-2 px-4 rounded`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUser;
