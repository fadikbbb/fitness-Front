import React from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import apiClient from "../../../utils/axiosConfig";
// import { addUser } from "../../../store/userslice";

const AddUser = ({ onAdd }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false); // New loading state

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      gender: "",
      weight: 0,
      height: 0,
      dateOfBirth: "",
      subscriptionStatus: "free",
      role: "user",
      profileImage: "",
    },
  });
  const onSubmit = async (data) => {
    console.log(data); // log the data being sent
    try {
      setIsSubmitting(true);
      const response = await apiClient.post("/users", data);
      //   dispatch(addUser(response.data.users)); // check if response.data.users exists
      setMessage(response.data.message); // check if response.data.message exists
      setError(null);
      setTimeout(() => {
        setIsOpen(false);
      }, 500);
      onAdd();
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        setError(error.response.data.message); // Safely handle the error response
      } else {
        setError("An unexpected error occurred."); // Handle cases where error.response might be undefined
      }
      setMessage(null);
      setIsSubmitting(true);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="w-full flex">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded w-1/2 mx-auto"
      >
        Add user <FaPlus />
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm text-center">
            <h2 className="text-lg font-bold mb-4">Add user</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              
              <div className="mb-4">
                <label htmlFor="email" className="mr-2">
                  email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "user first name is required",
                  })}
                  className="p-2 border border-gray-300 rounded-md"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="mr-2">
                  password:
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "user first name is required",
                  })}
                  className="p-2 border border-gray-300 rounded-md"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="firstName" className="mr-2">
                  first name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName", {
                    required: "user first name is required",
                  })}
                  className="p-2 border border-gray-300 rounded-md"
                />
                {errors.firstName && (
                  <p className="text-red-500">{errors.firstName.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="mr-2">
                  last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName", {
                    required: "user last name is required",
                  })}
                  className="p-2 border border-gray-300 rounded-md"
                />
                {errors.lastName && (
                  <p className="text-red-500">{errors.lastName.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="profileImage" className="mr-2">
                  profile image URL:
                </label>
                <input
                  type="text"
                  id="profileImage"
                  {...register("profileImage", {
                    required: "profile image URL is required",
                  })}
                  className="p-2 border border-gray-300 rounded-md"
                />
                {errors.profileImage && (
                  <p className="text-red-500">{errors.profileImage.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="weight" className="mr-2">
                  weight:
                </label>
                <input
                  type="number"
                  id="weight"
                  step={0.1}
                  {...register("weight", {
                    required: " weight URL is required",
                  })}
                  className="p-2 border border-gray-300 rounded-md"
                />
                {errors.weight && (
                  <p className="text-red-500">{errors.weight.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="height" className="mr-2">
                  height:
                </label>
                <input
                  type="number"
                  id="height"
                  {...register("height", {
                    required: " height URL is required",
                  })}
                  className="p-2 border border-gray-300 rounded-md"
                />
                {errors.height && (
                  <p className="text-red-500">{errors.height.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="dateOfBirth" className="mr-2">
                  date of birth:
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  {...register("dateOfBirth", {
                    required: " date of birth URL is required",
                  })}
                  className="p-2 border border-gray-300 rounded-md"
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500">{errors.dateOfBirth.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="mr-2">
                  role:
                </label>
                <select
                  id="role"
                  {...register("role", {
                    required: "role is required",
                  })}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option disabled value="">
                    Select a role
                  </option>
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                </select>
                <select
                  id="gender"
                  {...register("gender", {
                    required: "gender is required",
                  })}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option disabled value="">
                    Select a gender
                  </option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                  <option value="other">other</option>
                </select>
                {errors.role && (
                  <p className="text-red-500">{errors.role.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="subscriptionStatus" className="mr-2">
                  subscriptionStatus:
                </label>
                <select
                  id="subscriptionStatus"
                  {...register("subscriptionStatus", {
                    required: "subscription status is required",
                  })}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select a subscription status</option>
                  <option value="free">free</option>
                  <option value="premium">premium</option>
                </select>
                {errors.subscriptionStatus && (
                  <p className="text-red-500">
                    {errors.subscriptionStatus.message}
                  </p>
                )}
              </div>

              {message && <p className="text-green-500 mb-4">{message}</p>}
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {isSubmitting && <p className="text-gray-500 mb-4">Saving...</p>}

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
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
