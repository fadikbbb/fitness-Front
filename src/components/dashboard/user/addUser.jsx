import React from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import apiClient from "../../../utils/axiosConfig";
// import { addUser } from "../../../store/userslice";
// import UserForm from "./userForm";
import { useState } from "react";
const AddUser = ({ onAdd }) => {
  const [addFormOpen, setAddFormOpen] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState({});
  const [error, setError] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false); // New loading state

  const {
    register,
    handleSubmit,
    formState: errors ,
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
      image: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      Object.keys(data).forEach((key) => {
        
        console.log(key, data[key]);
        if (data[key] === "image") {
          console.log(key, data[key]);
          if (data[key].length > 0) {
            data[key] = data[key][0];
          }
        } else if (
          data[key] !== "" &&
          data[key] !== 0 &&
          data[key] !== null &&
          data[key] !== undefined
        ) {
          return data[key];
        } else {
          data[key] = null;
        }
      });console.log(data);
      
      setIsSubmitting(true);
      const response = await apiClient.post("/users", data);
      //   dispatch(addUser(response.data.users)); // check if response.data.users exists
      setMessage(response.data.message); // check if response.data.message exists
      setError(null);
      setTimeout(() => {
        setAddFormOpen(false);
      }, 500);
      onAdd();
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.errors) {
        const errorMessages = {};
        error.response.data.errors.forEach((err) => {
          errorMessages[err.path] = err.msg; // Map errors to their respective fields
        });
        setFormErrors(errorMessages); // Update formErrors state
      } else if (error.response && error.response.data.message) {
        setFormErrors({}); // Clear formErrors state if there are no errors
        setError(error.response.data.message); // Safely handle the error response
      }
      setMessage(null);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleOpen = () => {
    setAddFormOpen(true);
    setError(null);
    setMessage(null);
  };
  return (
    <div className="w-[30%] flex justify-end items-center">
      <button
        onClick={handleOpen}
        className=" bg-button hover:bg-buttonHover text-white flex gap-2 items-center px-4 py-2 rounded-lg"
      >
        <div className="hidden md:flex"> Add user</div>
         <FaPlus className="w-4 h-4 md:hidden flex "/>
      </button>
      {addFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm text-center">
            <h2 className="text-lg font-bold mb-4">Add user</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
              encType="multipart/form-data"
            >
              <div className="mb-4">
                <label htmlFor="email" className="mr-2">
                  email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "email is required",
                  })}
                  className="p-2 border border-gray-300 rounded-md"
                />
                {formErrors.email && (
                  <p className="text-red-500">{formErrors.email.message}</p>
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
                    required: "password is required",
                  })}
                  className="p-2 border border-gray-300 rounded-md"
                />
                {formErrors.password && (
                  <p className="text-red-500">{formErrors.password}</p>
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
                {formErrors.firstName && (
                  <p className="text-red-500">{formErrors.firstName}</p>
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
                {formErrors.lastName && (
                  <p className="text-red-500">{formErrors.lastName}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="image" className="mr-2">
                  profile image URL:
                </label>
                <input
                  type="file"
                  id="image"
                  {...register("image")}
                  className="p-2 border border-gray-300 rounded-md"
                />
                {formErrors.image && (
                  <p className="text-red-500">{formErrors.image}</p>
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
                  {...register("weight")}
                  className="p-2 border border-gray-300 rounded-md"
                />
                {formErrors.weight && (
                  <p className="text-red-500">{formErrors.weight}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="height" className="mr-2">
                  height:
                </label>
                <input
                  type="number"
                  id="height"
                  {...register("height")}
                  className="p-2 border border-gray-300 rounded-md"
                />
                {formErrors.height && (
                  <p className="text-red-500">{formErrors.height}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="dateOfBirth" className="mr-2">
                  date of birth:
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  {...register("dateOfBirth")}
                  className="p-2 border border-gray-300 rounded-md"
                />
                {formErrors.dateOfBirth && (
                  <p className="text-red-500">{formErrors.dateOfBirth}</p>
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
                  {...register("gender")}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option disabled value="">
                    Select a gender
                  </option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                  <option value="other">other</option>
                </select>
                {formErrors.role && (
                  <p className="text-red-500">{formErrors.role}</p>
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
                {formErrors.subscriptionStatus && (
                  <p className="text-red-500">
                    {formErrors.subscriptionStatus}
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
                  onClick={() => setAddFormOpen(false)}
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
