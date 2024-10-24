import React, { useEffect, useState , useCallback} from "react";
import { useForm } from "react-hook-form";
import useUsersFetching from "../../../hooks/users/useUsersFetching";
import AddUser from "./addUser";
import UserCard from "./userCard";
import SkeletonBody from "../../loading/skeletonBody";
import { Filter } from "../filter";
import { Pagination } from "../pagination";
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
  const handleRefresh = useCallback(() => {
    setChanges((prevChanges) => !prevChanges);
  }, []);

  useEffect(() => {
    if (page > totalPages) {
      if (totalPages > 0) {
        setPage(totalPages);
        handleRefresh();
      } else {
        setPage(1);
        setTotalPages(1);
      }
    }
  }, [totalPages, page, handleRefresh]);

  const handlePageChange = (newPage) => setPage(newPage);

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

            <Filter
              isUser={true}
              register={register}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />

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
          <Pagination items={users}  handlePageChange={handlePageChange} page={page} totalPages={totalPages}  />
        </>
      )}
    </main>
  );
}

export default UserBody;
