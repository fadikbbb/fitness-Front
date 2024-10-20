import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useUsersFetching from "../../../hooks/users/useUsersFetching";
import AddUser from "./addUser";
import UserCard from "./userCard";
import { IoFilterOutline } from "react-icons/io5";
import SkeletonBody from "../../loading/skeletonBody";

function UserBody() {
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [changes, setChanges] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const { register, watch } = useForm({
    defaultValues: {
      search: "",
      isActive: "",
      subscription: "",
      limit: 5,
    },
  });

  const formValues = watch();

  const { users, usersFetchingLoading, usersFetchingError } = useUsersFetching({
    setTotalPages,
    page,
    limit: formValues.limit,
    search: formValues.search,
    subscription: formValues.subscription,
    isActive: formValues.isActive,
    changes,
    setChanges,
  });

  useEffect(() => {
    if (page > totalPages) {
      if (totalPages > 0) {
        setPage(totalPages);
      } else {
        setPage(1);
        setTotalPages(1);
      }
    }
  }, [totalPages, page]);

  const handlePageChange = (newPage) => setPage(newPage);
  const handleRefresh = () => {
    setChanges(!changes);
  };

  return (
    <main className="w-full flex flex-col justify-between h-full">
      {usersFetchingLoading && users.length === 0 ? (
        <SkeletonBody />
      ) : (
        <>
          <div>
            <div className="flex flex-row sm:space-y-0 items-center justify-between mb-4">
              <input
                type="text"
                id="search"
                className="h-fit p-2 border rounded-md w-[70%] shadow focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Search by name"
                {...register("search")}
              />
              <AddUser onAdd={handleRefresh} />
            </div>
            <div
              className={`items-start flex flex-col md:flex-row bg-white rounded-md transition-all duration-500 ease-in-out
                ${
                  isOpen
                    ? "md:min-w-full md:max-w-full md:h-fit max-h-full"
                    : "max-h-[60px] w-full md:min-w-[90px] md:max-w-[92px]"
                }`}
            >
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-4 min-h-[55px] text-left overflow-hidden rounded-b-md w-full md:min-w-[100px] md:w-fit transition-all duration-300 ease-in-out focus:outline-none"
              >
                <div className="flex justify-between items-center">
                  <div className="min-h-full w-full flex items-center justify-between space-x-2">
                    <span>Filters</span>
                    <IoFilterOutline className="w-4 h-4" />
                  </div>
                </div>
              </button>
              <div
                className={`w-full overflow-hidden rounded-md transition-all duration-500 ease-in-out 
                  ${isOpen ? "max-h-[300px]" : "max-h-0"}`}
              >
                <form className="space-y-4 p-4 flex flex-col md:flex-row md:p-2 md:space-y-0 md:space-x-2 justify-between transition-opacity duration-300 ease-in-out">
                  <select
                    id="subscription"
                    {...register("subscription")}
                    className="p-2 md:w-1/2 border border-gray-300 rounded-md"
                  >
                    <option disabled value="">
                      select a subscription
                    </option>
                    <option value="free">Free</option>
                    <option value="premium">Premium</option>
                    <option value="">All</option>
                  </select>
                  <select
                    id="isActive"
                    {...register("isActive")}
                    className="p-2 md:w-1/2 border border-gray-300 rounded-md"
                  >
                    <option disabled value="">
                      isBlocked
                    </option>
                    <option value="false">Blocked</option>
                    <option value="true">UnBlocked</option>
                    <option value="">All</option>
                  </select>
                  <select
                    id="limit"
                    {...register("limit")}
                    className="p-2 md:w-1/2 border border-gray-300 rounded-md"
                  >
                    <option disabled value="">
                      select a limit
                    </option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </form>
              </div>
            </div>
            {usersFetchingError && (
              <div className="text-red-500 text-center mb-4">
                {usersFetchingError}
              </div>
            )}

            <div className="my-4 flex justify-around flex-wrap">
              {users.length > 0 ? (
                users.map((user) => (
                  <UserCard
                    key={user._id}
                    user={user}
                    handleRefresh={handleRefresh}
                  />
                ))
              ) : (
                <div className="text-center text-gray-600">No user found</div>
              )}
            </div>
          </div>

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
            <span className="px-4 py-2 c-light-gray">{page}</span>
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
        </>
      )}
    </main>
  );
}

export default UserBody;
