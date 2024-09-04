import React from "react";
import ProfileForm from "./profile-form"; // Adjust path as necessary
import Logout from "../auth/logout";
import { useSelector, useDispatch } from "react-redux";
import { setUserId } from "../../store/userSlice";
import { jwtDecode } from "jwt-decode";
import DeleteAccount from "./deleteAccount";
import ChangePassword from "./changePassword";
import { useEffect } from "react";
function ProfileBody() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const decodedToken = jwtDecode(token);
    dispatch(setUserId(decodedToken.userId));
  }, [dispatch, token]);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="flex flex-col gap-4">
        <ProfileForm userId={userId} />
        <ChangePassword />
        <DeleteAccount userId={userId} />
        <Logout token={token} />
      </div>
    </div>
  );
}

export default ProfileBody;
