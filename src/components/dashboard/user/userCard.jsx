import { Link } from "react-router-dom";
import EditUser from "./editUser";
import { FaEye } from "react-icons/fa";
import DeleteUser from "./deleteUser";
function UserCard({ user, onDelete, onEdit }) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div>
        <div className="space-y-4">
          <div
            key={user._id}
            className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
          >
            <img
              src={user.profileImage}
              alt={user.firstName}
              className="w-16 h-16 rounded-full"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {user.firstName} {user.lastName}
            </h2>
            {
              user.subscriptionStatus === "premium" &&
              <div className="flex space-x-4">
              <Link to={`/dashboard/${user._id}/nutrition-plan`}>
                <p className="">Nutrition Plan</p>
              </Link>
              <Link to={`/dashboard/${user._id}/workout-plan`}>
                <p className="">Workout Plan</p>
              </Link>
            </div>
            }
            <p className="text-gray-600"> {user.email}</p>
            <p className="text-gray-600">{user.subscriptionStatus}</p>
            <hr className="my-2 border-gray-300" />
            <div className="action flex items-center space-x-4 space-y-2">
              <DeleteUser userId={user._id} onSuccess={onDelete} />
              <EditUser user={user} onSuccess={onEdit} />
              <Link
                to={`/dashboard/users/${user._id}`}
                className="md:flex items-center text-green-500 hover:text-green-700"
              >
                <FaEye className="mr-2" />
                <div className="hidden md:flex">View</div>
              </Link>
            </div>
            <p
              className={`text-gray-600 ${
                user.isActive ? "text-green-600" : "text-red-600"
              }`}
            >
              Status: {user.isActive ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
