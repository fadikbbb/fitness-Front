import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";

const ProfileForm = ({ user }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const userId = useSelector((state) => state.user.userId);
  const token = useSelector((state) => state.auth.token);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      gender: user.gender || "",
      weight: user.weight || "",
      height: user.height || "",
      dateOfBirth: user.dateOfBirth
        ? new Date(user.dateOfBirth).toISOString().split("T")[0]
        : "",
      profileImage: user.profileImage || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      await axios.patch(
        `${BASE_URL}/users/${userId}`,
        data,
        config
      );

      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Optionally handle file upload here
      // For example, upload file to a server or cloud storage
      const formData = new FormData();
      formData.append("profileImage", file);

      try {
        // Assuming you have a separate endpoint for uploading images
        await axios.post(`${BASE_URL}/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        // Update profile image in the form state
        setValue("profileImage", file.name);
      } catch (error) {
        console.error("Error uploading profile image:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="firstName" className="block">
          First Name
        </label>
        <input
          id="firstName"
          {...register("firstName", { required: "First name is required" })}
          className="input"
        />
        {errors.firstName && (
          <p className="text-red-500">{errors.firstName.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="lastName" className="block">
          Last Name
        </label>
        <input
          id="lastName"
          {...register("lastName", { required: "Last name is required" })}
          className="input"
        />
        {errors.lastName && (
          <p className="text-red-500">{errors.lastName.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="block">
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
          className="input"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="gender" className="block">
          Gender
        </label>
        <select id="gender" {...register("gender")} className="input">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="weight" className="block">
          Weight (kg)
        </label>
        <input
          id="weight"
          type="number"
          {...register("weight", { min: 0, max: 500 })}
          className="input"
        />
      </div>
      <div>
        <label htmlFor="height" className="block">
          Height (cm)
        </label>
        <input
          id="height"
          type="number"
          {...register("height", { min: 0, max: 300 })}
          className="input"
        />
      </div>
      <div>
        <label htmlFor="dateOfBirth" className="block">
          Date of Birth
        </label>
        <input
          id="dateOfBirth"
          type="date"
          {...register("dateOfBirth")}
          className="input"
        />
      </div>
      <div>
        <label htmlFor="profileImage" className="block">
          Profile Image
        </label>
        <input
          id="profileImage"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="input"
        />
        {user.profileImage && (
          <p className="text-gray-500">Current image: {user.profileImage}</p>
        )}
      </div>
      <button type="submit" className="btn">
        Update Profile
      </button>
    </form>
  );
};

export default ProfileForm;
