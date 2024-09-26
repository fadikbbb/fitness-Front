import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../../../utils/axiosConfig";
import AddUser from "./addUser";
import UserCard from "./userCard";

function UserBody() {
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [thereIsChange, setThereIsChange] = useState(false);

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
        setUser(response.data.users);
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
    <main className="flex-1 w-full m-4">
      <AddUser onAdd={handleRefresh} />

      <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          {...register("search")}
          className="p-2 border rounded mr-2"
        />

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
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {loading ? (
        <div className="text-center">Loading user...</div>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-center mb-6">Premium Users</h1>
          <div className="my-4 flex justify-around flex-wrap">
            {user.length > 0 ? (
              user.map((user) => (
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

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setPage(page < 1 ? 1 : page - 1)}
              disabled={page <= 1}
              className={`px-4 py-2 border rounded mr-2 ${
                page <= 1 ? "cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {page <= 1 ? 1 : page} of {totalPages < 1 ? 1 : totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages || user.length === 0}
              className={`px-4 py-2 border rounded ml-2 ${
                page === totalPages ? "cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default UserBody;
