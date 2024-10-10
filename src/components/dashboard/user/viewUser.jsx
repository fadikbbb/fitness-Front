import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import apiClient from "../../../utils/axiosConfig";
import { useState } from "react";
function ViewUser() {
  const { userId } = useParams();
  console.log(userId);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiClient.get(`/users/${userId}`);
        setUser(response.data.user);
        console.log(response.data);
      } catch (error) {
        setError(error.response.message);
      } finally {
        setLoading(true);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div>
        <div className="space-y-4">
          {loading ? (
            <div
              key={user._id}
              className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
            >
              <img
                src={user.image}
                alt={user.firstName}
                className="w-16 h-16 rounded-full"
              />

              <h2 className="text-xl font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </h2>
              <div className="flex space-x-4">
                <Link to={`/dashboard/${user._id}/nutrition-plan`}>
                  <p className="">Nutrition Plan</p>
                </Link>
                <Link to={`/dashboard/${user._id}/workout-plan`}>
                  <p className="">Workout Plan</p>
                </Link>
              </div>
              <p className="text-gray-600"> {user.email}</p>
              <p className="text-gray-600">{user.subscriptionStatus}</p>
              <p>{user.weight}</p>
              <p>{user.height}</p>
              <p>{user.gander}</p>
              <p>{new Date(user.dateOfBirth).toLocaleDateString()}</p>
              <p>{user.role}</p>
              <hr className="my-2 border-gray-300" />
              <>
                {user.isActive ? (
                  <p className="text-green-600">active</p>
                ) : (
                  <p className="text-red-600">inactive</p>
                )}
              </>
            </div>
          ) : (
            <p>loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewUser;
