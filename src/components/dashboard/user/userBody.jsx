import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../../../utils/axiosConfig";
import AddUser from "./addUser";
import UserCard from "./userCard";

import { IoFilterOutline } from "react-icons/io5";
function UserBody() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [thereIsChange, setThereIsChange] = useState(false);
  
  const [isOpen, setIsOpen] = useState(false);
  // Initialize React Hook Form
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      search: "",
      role: "",
      subscription: "",
      limit: 5,
    },
  });

  const formValues = watch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get(
          `/users?page=${page}&limit=${formValues.limit}${
            formValues.search ? `&search=${formValues.search}` : ""
          }${formValues.role ? `&role=${formValues.role}` : ""}${
            formValues.subscription
              ? `&subscriptionStatus=${formValues.subscription}`
              : ""
          }`
        );
        setUsers(response.data.users);
        setTotalPages(Math.ceil(response.data.totalUsers / formValues.limit));
        setThereIsChange(false);
        setError(null);
      } catch (error) {
        setError(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [
    page,
    formValues.limit,
    formValues.search,
    formValues.role,
    formValues.subscription,
    thereIsChange,
  ]);


  const onSubmit = () => {
    setPage(1);
  };
  const handlePageChange = (newPage) => setPage(newPage);
  const handleRefresh = () => {
    setThereIsChange(!thereIsChange);
  };

  // Adjust page if it exceeds totalPages
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [totalPages, page]);

  return (
    <main className="w-full p-4 flex flex-col justify-between h-full">
    <div>
      <div className="flex flex-row  sm:space-y-0 items-center justify-between mb-4">
        <input
          type="text"
          className="h-fit p-2 border rounded-md  w-[70%] shadow focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Search by name"
          {...register("search")}
        />
        <AddUser  onAdd={handleRefresh} />
      </div>
      <div
        className={`items-start  flex flex-col md:flex-row bg-white rounded-md 
    transition-all duration-500 ease-in-out
    ${
      isOpen
        ? "md:min-w-full md:max-w-full md:h-fit max-h-full"
        : "max-h-[60px] w-full md:min-w-[90px] md:max-w-[92px]"
    }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 min-h-[55px] text-left overflow-hidden
           rounded-b-md w-full  md:min-w-[100px] md:w-fit transition-all duration-300
            ease-in-out focus:outline-none"
        >
          <div className="flex justify-between items-center">
            <div className=" min-h-full w-full  flex items-center justify-between space-x-2">
              <span>Filters</span>
              <IoFilterOutline className="w-4 h-4" />
            </div>
          </div>
        </button>
        <div
          className={`w-full  overflow-hidden rounded-md transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-[300px]" : "max-h-0"
          }`}
        >
          <form
            className={`space-y-4 p-4 flex flex-col md:flex-row
               md:p-2 md:space-y-0 md:space-x-2 justify-between
                transition-opacity duration-300 ease-in-out`}
          >
        <select
          {...register("role")}
          className="p-2 border border-gray-300 rounded-md mr-2"
        >
          <option disabled value="">
            Select a role
          </option>
          <option value="admin">admin</option>
          <option value="user">user</option>
          <option value="">all</option>
        </select>

        <select
          {...register("limit")}
          className="mr-2 p-2 border border-gray-300 rounded-md"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
        <select
          {...register("subscription")}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option disabled value="">
            select a subscription
          </option>
          <option value="free">Free</option>
          <option value="premium">Premium</option>
          <option value="">All</option>
        </select>
      </form>
              
        </div>
      </div>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {loading ? (
        <div className="text-center">Loading user...</div>
      ) : (
        <>
          <div className="my-4 flex justify-around flex-wrap">
            {users.length > 0 ? (
              users.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  onDelete={handleRefresh}
                  onEdit={handleRefresh}
                />
              ))
            ) : (
              <div className="text-center text-gray-600">No user found</div>
            )}
          </div>

        </>
      )}
       </div>
      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`px-4 py-2 border rounded-md mr-2 ${
            page === 1
              ? "cursor-not-allowed opacity-50"
              : "bg-button hover:bg-buttonHover text-white"
          }`}
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages || users.length === 0}
          className={`px-4 py-2 border rounded-md ml-2 ${
            page === totalPages
              ? "cursor-not-allowed opacity-50"
              : "bg-button hover:bg-buttonHover text-white"
          }`}
        >
          Next
        </button>
      </div>
   
    </main>
  );
}

export default UserBody;
